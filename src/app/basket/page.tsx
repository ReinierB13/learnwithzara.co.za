import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BasketClient from "@/components/BasketClient";

export default function BasketPage() {
  return (
    <>
      <Header />
      <main className="bg-cream">
        <section className="px-6 pb-20 pt-32 md:pt-36">
          <div className="mx-auto max-w-[1180px]">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="font-body text-[14px] font-extrabold text-orange">
                  Checkout test
                </p>
                <h1 className="font-heading text-[42px] font-bold leading-[0.98] tracking-wide text-green-deep md:text-[56px]">
                  Basket
                </h1>
                <div className="mt-5 h-[3px] w-20 rounded-full bg-orange" />
              </div>
              <Link
                href="/products-test"
                className="inline-flex font-body text-[14px] font-extrabold text-orange hover:underline"
              >
                Continue shopping
              </Link>
            </div>

            <p className="mt-6 max-w-[720px] font-body text-[16px] font-bold leading-[1.55] text-text-dark">
              This basket page stores test items in the browser while we build
              the payment simulation and email delivery flow.
            </p>

            <BasketClient />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
