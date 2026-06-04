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
        body: JSON.stringify({ email, source: "calendar_download" }),
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
    <section
      id="contact"
      className="relative overflow-hidden bg-orange px-6 py-8 md:py-10"
    >
      <Image
        src="/images/backgrounds/newsletter.png"
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-center opacity-25 mix-blend-multiply"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto grid max-w-[864px] grid-cols-1 items-center gap-7 md:grid-cols-[285px_1fr]">
        <div className="mx-auto w-full max-w-[255px] md:max-w-none">
          <div className="relative aspect-[1054/1492] overflow-hidden rounded-[12px] border-[6px] border-white bg-white shadow-[0_18px_36px_rgba(86,41,8,0.26)]">
            <Image
              src="/Calender_Free_download_QR_code.png"
              alt="2026 South African public school calendar printable"
              fill
              sizes="(min-width: 768px) 285px, 255px"
              className="object-cover object-top"
            />
          </div>
        </div>

        <div className="text-center text-white md:text-left">
          <h2 className="font-heading text-[34px] font-bold leading-[0.98] tracking-wide text-white md:text-[42px]">
            FREE 2026 SCHOOL CALENDAR
          </h2>
          <div className="mx-auto mt-4 h-[3px] w-20 rounded-full bg-white md:mx-0" />
          <p className="mx-auto mt-5 max-w-[460px] font-body text-[16px] font-extrabold leading-[1.45] text-white md:mx-0">
            Sign up for the Learn with Zara newsletter and download the printable
            South African public school calendar for free.
          </p>
          <p className="mx-auto mt-2 max-w-[430px] font-body text-[13px] font-bold leading-[1.4] text-white/95 md:mx-0">
            Includes term dates, school holidays, public holidays and space for
            parent notes.
          </p>

          {submitted ? (
            <div className="mt-6 flex flex-col items-center gap-3 md:items-start">
              <p className="font-body text-[15px] font-extrabold text-white">
                Thanks! Your free calendar is ready.
              </p>
              <a
                href="/Calender_Free_download_QR_code.png"
                download
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-green-deep px-7 py-3 font-body text-[14px] font-extrabold text-white shadow-[0_10px_20px_rgba(36,76,45,0.24)] transition-colors hover:bg-[#1b3d23]"
              >
                Download Calendar
              </a>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="mx-auto mt-6 flex w-full max-w-[470px] flex-col gap-2 md:mx-0"
            >
              <div className="flex flex-col overflow-hidden rounded-[24px] bg-white shadow-[0_8px_18px_rgba(86,41,8,0.16)] sm:flex-row sm:rounded-full">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="min-h-12 min-w-0 flex-1 bg-white px-6 py-3 font-body text-[13px] font-semibold text-text-dark placeholder:text-text-muted focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={submitting}
                  className="min-h-12 shrink-0 bg-green-deep px-7 py-3 font-body text-[14px] font-extrabold text-white transition-colors hover:bg-[#1b3d23] disabled:cursor-not-allowed disabled:bg-green-soft sm:rounded-full"
                >
                  {submitting ? "Saving" : "Get Free Calendar"}
                </button>
              </div>
              {error && (
                <p className="px-4 font-body text-[12px] font-extrabold text-white">
                  {error}
                </p>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
