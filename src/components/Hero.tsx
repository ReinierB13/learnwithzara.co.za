import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-[720px] overflow-hidden md:min-h-[548px]">
      <Image
        src="/images/backgrounds/hero.png"
        alt="African Kalahari savanna landscape"
        fill
        sizes="100vw"
        className="object-cover object-center"
        priority
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#fff8ee_0%,rgba(255,248,238,0.96)_44%,rgba(255,248,238,0.42)_72%,rgba(255,248,238,0)_100%)] md:bg-[linear-gradient(90deg,#fff8ee_0%,#fff8ee_18%,rgba(255,248,238,0.92)_29%,rgba(255,248,238,0.42)_42%,rgba(255,248,238,0)_58%)]" />
      <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-cream to-transparent" />

      <div className="relative z-10 mx-auto flex min-h-[720px] max-w-[1180px] items-start px-8 pt-[112px] md:min-h-[548px] md:items-center md:pt-[106px]">
        <div className="w-full max-w-[500px] pb-[230px] md:pb-8">
          <h1 className="font-heading leading-[0.92]">
            <span className="block text-[78px] font-bold tracking-normal text-orange md:text-[82px]">
              LEARN
            </span>
            <span className="block text-[54px] font-bold tracking-normal text-green-soft md:text-[58px]">
              WITH ZARA
            </span>
          </h1>

          <p className="mt-3 font-heading text-[29px] font-semibold italic leading-tight text-green-deep">
            Learning made simple.
          </p>
          <div className="mt-6 h-[3px] w-[104px] rounded-full bg-orange" />

          <p className="mt-8 max-w-[430px] font-body text-[16px] font-semibold leading-[1.55] text-text-dark">
            CAPS-aligned learning resources, practice packs and exam preparation
            for South African school learners.
            <br />
            Created by experienced South African teachers.
          </p>

          <Link
            href="#products"
            className="mt-7 inline-flex items-center gap-3 rounded-full bg-orange px-7 py-4 font-body text-[16px] font-extrabold text-white shadow-[0_12px_22px_rgba(233,91,11,0.24)] transition-all hover:bg-[#cf4f08] hover:shadow-lg"
          >
            Explore Our Products
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="h-5 w-5"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14" />
              <path d="m13 6 6 6-6 6" />
            </svg>
          </Link>
        </div>

        <Image
          src="/images/zara-cropped.png"
          alt="Zara the bat-eared fox mascot"
          width={300}
          height={400}
          className="absolute bottom-[30px] right-[18px] h-[210px] w-auto object-contain drop-shadow-[0_16px_18px_rgba(65,36,12,0.28)] md:bottom-[34px] md:right-[120px] md:h-[320px]"
          style={{ width: "auto" }}
          priority
        />
      </div>
    </section>
  );
}
