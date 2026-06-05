BEGIN;

CREATE TABLE IF NOT EXISTS users (
  id BIGSERIAL PRIMARY KEY,
  email TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'PARENT',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT users_role_check CHECK (role IN ('PARENT', 'TEACHER', 'ADMIN'))
);

CREATE UNIQUE INDEX IF NOT EXISTS users_email_unique
ON users (lower(email));

CREATE TABLE IF NOT EXISTS children (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  grade TEXT NOT NULL,
  school_name TEXT,
  language TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT children_grade_check CHECK (grade IN ('R', '1', '2', '3', '4', '5', '6', '7')),
  CONSTRAINT children_language_check CHECK (language IN ('English', 'Afrikaans'))
);

CREATE INDEX IF NOT EXISTS children_user_id_idx
ON children (user_id);

CREATE TABLE IF NOT EXISTS products (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL,
  description TEXT NOT NULL,
  grade TEXT,
  subject TEXT NOT NULL,
  product_type TEXT NOT NULL,
  price_cents INTEGER NOT NULL DEFAULT 0,
  currency CHAR(3) NOT NULL DEFAULT 'ZAR',
  is_free BOOLEAN NOT NULL DEFAULT false,
  is_active BOOLEAN NOT NULL DEFAULT true,
  file_url TEXT NOT NULL,
  thumbnail_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT products_grade_check CHECK (grade IS NULL OR grade IN ('R', '1', '2', '3', '4', '5', '6', '7')),
  CONSTRAINT products_product_type_check CHECK (product_type IN ('PDF', 'BUNDLE', 'ASSESSMENT', 'WORKSHEET')),
  CONSTRAINT products_price_cents_check CHECK (price_cents >= 0),
  CONSTRAINT products_currency_check CHECK (currency = upper(currency))
);

CREATE UNIQUE INDEX IF NOT EXISTS products_slug_unique
ON products (slug);

CREATE INDEX IF NOT EXISTS products_active_subject_grade_idx
ON products (is_active, subject, grade);

CREATE TABLE IF NOT EXISTS orders (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
  status TEXT NOT NULL DEFAULT 'PENDING',
  total_cents INTEGER NOT NULL DEFAULT 0,
  currency CHAR(3) NOT NULL DEFAULT 'ZAR',
  payment_provider TEXT,
  payment_reference TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT orders_status_check CHECK (status IN ('PENDING', 'PAID', 'FAILED', 'REFUNDED')),
  CONSTRAINT orders_total_cents_check CHECK (total_cents >= 0),
  CONSTRAINT orders_currency_check CHECK (currency = upper(currency))
);

CREATE INDEX IF NOT EXISTS orders_user_id_created_at_idx
ON orders (user_id, created_at DESC);

CREATE INDEX IF NOT EXISTS orders_status_idx
ON orders (status);

CREATE UNIQUE INDEX IF NOT EXISTS orders_payment_reference_unique
ON orders (payment_reference)
WHERE payment_reference IS NOT NULL;

CREATE TABLE IF NOT EXISTS order_items (
  id BIGSERIAL PRIMARY KEY,
  order_id BIGINT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id BIGINT NOT NULL REFERENCES products(id) ON DELETE RESTRICT,
  quantity INTEGER NOT NULL DEFAULT 1,
  unit_price_cents INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT order_items_quantity_check CHECK (quantity > 0),
  CONSTRAINT order_items_unit_price_cents_check CHECK (unit_price_cents >= 0)
);

CREATE INDEX IF NOT EXISTS order_items_order_id_idx
ON order_items (order_id);

CREATE INDEX IF NOT EXISTS order_items_product_id_idx
ON order_items (product_id);

CREATE TABLE IF NOT EXISTS downloads (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  product_id BIGINT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  order_id BIGINT REFERENCES orders(id) ON DELETE SET NULL,
  download_count INTEGER NOT NULL DEFAULT 0,
  last_downloaded_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT downloads_download_count_check CHECK (download_count >= 0)
);

CREATE INDEX IF NOT EXISTS downloads_user_id_idx
ON downloads (user_id);

CREATE INDEX IF NOT EXISTS downloads_product_id_idx
ON downloads (product_id);

CREATE INDEX IF NOT EXISTS downloads_order_id_idx
ON downloads (order_id);

CREATE UNIQUE INDEX IF NOT EXISTS downloads_user_product_order_unique
ON downloads (user_id, product_id, COALESCE(order_id, 0));

