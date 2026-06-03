import Link from "next/link";

const CARDS = [
  {
    icon: (
      <svg
        viewBox="0 0 64 64"
        fill="none"
        className="h-16 w-16"
        stroke="#244C2D"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M8 16c8-4 16-4 24 1v37c-8-5-16-5-24-1V16Z" fill="#FFF8EE" />
        <path d="M56 16c-8-4-16-4-24 1v37c8-5 16-5 24-1V16Z" fill="#FFF8EE" />
        <path d="M32 17v37" />
        <path d="M17 25h8M17 34h8M39 25h8M39 34h8" stroke="#E95B0B" strokeWidth="2" />
      </svg>
    ),
    title: "WORKBOOKS",
    body: "Clear explanations and lots of practice to build confidence across school subjects.",
    link: "View Workbooks",
    href: "#workbooks",
  },
  {
    icon: (
      <svg
        viewBox="0 0 64 64"
        fill="none"
        className="h-16 w-16"
        stroke="#244C2D"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="15" y="11" width="34" height="43" rx="4" fill="#FFF8EE" />
        <path d="M25 11h14l2 7H23l2-7Z" fill="#F5A623" />
        <path d="m22 28 3 3 5-7M22 39l3 3 5-7" stroke="#E95B0B" />
        <path d="M35 28h8M35 39h8" />
        <path d="m45 47 9-9 4 4-9 9-5 1 1-5Z" fill="#F5A623" />
      </svg>
    ),
    title: "TEST PACKS",
    body: "Topic tests and assessments to track progress and improve results.",
    link: "View Test Packs",
    href: "#testpacks",
  },
  {
    icon: (
      <svg
        viewBox="0 0 64 64"
        fill="none"
        className="h-16 w-16"
        stroke="#244C2D"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M19 19h26v9c0 9-5 16-13 18-8-2-13-9-13-18v-9Z" fill="#F5A623" />
        <path d="M19 23H9c0 9 5 15 12 15M45 23h10c0 9-5 15-12 15" />
        <path d="M32 25l2.2 4.5 5 .7-3.6 3.5.9 5-4.5-2.4-4.5 2.4.9-5-3.6-3.5 5-.7L32 25Z" fill="#FFF8EE" stroke="#FFF8EE" />
        <path d="M27 50h10M23 56h18" />
      </svg>
    ),
    title: "EXAM PREPARATION",
    body: "Complete exam preparation packs to help learners achieve their best.",
    link: "View Exam Packs",
    href: "#exampacks",
  },
];

export default function ProductCards() {
  return (
    <section id="products" className="bg-cream px-6 pb-4 pt-1">
      <div className="mx-auto max-w-[864px]">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {CARDS.map((card) => (
            <div
              key={card.title}
              className="flex h-[226px] flex-col items-center rounded-[18px] border border-[#efe2cf] bg-white/78 px-8 py-5 text-center shadow-[0_8px_22px_rgba(83,55,24,0.12)] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="mb-1 flex h-[66px] items-center justify-center">
                {card.icon}
              </div>
              <h3 className="font-heading text-[22px] font-bold tracking-wide text-green-deep">
                {card.title}
              </h3>
              <p className="mt-2 flex-1 font-body text-[14px] font-semibold leading-[1.42] text-text-dark">
                {card.body}
              </p>
              <Link
                href={card.href}
                className="mt-4 flex items-center gap-2 font-body text-[14px] font-extrabold text-orange hover:underline"
              >
                {card.link}
                <svg
                  viewBox="0 0 20 20"
                  fill="none"
                  className="h-4 w-4"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 10h12" />
                  <path d="m11 5 5 5-5 5" />
                </svg>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
