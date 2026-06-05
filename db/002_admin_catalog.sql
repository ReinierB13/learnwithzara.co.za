BEGIN;

CREATE TABLE IF NOT EXISTS subjects (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS subjects_slug_unique
ON subjects (slug);

CREATE TABLE IF NOT EXISTS grades (
  id BIGSERIAL PRIMARY KEY,
  code TEXT NOT NULL,
  label TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT grades_code_check CHECK (code IN ('R', '1', '2', '3', '4', '5', '6', '7'))
);

CREATE UNIQUE INDEX IF NOT EXISTS grades_code_unique
ON grades (code);

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
);

CREATE UNIQUE INDEX IF NOT EXISTS courses_slug_unique
ON courses (slug);

CREATE INDEX IF NOT EXISTS courses_subject_grade_idx
ON courses (subject_id, grade_id, is_active);

CREATE TABLE IF NOT EXISTS course_products (
  id BIGSERIAL PRIMARY KEY,
  course_id BIGINT NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  product_id BIGINT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS course_products_course_product_unique
ON course_products (course_id, product_id);

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
  updated_at = now();

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger
    WHERE tgname = 'subjects_set_updated_at'
      AND tgrelid = 'subjects'::regclass
  ) THEN
    CREATE TRIGGER subjects_set_updated_at
    BEFORE UPDATE ON subjects
    FOR EACH ROW
    EXECUTE FUNCTION set_updated_at();
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger
    WHERE tgname = 'grades_set_updated_at'
      AND tgrelid = 'grades'::regclass
  ) THEN
    CREATE TRIGGER grades_set_updated_at
    BEFORE UPDATE ON grades
    FOR EACH ROW
    EXECUTE FUNCTION set_updated_at();
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger
    WHERE tgname = 'courses_set_updated_at'
      AND tgrelid = 'courses'::regclass
  ) THEN
    CREATE TRIGGER courses_set_updated_at
    BEFORE UPDATE ON courses
    FOR EACH ROW
    EXECUTE FUNCTION set_updated_at();
  END IF;
END $$;

COMMIT;
