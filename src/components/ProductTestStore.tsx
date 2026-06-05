"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  addProductToBasket,
  formatBasketPrice,
  productMeta,
  type BasketProduct,
} from "@/lib/basket";

export type StoreProduct = BasketProduct;

export default function ProductTestStore({
  products,
}: {
  products: StoreProduct[];
}) {
  const router = useRouter();

  function addToBasket(product: StoreProduct) {
    addProductToBasket(product);
    router.push("/basket");
  }

  return (
    <div className="mt-9">
      <section className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
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
                  {formatBasketPrice(product)}
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
    </div>
  );
}
