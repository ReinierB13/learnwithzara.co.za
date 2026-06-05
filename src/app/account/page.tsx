import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getCurrentUser } from "@/lib/auth";
import { getSql } from "@/lib/db";
import {
  addChildProfile,
  deleteChildProfile,
  loginAccount,
  logoutAccount,
  registerAccount,
  updateChildProfile,
} from "./actions";

type AccountPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

async function getAccountStats(userId: number) {
  const sql = getSql();
  const rows = (await sql`
    SELECT
      (SELECT count(*)::int FROM children WHERE user_id = ${userId}) AS children_count,
      (SELECT count(*)::int FROM orders WHERE user_id = ${userId}) AS orders_count,
      (SELECT count(*)::int FROM downloads WHERE user_id = ${userId}) AS downloads_count
  `) as Array<{
    children_count: number;
    orders_count: number;
    downloads_count: number;
  }>;

  return rows[0] || { children_count: 0, orders_count: 0, downloads_count: 0 };
}

async function getChildren(userId: number) {
  const sql = getSql();
  return (await sql`
    SELECT
      id,
      first_name,
      last_name,
      grade,
      school_name,
      language
    FROM children
    WHERE user_id = ${userId}
    ORDER BY created_at DESC, id DESC
  `) as Array<{
    id: number;
    first_name: string;
    last_name: string;
    grade: string;
    school_name: string | null;
    language: string;
  }>;
}

function getStringParam(
  params: Record<string, string | string[] | undefined>,
  key: string,
) {
  const value = params[key];
  return Array.isArray(value) ? value[0] : value;
}

function Field({
  label,
  name,
  type = "text",
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  autoComplete?: string;
}) {
  return (
    <label className="flex flex-col gap-2 font-body text-[13px] font-extrabold text-text-dark">
      {label}
      <input
        name={name}
        type={type}
        required
        autoComplete={autoComplete}
        className="min-h-12 rounded-[14px] border border-[#efe2cf] bg-white px-4 py-3 font-body text-[14px] font-bold text-text-dark outline-none transition-colors focus:border-orange"
      />
    </label>
  );
}

function SelectField({
  label,
  name,
  defaultValue,
  options,
}: {
  label: string;
  name: string;
  defaultValue: string;
  options: Array<string>;
}) {
  return (
    <label className="flex flex-col gap-2 font-body text-[13px] font-extrabold text-text-dark">
      {label}
      <select
        name={name}
        defaultValue={defaultValue}
        className="min-h-12 rounded-[14px] border border-[#efe2cf] bg-white px-4 py-3 font-body text-[14px] font-bold text-text-dark outline-none transition-colors focus:border-orange"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function PencilIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5Z" />
    </svg>
  );
}

