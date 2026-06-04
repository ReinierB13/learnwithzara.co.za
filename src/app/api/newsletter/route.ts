import { NextResponse } from "next/server";
import { getSql } from "@/lib/db";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ALLOWED_SOURCES = new Set(["newsletter_form", "calendar_download"]);

async function ensureNewsletterSchema() {
  const sql = getSql();

  await sql`
    CREATE TABLE IF NOT EXISTS newsletter_subscribers (
      id BIGSERIAL PRIMARY KEY,
      email TEXT NOT NULL,
      source TEXT NOT NULL DEFAULT 'newsletter_form',
      consented_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `;

  await sql`
    CREATE UNIQUE INDEX IF NOT EXISTS newsletter_subscribers_email_unique
    ON newsletter_subscribers (lower(email))
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
    typeof payload.source === "string" &&
    ALLOWED_SOURCES.has(payload.source)
      ? payload.source
      : "newsletter_form";

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
      INSERT INTO newsletter_subscribers (email, source)
      VALUES (${email}, ${source})
      ON CONFLICT ((lower(email)))
      DO UPDATE SET updated_at = now(), source = EXCLUDED.source
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
        source === "calendar_download"
          ? "/Calender_Free_download_QR_code.png"
          : null,
      downloadUrls:
        source === "calendar_download"
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
