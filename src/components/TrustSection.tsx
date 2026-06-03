import Image from "next/image";

const BULLETS = [
  { icon: "✅", label: "CAPS aligned" },
  { icon: "👩‍🏫", label: "Created by experienced teachers" },
  { icon: "🌍", label: "Afrikaans & English" },
  { icon: "🖨️", label: "Printable at home" },
];

export default function TrustSection() {
  return (
    <section id="parents" className="relative py-20 px-6 overflow-hidden bg-green-deep">
      {/* Background image at low opacity */}
      <Image
        src="/images/backgrounds/trust.png"
        alt=""
        fill
        className="object-cover object-center opacity-20 mix-blend-multiply"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12">
        {/* Left — text */}
        <div className="flex-1">
          <h2 className="font-heading font-bold text-4xl lg:text-5xl text-white leading-tight mb-8">
            WHY PARENTS
            <br />
            TRUST ZARA MATHS
          </h2>
          <ul className="flex flex-col gap-5">
            {BULLETS.map((b) => (
              <li key={b.label} className="flex items-center gap-4">
                <span className="text-2xl">{b.icon}</span>
                <span className="font-body font-semibold text-white text-lg">
                  {b.label}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right — badge */}
        <div className="shrink-0 flex flex-col items-center">
          <div className="w-48 h-48 rounded-full border-4 border-gold bg-green-deep/80 flex flex-col items-center justify-center text-center p-6 shadow-2xl">
            <span className="text-4xl mb-2">🇿🇦</span>
            <p className="font-heading font-bold text-white text-sm leading-tight tracking-wide">
              MADE IN
              <br />
              SOUTH AFRICA
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
