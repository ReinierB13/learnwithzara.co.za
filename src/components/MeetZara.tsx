import Image from "next/image";
import Link from "next/link";

export default function MeetZara() {
  return (
    <section id="about" className="bg-cream py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="bg-beige rounded-3xl p-8 md:p-12 grid grid-cols-1 md:grid-cols-3 gap-8 items-center shadow-md">
          {/* Left — fox */}
          <div className="flex justify-center md:justify-start">
            <Image
              src="/images/zara.png"
              alt="Zara the bat-eared fox waving"
              width={220}
              height={330}
              className="object-contain drop-shadow-xl"
            />
          </div>

          {/* Middle — text */}
          <div className="text-center md:text-left flex flex-col items-center md:items-start gap-4">
            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-green-deep">
              MEET ZARA
            </h2>
            <p className="font-body text-text-muted text-base leading-relaxed">
              Zara is a curious bat-eared fox from the African bush who loves
              solving problems and learning new things. She&apos;s here to help
              you every step of the way!
            </p>
            <Link
              href="#about"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-orange text-white font-body font-semibold text-sm hover:bg-[#c94f03] hover:shadow-lg transition-all"
            >
              Read Zara&apos;s Story →
            </Link>
          </div>

          {/* Right — doodles */}
          <div className="hidden md:flex flex-col items-center justify-center gap-4 select-none">
            <div className="flex gap-6 text-3xl">
              <span className="rotate-12 inline-block">⭐</span>
              <span className="-rotate-6 inline-block text-4xl">✏️</span>
            </div>
            <p
              className="font-heading font-bold text-2xl text-gold -rotate-3"
              aria-hidden="true"
            >
              2 + 2 = 4
            </p>
            <div className="flex gap-6 text-3xl">
              <span className="rotate-6 inline-block">📖</span>
              <span className="-rotate-12 inline-block text-2xl text-orange font-heading font-bold">
                ★
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
