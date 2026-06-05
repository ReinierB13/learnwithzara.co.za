import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductTestStore, { type StoreProduct } from "@/components/ProductTestStore";
import { getSql } from "@/lib/db";

export const dynamic = "force-dynamic";

type ProductRow = {
  id: number;
  title: string;
  slug: string;
  description: string;
  grade: string | null;
  subject: string;
  product_type: string;
  price_cents: number;
  currency: string;
  is_free: boolean;
  file_url: string;
  thumbnail_url: string | null;
};

async function getProducts(): Promise<StoreProduct[]> {
  const sql = getSql();
  const rows = (await sql`
    SELECT
      id,
      title,
      slug,
      description,
      grade,
      subject,
      product_type,
      price_cents,
      currency,
      is_free,
      file_url,
      thumbnail_url
    FROM products
    WHERE is_active = true
    ORDER BY grade ASC NULLS LAST, subject ASC, created_at DESC, id DESC
  `) as ProductRow[];

  return rows.map((row) => ({
    id: row.id,
    title: row.title,
    slug: row.slug,
    description: row.description,
    grade: row.grade,
    subject: row.subject,
    productType: row.product_type,
    priceCents: row.price_cents,
    currency: row.currency,
    isFree: row.is_free,
    fileUrl: row.file_url,
    thumbnailUrl: row.thumbnail_url,
  }));
}

export default async function ProductsTestPage() {
  const products = await getProducts();

  return (
    <>
      <Header />
      <main className="bg-cream">
        <section className="px-6 pb-20 pt-32 md:pt-36">
          <div className="mx-auto max-w-[1180px]">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="font-body text-[14px] font-extrabold text-orange">
                  Product test area
                </p>
                <h1 className="font-heading text-[42px] font-bold leading-[0.98] tracking-wide text-green-deep md:text-[56px]">
                  Uploaded Products
                </h1>
                <div className="mt-5 h-[3px] w-20 rounded-full bg-orange" />
              </div>
              <Link
                href="/products"
                className="inline-flex font-body text-[14px] font-extrabold text-orange hover:underline"
              >
                Public products page
              </Link>
            </div>

            <p className="mt-6 max-w-[720px] font-body text-[16px] font-bold leading-[1.55] text-text-dark">
              This copy of the products page shows live uploaded products for
              testing basket, payment simulation, and email delivery workflows.
            </p>

            <ProductTestStore products={products} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
