import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProductCards from "@/components/ProductCards";
import TrustSection from "@/components/TrustSection";
import MeetZara from "@/components/MeetZara";
import NewsletterSignup from "@/components/NewsletterSignup";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <ProductCards />
      <TrustSection />
      <MeetZara />
      <NewsletterSignup />
      <Footer />
    </>
  );
}
