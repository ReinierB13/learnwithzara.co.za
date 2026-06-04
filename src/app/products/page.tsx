import Link from "next/link";
import Header from "@/components/Header";
import NewsletterSignup from "@/components/NewsletterSignup";
import Footer from "@/components/Footer";

export default function ProductsPage() {
  return (
    <>
      <Header />
      <main className="bg-cream">
        <section className="px-6 pb-14 pt-32 md:pt-36">
          <div className="mx-auto max-w-[864px] text-center">
            <h1 className="font-heading text-[42px] font-bold leading-[0.98] tracking-wide text-green-deep md:text-[56px]">
              Our learning products are coming soon
            </h1>
            <div className="mx-auto mt-5 h-[3px] w-20 rounded-full bg-orange" />
            <p className="mx-auto mt-6 max-w-[680px] font-body text-[18px] font-extrabold leading-[1.45] text-text-dark">
              We are working hard on bringing our workbooks, test packs and exam
              preparation resources to market.
            </p>
            <p className="mx-auto mt-3 max-w-[640px] font-body text-[15px] font-bold leading-[1.55] text-text-muted">
              Check back soon. In the meantime, sign up for our newsletter and
              download our awesome 2026 and 2027 South African school calendars.
            </p>
            <Link
              href="#newsletter"
              className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-orange px-8 py-3 font-body text-[15px] font-extrabold text-white shadow-[0_10px_20px_rgba(233,91,11,0.22)] transition-colors hover:bg-[#cf4f08]"
            >
              Get the free calendars
            </Link>
          </div>
        </section>

        <div id="newsletter">
          <NewsletterSignup />
        </div>
      </main>
      <Footer />
    </>
  );
}
