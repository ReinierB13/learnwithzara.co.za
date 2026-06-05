"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

export type StoreProduct = {
  id: number;
  title: string;
  slug: string;
  description: string;
  grade: string | null;
  subject: string;
  productType: string;
  priceCents: number;
  currency: string;
  isFree: boolean;
  fileUrl: string;
  thumbnailUrl: string | null;
};

type BasketItem = {
  product: StoreProduct;
  quantity: number;
};

function formatPrice(product: StoreProduct) {
  if (product.isFree) {
    return "Free";
  }

  return `${product.currency} ${(product.priceCents / 100).toFixed(2)}`;
}

function productMeta(product: StoreProduct) {
  return [
    product.grade ? `Grade ${product.grade}` : "All grades",
    product.subject,
    product.productType,
  ].join(" / ");
}

export default function ProductTestStore({
  products,
}: {
  products: StoreProduct[];
}) {
  const [basket, setBasket] = useState<BasketItem[]>([]);

  const subtotalCents = useMemo(
    () =>
      basket.reduce(
        (total, item) => total + item.product.priceCents * item.quantity,
        0,
      ),
    [basket],
  );

  function addToBasket(product: StoreProduct) {
    setBasket((items) => {
      const existing = items.find((item) => item.product.id === product.id);

      if (existing) {
        return items.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...items, { product, quantity: 1 }];
    });
  }

  function removeFromBasket(productId: number) {
    setBasket((items) => items.filter((item) => item.product.id !== productId));
  }

  return (
    <div className="mt-9 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_340px]">
      <section className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {products.length > 0 ? (
          products.map((product) => (
            <article
              key={product.id}
              className="flex min-h-[310px] flex-col rounded-[18px] border border-[#efe2cf] bg-white/82 p-6 shadow-[0_8px_22px_rgba(83,55,24,0.10)]"
            >
              {product.thumbnailUrl ? (
                <div className="mb-5 aspect-[16/10] overflow-hidden rounded-[14px] bg-beige">
                  <Image
                    src={product.thumbnailUrl}
                    alt=""
                    width={640}
                    height={400}
                    className="h-full w-full object-cover"
                  />
                </div>
              ) : (
                <div className="mb-5 flex aspect-[16/10] items-center justify-center rounded-[14px] bg-beige">
                  <span className="font-heading text-[24px] font-bold text-green-deep">
                    {product.subject}
                  </span>
                </div>
              )}

              <p className="font-body text-[12px] font-extrabold uppercase tracking-wide text-orange">
                {productMeta(product)}
              </p>
              <h2 className="mt-2 font-heading text-[27px] font-bold leading-[1.05] text-green-deep">
                {product.title}
              </h2>
              <p className="mt-3 flex-1 font-body text-[14px] font-bold leading-[1.5] text-text-muted">
                {product.description}
              </p>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <span className="font-heading text-[24px] font-bold text-green-deep">
                  {formatPrice(product)}
                </span>
                <button
                  type="button"
                  onClick={() => addToBasket(product)}
                  className="inline-flex min-h-11 items-center justify-center rounded-full bg-orange px-6 py-3 font-body text-[13px] font-extrabold text-white shadow-[0_10px_20px_rgba(233,91,11,0.18)] transition-colors hover:bg-[#cf4f08]"
                >
                  Add to basket
                </button>
              </div>
            </article>
          ))
        ) : (
          <p className="rounded-[18px] border border-[#efe2cf] bg-white/82 px-7 py-6 font-body text-[15px] font-bold text-text-muted shadow-[0_8px_22px_rgba(83,55,24,0.10)] md:col-span-2">
            No uploaded products are active yet.
          </p>
        )}
      </section>

      <aside className="h-fit rounded-[18px] border border-[#efe2cf] bg-beige px-6 py-6 shadow-[0_8px_22px_rgba(83,55,24,0.10)]">
        <h2 className="font-heading text-[28px] font-bold text-green-deep">
          Test Basket
        </h2>
        <div className="mt-5 flex flex-col gap-3">
          {basket.length > 0 ? (
            basket.map((item) => (
              <div key={item.product.id} className="rounded-[14px] bg-white px-4 py-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-body text-[14px] font-extrabold text-text-dark">
                      {item.product.title}
                    </h3>
                    <p className="mt-1 font-body text-[12px] font-bold text-text-muted">
                      Qty {item.quantity} / {formatPrice(item.product)}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFromBasket(item.product.id)}
                    className="font-body text-[12px] font-extrabold text-orange hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="rounded-[14px] bg-white px-4 py-4 font-body text-[14px] font-bold text-text-muted">
              Add a product to start testing the basket.
            </p>
          )}
        </div>

        <div className="mt-5 border-t border-white/80 pt-5">
          <div className="flex items-center justify-between">
            <span className="font-body text-[14px] font-extrabold text-text-dark">
              Subtotal
            </span>
            <span className="font-heading text-[26px] font-bold text-green-deep">
              ZAR {(subtotalCents / 100).toFixed(2)}
            </span>
          </div>
          <button
            type="button"
            disabled={basket.length === 0}
            className="mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-green-deep px-7 py-3 font-body text-[14px] font-extrabold text-white shadow-[0_10px_20px_rgba(36,76,45,0.22)] transition-colors hover:bg-[#1b3d23] disabled:cursor-not-allowed disabled:bg-green-soft"
          >
            Simulate checkout
          </button>
          <p className="mt-3 font-body text-[12px] font-bold leading-[1.45] text-text-muted">
            Payment and email delivery will be connected after this basket flow.
          </p>
        </div>
      </aside>
    </div>
  );
}
