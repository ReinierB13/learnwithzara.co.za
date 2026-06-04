import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const TOGETHER_ITEMS = [
  "Learn new skills",
  "Solve problems",
  "Read exciting stories",
  "Build confidence",
  "Have fun along the way",
];

export default function ZaraStoryPage() {
  return (
    <>
      <Header />
      <main className="bg-cream">
        <section className="px-6 pb-20 pt-32 md:pt-36">
          <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="flex justify-center lg:justify-start">
              <div className="rounded-3xl bg-beige px-8 pt-8 shadow-md">
                <Image
                  src="/images/zara.png"
                  alt="Zara the bat-eared fox mascot"
                  width={320}
                  height={480}
                  className="object-contain drop-shadow-xl"
                  priority
                />
              </div>
            </div>

            <article className="rounded-3xl bg-white p-8 shadow-md md:p-12">
              <Link
                href="/#about"
                className="mb-6 inline-flex text-sm font-semibold text-orange transition-colors hover:text-[#c94f03]"
              >
                Back to Meet Zara
              </Link>
              <h1 className="font-heading text-4xl font-bold leading-tight text-green-deep md:text-5xl">
                Hello! My name is Zara.
              </h1>

              <div className="mt-6 flex flex-col gap-5 font-body text-base leading-relaxed text-text-muted md:text-lg">
                <p>
                  I am a curious bat-eared fox who lives in the African bush.
                </p>
                <p>
                  Every day I explore, ask questions, and learn something new. I
                  love solving puzzles, discovering patterns, counting things,
                  reading stories, and helping my friends when they get stuck.
                </p>
                <p>
                  When I was little, there were many things I didn&apos;t know.
                  Sometimes I made mistakes. Sometimes I got answers wrong. But
                  I learned that every mistake is a chance to learn something
                  new.
                </p>
                <p className="font-heading text-2xl font-bold text-green-deep">
                  That&apos;s why I&apos;m here.
                </p>
                <p>
                  Whenever you open a Learn With Zara workbook, I&apos;ll be
                  right beside you. I&apos;ll help you think, practise, explore,
                  and discover just how clever you can be.
                </p>
              </div>

              <div className="mt-8 rounded-2xl bg-cream p-6">
                <h2 className="font-heading text-2xl font-bold text-green-deep">
                  Together we&apos;ll:
                </h2>
                <ul className="mt-4 grid gap-3 font-body text-text-dark sm:grid-cols-2">
                  {TOGETHER_ITEMS.map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <span className="h-2.5 w-2.5 rounded-full bg-gold" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 flex flex-col gap-4 font-body text-base leading-relaxed text-text-muted md:text-lg">
                <p className="font-heading text-2xl font-bold text-green-deep">
                  Remember:
                </p>
                <p>You don&apos;t have to know everything today.</p>
                <p>You only have to keep learning.</p>
                <p>
                  So grab your pencil, take a deep breath, and let&apos;s begin
                  our adventure together!
                </p>
                <p className="font-heading text-2xl font-bold text-orange">
                  Your friend,
                  <br />
                  Zara
                </p>
              </div>
            </article>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