function AccountForms({
  mode,
  error,
}: {
  mode: "login" | "register";
  error?: string;
}) {
  return (
    <div className="grid grid-cols-1 gap-7 md:grid-cols-2">
      <form
        action={loginAccount}
        className={`rounded-[18px] border bg-white/82 px-7 py-6 shadow-[0_8px_22px_rgba(83,55,24,0.10)] ${
          mode === "login" ? "border-orange" : "border-[#efe2cf]"
        }`}
      >
        <h2 className="font-heading text-[28px] font-bold text-green-deep">
          Sign in
        </h2>
        <p className="mt-2 font-body text-[14px] font-bold leading-[1.45] text-text-muted">
          Access your downloads, children profiles, and future purchases.
        </p>

        {mode === "login" && error && (
          <p className="mt-4 rounded-[12px] bg-beige px-4 py-3 font-body text-[13px] font-extrabold text-orange">
            {error}
          </p>
        )}

        <div className="mt-5 flex flex-col gap-4">
          <Field label="Email address" name="email" type="email" autoComplete="email" />
          <Field
            label="Password"
            name="password"
            type="password"
            autoComplete="current-password"
          />
        </div>

        <button
          type="submit"
          className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-orange px-7 py-3 font-body text-[14px] font-extrabold text-white shadow-[0_10px_20px_rgba(233,91,11,0.22)] transition-colors hover:bg-[#cf4f08]"
        >
          Sign in
        </button>
      </form>

      <form
        action={registerAccount}
        className={`rounded-[18px] border bg-white/82 px-7 py-6 shadow-[0_8px_22px_rgba(83,55,24,0.10)] ${
          mode === "register" ? "border-orange" : "border-[#efe2cf]"
        }`}
      >
        <h2 className="font-heading text-[28px] font-bold text-green-deep">
          Create account
        </h2>
        <p className="mt-2 font-body text-[14px] font-bold leading-[1.45] text-text-muted">
          Start your Learn With Zara account for family or classroom resources.
        </p>

        {mode === "register" && error && (
          <p className="mt-4 rounded-[12px] bg-beige px-4 py-3 font-body text-[13px] font-extrabold text-orange">
            {error}
          </p>
        )}

        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="First name" name="firstName" autoComplete="given-name" />
          <Field label="Last name" name="lastName" autoComplete="family-name" />
        </div>
        <div className="mt-4 flex flex-col gap-4">
          <Field label="Email address" name="email" type="email" autoComplete="email" />
          <Field
            label="Password"
            name="password"
            type="password"
            autoComplete="new-password"
          />
          <label className="flex flex-col gap-2 font-body text-[13px] font-extrabold text-text-dark">
            I am a
            <select
              name="role"
              defaultValue="PARENT"
              className="min-h-12 rounded-[14px] border border-[#efe2cf] bg-white px-4 py-3 font-body text-[14px] font-bold text-text-dark outline-none transition-colors focus:border-orange"
            >
              <option value="PARENT">Parent</option>
              <option value="TEACHER">Teacher</option>
            </select>
          </label>
        </div>

        <button
          type="submit"
          className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-green-deep px-7 py-3 font-body text-[14px] font-extrabold text-white shadow-[0_10px_20px_rgba(36,76,45,0.24)] transition-colors hover:bg-[#1b3d23]"
        >
          Create account
        </button>
      </form>
    </div>
  );
}

export default async function AccountPage({ searchParams }: AccountPageProps) {
  const params = (await searchParams) || {};
  const mode = getStringParam(params, "mode") === "register" ? "register" : "login";
  const error = getStringParam(params, "error");
  const childError = getStringParam(params, "childError");
  const childSaved = getStringParam(params, "childSaved");
  const user = await getCurrentUser();
  const stats = user ? await getAccountStats(user.id) : null;
  const children = user ? await getChildren(user.id) : [];

  return (
    <>
      <Header />
      <main className="bg-cream">
        <section className="px-6 pb-20 pt-32 md:pt-36">
          <div className="mx-auto max-w-[920px]">
            <h1 className="font-heading text-[42px] font-bold leading-[0.98] tracking-wide text-green-deep md:text-[56px]">
              My Account
            </h1>
            <div className="mt-5 h-[3px] w-20 rounded-full bg-orange" />

            {user && stats ? (
              <div className="mt-8">
                <div className="rounded-[18px] border border-[#efe2cf] bg-white/82 px-7 py-6 shadow-[0_8px_22px_rgba(83,55,24,0.10)]">
                  <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                    <div>
                      <p className="font-body text-[14px] font-extrabold text-orange">
                        Signed in as {user.role.toLowerCase()}
                      </p>
                      <h2 className="mt-2 font-heading text-[32px] font-bold text-green-deep">
                        Hello, {user.firstName}
                      </h2>
                      <p className="mt-2 font-body text-[15px] font-bold leading-[1.5] text-text-muted">
                        {user.email}
                      </p>
                      {user.role === "ADMIN" && (
                        <Link
                          href="/admin"
                          className="mt-4 inline-flex min-h-11 items-center justify-center rounded-full bg-green-deep px-6 py-3 font-body text-[13px] font-extrabold text-white transition-colors hover:bg-[#1b3d23]"
                        >
                          Open admin
                        </Link>
                      )}
                    </div>
                    <form action={logoutAccount}>
                      <button
                        type="submit"
                        className="inline-flex min-h-11 items-center justify-center rounded-full bg-orange px-6 py-3 font-body text-[13px] font-extrabold text-white transition-colors hover:bg-[#cf4f08]"
                      >
                        Sign out
                      </button>
                    </form>
                  </div>
                </div>

                <div className="mt-7 grid grid-cols-1 gap-5 md:grid-cols-3">
                  {[
                    ["Children", stats.children_count],
                    ["Orders", stats.orders_count],
                    ["Downloads", stats.downloads_count],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="rounded-[18px] border border-[#efe2cf] bg-white/82 px-6 py-5 text-center shadow-[0_8px_22px_rgba(83,55,24,0.10)]"
                    >
                      <p className="font-heading text-[42px] font-bold text-green-deep">
                        {value}
                      </p>
                      <p className="font-body text-[13px] font-extrabold uppercase tracking-wide text-text-muted">
                        {label}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-7 grid grid-cols-1 gap-5 lg:grid-cols-[1.1fr_0.9fr]">
                  <section className="rounded-[18px] border border-[#efe2cf] bg-beige px-7 py-6">
                    <details className="group">
                      <summary className="flex cursor-pointer list-none flex-col gap-3 sm:flex-row sm:items-start sm:justify-between [&::-webkit-details-marker]:hidden">
                        <div>
                          <h3 className="font-heading text-[26px] font-bold text-green-deep">
                            Children profiles
                          </h3>
                          <p className="mt-2 font-body text-[14px] font-bold leading-[1.5] text-text-dark">
                            Add each learner so we can recommend grade and
                            language specific resources as the library grows.
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="rounded-full bg-white px-4 py-2 text-center font-body text-[12px] font-extrabold text-orange">
                            {children.length} saved
                          </span>
                          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-orange text-[28px] font-bold leading-none text-white shadow-[0_10px_20px_rgba(233,91,11,0.22)] transition-colors group-hover:bg-[#cf4f08]">
                            <span className="mb-1 group-open:hidden">+</span>
                            <span className="hidden group-open:block">-</span>
                            <span className="sr-only">Add child</span>
                          </span>
                        </div>
                      </summary>

                      <form
                        action={addChildProfile}
                        className="mt-6 rounded-[16px] border border-white/70 bg-white/55 px-5 py-5"
                      >
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                          <Field label="First name" name="firstName" autoComplete="off" />
                          <Field label="Last name" name="lastName" autoComplete="off" />
                          <SelectField
                            label="Grade"
                            name="grade"
                            defaultValue="R"
                            options={["R", "1", "2", "3", "4", "5", "6", "7"]}
                          />
                          <SelectField
                            label="Language"
                            name="language"
                            defaultValue="English"
                            options={["English", "Afrikaans"]}
                          />
                        </div>
                        <div className="mt-4">
                          <label className="flex flex-col gap-2 font-body text-[13px] font-extrabold text-text-dark">
                            School name optional
                            <input
                              name="schoolName"
                              type="text"
                              className="min-h-12 rounded-[14px] border border-[#efe2cf] bg-white px-4 py-3 font-body text-[14px] font-bold text-text-dark outline-none transition-colors focus:border-orange"
                            />
                          </label>
                        </div>
                        <button
                          type="submit"
                          className="mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-green-deep px-7 py-3 font-body text-[14px] font-extrabold text-white shadow-[0_10px_20px_rgba(36,76,45,0.24)] transition-colors hover:bg-[#1b3d23]"
                        >
                          Add child
                        </button>
                      </form>
                    </details>

                    {childError && (
                      <p className="mt-5 rounded-[12px] bg-white px-4 py-3 font-body text-[13px] font-extrabold text-orange">
                        {childError}
                      </p>
                    )}
                    {childSaved && (
                      <p className="mt-5 rounded-[12px] bg-white px-4 py-3 font-body text-[13px] font-extrabold text-green-deep">
                        {childSaved}
                      </p>
                    )}

                    <div className="mt-7 flex flex-col gap-3">
                      {children.length > 0 ? (
                        children.map((child) => (
                          <div
                            key={child.id}
                            className="relative flex flex-col gap-4 rounded-[14px] bg-white px-5 py-4 shadow-[0_6px_16px_rgba(83,55,24,0.08)] sm:flex-row sm:items-center sm:justify-between"
                          >
                            <div>
                              <h4 className="font-heading text-[21px] font-bold text-green-deep">
                                {child.first_name} {child.last_name}
                              </h4>
                              <p className="mt-1 font-body text-[13px] font-extrabold text-text-muted">
                                Grade {child.grade} · {child.language}
                                {child.school_name ? ` · ${child.school_name}` : ""}
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <details className="group">
                                <summary className="inline-flex min-h-10 cursor-pointer list-none items-center justify-center rounded-full border border-[#efe2cf] px-4 py-2 font-body text-[12px] font-extrabold text-green-deep transition-colors hover:border-green-deep [&::-webkit-details-marker]:hidden">
                                  <PencilIcon />
                                  <span className="sr-only">Edit child</span>
                                </summary>
                                <div className="mt-4 rounded-[14px] border border-[#efe2cf] bg-cream px-4 py-4 sm:absolute sm:right-5 sm:z-10 sm:w-[420px] sm:shadow-[0_14px_30px_rgba(83,55,24,0.16)]">
                                  <form action={updateChildProfile}>
                                    <input
                                      type="hidden"
                                      name="childId"
                                      value={child.id}
                                    />
                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                      <label className="flex flex-col gap-2 font-body text-[13px] font-extrabold text-text-dark">
                                        First name
                                        <input
                                          name="firstName"
                                          type="text"
                                          required
                                          defaultValue={child.first_name}
                                          className="min-h-11 rounded-[14px] border border-[#efe2cf] bg-white px-4 py-3 font-body text-[14px] font-bold text-text-dark outline-none transition-colors focus:border-orange"
                                        />
                                      </label>
                                      <label className="flex flex-col gap-2 font-body text-[13px] font-extrabold text-text-dark">
                                        Last name
                                        <input
                                          name="lastName"
                                          type="text"
                                          required
                                          defaultValue={child.last_name}
                                          className="min-h-11 rounded-[14px] border border-[#efe2cf] bg-white px-4 py-3 font-body text-[14px] font-bold text-text-dark outline-none transition-colors focus:border-orange"
                                        />
                                      </label>
                                      <SelectField
                                        label="Grade"
                                        name="grade"
                                        defaultValue={child.grade}
                                        options={["R", "1", "2", "3", "4", "5", "6", "7"]}
                                      />
                                      <SelectField
                                        label="Language"
                                        name="language"
                                        defaultValue={child.language}
                                        options={["English", "Afrikaans"]}
                                      />
                                    </div>
                                    <label className="mt-4 flex flex-col gap-2 font-body text-[13px] font-extrabold text-text-dark">
                                      School name optional
                                      <input
                                        name="schoolName"
                                        type="text"
                                        defaultValue={child.school_name || ""}
                                        className="min-h-11 rounded-[14px] border border-[#efe2cf] bg-white px-4 py-3 font-body text-[14px] font-bold text-text-dark outline-none transition-colors focus:border-orange"
                                      />
                                    </label>
                                    <button
                                      type="submit"
                                      className="mt-4 inline-flex min-h-11 w-full items-center justify-center rounded-full bg-green-deep px-6 py-3 font-body text-[13px] font-extrabold text-white transition-colors hover:bg-[#1b3d23]"
                                    >
                                      Save changes
                                    </button>
                                  </form>
                                </div>
                              </details>
                              <form action={deleteChildProfile}>
                                <input type="hidden" name="childId" value={child.id} />
                                <button
                                  type="submit"
                                  className="inline-flex min-h-10 items-center justify-center rounded-full border border-[#efe2cf] px-5 py-2 font-body text-[12px] font-extrabold text-orange transition-colors hover:border-orange"
                                >
                                  Remove
                                </button>
                              </form>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="rounded-[14px] bg-white px-5 py-4 font-body text-[14px] font-bold leading-[1.5] text-text-muted">
                          No children added yet.
                        </p>
                      )}
                    </div>
                  </section>

                  <section className="rounded-[18px] border border-[#efe2cf] bg-white/82 px-7 py-6">
                    <h3 className="font-heading text-[26px] font-bold text-green-deep">
                      Purchases & downloads
                    </h3>
                    <p className="mt-3 font-body text-[14px] font-bold leading-[1.5] text-text-dark">
                      Your purchased products and free resources will appear here
                      once the shop is live.
                    </p>
                    <Link
                      href="/products"
                      className="mt-5 inline-flex font-body text-[14px] font-extrabold text-orange hover:underline"
                    >
                      View product plans
                    </Link>
                  </section>
                </div>
              </div>
            ) : (
              <div className="mt-8">
                <p className="mb-7 max-w-[680px] font-body text-[16px] font-bold leading-[1.55] text-text-dark">
                  Create an account to prepare for downloads, child profiles,
                  purchases, and future Learn With Zara resources.
                </p>
                <AccountForms mode={mode} error={error} />
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
