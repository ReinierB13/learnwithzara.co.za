import Image from "next/image";

const BULLETS = [
  { type: "check", label: "CAPS aligned" },
  { type: "teachers", label: "Created by experienced teachers" },
  { type: "language", label: "Afrikaans & English" },
  { type: "print", label: "Printable at home" },
];

function BulletIcon({ type }: { type: string }) {
  if (type === "teachers") {
    return (
      <svg
        viewBox="0 0 40 40"
        fill="none"
        className="h-9 w-9"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="15" cy="14" r="5" />
        <circle cx="26" cy="16" r="4" />
        <path d="M6 33c1.5-7 5.5-10 10-10s8.5 3 10 10" />
        <path d="M23 25c4.5.5 8 3 9 8" />
      </svg>
    );
  }

  if (type === "language") {
    return (
      <svg
        viewBox="0 0 40 40"
        fill="none"
        className="h-9 w-9"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="6" y="9" width="18" height="18" rx="3" />
        <rect x="16" y="15" width="18" height="18" rx="3" />
        <path d="M12 22l4-9 4 9M14 18h4M23 25h7M26 22c0 4 1 6 5 8M31 22c-.5 3-2 5-5 8" />
      </svg>
    );
  }

  if (type === "print") {
    return (
      <svg
        viewBox="0 0 40 40"
        fill="none"
        className="h-9 w-9"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M11 15V7h18v8M12 29H8V17h24v12h-4" />
        <path d="M13 24h14v10H13zM28 21h.01" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      className="h-9 w-9"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="20" cy="20" r="15" />
      <path d="m13 20 5 5 10-12" />
    </svg>
  );
}

function WavingSouthAfricanFlag() {
  return (
    <svg
      viewBox="0 0 120 80"
      className="absolute left-1/2 top-[36px] h-[46px] w-[72px] -translate-x-1/2 drop-shadow-[0_3px_4px_rgba(36,76,45,0.24)]"
      aria-hidden="true"
    >
      <defs>
        <clipPath id="waving-sa-flag">
          <path d="M7 10C25 1 42 16 60 9C78 2 96 7 113 13V67C95 60 79 51 60 60C41 69 25 54 7 64Z" />
        </clipPath>
        <linearGradient id="flag-wave-shadow" x1="7" x2="113" y1="0" y2="0">
          <stop offset="0" stopColor="#000" stopOpacity="0.08" />
          <stop offset="0.28" stopColor="#fff" stopOpacity="0.18" />
          <stop offset="0.55" stopColor="#000" stopOpacity="0.09" />
          <stop offset="0.82" stopColor="#fff" stopOpacity="0.16" />
          <stop offset="1" stopColor="#000" stopOpacity="0.08" />
        </linearGradient>
      </defs>
      <g clipPath="url(#waving-sa-flag)">
        <path d="M0 0h120v40H0z" fill="#DE3831" />
        <path d="M0 40h120v40H0z" fill="#002395" />
        <path
          d="M0 0 48 40 120 40M0 80 48 40"
          fill="none"
          stroke="#fff"
          strokeWidth="28"
          strokeLinejoin="miter"
        />
        <path
          d="M0 0 48 40 120 40M0 80 48 40"
          fill="none"
          stroke="#007A4D"
          strokeWidth="16"
          strokeLinejoin="miter"
        />
        <path
          d="M0 0 42 40 0 80"
          fill="none"
          stroke="#FFB612"
          strokeWidth="18"
          strokeLinejoin="miter"
        />
        <path d="M0 10 38 40 0 70Z" fill="#000" />
        <path d="M0 0h120v80H0z" fill="url(#flag-wave-shadow)" />
      </g>
      <path
        d="M7 10C25 1 42 16 60 9C78 2 96 7 113 13V67C95 60 79 51 60 60C41 69 25 54 7 64Z"
        fill="none"
        stroke="#244C2D"
        strokeWidth="2.2"
      />
    </svg>
  );
}

export default function TrustSection() {
  return (
    <section id="parents" className="bg-cream px-6 py-0">
      <div className="relative mx-auto min-h-[250px] max-w-[864px] overflow-hidden rounded-[18px]">
        <Image
          src="/images/backgrounds/trust.png"
          alt=""
          fill
          sizes="(min-width: 1080px) 1080px, calc(100vw - 48px)"
          className="object-cover object-center"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,248,238,0.97)_0%,rgba(255,248,238,0.88)_33%,rgba(255,248,238,0.32)_52%,rgba(255,248,238,0)_78%)]" />
        <div className="relative z-10 flex min-h-[250px] flex-col justify-center px-11 py-4 md:flex-row md:items-center">
          <div className="w-full md:w-[46%]">
            <h2 className="font-heading text-[27px] font-bold leading-[1.12] tracking-wide text-green-deep">
              WHY PARENTS
              <br />
              TRUST LEARN WITH ZARA
            </h2>
            <div className="mt-3 h-[3px] w-14 rounded-full bg-orange" />
            <ul className="mt-3 flex flex-col gap-2.5">
              {BULLETS.map((bullet) => (
                <li
                  key={bullet.label}
                  className="flex items-center gap-5 text-orange [&_svg]:h-7 [&_svg]:w-7"
                >
                  <BulletIcon type={bullet.type} />
                  <span className="font-body text-[15px] font-extrabold text-text-dark">
                    {bullet.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative hidden flex-1 self-stretch md:block">
            <div className="absolute bottom-[-16px] right-[-4px] flex h-[144px] w-[144px] items-center justify-center rounded-full border-[6px] border-[#efe0ba] bg-[#fff8ee] shadow-[0_10px_25px_rgba(56,35,8,0.20)]">
              <div className="relative h-[112px] w-[112px] rounded-full border-2 border-green-soft bg-[#fffdf6]">
                <span className="absolute left-1/2 top-2.5 -translate-x-1/2 whitespace-nowrap font-heading text-[14px] font-bold tracking-widest text-green-soft">
                  MADE IN
                </span>
                <WavingSouthAfricanFlag />
                <span className="absolute bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap text-center font-heading text-[12px] font-bold leading-none tracking-wider text-green-soft">
                  SOUTH
                  <br />
                  AFRICA
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
