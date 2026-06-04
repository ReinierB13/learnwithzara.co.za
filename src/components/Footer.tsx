import Image from "next/image";
import Link from "next/link";

const QUICK_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Zara", href: "/#about" },
  { label: "Our Products", href: "/#products" },
  { label: "For Parents", href: "/parents" },
  { label: "Contact", href: "/#contact" },
];

const HELP_LINKS = [
  { label: "FAQs", href: "/faqs" },
  { label: "Shipping & Delivery", href: "/shipping-delivery" },
  { label: "Refund Policy", href: "/refund-policy" },
  { label: "Terms & Conditions", href: "#" },
];

export default function Footer() {
  return (
    <footer className="relative bg-[radial-gradient(circle_at_50%_0%,#2d6735_0%,#244C2D_42%,#193B22_100%)] text-white md:h-[126px] md:overflow-hidden">
      <div className="mx-auto max-w-[864px] px-0 py-4">
        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 md:grid-cols-[210px_1fr_118px_152px_112px] md:items-start md:gap-5">
          <div className="flex items-center gap-3">
            <span className="relative flex h-[58px] w-[58px] items-center justify-center overflow-hidden rounded-full bg-[#fff6e7]">
              <Image
                src="/images/zara-cropped.png"
                alt=""
                width={58}
                height={77}
                className="absolute top-[-7px] h-[92px] w-auto max-w-none object-contain"
                style={{ width: "auto" }}
              />
            </span>
            <span className="flex flex-col leading-none">
              <span className="font-heading text-[24px] font-bold text-orange">
                LEARN
              </span>
              <span className="-mt-1 font-heading text-[18px] font-bold text-[#b8c890]">
                WITH ZARA
              </span>
            </span>
          </div>

          <div className="pt-2 font-body text-[11px] font-semibold leading-[1.45] text-white">
            <p>Learning made simple.</p>
            <p>Created by teachers.</p>
            <p>Made for South African learners.</p>
          </div>

          <div>
            <h4 className="mb-1 font-heading text-[11px] font-bold uppercase tracking-wide text-white">
              Quick Links
            </h4>
            <ul className="flex flex-col gap-0.5">
              {QUICK_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="font-body text-[11px] font-semibold text-white/90 transition-colors hover:text-white hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-1 font-heading text-[11px] font-bold uppercase tracking-wide text-white">
              Help
            </h4>
            <ul className="flex flex-col gap-0.5">
              {HELP_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="font-body text-[11px] font-semibold text-white/90 transition-colors hover:text-white hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-3 font-heading text-[11px] font-bold uppercase tracking-wide text-white">
              Follow Us
            </h4>
            <div className="flex gap-3">
              <a
                href="#"
                aria-label="Facebook"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-green-deep transition-colors hover:bg-white"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                </svg>
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-green-deep transition-colors hover:bg-white"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
              </a>
              <a
                href="#"
                aria-label="X"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-green-deep transition-colors hover:bg-white"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                  <path d="M14.1 10.5 21.5 2h-1.8l-6.4 7.4L8.2 2H2.3l7.8 11.3L2.3 22h1.8l6.8-7.8 5.4 7.8h5.9l-8.1-11.5Zm-2.4 2.8-.8-1.1L4.6 3.3h2.9l5 7.1.8 1.1 6.6 9.4H17l-5.3-7.6Z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="pb-3 text-center md:absolute md:bottom-2 md:left-0 md:right-0 md:pb-0">
        <div className="mx-auto max-w-[1080px] px-6">
          <p className="font-body text-[11px] font-semibold text-white/85">
            © 2024 Learn with Zara. All rights reserved. <span className="text-orange">♥</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
