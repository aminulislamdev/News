export const MIN_PASSWORD_LENGTH = 8;
export const MAX_PASSWORD_LENGTH = 128;
export const MAX_NAME_LENGTH = 80;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const CONTROL_CHARACTER_PATTERN = /[\u0000-\u001f\u007f]/;

export function normalizeEmail(value: string): string {
  return value.trim().toLowerCase();
}

export function validateName(value: string): string | null {
  const name = value.trim();

  if (!name) {
    return "নাম দিন।";
  }

  if (name.length < 2) {
    return "নাম কমপক্ষে ২ অক্ষরের হতে হবে।";
  }

  if (name.length > MAX_NAME_LENGTH) {
    return `নাম ${MAX_NAME_LENGTH} অক্ষরের বেশি হতে পারবে না।`;
  }

  return null;
}

export function validateEmail(value: string): string | null {
  const email = value.trim();

  if (!email) {
    return "ইমেইল দিন।";
  }

  if (email.length > 254 || !EMAIL_PATTERN.test(email)) {
    return "সঠিক ইমেইল ঠিকানা দিন।";
  }

  return null;
}

export function validateNewPassword(value: string): string | null {
  if (!value) {
    return "পাসওয়ার্ড দিন।";
  }

  if (value.length < MIN_PASSWORD_LENGTH) {
    return `পাসওয়ার্ড কমপক্ষে ${MIN_PASSWORD_LENGTH} অক্ষরের হতে হবে।`;
  }

  if (value.length > MAX_PASSWORD_LENGTH) {
    return `পাসওয়ার্ড ${MAX_PASSWORD_LENGTH} অক্ষরের বেশি হতে পারবে না।`;
  }

  return null;
}

export function validateRequiredPassword(value: string): string | null {
  return value ? null : "পাসওয়ার্ড দিন।";
}

export function validatePasswordConfirmation(
  password: string,
  confirmation: string
): string | null {
  if (!confirmation) {
    return "পাসওয়ার্ডটি আবার দিন।";
  }

  if (password !== confirmation) {
    return "পাসওয়ার্ড দুটি মিলছে না।";
  }

  return null;
}

/**
 * Only allow same-origin absolute paths. Rejects protocol-relative URLs,
 * backslashes, control characters, API routes, and the auth pages themselves
 * so a crafted callback URL cannot become an open redirect or redirect loop.
 */
export function getSafeCallbackUrl(
  value: string | string[] | undefined,
  fallback = "/"
): string {
  const candidate = Array.isArray(value) ? value[0] : value;

  if (!candidate) {
    return fallback;
  }

  const trimmed = candidate.trim();

  if (
    !trimmed.startsWith("/") ||
    trimmed.startsWith("//") ||
    trimmed.includes("\\") ||
    CONTROL_CHARACTER_PATTERN.test(trimmed)
  ) {
    return fallback;
  }

  try {
    const url = new URL(trimmed, "https://safe.invalid");
    const pathname = url.pathname;

    if (
      url.origin !== "https://safe.invalid" ||
      pathname === "/sign-in" ||
      pathname === "/sign-up" ||
      pathname.startsWith("/api/")
    ) {
      return fallback;
    }

    return `${pathname}${url.search}${url.hash}`;
  } catch {
    return fallback;
  }
}

type AuthErrorDetails = {
  code?: unknown;
  message?: unknown;
  status?: unknown;
};

export function getAuthErrorMessage(
  error: unknown,
  action: "sign-in" | "sign-up"
): string {
  const details =
    typeof error === "object" && error !== null
      ? (error as AuthErrorDetails)
      : null;
  const code =
    typeof details?.code === "string"
      ? details.code.toUpperCase()
      : undefined;
  const status =
    typeof details?.status === "number" ? details.status : undefined;
  const message =
    typeof details?.message === "string" ? details.message.toLowerCase() : "";

  if (
    code === "USER_ALREADY_EXISTS" ||
    code === "USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL" ||
    message.includes("already exists")
  ) {
    return "এই ইমেইল দিয়ে ইতিমধ্যে একটি অ্যাকাউন্ট আছে। সাইন ইন করুন।";
  }

  if (
    code === "INVALID_EMAIL_OR_PASSWORD" ||
    code === "INVALID_PASSWORD" ||
    message.includes("invalid email or password")
  ) {
    return "ইমেইল বা পাসওয়ার্ড সঠিক নয়।";
  }

  if (code === "PASSWORD_TOO_SHORT" || message.includes("password too short")) {
    return `পাসওয়ার্ড কমপক্ষে ${MIN_PASSWORD_LENGTH} অক্ষরের হতে হবে।`;
  }

  if (code === "PASSWORD_TOO_LONG" || message.includes("password too long")) {
    return `পাসওয়ার্ড ${MAX_PASSWORD_LENGTH} অক্ষরের বেশি হতে পারবে না।`;
  }

  if (code === "INVALID_EMAIL" || code === "INVALID_EMAIL_FORMAT") {
    return "সঠিক ইমেইল ঠিকানা দিন।";
  }

  if (code === "VALIDATION_ERROR" || code === "MISSING_FIELD") {
    return "আপনার দেওয়া তথ্য সঠিক নয়। আবার যাচাই করে চেষ্টা করুন।";
  }

  if (
    status === 429 ||
    message.includes("too many requests") ||
    message.includes("rate limit")
  ) {
    return "অনেকবার চেষ্টা করা হয়েছে। কিছুক্ষণ অপেক্ষা করে আবার চেষ্টা করুন।";
  }

  if (
    status === 0 ||
    message.includes("failed to fetch") ||
    message.includes("network")
  ) {
    return "সার্ভারে সংযোগ করা যায়নি। আবার চেষ্টা করুন।";
  }

  return action === "sign-up"
    ? "অ্যাকাউন্ট তৈরি করা যায়নি। আবার চেষ্টা করুন।"
    : "সাইন ইন করা যায়নি। আবার চেষ্টা করুন।";
}
