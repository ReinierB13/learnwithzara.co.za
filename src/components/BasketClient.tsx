"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  formatBasketPrice,
  productMeta,
  readBasket,
  writeBasket,
  type BasketItem,
} from "@/lib/basket";

function totalItems(items: BasketItem[]) {
  return items.reduce((total, item) => total + item.quantity, 0);
}

export default function BasketClient() {
  const [items, setItems] = useState<BasketItem[]>(() => readBasket());

  const subtotalCents = useMemo(
    () =>
      items.reduce(
        (total, item) => total + item.product.priceCents * item.quantity,
        0,
      ),
    [items],
  );

  function updateItems(next: BasketItem[]) {
    setItems(next);
    writeBasket(next);
  }

  function setQuantity(productId: number, quantity: number) {
    if (quantity <= 0) {
      updateItems(items.filter((item) => item.product.id !== productId));
      return;
    }

    updateItems(
      items.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item,
      ),
    );
  }

  return (
    <div className="mt-9 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_360px]">
      <section className="flex flex-col gap-4">
        {items.length > 0 ? (
          items.map((item) => (
            <article
              key={item.product.id}
              className="grid grid-cols-1 gap-5 rounded-[18px] border border-[#efe2cf] bg-white/82 p-5 shadow-[0_8px_22px_rgba(83,55,24,0.10)] md:grid-cols-[150px_1fr]"
            >
              {item.product.thumbnailUrl ? (
                <div className="relative aspect-[16/10] overflow-hidden rounded-[14px] bg-beige md:aspect-square">
                  <Image
                    src={item.product.thumbnailUrl}
                    alt=""
                    fill
                    sizes="150px"
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="flex aspect-[16/10] items-center justify-center rounded-[14px] bg-beige md:aspect-square">
                  <span className="font-heading text-[20px] font-bold text-green-deep">
                    {item.product.subject}
                  </span>
                </div>
              )}

              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                  <p className="font-body text-[12px] font-extrabold uppercase tracking-wide text-orange">
                    {productMeta(item.product)}
                  </p>
                  <h2 className="mt-2 font-heading text-[28px] font-bold leading-[1.05] text-green-deep">
                    {item.product.title}
                  </h2>
                  <p className="mt-2 font-body text-[14px] font-bold leading-[1.5] text-text-muted">
                    {formatBasketPrice(item.product)}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3 md:justify-end">
                  <div className="flex min-h-11 items-center overflow-hidden rounded-full border border-[#efe2cf] bg-white">
                    <button
                      type="button"
                      onClick={() => setQuantity(item.product.id, item.quantity - 1)}
                      className="flex h-11 w-11 items-center justify-center font-body text-[18px] font-extrabold text-green-deep transition-colors hover:bg-beige"
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <span className="min-w-10 text-center font-body text-[14px] font-extrabold text-text-dark">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity(item.product.id, item.quantity + 1)}
                      className="flex h-11 w-11 items-center justify-center font-body text-[18px] font-extrabold text-green-deep transition-colors hover:bg-beige"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => setQuantity(item.product.id, 0)}
                    className="font-body text-[13px] font-extrabold text-orange hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </article>
          ))
        ) : (
          <div className="rounded-[18px] border border-[#efe2cf] bg-white/82 px-7 py-7 shadow-[0_8px_22px_rgba(83,55,24,0.10)]">
            <h2 className="font-heading text-[30px] font-bold text-green-deep">
              Your basket is empty
            </h2>
            <p className="mt-3 font-body text-[15px] font-bold leading-[1.5] text-text-muted">
              Add uploaded products from the test products page to begin the
              checkout flow.
            </p>
            <Link
              href="/products-test"
              className="mt-6 inline-flex min-h-12 items-center justify-center rounded-full bg-orange px-7 py-3 font-body text-[14px] font-extrabold text-white"
            >
              View test products
            </Link>
          </div>
        )}
      </section>

      <aside className="h-fit rounded-[18px] border border-[#efe2cf] bg-beige px-6 py-6 shadow-[0_8px_22px_rgba(83,55,24,0.10)]">
        <h2 className="font-heading text-[28px] font-bold text-green-deep">
          Basket Summary
        </h2>
        <div className="mt-5 flex items-center justify-between border-t border-white/80 pt-5">
          <span className="font-body text-[14px] font-extrabold text-text-dark">
            Items
          </span>
          <span className="font-body text-[14px] font-extrabold text-text-dark">
            {totalItems(items)}
          </span>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <span className="font-body text-[14px] font-extrabold text-text-dark">
            Subtotal
          </span>
          <span className="font-heading text-[28px] font-bold text-green-deep">
            ZAR {(subtotalCents / 100).toFixed(2)}
          </span>
        </div>
        <button
          type="button"
          disabled={items.length === 0}
          className="mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-green-deep px-7 py-3 font-body text-[14px] font-extrabold text-white shadow-[0_10px_20px_rgba(36,76,45,0.22)] transition-colors hover:bg-[#1b3d23] disabled:cursor-not-allowed disabled:bg-green-soft"
        >
          Continue to payment test
        </button>
        <button
          type="button"
          disabled={items.length === 0}
          onClick={() => updateItems([])}
          className="mt-3 inline-flex min-h-11 w-full items-center justify-center rounded-full border border-white bg-white px-7 py-3 font-body text-[13px] font-extrabold text-orange transition-colors hover:border-orange disabled:cursor-not-allowed disabled:text-text-muted"
        >
          Clear basket
        </button>
        <p className="mt-4 font-body text-[12px] font-bold leading-[1.45] text-text-muted">
          Next we will turn this into a payment simulation and email delivery
          test.
        </p>
      </aside>
    </div>
  );
}