CREATE TABLE IF NOT EXISTS email_subscribers (
  id BIGSERIAL PRIMARY KEY,
  email TEXT NOT NULL,
  first_name TEXT,
  source TEXT NOT NULL DEFAULT 'footer',
  grade_interest TEXT,
  is_subscribed BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT email_subscribers_source_check CHECK (source IN ('calendar', 'account_signup', 'checkout', 'footer')),
  CONSTRAINT email_subscribers_grade_interest_check CHECK (
    grade_interest IS NULL OR grade_interest IN ('R', '1', '2', '3', '4', '5', '6', '7')
  )
);

CREATE UNIQUE INDEX IF NOT EXISTS email_subscribers_email_unique
ON email_subscribers (lower(email));

DO $$
BEGIN
  IF to_regclass('public.newsletter_subscribers') IS NOT NULL THEN
    INSERT INTO email_subscribers (email, source, created_at, updated_at)
    SELECT
      ns.email,
      CASE
        WHEN ns.source = 'calendar_download' THEN 'calendar'
        ELSE 'footer'
      END,
      ns.created_at,
      ns.updated_at
    FROM newsletter_subscribers ns
    ON CONFLICT ((lower(email)))
    DO UPDATE SET
      source = EXCLUDED.source,
      updated_at = now();
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS free_resources (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL,
  description TEXT NOT NULL,
  resource_type TEXT NOT NULL,
  file_url TEXT NOT NULL,
  thumbnail_url TEXT,
  requires_email BOOLEAN NOT NULL DEFAULT true,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT free_resources_resource_type_check CHECK (resource_type IN ('calendar', 'sample_pdf', 'worksheet'))
);

CREATE UNIQUE INDEX IF NOT EXISTS free_resources_slug_unique
ON free_resources (slug);

CREATE INDEX IF NOT EXISTS free_resources_active_type_idx
ON free_resources (is_active, resource_type);

CREATE TABLE IF NOT EXISTS addresses (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  address_line_1 TEXT NOT NULL,
  address_line_2 TEXT,
  city TEXT NOT NULL,
  province TEXT NOT NULL,
  postal_code TEXT NOT NULL,
  country TEXT NOT NULL DEFAULT 'South Africa',
  phone TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT addresses_type_check CHECK (type IN ('SHIPPING', 'BILLING'))
);

CREATE INDEX IF NOT EXISTS addresses_user_id_idx
ON addresses (user_id);

CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger
    WHERE tgname = 'users_set_updated_at'
      AND tgrelid = 'users'::regclass
  ) THEN
    CREATE TRIGGER users_set_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION set_updated_at();
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger
    WHERE tgname = 'children_set_updated_at'
      AND tgrelid = 'children'::regclass
  ) THEN
    CREATE TRIGGER children_set_updated_at
    BEFORE UPDATE ON children
    FOR EACH ROW
    EXECUTE FUNCTION set_updated_at();
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger
    WHERE tgname = 'products_set_updated_at'
      AND tgrelid = 'products'::regclass
  ) THEN
    CREATE TRIGGER products_set_updated_at
    BEFORE UPDATE ON products
    FOR EACH ROW
    EXECUTE FUNCTION set_updated_at();
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger
    WHERE tgname = 'orders_set_updated_at'
      AND tgrelid = 'orders'::regclass
  ) THEN
    CREATE TRIGGER orders_set_updated_at
    BEFORE UPDATE ON orders
    FOR EACH ROW
    EXECUTE FUNCTION set_updated_at();
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger
    WHERE tgname = 'email_subscribers_set_updated_at'
      AND tgrelid = 'email_subscribers'::regclass
  ) THEN
    CREATE TRIGGER email_subscribers_set_updated_at
    BEFORE UPDATE ON email_subscribers
    FOR EACH ROW
    EXECUTE FUNCTION set_updated_at();
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger
    WHERE tgname = 'free_resources_set_updated_at'
      AND tgrelid = 'free_resources'::regclass
  ) THEN
    CREATE TRIGGER free_resources_set_updated_at
    BEFORE UPDATE ON free_resources
    FOR EACH ROW
    EXECUTE FUNCTION set_updated_at();
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger
    WHERE tgname = 'addresses_set_updated_at'
      AND tgrelid = 'addresses'::regclass
  ) THEN
    CREATE TRIGGER addresses_set_updated_at
    BEFORE UPDATE ON addresses
    FOR EACH ROW
    EXECUTE FUNCTION set_updated_at();
  END IF;
END $$;

COMMIT;
