import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CheckoutTestClient from "@/components/CheckoutTestClient";
import ClearBasketOnMount from "@/components/ClearBasketOnMount";
import { getCurrentUser } from "@/lib/auth";
import { getSql } from "@/lib/db";

type CheckoutTestPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

type OrderDetails = {
  order_id: number;
  payment_reference: string;
  total_cents: number;
  currency: string;
  email: string;
  first_name: string;
  title: string;
  file_url: string;
  quantity: number;
};

function getStringParam(
  params: Record<string, string | string[] | undefined>,
  key: string,
) {
  const value = params[key];
  return Array.isArray(value) ? value[0] : value;
}

async function getOrderDetails(orderId: number, userId: number) {
  const sql = getSql();

  return (await sql`
    SELECT
      orders.id AS order_id,
      orders.payment_reference,
      orders.total_cents,
      orders.currency,
      users.email,
      users.first_name,
      products.title,
      products.file_url,
      order_items.quantity
    FROM orders
    JOIN users ON users.id = orders.user_id
    JOIN order_items ON order_items.order_id = orders.id
    JOIN products ON products.id = order_items.product_id
    WHERE orders.id = ${orderId}
      AND orders.user_id = ${userId}
      AND orders.status = 'PAID'
    ORDER BY order_items.id ASC
  `) as OrderDetails[];
}

function SuccessEmailPreview({ rows }: { rows: OrderDetails[] }) {
  const first = rows[0];

  return (
    <div className="mt-9 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_360px]">
      <section className="rounded-[18px] border border-[#efe2cf] bg-white/82 px-7 py-6 shadow-[0_8px_22px_rgba(83,55,24,0.10)]">
        <h2 className="font-heading text-[30px] font-bold text-green-deep">
          Generated Customer Email
        </h2>
        <div className="mt-5 rounded-[14px] bg-beige px-5 py-5 font-body text-[14px] font-bold leading-[1.6] text-text-dark">
          <p>Hi {first.first_name},</p>
          <p className="mt-4">
            Thank you for your Learn With Zara order. Your payment has been
            confirmed and your downloads are ready.
          </p>
          <p className="mt-4">
            Order reference: <strong>{first.payment_reference}</strong>
          </p>
          <p className="mt-4">Your resources:</p>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            {rows.map((row) => (
              <li key={row.file_url}>
                {row.title}{" "}
                <a
                  href={row.file_url}
                  className="font-extrabold text-orange hover:underline"
                >
                  Download
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-4">Learning made simple.</p>
          <p>The Learn With Zara Team</p>
        </div>
      </section>

      <aside className="h-fit rounded-[18px] border border-[#efe2cf] bg-beige px-6 py-6 shadow-[0_8px_22px_rgba(83,55,24,0.10)]">
        <h2 className="font-heading text-[28px] font-bold text-green-deep">
          Test Order Created
        </h2>
        <div className="mt-5 border-t border-white/80 pt-5">
          <p className="font-body text-[13px] font-extrabold text-text-muted">
            Order
          </p>
          <p className="font-body text-[16px] font-extrabold text-text-dark">
            #{first.order_id}
          </p>
        </div>
        <div className="mt-4">
          <p className="font-body text-[13px] font-extrabold text-text-muted">
            Total
          </p>
          <p className="font-heading text-[28px] font-bold text-green-deep">
            {first.currency} {(first.total_cents / 100).toFixed(2)}
          </p>
        </div>
        <Link
          href="/products-test"
          className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-orange px-7 py-3 font-body text-[14px] font-extrabold text-white"
        >
          Back to products
        </Link>
      </aside>
      <ClearBasketOnMount />
    </div>
  );
}

export default async function CheckoutTestPage({
  searchParams,
}: CheckoutTestPageProps) {
  const params = (await searchParams) || {};
  const error = getStringParam(params, "error");
  const orderId = Number(getStringParam(params, "orderId"));
  const user = await getCurrentUser();
  const orderRows =
    user && Number.isInteger(orderId) && orderId > 0
      ? await getOrderDetails(orderId, user.id)
      : [];

  return (
    <>
      <Header />
      <main className="bg-cream">
        <section className="px-6 pb-20 pt-32 md:pt-36">
          <div className="mx-auto max-w-[1180px]">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="font-body text-[14px] font-extrabold text-orange">
                  Payment simulation
                </p>
                <h1 className="font-heading text-[42px] font-bold leading-[0.98] tracking-wide text-green-deep md:text-[56px]">
                  Checkout Test
                </h1>
                <div className="mt-5 h-[3px] w-20 rounded-full bg-orange" />
              </div>
              <Link
                href="/basket"
                className="inline-flex font-body text-[14px] font-extrabold text-orange hover:underline"
              >
                Back to basket
              </Link>
            </div>

            {!user ? (
              <div className="mt-9 rounded-[18px] border border-[#efe2cf] bg-white/82 px-7 py-7 shadow-[0_8px_22px_rgba(83,55,24,0.10)]">
                <h2 className="font-heading text-[30px] font-bold text-green-deep">
                  Sign in to test checkout
                </h2>
                <p className="mt-3 font-body text-[15px] font-bold leading-[1.5] text-text-muted">
                  This first simulation uses your signed-in account to create a
                  paid order in the database.
                </p>
                <Link
                  href="/account?mode=login"
                  className="mt-6 inline-flex min-h-12 items-center justify-center rounded-full bg-orange px-7 py-3 font-body text-[14px] font-extrabold text-white"
                >
                  Sign in
                </Link>
              </div>
            ) : orderRows.length > 0 ? (
              <SuccessEmailPreview rows={orderRows} />
            ) : (
              <CheckoutTestClient defaultEmail={user.email} error={error} />
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
