"use client";

import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  console.error("Admin route failed", error);

  return (
    <>
      <Header />
      <main className="bg-cream px-6 pb-20 pt-32 md:pt-36">
        <section className="mx-auto max-w-[760px] rounded-[18px] border border-[#efe2cf] bg-white/82 px-7 py-7 shadow-[0_8px_22px_rgba(83,55,24,0.10)]">
          <p className="font-body text-[14px] font-extrabold text-orange">
            Admin
          </p>
          <h1 className="mt-2 font-heading text-[42px] font-bold text-green-deep">
            Something Went Wrong
          </h1>
          <p className="mt-3 font-body text-[15px] font-bold leading-[1.5] text-text-dark">
            The admin area hit a server issue. Try again, or go back to your
            account while we check the logs.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={reset}
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-orange px-7 py-3 font-body text-[14px] font-extrabold text-white"
            >
              Try again
            </button>
            <Link
              href="/account"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#efe2cf] px-7 py-3 font-body text-[14px] font-extrabold text-green-deep"
            >
              Back to My Account
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
