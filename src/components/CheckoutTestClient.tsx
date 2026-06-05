"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  formatBasketPrice,
  productMeta,
  readBasket,
  type BasketItem,
} from "@/lib/basket";
import { simulatePayment } from "@/app/checkout-test/actions";

export default function CheckoutTestClient({
  defaultEmail,
  error,
}: {
  defaultEmail: string;
  error?: string;
}) {
  const [items] = useState<BasketItem[]>(() => readBasket());
  const subtotalCents = useMemo(
    () =>
      items.reduce(
        (total, item) => total + item.product.priceCents * item.quantity,
        0,
      ),
    [items],
  );

  return (
    <div className="mt-9 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_360px]">
      <section className="rounded-[18px] border border-[#efe2cf] bg-white/82 px-7 py-6 shadow-[0_8px_22px_rgba(83,55,24,0.10)]">
        <h2 className="font-heading text-[30px] font-bold text-green-deep">
          Review Test Order
        </h2>

        {error && (
          <p className="mt-5 rounded-[14px] bg-beige px-4 py-3 font-body text-[13px] font-extrabold text-orange">
            {error}
          </p>
        )}

        <div className="mt-6 flex flex-col gap-3">
          {items.length > 0 ? (
            items.map((item) => (
              <div key={item.product.id} className="rounded-[14px] bg-beige px-5 py-4">
                <h3 className="font-heading text-[22px] font-bold text-green-deep">
                  {item.product.title}
                </h3>
                <p className="mt-1 font-body text-[13px] font-extrabold text-text-muted">
                  {productMeta(item.product)}
                </p>
                <p className="mt-1 font-body text-[13px] font-bold text-text-dark">
                  Qty {item.quantity} / {formatBasketPrice(item.product)}
                </p>
              </div>
            ))
          ) : (
            <div className="rounded-[14px] bg-beige px-5 py-4">
              <p className="font-body text-[14px] font-bold text-text-muted">
                Your basket is empty.
              </p>
              <Link
                href="/products-test"
                className="mt-4 inline-flex font-body text-[14px] font-extrabold text-orange hover:underline"
              >
                Add test products
              </Link>
            </div>
          )}
        </div>
      </section>

      <aside className="h-fit rounded-[18px] border border-[#efe2cf] bg-beige px-6 py-6 shadow-[0_8px_22px_rgba(83,55,24,0.10)]">
        <h2 className="font-heading text-[28px] font-bold text-green-deep">
          Payment Test
        </h2>
        <div className="mt-5 flex items-center justify-between border-t border-white/80 pt-5">
          <span className="font-body text-[14px] font-extrabold text-text-dark">
            Total
          </span>
          <span className="font-heading text-[28px] font-bold text-green-deep">
            ZAR {(subtotalCents / 100).toFixed(2)}
          </span>
        </div>
        <form action={simulatePayment} className="mt-5">
          <input type="hidden" name="basketJson" value={JSON.stringify(items)} />
          <label className="flex flex-col gap-2 font-body text-[13px] font-extrabold text-text-dark">
            Customer email
            <input
              name="customerEmail"
              type="email"
              required
              defaultValue={defaultEmail}
              className="min-h-12 rounded-[14px] border border-[#efe2cf] bg-white px-4 py-3 font-body text-[14px] font-bold text-text-dark outline-none transition-colors focus:border-orange"
            />
          </label>
          <button
            type="submit"
            disabled={items.length === 0}
            className="mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-green-deep px-7 py-3 font-body text-[14px] font-extrabold text-white shadow-[0_10px_20px_rgba(36,76,45,0.22)] transition-colors hover:bg-[#1b3d23] disabled:cursor-not-allowed disabled:bg-green-soft"
          >
            Simulate successful payment
          </button>
        </form>
        <p className="mt-4 font-body text-[12px] font-bold leading-[1.45] text-text-muted">
          This creates a paid test order and download records without contacting
          a payment provider.
        </p>
      </aside>
    </div>
  );
}
