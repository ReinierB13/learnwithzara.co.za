"use client";

import { useEffect, useState } from "react";
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-cream/95 backdrop-blur-sm shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span className="text-2xl">🦊</span>
          <span className="font-heading font-bold text-xl leading-none">
            <span className="text-orange">ZARA</span>
            <br />
            <span className="text-green-deep">MATHS</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm font-body font-semibold text-text-dark hover:text-orange transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          <button
            aria-label="Cart"
            className="hidden md:flex text-text-dark hover:text-orange transition-colors text-xl"
          >
            🛒
          </button>
          <Link
            href="#contact"
            className="hidden md:inline-flex items-center px-4 py-2 rounded-full bg-orange text-white text-sm font-body font-semibold hover:bg-[#c94f03] transition-colors"
          >
            My Account
          </Link>

          {/* Hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-1"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            <span
              className={`block w-6 h-0.5 bg-text-dark transition-transform ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
            />
            <span
              className={`block w-6 h-0.5 bg-text-dark transition-opacity ${menuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block w-6 h-0.5 bg-text-dark transition-transform ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-cream/95 backdrop-blur-sm border-t border-beige px-6 py-4 flex flex-col gap-4">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm font-body font-semibold text-text-dark hover:text-orange transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="#contact"
            className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-orange text-white text-sm font-body font-semibold hover:bg-[#c94f03] transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            My Account
          </Link>
        </div>
      )}
    </header>
  );
}
