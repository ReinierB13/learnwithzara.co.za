import Link from "next/link";
import type { ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getCurrentUser } from "@/lib/auth";
import {
  type AdminCourse,
  type AdminGrade,
  type AdminProduct,
  type AdminSubject,
  getAdminCatalog,
} from "@/lib/admin-catalog";
import { r2UploadsReady } from "@/lib/r2";
import { createCourse, createGrade, createProduct, createSubject } from "./actions";

type AdminPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

function getStringParam(
  params: Record<string, string | string[] | undefined>,
  key: string,
) {
  const value = params[key];
  return Array.isArray(value) ? value[0] : value;
}

function Input({
  label,
  name,
  type = "text",
  required = true,
  defaultValue,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  defaultValue?: string;
  placeholder?: string;
}) {
  return (
    <label className="flex flex-col gap-2 font-body text-[13px] font-extrabold text-text-dark">
      {label}
      <input
        name={name}
        type={type}
        required={required}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="min-h-12 rounded-[14px] border border-[#efe2cf] bg-white px-4 py-3 font-body text-[14px] font-bold text-text-dark outline-none transition-colors placeholder:text-text-muted/55 focus:border-orange"
      />
    </label>
  );
}

function Textarea({
  label,
  name,
  placeholder,
}: {
  label: string;
  name: string;
  placeholder?: string;
}) {
  return (
    <label className="flex flex-col gap-2 font-body text-[13px] font-extrabold text-text-dark">
      {label}
      <textarea
        name={name}
        required
        rows={4}
        placeholder={placeholder}
        className="rounded-[14px] border border-[#efe2cf] bg-white px-4 py-3 font-body text-[14px] font-bold leading-[1.45] text-text-dark outline-none transition-colors placeholder:text-text-muted/55 focus:border-orange"
      />
    </label>
  );
}

function Checkbox({
  label,
  name,
  defaultChecked = true,
}: {
  label: string;
  name: string;
  defaultChecked?: boolean;
}) {
  return (
    <label className="flex items-center gap-3 font-body text-[13px] font-extrabold text-text-dark">
      <input
        name={name}
        type="checkbox"
        defaultChecked={defaultChecked}
        className="h-5 w-5 accent-orange"
      />
      {label}
    </label>
  );
}

function SubmitButton({ children }: { children: ReactNode }) {
  return (
    <button
      type="submit"
      className="inline-flex min-h-12 items-center justify-center rounded-full bg-orange px-7 py-3 font-body text-[14px] font-extrabold text-white shadow-[0_10px_20px_rgba(233,91,11,0.22)] transition-colors hover:bg-[#cf4f08]"
    >
      {children}
    </button>
  );
}

