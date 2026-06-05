import "server-only";

import { getSql } from "@/lib/db";

export type AdminSubject = {
  id: number;
  name: string;
  slug: string;
  is_active: boolean;
};

export type AdminGrade = {
  id: number;
  code: string;
  label: string;
  sort_order: number;
  is_active: boolean;
};

export type AdminCourse = {
  id: number;
  title: string;
  slug: string;
  description: string;
  subject_name: string;
  grade_code: string;
  is_active: boolean;
};

export type AdminProduct = {
  id: number;
  title: string;
  slug: string;
  subject: string;
  grade: string | null;
  product_type: string;
  price_cents: number;
  currency: string;
  is_free: boolean;
  is_active: boolean;
  file_url: string;
  created_at: string;
};

export async function ensureAdminCatalogSchema() {
  const sql = getSql();

  await sql`
    CREATE TABLE IF NOT EXISTS subjects (
      id BIGSERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      slug TEXT NOT NULL,
      is_active BOOLEAN NOT NULL DEFAULT true,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `;

  await sql`
    CREATE UNIQUE INDEX IF NOT EXISTS subjects_slug_unique
    ON subjects (slug)
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS grades (
      id BIGSERIAL PRIMARY KEY,
      code TEXT NOT NULL,
      label TEXT NOT NULL,
      sort_order INTEGER NOT NULL DEFAULT 0,
      is_active BOOLEAN NOT NULL DEFAULT true,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      CONSTRAINT grades_code_check CHECK (code IN ('R', '1', '2', '3', '4', '5', '6', '7'))
    )
  `;

  await sql`
    CREATE UNIQUE INDEX IF NOT EXISTS grades_code_unique
    ON grades (code)
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS courses (
      id BIGSERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      slug TEXT NOT NULL,
      description TEXT NOT NULL,
      subject_id BIGINT NOT NULL REFERENCES subjects(id) ON DELETE RESTRICT,
      grade_id BIGINT NOT NULL REFERENCES grades(id) ON DELETE RESTRICT,
      is_active BOOLEAN NOT NULL DEFAULT true,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `;

  await sql`
    CREATE UNIQUE INDEX IF NOT EXISTS courses_slug_unique
    ON courses (slug)
  `;

  await sql`
    CREATE INDEX IF NOT EXISTS courses_subject_grade_idx
    ON courses (subject_id, grade_id, is_active)
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS course_products (
      id BIGSERIAL PRIMARY KEY,
      course_id BIGINT NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
      product_id BIGINT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
      sort_order INTEGER NOT NULL DEFAULT 0,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `;

  await sql`
    CREATE UNIQUE INDEX IF NOT EXISTS course_products_course_product_unique
    ON course_products (course_id, product_id)
  `;

  await sql`
    INSERT INTO grades (code, label, sort_order)
    VALUES
      ('R', 'Grade R', 0),
      ('1', 'Grade 1', 1),
      ('2', 'Grade 2', 2),
      ('3', 'Grade 3', 3),
      ('4', 'Grade 4', 4),
      ('5', 'Grade 5', 5),
      ('6', 'Grade 6', 6),
      ('7', 'Grade 7', 7)
    ON CONFLICT (code)
    DO UPDATE SET
      label = EXCLUDED.label,
      sort_order = EXCLUDED.sort_order,
      updated_at = now()
  `;
}

export async function getAdminCatalog() {
  await ensureAdminCatalogSchema();

  const sql = getSql();
  const [subjects, grades, courses, products] = await Promise.all([
    (async () =>
      (await sql`
      SELECT id, name, slug, is_active
      FROM subjects
      ORDER BY name ASC
    `) as AdminSubject[])(),
    (async () =>
      (await sql`
      SELECT id, code, label, sort_order, is_active
      FROM grades
      ORDER BY sort_order ASC
    `) as AdminGrade[])(),
    (async () =>
      (await sql`
      SELECT
        courses.id,
        courses.title,
        courses.slug,
        courses.description,
        subjects.name AS subject_name,
        grades.code AS grade_code,
        courses.is_active
      FROM courses
      JOIN subjects ON subjects.id = courses.subject_id
      JOIN grades ON grades.id = courses.grade_id
      ORDER BY courses.created_at DESC, courses.id DESC
    `) as AdminCourse[])(),
    (async () =>
      (await sql`
      SELECT
        id,
        title,
        slug,
        subject,
        grade,
        product_type,
        price_cents,
        currency,
        is_free,
        is_active,
        file_url,
        created_at
      FROM products
      ORDER BY created_at DESC, id DESC
      LIMIT 50
    `) as AdminProduct[])(),
  ]);

  return { subjects, grades, courses, products };
}
