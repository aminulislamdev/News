"use client";

import { useState } from "react";
import { signIn } from "@/lib/auth-client";
import { getOAuthErrorMessage } from "@/lib/auth-validation";

interface GoogleSignInButtonProps {
  callbackUrl: string;
  errorCallbackUrl: string;
  onError: (message: string | null) => void;
  disabled?: boolean;
}

const GENERIC_GOOGLE_ERROR =
  "Google দিয়ে সাইন ইন করা যায়নি। আবার চেষ্টা করুন।";

function GoogleLogo() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 48 48"
      className="h-5 w-5 shrink-0"
    >
      <path
        fill="#EA4335"
        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
      />
      <path
        fill="#4285F4"
        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
      />
      <path
        fill="#FBBC05"
        d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
      />
      <path
        fill="#34A853"
        d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
      />
    </svg>
  );
}

export default function GoogleSignInButton({
  callbackUrl,
  errorCallbackUrl,
  onError,
  disabled = false,
}: GoogleSignInButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  async function handleClick() {
    if (isLoading) {
      return;
    }

    onError(null);
    setIsLoading(true);

    try {
      const { error } = await signIn.social({
        provider: "google",
        callbackURL: callbackUrl,
        newUserCallbackURL: callbackUrl,
        errorCallbackURL: errorCallbackUrl,
      });

      if (error) {
        const code = typeof error.code === "string" ? error.code : undefined;
        onError(getOAuthErrorMessage(code) ?? GENERIC_GOOGLE_ERROR);
        setIsLoading(false);
      }

      // On success Better Auth redirects the browser to Google, so the loading
      // state is intentionally left active until the navigation happens.
    } catch {
      onError(GENERIC_GOOGLE_ERROR);
      setIsLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled || isLoading}
      aria-busy={isLoading}
      className="flex w-full items-center justify-center gap-3 rounded-md border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition-colors hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {isLoading ? (
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          className="h-5 w-5 shrink-0 animate-spin text-gray-500"
        >
          <circle
            cx="12"
            cy="12"
            r="9"
            stroke="currentColor"
            strokeWidth="3"
            className="opacity-25"
          />
          <path
            d="M21 12a9 9 0 0 0-9-9"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            className="opacity-90"
          />
        </svg>
      ) : (
        <GoogleLogo />
      )}

      <span aria-live="polite" className="min-w-0 text-center">
        {isLoading ? "Google-এ নিয়ে যাওয়া হচ্ছে…" : "Continue with Google"}
      </span>
    </button>
  );
}
