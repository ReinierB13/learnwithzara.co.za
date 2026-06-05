"use server";

import { randomUUID } from "crypto";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { getSql } from "@/lib/db";

type CheckoutBasketItem = {
  product?: {
    id?: unknown;
  };
  quantity?: unknown;
};

function redirectCheckout(type: "error" | "message", message: string): never {
  redirect(`/checkout-test?${type}=${encodeURIComponent(message)}`);
}

function formValue(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function parseBasket(formData: FormData) {
  const basketJson = formValue(formData, "basketJson");

  if (!basketJson) {
    redirectCheckout("error", "Your basket is empty.");
  }

  let parsed: unknown;

  try {
    parsed = JSON.parse(basketJson);
  } catch {
    redirectCheckout("error", "We could not read your basket.");
  }

  if (!Array.isArray(parsed)) {
    redirectCheckout("error", "We could not read your basket.");
  }

  const items = parsed
    .map((item: CheckoutBasketItem) => ({
      productId: Number(item.product?.id),
      quantity: Number(item.quantity),
    }))
    .filter(
      (item) =>
        Number.isInteger(item.productId) &&
        item.productId > 0 &&
        Number.isInteger(item.quantity) &&
        item.quantity > 0,
    );

  if (items.length === 0) {
    redirectCheckout("error", "Your basket is empty.");
  }

  return items;
}

export async function simulatePayment(formData: FormData) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/account?mode=login&error=Please sign in before testing checkout.");
  }

  const basketItems = parseBasket(formData);
  const customerEmail = formValue(formData, "customerEmail").toLowerCase() || user.email;
  const sql = getSql();
  const ids = basketItems.map((item) => item.productId);
  const products = (await sql`
    SELECT id, title, price_cents, currency, is_active
    FROM products
    WHERE id = ANY(${ids})
  `) as Array<{
    id: number;
    title: string;
    price_cents: number;
    currency: string;
    is_active: boolean;
  }>;

  if (products.length !== ids.length || products.some((product) => !product.is_active)) {
    redirectCheckout("error", "One or more products are no longer available.");
  }

  const productById = new Map(products.map((product) => [Number(product.id), product]));
  const totalCents = basketItems.reduce((total, item) => {
    const product = productById.get(item.productId);
    return total + (product?.price_cents || 0) * item.quantity;
  }, 0);
  const paymentReference = `SIM-${randomUUID()}`;
  const orders = (await sql`
    INSERT INTO orders (
      user_id,
      status,
      total_cents,
      currency,
      payment_provider,
      payment_reference
    )
    VALUES (
      ${user.id},
      'PAID',
      ${totalCents},
      'ZAR',
      'SIMULATED',
      ${paymentReference}
    )
    RETURNING id
  `) as Array<{ id: number }>;
  const orderId = orders[0].id;

  for (const item of basketItems) {
    const product = productById.get(item.productId);

    if (!product) {
      continue;
    }

    await sql`
      INSERT INTO order_items (
        order_id,
        product_id,
        quantity,
        unit_price_cents
      )
      VALUES (
        ${orderId},
        ${item.productId},
        ${item.quantity},
        ${product.price_cents}
      )
    `;

    await sql`
      INSERT INTO downloads (
        user_id,
        product_id,
        order_id
      )
      VALUES (
        ${user.id},
        ${item.productId},
        ${orderId}
      )
      ON CONFLICT (user_id, product_id, COALESCE(order_id, 0))
      DO NOTHING
    `;
  }

  await sql`
    INSERT INTO email_subscribers (email, first_name, source)
    VALUES (${customerEmail}, ${user.firstName}, 'checkout')
    ON CONFLICT ((lower(email)))
    DO UPDATE SET
      source = EXCLUDED.source,
      is_subscribed = true,
      updated_at = now()
  `;

  redirect(`/checkout-test?orderId=${orderId}`);
}
