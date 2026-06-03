import Link from "next/link";

const QUICK_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Zara", href: "#about" },
  { label: "Our Products", href: "#products" },
  { label: "For Parents", href: "#parents" },
  { label: "Contact", href: "#contact" },
];

const HELP_LINKS = [
  { label: "FAQs", href: "#" },
  { label: "Shipping & Delivery", href: "#" },
  { label: "Refund Policy", href: "#" },
  { label: "Terms & Conditions", href: "#" },
];

export default function Footer() {
  return (
    <footer className="bg-green-deep text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🦊</span>
              <span className="font-heading font-bold text-lg leading-none">
                <span className="text-[#F4B942]">ZARA</span>
                <br />
                <span className="text-white">MATHS</span>
              </span>
            </div>
            <p className="font-body text-white/70 text-sm leading-relaxed max-w-xs">
              Learning made simple.
              <br />
              CAPS-aligned resources for South African primary school learners.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-bold text-sm uppercase tracking-widest text-white/60 mb-4">
              Quick Links
            </h4>
            <ul className="flex flex-col gap-2">
              {QUICK_LINKS.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="font-body text-white/80 text-sm hover:text-white hover:underline transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="font-heading font-bold text-sm uppercase tracking-widest text-white/60 mb-4">
              Help
            </h4>
            <ul className="flex flex-col gap-2">
              {HELP_LINKS.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="font-body text-white/80 text-sm hover:text-white hover:underline transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-heading font-bold text-sm uppercase tracking-widest text-white/60 mb-4">
              Follow Us
            </h4>
            <div className="flex gap-3">
              {/* Facebook */}
              <a
                href="#"
                aria-label="Facebook"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                </svg>
              </a>
              {/* Instagram */}
              <a
                href="#"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/20">
        <div className="max-w-7xl mx-auto px-6 py-4 text-center">
          <p className="font-body text-white/50 text-xs">
            © 2026 Zara Maths. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
