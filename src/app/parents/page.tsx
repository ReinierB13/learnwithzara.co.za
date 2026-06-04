import Header from "@/components/Header";
import Footer from "@/components/Footer";

const BELIEFS = [
  "Clear and easy to follow",
  "Age-appropriate and engaging",
  "Practical and useful",
  "Encouraging rather than intimidating",
  "Built on strong educational foundations",
];

export default function ParentsPage() {
  return (
    <>
      <Header />
      <main className="bg-cream">
        <section className="px-6 pb-20 pt-32 md:pt-36">
          <article className="mx-auto max-w-[864px] rounded-[18px] border border-[#efe2cf] bg-white/82 px-7 py-8 shadow-[0_8px_22px_rgba(83,55,24,0.12)] md:px-12 md:py-11">
            <h1 className="font-heading text-[42px] font-bold leading-[0.98] tracking-wide text-green-deep md:text-[56px]">
              A Word to Parents
            </h1>
            <div className="mt-5 h-[3px] w-20 rounded-full bg-orange" />

            <div className="mt-7 flex flex-col gap-5 font-body text-[16px] font-bold leading-[1.6] text-text-dark md:text-[17px]">
              <p>Hello and welcome to Learn With Zara.</p>
              <p>
                As parents, teachers and lifelong learners ourselves, we
                understand that helping children succeed at school can sometimes
                feel overwhelming. Every child learns differently, every family
                has different challenges, and sometimes all a learner needs is a
                little extra support, practice, and encouragement.
              </p>
              <p>That is why Learn With Zara was created.</p>
              <p>
                Our goal is simple: to provide high-quality South African
                learning resources that help children build confidence, develop
                strong foundations, and enjoy learning.
              </p>
              <p>
                Behind Learn With Zara are two experienced South African
                educators with over 80 years of classroom teaching experience.
                Throughout their careers they have taught thousands of learners,
                worked with children of different abilities, and helped
                countless families navigate the challenges of primary school
                education.
              </p>
              <p>
                Every worksheet, workbook, activity and assessment is designed
                with one important question in mind:
              </p>
              <p className="font-heading text-[24px] font-bold leading-[1.25] text-green-deep md:text-[30px]">
                &quot;Will this genuinely help a child learn and
                understand?&quot;
              </p>

              <div className="rounded-[16px] bg-beige px-6 py-5">
                <p className="font-heading text-[24px] font-bold text-green-deep">
                  We believe learning should be:
                </p>
                <ul className="mt-4 flex flex-col gap-3">
                  {BELIEFS.map((belief) => (
                    <li key={belief} className="flex gap-3">
                      <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-orange" />
                      <span>{belief}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <p>
                Our resources are created using a combination of experienced
                teacher knowledge, modern educational methods and carefully
                supervised technology. While technology helps us work more
                efficiently, every resource is guided by real classroom
                experience and a deep understanding of how children learn.
              </p>
              <p>
                At the heart of our project is Zara, our curious bat-eared fox.
                Zara reminds children that learning is an adventure, mistakes
                are part of the journey, and every new skill starts with taking
                the first step.
              </p>
              <p>
                Whether your child needs extra practice, additional support, or
                simply wants to build confidence, we hope Learn With Zara
                becomes a trusted companion on their learning journey.
              </p>
              <p>
                Thank you for visiting our website and for allowing us to be
                part of your child&apos;s education.
              </p>
              <p>
                Warm regards,
                <br />
                <strong className="text-green-deep">
                  The Learn With Zara Team
                </strong>
              </p>
              <p className="font-heading text-[24px] font-bold italic text-orange">
                &quot;Learning made simple.&quot;
              </p>
            </div>
          </article>
        </section>
      </main>
      <Footer />
    </>
  );
}
