import "server-only";

import { createHmac, randomBytes, scryptSync, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import { getSql } from "@/lib/db";

const SESSION_COOKIE = "learn_with_zara_session";
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 14;

export type AccountUser = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: "PARENT" | "TEACHER" | "ADMIN";
};

type SessionPayload = {
  userId: number;
  exp: number;
};

function getSessionSecret() {
  const secret = process.env.AUTH_SECRET || process.env.DATABASE_URL;

  if (!secret) {
    throw new Error("AUTH_SECRET or DATABASE_URL must be configured.");
  }

  return secret;
}

function sign(value: string) {
  return createHmac("sha256", getSessionSecret()).update(value).digest("base64url");
}

function encodeSession(payload: SessionPayload) {
  const encoded = Buffer.from(JSON.stringify(payload), "utf8").toString("base64url");
  return `${encoded}.${sign(encoded)}`;
}

function decodeSession(token: string): SessionPayload | null {
  const [encoded, signature] = token.split(".");

  if (!encoded || !signature) {
    return null;
  }

  const expected = sign(encoded);
  const signatureBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expected);

  if (
    signatureBuffer.length !== expectedBuffer.length ||
    !timingSafeEqual(signatureBuffer, expectedBuffer)
  ) {
    return null;
  }

  try {
    const payload = JSON.parse(
      Buffer.from(encoded, "base64url").toString("utf8"),
    ) as SessionPayload;

    if (!payload.userId || !payload.exp || payload.exp < Math.floor(Date.now() / 1000)) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}

export function hashPassword(password: string) {
  const salt = randomBytes(16).toString("base64url");
  const hash = scryptSync(password, salt, 64).toString("base64url");
  return `scrypt:${salt}:${hash}`;
}

export function verifyPassword(password: string, passwordHash: string) {
  const [algorithm, salt, hash] = passwordHash.split(":");

  if (algorithm !== "scrypt" || !salt || !hash) {
    return false;
  }

  const actual = Buffer.from(scryptSync(password, salt, 64).toString("base64url"));
  const expected = Buffer.from(hash);

  return actual.length === expected.length && timingSafeEqual(actual, expected);
}

export async function createSession(userId: number) {
  const expiresAt = Math.floor(Date.now() / 1000) + SESSION_MAX_AGE_SECONDS;
  const cookieStore = await cookies();

  cookieStore.set(SESSION_COOKIE, encodeSession({ userId, exp: expiresAt }), {
    httpOnly: true,
    maxAge: SESSION_MAX_AGE_SECONDS,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
}

export async function clearSession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}

export async function getCurrentUser(): Promise<AccountUser | null> {
  const cookieStore = await cookies();
  const session = cookieStore.get(SESSION_COOKIE)?.value;

  if (!session) {
    return null;
  }

  const payload = decodeSession(session);

  if (!payload) {
    return null;
  }

  const sql = getSql();
  const users = (await sql`
    SELECT id, email, first_name, last_name, role
    FROM users
    WHERE id = ${payload.userId}
    LIMIT 1
  `) as Array<{
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    role: AccountUser["role"];
  }>;

  const user = users[0];

  if (!user) {
    return null;
  }

  return {
    id: user.id,
    email: user.email,
    firstName: user.first_name,
    lastName: user.last_name,
    role: user.role,
  };
}
