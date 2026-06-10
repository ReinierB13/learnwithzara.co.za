import { NextResponse } from "next/server";

const SUPPORT_EMAIL = "learnwithzara@outlook.com";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_FIELD_LENGTH = 4000;

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  message?: unknown;
  company?: unknown;
};

function textValue(value: unknown) {
  return typeof value === "string" ? value.trim().slice(0, MAX_FIELD_LENGTH) : "";
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export async function POST(request: Request) {
  let payload: ContactPayload;

  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const honeypot = textValue(payload.company);

  if (honeypot) {
    return NextResponse.json({ ok: true });
  }

  const name = textValue(payload.name);
  const email = textValue(payload.email).toLowerCase();
  const message = textValue(payload.message);

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Please complete all contact form fields." },
      { status: 400 },
    );
  }

  if (!EMAIL_PATTERN.test(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;
  const toEmail = process.env.CONTACT_TO_EMAIL || SUPPORT_EMAIL;

  if (!apiKey || !fromEmail) {
    console.error("Contact email is missing RESEND_API_KEY or CONTACT_FROM_EMAIL.");
    return NextResponse.json(
      { error: "Contact email is not configured yet." },
      { status: 500 },
    );
  }

  const subject = `Learn With Zara contact from ${name}`;
  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    "",
    "Message:",
    message,
  ].join("\n");
  const html = `
    <h2>New Learn With Zara contact form message</h2>
    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    <p><strong>Message:</strong></p>
    <p>${escapeHtml(message).replaceAll("\n", "<br />")}</p>
  `;

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        reply_to: email,
        subject,
        text,
        html,
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error("Contact email failed:", response.status, errorBody);
      return NextResponse.json(
        { error: "We could not send your message right now." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact email failed:", error);
    return NextResponse.json(
      { error: "We could not send your message right now." },
      { status: 500 },
    );
  }
}
