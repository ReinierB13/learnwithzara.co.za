import { NextResponse } from "next/server";
import { getSql } from "@/lib/db";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SOURCE_MAP = new Map([
  ["calendar_download", "calendar"],
  ["newsletter_form", "footer"],
  ["calendar", "calendar"],
  ["account_signup", "account_signup"],
  ["checkout", "checkout"],
  ["footer", "footer"],
]);

async function ensureNewsletterSchema() {
  const sql = getSql();

  await sql`
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
    )
  `;

  await sql`
    CREATE UNIQUE INDEX IF NOT EXISTS email_subscribers_email_unique
    ON email_subscribers (lower(email))
  `;
}

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const email =
    typeof payload === "object" &&
    payload !== null &&
    "email" in payload &&
    typeof payload.email === "string"
      ? payload.email.trim().toLowerCase()
      : "";
  const source =
    typeof payload === "object" &&
    payload !== null &&
    "source" in payload &&
    typeof payload.source === "string"
      ? SOURCE_MAP.get(payload.source) || "footer"
      : "footer";

  if (!EMAIL_PATTERN.test(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  try {
    const sql = getSql();

    await ensureNewsletterSchema();

    const subscribers = (await sql`
      INSERT INTO email_subscribers (email, source)
      VALUES (${email}, ${source})
      ON CONFLICT ((lower(email)))
      DO UPDATE SET
        updated_at = now(),
        source = EXCLUDED.source,
        is_subscribed = true
      RETURNING id, email, created_at, updated_at
    `) as Array<{
      id: number;
      email: string;
      created_at: string;
      updated_at: string;
    }>;

    return NextResponse.json({
      subscriber: subscribers[0],
      downloadUrl:
        source === "calendar"
          ? "/Calender_Free_download_QR_code.png"
          : null,
      downloadUrls:
        source === "calendar"
          ? [
              "/Calender_Free_download_QR_code.png",
              "/Calender_Free_download_QR_code_2027.png",
            ]
          : [],
    });
  } catch (error) {
    console.error("Newsletter signup failed:", error);
    return NextResponse.json(
      { error: "We could not save your email right now." },
      { status: 500 },
    );
  }
}