function CollapsiblePanel({
  title,
  count,
  children,
}: {
  title: string;
  count: number;
  children: ReactNode;
}) {
  return (
    <details className="group rounded-[18px] border border-[#efe2cf] bg-white/82 px-7 py-6 shadow-[0_8px_22px_rgba(83,55,24,0.10)]">
      <summary className="flex cursor-pointer list-none flex-col gap-3 sm:flex-row sm:items-start sm:justify-between [&::-webkit-details-marker]:hidden">
        <div>
          <h2 className="font-heading text-[28px] font-bold text-green-deep">
            {title}
          </h2>
          <p className="mt-2 font-body text-[14px] font-bold leading-[1.45] text-text-muted">
            Open this when you need to add or update {title.toLowerCase()}.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="rounded-full bg-beige px-4 py-2 text-center font-body text-[12px] font-extrabold text-orange">
            {count} saved
          </span>
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-orange text-[28px] font-bold leading-none text-white shadow-[0_10px_20px_rgba(233,91,11,0.22)] transition-colors group-hover:bg-[#cf4f08]">
            <span className="mb-1 group-open:hidden">+</span>
            <span className="hidden group-open:block">-</span>
          </span>
        </div>
      </summary>
      <div className="mt-6">{children}</div>
    </details>
  );
}

export default async function AdminPage({ searchParams }: AdminPageProps) {
  const params = (await searchParams) || {};
  const message = getStringParam(params, "message");
  const error = getStringParam(params, "error");
  const user = await getCurrentUser();
  const uploadsReady = r2UploadsReady();

  if (!user) {
    return (
      <>
        <Header />
        <main className="bg-cream px-6 pb-20 pt-32 md:pt-36">
          <section className="mx-auto max-w-[760px] rounded-[18px] border border-[#efe2cf] bg-white/82 px-7 py-7 shadow-[0_8px_22px_rgba(83,55,24,0.10)]">
            <h1 className="font-heading text-[42px] font-bold text-green-deep">
              Admin
            </h1>
            <p className="mt-3 font-body text-[15px] font-bold leading-[1.5] text-text-dark">
              Please sign in with an admin account to manage products and courses.
            </p>
            <Link
              href="/account?mode=login"
              className="mt-6 inline-flex min-h-12 items-center justify-center rounded-full bg-orange px-7 py-3 font-body text-[14px] font-extrabold text-white"
            >
              Sign in
            </Link>
          </section>
        </main>
        <Footer />
      </>
    );
  }

  if (user.role !== "ADMIN") {
    return (
      <>
        <Header />
        <main className="bg-cream px-6 pb-20 pt-32 md:pt-36">
          <section className="mx-auto max-w-[760px] rounded-[18px] border border-[#efe2cf] bg-white/82 px-7 py-7 shadow-[0_8px_22px_rgba(83,55,24,0.10)]">
            <p className="font-body text-[14px] font-extrabold text-orange">
              Signed in as {user.role.toLowerCase()}
            </p>
            <h1 className="mt-2 font-heading text-[42px] font-bold text-green-deep">
              Admin Access Required
            </h1>
            <p className="mt-3 font-body text-[15px] font-bold leading-[1.5] text-text-dark">
              This area is only available to Learn With Zara administrators.
            </p>
            <Link
              href="/account"
              className="mt-6 inline-flex font-body text-[14px] font-extrabold text-orange hover:underline"
            >
              Back to My Account
            </Link>
          </section>
        </main>
        <Footer />
      </>
    );
  }

  let catalogError = "";
  let subjects: AdminSubject[] = [];
  let grades: AdminGrade[] = [];
  let courses: AdminCourse[] = [];
  let products: AdminProduct[] = [];

  try {
    const catalog = await getAdminCatalog();
    subjects = catalog.subjects;
    grades = catalog.grades;
    courses = catalog.courses;
    products = catalog.products;
  } catch (error) {
    console.error("Admin catalog failed to load", error);
    catalogError =
      "The admin catalog could not load from the database. Please check the Vercel function logs and database schema.";
  }

  return (
    <>
      <Header />
      <main className="bg-cream">
        <section className="px-6 pb-20 pt-32 md:pt-36">
          <div className="mx-auto max-w-[1180px]">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="font-body text-[14px] font-extrabold text-orange">
                  Admin
                </p>
                <h1 className="font-heading text-[42px] font-bold leading-[0.98] tracking-wide text-green-deep md:text-[56px]">
                  Catalog Manager
                </h1>
                <div className="mt-5 h-[3px] w-20 rounded-full bg-orange" />
              </div>
              <Link
                href="/account"
                className="inline-flex font-body text-[14px] font-extrabold text-orange hover:underline"
              >
                Back to My Account
              </Link>
            </div>

            {(message || error) && (
              <p
                className={`mt-7 rounded-[14px] px-5 py-4 font-body text-[14px] font-extrabold ${
                  error ? "bg-white text-orange" : "bg-white text-green-deep"
                }`}
              >
                {error || message}
              </p>
            )}
            {catalogError && (
              <p className="mt-7 rounded-[14px] bg-white px-5 py-4 font-body text-[14px] font-extrabold text-orange">
                {catalogError}
              </p>
            )}
            {!uploadsReady && (
              <p className="mt-7 rounded-[14px] bg-white px-5 py-4 font-body text-[14px] font-extrabold text-orange">
                PDF uploads need the Cloudflare R2 environment variables before
                they can work.
              </p>
            )}

            <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-4">
              {[
                ["Subjects", subjects.length],
                ["Grades", grades.length],
                ["Courses", courses.length],
                ["Products", products.length],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="rounded-[18px] border border-[#efe2cf] bg-white/82 px-6 py-5 shadow-[0_8px_22px_rgba(83,55,24,0.10)]"
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

            <div className="mt-7 grid grid-cols-1 gap-6 lg:grid-cols-[0.82fr_1.18fr]">
              <div className="flex flex-col gap-6">
                <CollapsiblePanel title="Subjects" count={subjects.length}>
                  <form action={createSubject}>
                    <div className="grid grid-cols-1 gap-4">
                      <Input label="Subject name" name="name" placeholder="Maths" />
                      <Input
                        label="Slug optional"
                        name="slug"
                        required={false}
                        placeholder="maths"
                      />
                      <Checkbox label="Active" name="isActive" />
                    </div>
                    <div className="mt-5">
                      <SubmitButton>Save subject</SubmitButton>
                    </div>
                  </form>
                </CollapsiblePanel>

                <CollapsiblePanel title="Grades" count={grades.length}>
                  <form action={createGrade}>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                      <label className="flex flex-col gap-2 font-body text-[13px] font-extrabold text-text-dark">
                        Code
                        <select
                          name="code"
                          defaultValue="R"
                          className="min-h-12 rounded-[14px] border border-[#efe2cf] bg-white px-4 py-3 font-body text-[14px] font-bold text-text-dark outline-none transition-colors focus:border-orange"
                        >
                          {["R", "1", "2", "3", "4", "5", "6", "7"].map((grade) => (
                            <option key={grade} value={grade}>
                              {grade}
                            </option>
                          ))}
                        </select>
                      </label>
                      <Input label="Label" name="label" defaultValue="Grade R" />
                      <Input
                        label="Order"
                        name="sortOrder"
                        type="number"
                        defaultValue="0"
                      />
                    </div>
                    <div className="mt-4">
                      <Checkbox label="Active" name="isActive" />
                    </div>
                    <div className="mt-5">
                      <SubmitButton>Save grade</SubmitButton>
                    </div>
                  </form>
                </CollapsiblePanel>

                <section className="rounded-[18px] border border-[#efe2cf] bg-beige px-7 py-6">
                  <h2 className="font-heading text-[28px] font-bold text-green-deep">
                    Current Catalog
                  </h2>
                  <p className="mt-2 font-body text-[14px] font-bold leading-[1.45] text-text-muted">
                    Subjects and grades available for courses and products.
                  </p>
                  <h3 className="mt-5 font-body text-[13px] font-extrabold uppercase tracking-wide text-text-muted">
                    Subjects
                  </h3>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {subjects.length > 0 ? (
                      subjects.map((subject) => (
                        <span
                          key={subject.id}
                          className="rounded-full bg-white px-4 py-2 font-body text-[12px] font-extrabold text-green-deep"
                        >
                          {subject.name}
                        </span>
                      ))
                    ) : (
                      <p className="font-body text-[14px] font-bold text-text-muted">
                        No subjects yet.
                      </p>
                    )}
                  </div>
                  <h3 className="mt-6 font-body text-[13px] font-extrabold uppercase tracking-wide text-text-muted">
                    Grades
                  </h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {grades.map((grade) => (
                      <span
                        key={grade.id}
                        className="rounded-full bg-white px-4 py-2 font-body text-[12px] font-extrabold text-green-deep"
                      >
                        {grade.label}
                      </span>
                    ))}
                  </div>
                </section>
              </div>

              <div className="flex flex-col gap-6">
                <CollapsiblePanel title="Courses" count={courses.length}>
                  <form action={createCourse}>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <Input label="Course title" name="title" />
                      <Input
                        label="Slug optional"
                        name="slug"
                        required={false}
                        placeholder="grade-1-maths"
                      />
                      <label className="flex flex-col gap-2 font-body text-[13px] font-extrabold text-text-dark">
                        Subject
                        <select
                          name="subjectId"
                          required
                          className="min-h-12 rounded-[14px] border border-[#efe2cf] bg-white px-4 py-3 font-body text-[14px] font-bold text-text-dark outline-none transition-colors focus:border-orange"
                        >
                          <option value="">Choose subject</option>
                          {subjects.map((subject) => (
                            <option key={subject.id} value={subject.id}>
                              {subject.name}
                            </option>
                          ))}
                        </select>
                      </label>
                      <label className="flex flex-col gap-2 font-body text-[13px] font-extrabold text-text-dark">
                        Grade
                        <select
                          name="gradeId"
                          required
                          className="min-h-12 rounded-[14px] border border-[#efe2cf] bg-white px-4 py-3 font-body text-[14px] font-bold text-text-dark outline-none transition-colors focus:border-orange"
                        >
                          <option value="">Choose grade</option>
                          {grades.map((grade) => (
                            <option key={grade.id} value={grade.id}>
                              {grade.label}
                            </option>
                          ))}
                        </select>
                      </label>
                    </div>
                    <div className="mt-4">
                      <Textarea label="Description" name="description" />
                    </div>
                    <div className="mt-4">
                      <Checkbox label="Active" name="isActive" />
                    </div>
                    <div className="mt-5">
                      <SubmitButton>Save course</SubmitButton>
                    </div>
                  </form>
                </CollapsiblePanel>

                <form
                  action={createProduct}
                  className="rounded-[18px] border border-[#efe2cf] bg-white/82 px-7 py-6 shadow-[0_8px_22px_rgba(83,55,24,0.10)]"
                >
                  <h2 className="font-heading text-[28px] font-bold text-green-deep">
                    Upload Product PDF
                  </h2>
                  <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Input label="Product title" name="title" />
                    <Input
                      label="Slug optional"
                      name="slug"
                      required={false}
                      placeholder="grade-1-maths-workbook"
                    />
                    <label className="flex flex-col gap-2 font-body text-[13px] font-extrabold text-text-dark">
                      Subject
                      <select
                        name="subjectId"
                        required
                        className="min-h-12 rounded-[14px] border border-[#efe2cf] bg-white px-4 py-3 font-body text-[14px] font-bold text-text-dark outline-none transition-colors focus:border-orange"
                      >
                        <option value="">Choose subject</option>
                        {subjects.map((subject) => (
                          <option key={subject.id} value={subject.id}>
                            {subject.name}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label className="flex flex-col gap-2 font-body text-[13px] font-extrabold text-text-dark">
                      Grade
                      <select
                        name="gradeId"
                        required
                        className="min-h-12 rounded-[14px] border border-[#efe2cf] bg-white px-4 py-3 font-body text-[14px] font-bold text-text-dark outline-none transition-colors focus:border-orange"
                      >
                        <option value="">Choose grade</option>
                        {grades.map((grade) => (
                          <option key={grade.id} value={grade.id}>
                            {grade.label}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label className="flex flex-col gap-2 font-body text-[13px] font-extrabold text-text-dark">
                      Product type
                      <select
                        name="productType"
                        defaultValue="PDF"
                        className="min-h-12 rounded-[14px] border border-[#efe2cf] bg-white px-4 py-3 font-body text-[14px] font-bold text-text-dark outline-none transition-colors focus:border-orange"
                      >
                        <option value="PDF">PDF</option>
                        <option value="WORKSHEET">Worksheet</option>
                        <option value="ASSESSMENT">Assessment</option>
                        <option value="BUNDLE">Bundle</option>
                      </select>
                    </label>
                    <Input
                      label="Price in rand"
                      name="priceRand"
                      type="number"
                      defaultValue="0"
                    />
                    <label className="flex flex-col gap-2 font-body text-[13px] font-extrabold text-text-dark">
                      Attach to course optional
                      <select
                        name="courseId"
                        defaultValue=""
                        className="min-h-12 rounded-[14px] border border-[#efe2cf] bg-white px-4 py-3 font-body text-[14px] font-bold text-text-dark outline-none transition-colors focus:border-orange"
                      >
                        <option value="">No course</option>
                        {courses.map((course) => (
                          <option key={course.id} value={course.id}>
                            {course.title}
                          </option>
                        ))}
                      </select>
                    </label>
                    <Input
                      label="Thumbnail URL optional"
                      name="thumbnailUrl"
                      required={false}
                    />
                  </div>
                  <div className="mt-4">
                    <Textarea label="Description" name="description" />
                  </div>
                  <label className="mt-4 flex flex-col gap-2 font-body text-[13px] font-extrabold text-text-dark">
                    PDF file
                    <input
                      name="pdfFile"
                      type="file"
                      accept="application/pdf,.pdf"
                      required
                      className="rounded-[14px] border border-[#efe2cf] bg-white px-4 py-3 font-body text-[14px] font-bold text-text-dark file:mr-4 file:rounded-full file:border-0 file:bg-beige file:px-4 file:py-2 file:font-body file:text-[12px] file:font-extrabold file:text-green-deep"
                    />
                  </label>
                  <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <Checkbox label="Free product" name="isFree" defaultChecked={false} />
                    <Checkbox label="Active" name="isActive" />
                  </div>
                  <p className="mt-4 font-body text-[13px] font-bold leading-[1.45] text-text-muted">
                    PDF uploads are stored in Cloudflare R2 and can be up to 25 MB.
                  </p>
                  <div className="mt-5">
                    <SubmitButton>Upload product</SubmitButton>
                  </div>
                </form>
              </div>
            </div>

            <div className="mt-7 grid grid-cols-1 gap-6 lg:grid-cols-2">
              <section className="rounded-[18px] border border-[#efe2cf] bg-white/82 px-7 py-6 shadow-[0_8px_22px_rgba(83,55,24,0.10)]">
                <h2 className="font-heading text-[28px] font-bold text-green-deep">
                  Courses
                </h2>
                <div className="mt-5 flex flex-col gap-3">
                  {courses.length > 0 ? (
                    courses.map((course) => (
                      <div key={course.id} className="rounded-[14px] bg-beige px-5 py-4">
                        <h3 className="font-heading text-[21px] font-bold text-green-deep">
                          {course.title}
                        </h3>
                        <p className="mt-1 font-body text-[13px] font-extrabold text-text-muted">
                          Grade {course.grade_code} / {course.subject_name} /{" "}
                          {course.is_active ? "Active" : "Draft"}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="font-body text-[14px] font-bold text-text-muted">
                      No courses yet.
                    </p>
                  )}
                </div>
              </section>

              <section className="rounded-[18px] border border-[#efe2cf] bg-white/82 px-7 py-6 shadow-[0_8px_22px_rgba(83,55,24,0.10)]">
                <h2 className="font-heading text-[28px] font-bold text-green-deep">
                  Products
                </h2>
                <div className="mt-5 flex flex-col gap-3">
                  {products.length > 0 ? (
                    products.map((product) => (
                      <div key={product.id} className="rounded-[14px] bg-beige px-5 py-4">
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                          <div>
                            <h3 className="font-heading text-[21px] font-bold text-green-deep">
                              {product.title}
                            </h3>
                            <p className="mt-1 font-body text-[13px] font-extrabold text-text-muted">
                              Grade {product.grade || "All"} / {product.subject} /{" "}
                              {product.product_type}
                            </p>
                          </div>
                          <span className="rounded-full bg-white px-4 py-2 font-body text-[12px] font-extrabold text-orange">
                            {product.is_free
                              ? "Free"
                              : `${product.currency} ${(product.price_cents / 100).toFixed(2)}`}
                          </span>
                        </div>
                        <a
                          href={product.file_url}
                          className="mt-3 inline-flex font-body text-[13px] font-extrabold text-orange hover:underline"
                          target="_blank"
                          rel="noreferrer"
                        >
                          Open PDF
                        </a>
                      </div>
                    ))
                  ) : (
                    <p className="font-body text-[14px] font-bold text-text-muted">
                      No products uploaded yet.
                    </p>
                  )}
                </div>
              </section>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
