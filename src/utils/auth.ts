import { DEMO_PASSWORD, DEMO_USER } from "../data/demoUser";

export type LoginResult =
  | { ok: true }
  | { ok: false; field?: "email" | "password"; error: string };

const EMAIL_PATTERN = /^\S+@\S+\.\S+$/;

/** Validates the demo credentials and returns a friendly message on failure. */
export function validateDemoLogin(email: string, password: string): LoginResult {
  const trimmed = email.trim();

  if (trimmed.length === 0) {
    return { ok: false, field: "email", error: "Enter your email address." };
  }
  if (!EMAIL_PATTERN.test(trimmed)) {
    return {
      ok: false,
      field: "email",
      error: "That doesn't look like a valid email address.",
    };
  }
  if (password.length === 0) {
    return { ok: false, field: "password", error: "Enter your password." };
  }
  if (
    trimmed.toLowerCase() !== DEMO_USER.email.toLowerCase() ||
    password !== DEMO_PASSWORD
  ) {
    return {
      ok: false,
      error:
        "That email or password doesn't match the demo account. Use the demo credentials shown on this page.",
    };
  }
  return { ok: true };
}
