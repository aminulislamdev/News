"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { signIn } from "@/lib/auth-client";
import {
  getAuthErrorMessage,
  normalizeEmail,
  validateEmail,
  validateRequiredPassword,
} from "@/lib/auth-validation";
import AuthField from "./AuthField";
import AuthSubmitButton from "./AuthSubmitButton";
import GoogleSignInButton from "./GoogleSignInButton";

interface SignInFormProps {
  callbackUrl: string;
  oauthError?: string | null;
  googleEnabled?: boolean;
}

interface FieldErrors {
  email?: string;
  password?: string;
}

export default function SignInForm({
  callbackUrl,
  oauthError = null,
  googleEnabled = false,
}: SignInFormProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(oauthError);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const signUpHref =
    callbackUrl === "/"
      ? "/sign-up"
      : `/sign-up?callbackUrl=${encodeURIComponent(callbackUrl)}`;

  const errorCallbackUrl =
    callbackUrl === "/"
      ? "/sign-in"
      : `/sign-in?callbackUrl=${encodeURIComponent(callbackUrl)}`;

  function clearFormError() {
    if (formError) {
      setFormError(null);
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    clearFormError();

    const nextErrors: FieldErrors = {
      email: validateEmail(email) ?? undefined,
      password: validateRequiredPassword(password) ?? undefined,
    };

    setFieldErrors(nextErrors);

    if (nextErrors.email || nextErrors.password) {
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await signIn.email({
        email: normalizeEmail(email),
        password,
        rememberMe: true,
      });

      if (error) {
        setFormError(getAuthErrorMessage(error, "sign-in"));
        return;
      }

      router.replace(callbackUrl);
      router.refresh();
    } catch (error) {
      setFormError(getAuthErrorMessage(error, "sign-in"));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-busy={isSubmitting}
      className="space-y-5"
    >
      {formError && (
        <div
          role="alert"
          className="rounded-md border border-red-200 bg-red-50 px-3 py-2.5 text-sm leading-6 text-red-700"
        >
          {formError}
        </div>
      )}

      {googleEnabled && (
        <>
          <GoogleSignInButton
            callbackUrl={callbackUrl}
            errorCallbackUrl={errorCallbackUrl}
            onError={setFormError}
            disabled={isSubmitting}
          />

          <div aria-hidden="true" className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-xs font-medium uppercase tracking-wider">
              <span className="bg-white px-3 text-gray-500">অথবা</span>
            </div>
          </div>
        </>
      )}

      <AuthField
        name="email"
        label="ইমেইল"
        type="email"
        value={email}
        onChange={(event) => {
          setEmail(event.target.value);
          clearFormError();

          if (fieldErrors.email) {
            setFieldErrors((previous) => ({
              ...previous,
              email: undefined,
            }));
          }
        }}
        error={fieldErrors.email}
        autoComplete="email"
        inputMode="email"
        placeholder="you@example.com"
        required
        disabled={isSubmitting}
      />

      <AuthField
        name="password"
        label="পাসওয়ার্ড"
        type="password"
        revealPassword
        value={password}
        onChange={(event) => {
          setPassword(event.target.value);
          clearFormError();

          if (fieldErrors.password) {
            setFieldErrors((previous) => ({
              ...previous,
              password: undefined,
            }));
          }
        }}
        error={fieldErrors.password}
        autoComplete="current-password"
        placeholder="আপনার পাসওয়ার্ড"
        required
        disabled={isSubmitting}
      />

      <AuthSubmitButton
        isLoading={isSubmitting}
        idleLabel="সাইন ইন করুন"
        loadingLabel="সাইন ইন হচ্ছে…"
      />

      <p className="text-center text-sm text-gray-600">
        নতুন ব্যবহারকারী?{" "}
        <Link
          href={signUpHref}
          className="font-semibold text-red-700 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2"
        >
          সাইন আপ করুন
        </Link>
      </p>
    </form>
  );
}
