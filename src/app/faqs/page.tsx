import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const FAQS = [
  {
    question: "What is Learn With Zara?",
    answer: [
      "Learn With Zara is a South African educational resource platform offering printable workbooks, worksheets, assessments, and learning materials designed to help children build confidence and succeed at school.",
    ],
  },
  {
    question: "Who creates the learning content?",
    answer: [
      "Our resources are developed and reviewed by experienced South African educators with decades of classroom teaching and school leadership experience.",
      "Every activity is designed with practical teaching experience in mind and focuses on helping children genuinely understand concepts rather than simply memorising answers.",
    ],
  },
  {
    question: "Which grades do you support?",
    answer: [
      "We currently focus on learners from Grade R to Grade 7.",
      "New resources are added regularly as the Learn With Zara library grows.",
    ],
  },
  {
    question: "Are your resources aligned with the South African curriculum?",
    answer: [
      "Yes. Our materials are designed with the South African curriculum in mind and aim to support the skills and concepts learners are expected to develop at each grade level.",
    ],
  },
  {
    question: "Are the resources available in English and Afrikaans?",
    answer: [
      "We are working towards providing resources in both English and Afrikaans wherever possible.",
      "Availability may vary depending on the product.",
    ],
  },
  {
    question: "How do I receive my purchase?",
    answer: [
      "All products are delivered digitally.",
      "After purchase, you will receive access to download your workbook, worksheet, assessment, or learning resource.",
      "No physical products are shipped.",
    ],
  },
  {
    question: "Can I print the workbooks at home?",
    answer: [
      "Yes.",
      "Our resources are designed to be printer-friendly and can be printed at home or through a local print shop.",
    ],
  },
  {
    question: "Can teachers use Learn With Zara resources in their classrooms?",
    answer: [
      "Yes.",
      "Teachers are welcome to use purchased resources within their own classrooms.",
      "Please contact us if you require resources for multiple classes or a school-wide licence.",
    ],
  },
  {
    question: "Do I need an internet connection to use the workbooks?",
    answer: [
      "Once downloaded, most PDF resources can be used offline.",
      "An internet connection is only required to access and download the files.",
    ],
  },
  {
    question: "What if my child is struggling?",
    answer: [
      "That is perfectly normal.",
      "Children learn at different speeds and often need additional practice before a concept becomes comfortable.",
      "Learn With Zara resources are designed to provide extra support, confidence-building, and structured practice.",
    ],
  },
  {
    question: "Are answers included?",
    answer: [
      "Where appropriate, answer memorandums or answer sections are included to help parents, teachers, and learners check their work.",
    ],
  },
  {
    question: "Can I share purchased resources with friends or family?",
    answer: [
      "Purchases are intended for use by the purchaser and their immediate household.",
      "Please encourage others to purchase their own copies so that we can continue creating new educational resources.",
    ],
  },
  {
    question: "Do you offer refunds?",
    answer: [
      "Because our products are digital and can be downloaded immediately, refunds are generally not available once a product has been accessed or downloaded.",
      "Please see our Refund Policy for full details.",
    ],
    refundLink: true,
  },
  {
    question: "How can I contact Learn With Zara?",
    answer: [
      "You can contact us through the Contact page on our website or by email.",
      "Email:",
      "Website:",
      "We aim to respond to enquiries as quickly as possible.",
    ],
    websiteLink: true,
    emailLink: true,
  },
  {
    question: "Who is Zara?",
    answer: [
      "Zara is our curious bat-eared fox mascot and learning companion.",
      "She encourages children to explore, practise, ask questions, and discover that learning can be both rewarding and fun.",
    ],
  },
];

export default function FaqsPage() {
  return (
    <>
      <Header />
      <main className="bg-cream">
        <section className="px-6 pb-20 pt-32 md:pt-36">
          <div className="mx-auto max-w-[864px]">
            <h1 className="font-heading text-[42px] font-bold leading-[0.98] tracking-wide text-green-deep md:text-[56px]">
              Frequently Asked Questions
            </h1>
            <div className="mt-5 h-[3px] w-20 rounded-full bg-orange" />

            <div className="mt-8 flex flex-col gap-5">
              {FAQS.map((faq) => (
                <article
                  key={faq.question}
                  className="rounded-[18px] border border-[#efe2cf] bg-white/82 px-7 py-6 shadow-[0_8px_22px_rgba(83,55,24,0.10)]"
                >
                  <h2 className="font-heading text-[25px] font-bold leading-[1.18] text-green-deep">
                    {faq.question}
                  </h2>
                  <div className="mt-4 flex flex-col gap-3 font-body text-[16px] font-bold leading-[1.55] text-text-dark">
                    {faq.answer.map((paragraph) => (
                      <p key={paragraph}>
                        {faq.refundLink &&
                        paragraph ===
                          "Please see our Refund Policy for full details." ? (
                          <>
                            Please see our{" "}
                            <Link
                              href="/refund-policy"
                              className="text-orange underline hover:text-[#cf4f08]"
                            >
                              Refund Policy
                            </Link>{" "}
                            for full details.
                          </>
                        ) : (
                          paragraph
                        )}
                      </p>
                    ))}
                    {faq.emailLink && (
                      <p>
                        <a
                          href="mailto:learnwithzara@outlook.com"
                          className="text-orange underline hover:text-[#cf4f08]"
                        >
                          learnwithzara@outlook.com
                        </a>
                      </p>
                    )}
                    {faq.websiteLink && (
                      <p>
                        <Link
                          href="/"
                          className="text-orange underline hover:text-[#cf4f08]"
                        >
                          www.learnwithzara.co.za
                        </Link>
                      </p>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
