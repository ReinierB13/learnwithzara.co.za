import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const DELIVERY_STEPS = [
  "Your digital product will be made available for download.",
  "You may also receive a download link by email.",
  "Delivery is usually immediate but may occasionally take a few minutes depending on payment processing and internet connectivity.",
];

export default function ShippingDeliveryPage() {
  return (
    <>
      <Header />
      <main className="bg-cream">
        <section className="px-6 pb-20 pt-32 md:pt-36">
          <article className="mx-auto max-w-[864px] rounded-[18px] border border-[#efe2cf] bg-white/82 px-7 py-8 shadow-[0_8px_22px_rgba(83,55,24,0.12)] md:px-12 md:py-11">
            <h1 className="font-heading text-[42px] font-bold leading-[0.98] tracking-wide text-green-deep md:text-[56px]">
              Shipping & Delivery
            </h1>
            <p className="mt-4 font-body text-[14px] font-extrabold text-orange">
              Last Updated: June 2026
            </p>
            <div className="mt-5 h-[3px] w-20 rounded-full bg-orange" />

            <div className="mt-7 flex flex-col gap-6 font-body text-[16px] font-bold leading-[1.6] text-text-dark md:text-[17px]">
              <section className="flex flex-col gap-4">
                <h2 className="font-heading text-[28px] font-bold text-green-deep">
                  Digital Product Delivery
                </h2>
                <p>
                  Learn With Zara sells digital educational resources, including
                  workbooks, worksheets, assessments, printable activities, and
                  other downloadable learning materials.
                </p>
                <p>
                  Because our products are delivered electronically, no physical
                  items are shipped.
                </p>
              </section>

              <section className="flex flex-col gap-4">
                <h2 className="font-heading text-[28px] font-bold text-green-deep">
                  How Delivery Works
                </h2>
                <p>Once your purchase has been completed successfully:</p>
                <ul className="flex flex-col gap-3 rounded-[16px] bg-beige px-6 py-5">
                  {DELIVERY_STEPS.map((step) => (
                    <li key={step} className="flex gap-3">
                      <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-orange" />
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="flex flex-col gap-4">
                <h2 className="font-heading text-[28px] font-bold text-green-deep">
                  Delivery Area
                </h2>
                <p>
                  Our digital products can be purchased and downloaded from
                  anywhere in the world with an internet connection.
                </p>
              </section>

              <section className="flex flex-col gap-4">
                <h2 className="font-heading text-[28px] font-bold text-green-deep">
                  Download Issues
                </h2>
                <p>
                  If you experience difficulty accessing or downloading your
                  purchase, please contact us and we will assist you as quickly
                  as possible.
                </p>
              </section>

              <section className="flex flex-col gap-4">
                <h2 className="font-heading text-[28px] font-bold text-green-deep">
                  Printing
                </h2>
                <p>
                  Our resources are designed to be printed at home or through a
                  local print shop.
                </p>
                <p>Customers are responsible for any printing costs.</p>
              </section>

              <section className="flex flex-col gap-4">
                <h2 className="font-heading text-[28px] font-bold text-green-deep">
                  Contact
                </h2>
                <p>
                  If you have questions about a download or delivery issue,
                  please contact us through the Contact page on our website.
                </p>
                <p>Website:</p>
                <p>
                  <Link
                    href="/"
                    className="text-orange underline hover:text-[#cf4f08]"
                  >
                    www.learnwithzara.co.za
                  </Link>
                </p>
              </section>

              <div className="border-t border-[#efe2cf] pt-5">
                <p className="font-heading text-[24px] font-bold text-green-deep">
                  Learn With Zara
                </p>
                <p className="font-heading text-[22px] font-bold italic text-orange">
                  Learning made simple.
                </p>
              </div>
            </div>
          </article>
        </section>
      </main>
      <Footer />
    </>
  );
}
