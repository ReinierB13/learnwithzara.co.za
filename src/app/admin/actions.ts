"use server";

import { put } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { ensureAdminCatalogSchema } from "@/lib/admin-catalog";
import { getSql } from "@/lib/db";

const GRADES = new Set(["R", "1", "2", "3", "4", "5", "6", "7"]);
const PRODUCT_TYPES = new Set(["PDF", "BUNDLE", "ASSESSMENT", "WORKSHEET"]);

function formValue(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function checkboxValue(formData: FormData, key: string) {
  return formData.get(key) === "on";
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function redirectAdmin(type: "error" | "message", message: string): never {
  redirect(`/admin?${type}=${encodeURIComponent(message)}`);
}

async function requireAdmin() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/account?mode=login&error=Please sign in as an admin.");
  }

  if (user.role !== "ADMIN") {
    redirectAdmin("error", "Admin access is required.");
  }

  return user;
}

export async function createSubject(formData: FormData) {
  await requireAdmin();
  await ensureAdminCatalogSchema();

  const name = formValue(formData, "name");
  const slug = slugify(formValue(formData, "slug") || name);

  if (!name || !slug) {
    redirectAdmin("error", "Please enter a subject name.");
  }

  const sql = getSql();

  await sql`
    INSERT INTO subjects (name, slug, is_active)
    VALUES (${name}, ${slug}, ${checkboxValue(formData, "isActive")})
    ON CONFLICT (slug)
    DO UPDATE SET
      name = EXCLUDED.name,
      is_active = EXCLUDED.is_active,
      updated_at = now()
  `;

  revalidatePath("/admin");
  redirectAdmin("message", "Subject saved.");
}

export async function createGrade(formData: FormData) {
  await requireAdmin();
  await ensureAdminCatalogSchema();

  const code = formValue(formData, "code").toUpperCase();
  const label = formValue(formData, "label");
  const sortOrder = Number(formValue(formData, "sortOrder"));

  if (!GRADES.has(code) || !label) {
    redirectAdmin("error", "Please enter a valid grade.");
  }

  const sql = getSql();

  await sql`
    INSERT INTO grades (code, label, sort_order, is_active)
    VALUES (
      ${code},
      ${label},
      ${Number.isInteger(sortOrder) ? sortOrder : 0},
      ${checkboxValue(formData, "isActive")}
    )
    ON CONFLICT (code)
    DO UPDATE SET
      label = EXCLUDED.label,
      sort_order = EXCLUDED.sort_order,
      is_active = EXCLUDED.is_active,
      updated_at = now()
  `;

  revalidatePath("/admin");
  redirectAdmin("message", "Grade saved.");
}

export async function createCourse(formData: FormData) {
  await requireAdmin();
  await ensureAdminCatalogSchema();

  const title = formValue(formData, "title");
  const slug = slugify(formValue(formData, "slug") || title);
  const description = formValue(formData, "description");
  const subjectId = Number(formValue(formData, "subjectId"));
  const gradeId = Number(formValue(formData, "gradeId"));

  if (!title || !slug || !description) {
    redirectAdmin("error", "Please enter a course title and description.");
  }

  if (!Number.isInteger(subjectId) || !Number.isInteger(gradeId)) {
    redirectAdmin("error", "Please choose a subject and grade for the course.");
  }

  const sql = getSql();

  await sql`
    INSERT INTO courses (
      title,
      slug,
      description,
      subject_id,
      grade_id,
      is_active
    )
    VALUES (
      ${title},
      ${slug},
      ${description},
      ${subjectId},
      ${gradeId},
      ${checkboxValue(formData, "isActive")}
    )
    ON CONFLICT (slug)
    DO UPDATE SET
      title = EXCLUDED.title,
      description = EXCLUDED.description,
      subject_id = EXCLUDED.subject_id,
      grade_id = EXCLUDED.grade_id,
      is_active = EXCLUDED.is_active,
      updated_at = now()
  `;

  revalidatePath("/admin");
  redirectAdmin("message", "Course saved.");
}

