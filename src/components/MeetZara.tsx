import Image from "next/image";
import Link from "next/link";

export default function MeetZara() {
  return (
    <section id="about" className="bg-cream px-6 py-4">
      <div className="mx-auto max-w-[864px]">
        <div className="grid min-h-[204px] grid-cols-1 items-center overflow-hidden rounded-[18px] bg-beige md:grid-cols-[240px_1fr_205px]">
          <div className="relative flex h-full min-h-[204px] items-end justify-center">
            <div className="absolute bottom-0 left-7 h-28 w-20 rounded-t-full border-l-2 border-green-soft opacity-50" />
            <Image
              src="/images/zara-cropped.png"
              alt="Zara the bat-eared fox mascot"
              width={210}
              height={280}
              className="relative z-10 mb-[-6px] h-[205px] w-auto object-contain drop-shadow-[0_10px_14px_rgba(72,45,14,0.20)]"
              style={{ width: "auto" }}
            />
          </div>

          <div className="flex flex-col items-center px-8 py-4 text-center md:items-start md:px-0 md:text-left">
            <h2 className="font-heading text-[25px] font-bold tracking-wide text-green-deep">
              MEET ZARA
            </h2>
            <div className="mt-3 h-[3px] w-14 rounded-full bg-orange" />
            <p className="mt-3 max-w-[450px] font-body text-[14px] font-semibold leading-[1.4] text-text-dark">
              Zara is a curious bat-eared fox from the African bush who loves
              solving problems, asking questions, and helping children learn
              new things. She&apos;s here to guide you every step of the way on
              your learning adventure.
            </p>
            <Link
              href="/zara-story"
              className="mt-3 inline-flex items-center gap-3 rounded-full bg-green-deep px-6 py-3 font-body text-[14px] font-extrabold text-white transition-all hover:bg-[#1b3d23] hover:shadow-lg"
            >
              Read Zara&apos;s Story
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

          <div className="hidden select-none items-center justify-center md:flex">
            <svg viewBox="0 0 230 180" className="h-[138px] w-[190px]">
              <g fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path d="M62 32l8 17 19-2-14 13 6 18-17-9-16 11 4-19-15-11 19-2 6-16Z" stroke="#E95B0B" strokeWidth="2.8" />
                <path d="M160 54l8 15 17-2-12 12 5 16-15-8-14 10 3-17-13-10 17-2 4-14Z" stroke="#86A06D" strokeWidth="2.4" />
                <path d="M50 114l17 54 21-10-31-47-7 3Z" stroke="#E95B0B" strokeWidth="2.4" />
                <path d="M68 166l-13 5" stroke="#E95B0B" strokeWidth="2.4" />
                <path d="M142 123c22-12 40-9 59 8l-5 35c-18-16-36-20-59-8l5-35Z" stroke="#86A06D" strokeWidth="2.4" />
                <path d="M169 122v37M151 136c5-3 10-4 15-3M150 145c5-3 10-4 15-3M177 134c6 0 11 2 16 6M176 143c6 0 11 2 16 6" stroke="#86A06D" strokeWidth="2" />
              </g>
              <text
                x="96"
                y="101"
                fill="#58764B"
                fontSize="30"
                fontFamily="var(--font-fredoka)"
                fontWeight="600"
                transform="rotate(-11 96 101)"
              >
                2+2=4
              </text>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
