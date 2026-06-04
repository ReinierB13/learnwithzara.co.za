"use client";

import { useState } from "react";
import Image from "next/image";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const body = await response.json();

      if (!response.ok) {
        throw new Error(body.error || "Subscription failed.");
      }

      setSubmitted(true);
      setEmail("");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "We could not save your email right now.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="contact" className="relative overflow-hidden bg-orange px-6 py-4">
      <Image
        src="/images/backgrounds/newsletter.png"
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-center opacity-25 mix-blend-multiply"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto flex max-w-[864px] flex-col items-center gap-5 md:flex-row">
        <div className="flex flex-1 items-center gap-4 text-white">
          <svg
            viewBox="0 0 40 40"
            fill="none"
            className="h-8 w-8 shrink-0"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="6" y="10" width="28" height="20" rx="2" />
            <path d="m7 12 13 10 13-10" />
          </svg>
          <div>
            <h2 className="font-heading text-[22px] font-bold leading-none tracking-wide text-white">
              STAY UPDATED
            </h2>
            <p className="mt-1 max-w-[360px] font-body text-[13px] font-bold leading-[1.35] text-white">
              Be the first to know about new products, special offers and
              helpful tips.
            </p>
          </div>
        </div>

        {submitted ? (
          <p className="inline-block rounded-full bg-white/20 px-8 py-4 font-body text-base font-extrabold text-white">
            Thanks! We&apos;ll be in touch soon.
          </p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex w-full max-w-[450px] flex-col gap-2"
          >
            <div className="flex overflow-hidden rounded-full bg-white shadow-[0_8px_18px_rgba(86,41,8,0.16)]">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="min-w-0 flex-1 bg-white px-7 py-4 font-body text-[13px] font-semibold text-text-dark placeholder:text-text-muted focus:outline-none"
              />
              <button
                type="submit"
                disabled={submitting}
                className="shrink-0 rounded-full bg-green-deep px-8 py-4 font-body text-[14px] font-extrabold text-white transition-colors hover:bg-[#1b3d23] disabled:cursor-not-allowed disabled:bg-green-soft"
              >
                {submitting ? "Saving" : "Subscribe"}
              </button>
            </div>
            {error && (
              <p className="px-7 font-body text-[12px] font-extrabold text-white">
                {error}
              </p>
            )}
          </form>
        )}
      </div>
    </section>
  );
}
