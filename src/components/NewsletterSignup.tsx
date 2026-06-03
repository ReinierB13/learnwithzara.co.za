"use client";

import { useState } from "react";
import Image from "next/image";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setEmail("");
  }

  return (
    <section className="relative py-16 px-6 overflow-hidden bg-orange">
      {/* Background landscape at low opacity */}
      <Image
        src="/images/backgrounds/newsletter.png"
        alt=""
        fill
        className="object-cover object-center opacity-10"
        aria-hidden="true"
      />

      {/* Acacia silhouettes — SVG */}
      <svg
        className="absolute bottom-0 left-0 opacity-15 pointer-events-none"
        width="220"
        height="160"
        viewBox="0 0 220 160"
        fill="#1F2D1F"
        aria-hidden="true"
      >
        {/* Tree trunk left */}
        <rect x="40" y="90" width="8" height="70" />
        {/* Tree canopy left */}
        <ellipse cx="44" cy="85" rx="38" ry="22" />
        {/* Tree trunk right */}
        <rect x="160" y="110" width="6" height="50" />
        {/* Tree canopy right */}
        <ellipse cx="163" cy="105" rx="28" ry="16" />
      </svg>
      <svg
        className="absolute bottom-0 right-0 opacity-15 pointer-events-none"
        width="220"
        height="160"
        viewBox="0 0 220 160"
        fill="#1F2D1F"
        aria-hidden="true"
      >
        <rect x="172" y="90" width="8" height="70" />
        <ellipse cx="176" cy="85" rx="38" ry="22" />
        <rect x="50" y="110" width="6" height="50" />
        <ellipse cx="53" cy="105" rx="28" ry="16" />
      </svg>

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        <h2 className="font-heading font-bold text-3xl lg:text-4xl text-white mb-2">
          STAY UPDATED
        </h2>
        <p className="font-body text-white/90 text-base mb-8">
          Be the first to know about new products, special offers and helpful tips.
        </p>

        {submitted ? (
          <p className="font-body font-semibold text-white text-lg bg-white/20 rounded-full px-8 py-4 inline-block">
            🦊 Thanks! We&apos;ll be in touch soon.
          </p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="flex-1 px-5 py-3 rounded-full bg-cream text-text-dark font-body text-sm placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-green-deep"
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-full bg-green-deep text-white font-body font-semibold text-sm hover:bg-[#2a4d2f] transition-colors shrink-0"
            >
              Subscribe
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
