"use client";

import type { FormEvent } from "react";
import { useEffect, useId, useState } from "react";

const SUPPORT_EMAIL = "learnwithzara@outlook.com";

export default function ContactModal() {
  const [open, setOpen] = useState(false);
  const nameId = useId();
  const emailId = useId();
  const messageId = useId();

  useEffect(() => {
    const openContact = () => setOpen(true);
    window.addEventListener("learn-with-zara-contact", openContact);
    return () => window.removeEventListener("learn-with-zara-contact", openContact);
  }, []);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const message = String(formData.get("message") || "").trim();
    const subject = `Learn With Zara contact from ${name}`;
    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      "",
      "Message:",
      message,
    ].join("\n");

    window.location.href = `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
    setOpen(false);
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-text-dark/70 px-4 py-6 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-title"
      onMouseDown={() => setOpen(false)}
    >
      <div
        className="w-full max-w-[520px] rounded-[8px] bg-cream p-6 shadow-[0_22px_60px_rgba(30,45,32,0.32)]"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2
              id="contact-modal-title"
              className="font-heading text-[30px] font-bold leading-tight text-green-deep"
            >
              Contact Learn With Zara
            </h2>
            <p className="mt-2 font-body text-sm font-bold leading-6 text-text-muted">
              Send your question to {SUPPORT_EMAIL}.
            </p>
          </div>
          <button
            type="button"
            aria-label="Close contact form"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-beige bg-white font-body text-2xl font-bold leading-none text-green-deep transition-colors hover:border-orange hover:text-orange"
            onClick={() => setOpen(false)}
          >
            x
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
          <label
            htmlFor={nameId}
            className="flex flex-col gap-1.5 font-body text-sm font-extrabold text-text-dark"
          >
            Name
            <input
              id={nameId}
              name="name"
              type="text"
              required
              autoComplete="name"
              className="min-h-12 rounded-[8px] border border-beige bg-white px-4 py-3 font-body text-sm font-semibold text-text-dark outline-none transition-colors focus:border-orange"
            />
          </label>

          <label
            htmlFor={emailId}
            className="flex flex-col gap-1.5 font-body text-sm font-extrabold text-text-dark"
          >
            Email address
            <input
              id={emailId}
              name="email"
              type="email"
              required
              autoComplete="email"
              className="min-h-12 rounded-[8px] border border-beige bg-white px-4 py-3 font-body text-sm font-semibold text-text-dark outline-none transition-colors focus:border-orange"
            />
          </label>

          <label
            htmlFor={messageId}
            className="flex flex-col gap-1.5 font-body text-sm font-extrabold text-text-dark"
          >
            Message
            <textarea
              id={messageId}
              name="message"
              required
              rows={5}
              className="min-h-[140px] resize-y rounded-[8px] border border-beige bg-white px-4 py-3 font-body text-sm font-semibold text-text-dark outline-none transition-colors focus:border-orange"
            />
          </label>

          <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:justify-end">
            <button
              type="button"
              className="min-h-12 rounded-full border border-beige bg-white px-6 py-3 font-body text-sm font-extrabold text-green-deep transition-colors hover:border-orange hover:text-orange"
              onClick={() => setOpen(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="min-h-12 rounded-full bg-orange px-7 py-3 font-body text-sm font-extrabold text-white shadow-[0_10px_20px_rgba(233,91,11,0.22)] transition-colors hover:bg-[#cf4f08]"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
