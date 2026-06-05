import Header from "@/components/Header";
import Footer from "@/components/Footer";

const EXCEPTIONS = [
  "You were charged more than once for the same order.",
  "The purchased file is corrupted or cannot be downloaded.",
  "You received the wrong product.",
  "A technical issue on our side prevents access to the purchased resource.",
];

export default function RefundPolicyPage() {
  return (
    <>
      <Header />
      <main className="bg-cream">
        <section className="px-6 pb-20 pt-32 md:pt-36">
          <article className="mx-auto max-w-[864px] rounded-[18px] border border-[#efe2cf] bg-white/82 px-7 py-8 shadow-[0_8px_22px_rgba(83,55,24,0.12)] md:px-12 md:py-11">
            <h1 className="font-heading text-[42px] font-bold leading-[0.98] tracking-wide text-green-deep md:text-[56px]">
              Refund Policy
            </h1>
            <p className="mt-4 font-body text-[14px] font-extrabold text-orange">
              Last Updated: June 2026
            </p>
            <div className="mt-5 h-[3px] w-20 rounded-full bg-orange" />

            <div className="mt-7 flex flex-col gap-5 font-body text-[16px] font-bold leading-[1.6] text-text-dark md:text-[17px]">
              <p>
                At Learn With Zara, we provide digital educational products
                including downloadable workbooks, worksheets, assessments, and
                other learning resources.
              </p>
              <p>
                Because our products are delivered electronically and can be
                accessed immediately after purchase, we are generally unable to
                offer refunds once a product has been downloaded, accessed, or
                delivered.
              </p>

              <section className="flex flex-col gap-4">
                <h2 className="font-heading text-[28px] font-bold text-green-deep">
                  Digital Products
                </h2>
                <p>All sales of digital products are considered final.</p>
                <p>
                  Once a workbook, worksheet, assessment, printable resource, or
                  other digital product has been delivered, copied, downloaded,
                  or accessed, it cannot be returned in the same way as a
                  physical product. For this reason, refunds are not normally
                  available.
                </p>
              </section>

              <section className="flex flex-col gap-4">
                <h2 className="font-heading text-[28px] font-bold text-green-deep">
                  Exceptions
                </h2>
                <p>
                  We may consider a refund, replacement, or credit in the
                  following situations:
                </p>
                <ul className="flex flex-col gap-3 rounded-[16px] bg-beige px-6 py-5">
                  {EXCEPTIONS.map((exception) => (
                    <li key={exception} className="flex gap-3">
                      <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-orange" />
                      <span>{exception}</span>
                    </li>
                  ))}
                </ul>
                <p>
                  If you experience any of these issues, please contact us
                  within 14 days of purchase.
                </p>
              </section>

              <section className="flex flex-col gap-4">
                <h2 className="font-heading text-[28px] font-bold text-green-deep">
                  Product Descriptions
                </h2>
                <p>
                  We make every effort to accurately describe our products,
                  including grade levels, subject matter, and content. We
                  encourage customers to review product descriptions carefully
                  before purchasing.
                </p>
              </section>

              <section className="flex flex-col gap-4">
                <h2 className="font-heading text-[28px] font-bold text-green-deep">
                  Contact Us
                </h2>
                <p>
                  If you have questions regarding a purchase, please contact us
                  at:
                </p>
                <p>
                  <strong className="text-green-deep">Email:</strong>{" "}
                  <a
                    href="mailto:learnwithzara@outlook.com"
                    className="text-orange underline hover:text-[#cf4f08]"
                  >
                    learnwithzara@outlook.com
                  </a>
                </p>
                <p>
                  <strong className="text-green-deep">Website:</strong>{" "}
                  learnwithzara.co.za
                </p>
                <p>
                  We are committed to providing high-quality educational
                  resources and will do our best to resolve any genuine problems
                  promptly and fairly.
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
