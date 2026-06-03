import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col lg:flex-row overflow-hidden">
      {/* Left panel — text */}
      <div className="relative z-10 flex flex-col justify-center px-8 pt-32 pb-16 lg:pt-28 lg:pb-20 lg:pl-16 lg:pr-8 w-full lg:w-[42%] bg-cream">
        {/* Gradient fade into right panel on desktop */}
        <div className="hidden lg:block absolute inset-y-0 right-0 w-24 bg-gradient-to-r from-cream to-transparent pointer-events-none" />

        <p className="font-body text-sm font-semibold tracking-widest text-green-soft uppercase mb-2">
          South African Maths Resources
        </p>

        <h1 className="font-heading leading-none mb-1">
          <span className="block text-[5.5rem] lg:text-[7rem] font-bold text-orange">
            ZARA
          </span>
          <span className="block text-[5.5rem] lg:text-[7rem] font-bold text-green-deep">
            MATHS
          </span>
        </h1>

        <p className="font-heading text-2xl font-semibold text-text-dark mb-1">
          Learning made simple.
        </p>
        {/* Orange underline accent */}
        <div className="w-20 h-1 rounded-full bg-orange mb-6" />

        <p className="font-body text-text-muted text-base leading-relaxed mb-8 max-w-sm">
          CAPS-aligned workbooks, tests and exam preparation packs for Grades R–7.
          <br />
          Created by experienced South African teachers.
        </p>

        <Link
          href="#products"
          className="inline-flex items-center gap-2 self-start px-7 py-3.5 rounded-full bg-orange text-white font-body font-semibold text-base hover:bg-[#c94f03] hover:shadow-lg transition-all"
        >
          Explore Our Products
          <span>→</span>
        </Link>
      </div>

      {/* Right panel — savanna background + fox */}
      <div className="relative flex-1 min-h-[50vh] lg:min-h-0">
        <Image
          src="/images/backgrounds/hero.png"
          alt="African Kalahari savanna landscape"
          fill
          className="object-cover object-center"
          priority
        />
        {/* Left-edge gradient blend with cream panel */}
        <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-cream to-transparent" />

        {/* Zara fox mascot */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 lg:left-1/4 lg:translate-x-0 w-56 md:w-72 lg:w-80 xl:w-96">
          <Image
            src="/images/zara.png"
            alt="Zara the bat-eared fox mascot"
            width={500}
            height={750}
            className="object-contain drop-shadow-2xl"
            priority
          />
        </div>
      </div>
    </section>
  );
}
