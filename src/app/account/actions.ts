"use server";

import { redirect } from "next/navigation";
import {
  clearSession,
  createSession,
  getCurrentUser,
  hashPassword,
  verifyPassword,
} from "@/lib/auth";
import { getSql } from "@/lib/db";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const GRADES = new Set(["R", "1", "2", "3", "4", "5", "6", "7"]);
const LANGUAGES = new Set(["English", "Afrikaans"]);

function formValue(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function redirectWithError(mode: "login" | "register", message: string): never {
  redirect(`/account?mode=${mode}&error=${encodeURIComponent(message)}`);
}

function redirectWithChildMessage(type: "childError" | "childSaved", message: string): never {
  redirect(`/account?${type}=${encodeURIComponent(message)}`);
}

export async function registerAccount(formData: FormData) {
  const firstName = formValue(formData, "firstName");
  const lastName = formValue(formData, "lastName");
  const email = formValue(formData, "email").toLowerCase();
  const password = formValue(formData, "password");
  const role = formValue(formData, "role") === "TEACHER" ? "TEACHER" : "PARENT";

  if (!firstName || !lastName) {
    redirectWithError("register", "Please enter your first and last name.");
  }

  if (!EMAIL_PATTERN.test(email)) {
    redirectWithError("register", "Please enter a valid email address.");
  }

  if (password.length < 8) {
    redirectWithError("register", "Password must be at least 8 characters.");
  }

  const sql = getSql();
  const existingUsers = (await sql`
    SELECT id
    FROM users
    WHERE lower(email) = lower(${email})
    LIMIT 1
  `) as Array<{ id: number }>;

  if (existingUsers.length > 0) {
    redirectWithError("register", "An account already exists for this email.");
  }

  const users = (await sql`
    INSERT INTO users (email, password_hash, first_name, last_name, role)
    VALUES (${email}, ${hashPassword(password)}, ${firstName}, ${lastName}, ${role})
    RETURNING id
  `) as Array<{ id: number }>;

  await sql`
    INSERT INTO email_subscribers (email, first_name, source)
    VALUES (${email}, ${firstName}, 'account_signup')
    ON CONFLICT ((lower(email)))
    DO UPDATE SET
      first_name = COALESCE(email_subscribers.first_name, EXCLUDED.first_name),
      source = EXCLUDED.source,
      is_subscribed = true,
      updated_at = now()
  `;

  await createSession(users[0].id);
  redirect("/account");
}

export async function loginAccount(formData: FormData) {
  const email = formValue(formData, "email").toLowerCase();
  const password = formValue(formData, "password");

  if (!EMAIL_PATTERN.test(email) || !password) {
    redirectWithError("login", "Please enter your email and password.");
  }

  const sql = getSql();
  const users = (await sql`
    SELECT id, password_hash
    FROM users
    WHERE lower(email) = lower(${email})
    LIMIT 1
  `) as Array<{ id: number; password_hash: string }>;

  const user = users[0];

  if (!user || !verifyPassword(password, user.password_hash)) {
    redirectWithError("login", "Email or password is incorrect.");
  }

  await createSession(user.id);
  redirect("/account");
}

export async function logoutAccount() {
  await clearSession();
  redirect("/account");
}

export async function addChildProfile(formData: FormData) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/account?mode=login&error=Please sign in to add a child.");
  }

  const firstName = formValue(formData, "firstName");
  const lastName = formValue(formData, "lastName");
  const grade = formValue(formData, "grade");
  const language = formValue(formData, "language");
  const schoolName = formValue(formData, "schoolName");

  if (!firstName || !lastName) {
    redirectWithChildMessage("childError", "Please enter the child's first and last name.");
  }

  if (!GRADES.has(grade)) {
    redirectWithChildMessage("childError", "Please choose a valid grade.");
  }

  if (!LANGUAGES.has(language)) {
    redirectWithChildMessage("childError", "Please choose a valid language.");
  }

  const sql = getSql();

  await sql`
    INSERT INTO children (
      user_id,
      first_name,
      last_name,
      grade,
      school_name,
      language
    )
    VALUES (
      ${user.id},
      ${firstName},
      ${lastName},
      ${grade},
      ${schoolName || null},
      ${language}
    )
  `;

  redirectWithChildMessage("childSaved", `${firstName} has been added.`);
}

export async function deleteChildProfile(formData: FormData) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/account?mode=login&error=Please sign in to manage children.");
  }

  const childId = Number(formValue(formData, "childId"));

  if (!Number.isInteger(childId) || childId <= 0) {
    redirectWithChildMessage("childError", "We could not find that child profile.");
  }

  const sql = getSql();

  await sql`
    DELETE FROM children
    WHERE id = ${childId}
      AND user_id = ${user.id}
  `;

  redirectWithChildMessage("childSaved", "Saved child details have been removed.");
}

export async function updateChildProfile(formData: FormData) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/account?mode=login&error=Please sign in to manage children.");
  }

  const childId = Number(formValue(formData, "childId"));
  const firstName = formValue(formData, "firstName");
  const lastName = formValue(formData, "lastName");
  const grade = formValue(formData, "grade");
  const language = formValue(formData, "language");
  const schoolName = formValue(formData, "schoolName");

  if (!Number.isInteger(childId) || childId <= 0) {
    redirectWithChildMessage("childError", "We could not find that child profile.");
  }

  if (!firstName || !lastName) {
    redirectWithChildMessage("childError", "Please enter the child's first and last name.");
  }

  if (!GRADES.has(grade)) {
    redirectWithChildMessage("childError", "Please choose a valid grade.");
  }

  if (!LANGUAGES.has(language)) {
    redirectWithChildMessage("childError", "Please choose a valid language.");
  }

  const sql = getSql();
  const updatedChildren = (await sql`
    UPDATE children
    SET
      first_name = ${firstName},
      last_name = ${lastName},
      grade = ${grade},
      language = ${language},
      school_name = ${schoolName || null}
    WHERE id = ${childId}
      AND user_id = ${user.id}
    RETURNING id
  `) as Array<{ id: number }>;

  if (updatedChildren.length === 0) {
    redirectWithChildMessage("childError", "We could not update that child profile.");
  }

  redirectWithChildMessage("childSaved", `${firstName}'s details have been updated.`);
}
