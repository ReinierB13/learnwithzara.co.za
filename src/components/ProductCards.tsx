import Link from "next/link";

const CARDS = [
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12" stroke="#355E3B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="8" y="6" width="24" height="32" rx="3" />
        <rect x="14" y="4" width="24" height="32" rx="3" fill="#F8E7D0" stroke="#355E3B" strokeWidth="2" />
        <line x1="20" y1="14" x2="32" y2="14" />
        <line x1="20" y1="20" x2="32" y2="20" />
        <line x1="20" y1="26" x2="28" y2="26" />
      </svg>
    ),
    title: "WORKBOOKS",
    body: "Clear explanations and lots of practice to build confidence. Afrikaans & English.",
    link: "View Workbooks",
    href: "#workbooks",
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12" stroke="#355E3B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="8" y="8" width="32" height="32" rx="3" />
        <line x1="16" y1="18" x2="32" y2="18" />
        <line x1="16" y1="24" x2="32" y2="24" />
        <line x1="16" y1="30" x2="24" y2="30" />
        <polyline points="30,26 33,30 38,22" stroke="#E85D04" strokeWidth="2.5" />
      </svg>
    ),
    title: "TEST PACKS",
    body: "Topic tests and assessments to track progress and improve results.",
    link: "View Test Packs",
    href: "#testpacks",
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12" stroke="#355E3B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M24 6 L30 18 L44 20 L34 30 L36 44 L24 37 L12 44 L14 30 L4 20 L18 18 Z" />
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
    <section id="products" className="bg-cream py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {CARDS.map((card) => (
            <div
              key={card.title}
              className="bg-white rounded-3xl p-8 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col gap-4"
            >
              <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-beige">
                {card.icon}
              </div>
              <h3 className="font-heading font-bold text-2xl text-green-deep tracking-wide">
                {card.title}
              </h3>
              <p className="font-body text-text-muted text-base leading-relaxed flex-1">
                {card.body}
              </p>
              <Link
                href={card.href}
                className="font-body font-semibold text-orange hover:underline flex items-center gap-1 text-sm mt-auto"
              >
                {card.link} →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
