"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Zara", href: "#about" },
  { label: "Our Products", href: "#products" },
  { label: "For Parents", href: "#parents" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-cream/92 shadow-sm backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1180px] items-center justify-between px-8 py-5">
        <Link href="/" aria-label="Learn with Zara home" className="flex shrink-0 items-center">
          <span className="relative flex h-[70px] w-[70px] items-center justify-center overflow-hidden rounded-full bg-[#fff6e7] shadow-[0_6px_18px_rgba(61,38,11,0.12)]">
            <Image
              src="/images/zara-cropped.png"
              alt=""
              width={72}
              height={96}
              className="absolute top-[-9px] h-[112px] w-auto max-w-none object-contain"
              style={{ width: "auto" }}
              priority
            />
          </span>
        </Link>

        <nav className="hidden items-center gap-10 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`relative font-body text-[15px] font-extrabold text-text-dark transition-colors hover:text-orange ${
                link.label === "Home"
                  ? "after:absolute after:-bottom-2 after:left-0 after:right-0 after:h-0.5 after:bg-orange"
                  : ""
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-5">
          <button
            aria-label="Cart"
            className="relative hidden h-10 w-10 items-center justify-center text-green-deep transition-colors hover:text-orange md:flex"
          >
            <svg
              viewBox="0 0 32 32"
              fill="none"
              className="h-8 w-8"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 6h3l3 15h13l3-10H11" />
              <circle cx="13" cy="26" r="2" />
              <circle cx="24" cy="26" r="2" />
            </svg>
            <span className="absolute -right-1 top-0 flex h-5 w-5 items-center justify-center rounded-full bg-orange text-[10px] font-extrabold text-white">
              0
            </span>
          </button>
          <Link
            href="#contact"
            className="hidden items-center rounded-full bg-orange px-8 py-4 font-body text-[15px] font-extrabold text-white shadow-[0_10px_20px_rgba(233,91,11,0.22)] transition-colors hover:bg-[#cf4f08] md:inline-flex"
          >
            My Account
          </Link>

          <button
            className="flex flex-col gap-1.5 p-1 md:hidden"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label="Toggle menu"
          >
            <span
              className={`block h-0.5 w-6 bg-text-dark transition-transform ${menuOpen ? "translate-y-2 rotate-45" : ""}`}
            />
            <span
              className={`block h-0.5 w-6 bg-text-dark transition-opacity ${menuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block h-0.5 w-6 bg-text-dark transition-transform ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`}
            />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="flex flex-col gap-4 border-t border-beige bg-cream/95 px-6 py-4 backdrop-blur-sm md:hidden">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="font-body text-sm font-extrabold text-text-dark transition-colors hover:text-orange"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="#contact"
            className="inline-flex items-center justify-center rounded-full bg-orange px-4 py-2 font-body text-sm font-extrabold text-white transition-colors hover:bg-[#c94f03]"
            onClick={() => setMenuOpen(false)}
          >
            My Account
          </Link>
        </div>
      )}
    </header>
  );
}