export async function createProduct(formData: FormData) {
  await requireAdmin();
  await ensureAdminCatalogSchema();

  const title = formValue(formData, "title");
  const slug = slugify(formValue(formData, "slug") || title);
  const description = formValue(formData, "description");
  const productType = formValue(formData, "productType").toUpperCase();
  const priceRand = Number(formValue(formData, "priceRand") || "0");
  const isFree = checkboxValue(formData, "isFree");
  const thumbnailUrl = formValue(formData, "thumbnailUrl");
  const subjectId = Number(formValue(formData, "subjectId"));
  const gradeId = Number(formValue(formData, "gradeId"));
  const courseId = Number(formValue(formData, "courseId"));
  const file = formData.get("pdfFile");

  if (!title || !slug || !description) {
    redirectAdmin("error", "Please enter a product title and description.");
  }

  if (!PRODUCT_TYPES.has(productType)) {
    redirectAdmin("error", "Please choose a valid product type.");
  }

  if (!Number.isInteger(subjectId) || !Number.isInteger(gradeId)) {
    redirectAdmin("error", "Please choose a subject and grade for the product.");
  }

  if (!isFree && (!Number.isFinite(priceRand) || priceRand < 0)) {
    redirectAdmin("error", "Please enter a valid price.");
  }

  if (!(file instanceof File) || file.size === 0) {
    redirectAdmin("error", "Please upload a PDF file.");
  }

  const isPdf = file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");

  if (!isPdf) {
    redirectAdmin("error", "Only PDF uploads are supported right now.");
  }

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    redirectAdmin("error", "BLOB_READ_WRITE_TOKEN must be configured before PDF uploads can work.");
  }

  const sql = getSql();
  const subjectRows = (await sql`
    SELECT name
    FROM subjects
    WHERE id = ${subjectId}
    LIMIT 1
  `) as Array<{ name: string }>;
  const gradeRows = (await sql`
    SELECT code
    FROM grades
    WHERE id = ${gradeId}
    LIMIT 1
  `) as Array<{ code: string }>;

  const subject = subjectRows[0]?.name;
  const grade = gradeRows[0]?.code;

  if (!subject || !grade) {
    redirectAdmin("error", "The selected subject or grade could not be found.");
  }

  let fileUrl: string;

  try {
    const blob = await put(`products/${slug}-${Date.now()}.pdf`, file, {
      access: "public",
      addRandomSuffix: true,
    });

    fileUrl = blob.url;
  } catch (error) {
    console.error("Product PDF upload failed", error);
    redirectAdmin(
      "error",
      "The PDF could not be uploaded. Please check the Vercel Blob token and try again.",
    );
  }

  const priceCents = isFree ? 0 : Math.round(priceRand * 100);
  let products: Array<{ id: number }>;

  try {
    products = (await sql`
      INSERT INTO products (
        title,
        slug,
        description,
        grade,
        subject,
        product_type,
        price_cents,
        currency,
        is_free,
        is_active,
        file_url,
        thumbnail_url
      )
      VALUES (
        ${title},
        ${slug},
        ${description},
        ${grade},
        ${subject},
        ${productType},
        ${priceCents},
        'ZAR',
        ${isFree},
        ${checkboxValue(formData, "isActive")},
        ${fileUrl},
        ${thumbnailUrl || null}
      )
      ON CONFLICT (slug)
      DO UPDATE SET
        title = EXCLUDED.title,
        description = EXCLUDED.description,
        grade = EXCLUDED.grade,
        subject = EXCLUDED.subject,
        product_type = EXCLUDED.product_type,
        price_cents = EXCLUDED.price_cents,
        currency = EXCLUDED.currency,
        is_free = EXCLUDED.is_free,
        is_active = EXCLUDED.is_active,
        file_url = EXCLUDED.file_url,
        thumbnail_url = EXCLUDED.thumbnail_url,
        updated_at = now()
      RETURNING id
    `) as Array<{ id: number }>;

    if (Number.isInteger(courseId) && courseId > 0) {
      await sql`
        INSERT INTO course_products (course_id, product_id)
        VALUES (${courseId}, ${products[0].id})
        ON CONFLICT (course_id, product_id) DO NOTHING
      `;
    }
  } catch (error) {
    console.error("Product metadata save failed", error);
    redirectAdmin(
      "error",
      "The PDF uploaded, but the product details could not be saved. Please check the product fields and database schema.",
    );
  }

  revalidatePath("/admin");
  redirectAdmin("message", "Product uploaded.");
}
