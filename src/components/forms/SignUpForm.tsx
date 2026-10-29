"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  useEffect,
  useState,
  type FormEvent,
} from "react";
import { signUp } from "@/lib/auth-client";
import {
  getAuthErrorMessage,
  normalizeEmail,
  validateEmail,
  validateName,
  validateNewPassword,
  validatePasswordConfirmation,
} from "@/lib/auth-validation";
import AuthField from "./AuthField";
import AuthSubmitButton from "./AuthSubmitButton";

interface SignUpFormProps {
  callbackUrl: string;
}

interface FieldErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export default function SignUpForm({ callbackUrl }: SignUpFormProps) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState(false);

  const signInHref =
    callbackUrl === "/"
      ? "/sign-in"
      : `/sign-in?callbackUrl=${encodeURIComponent(callbackUrl)}`;

  useEffect(() => {
    if (!isSuccessful) {
      return;
    }

    const timer = window.setTimeout(() => {
      router.replace(callbackUrl);
      router.refresh();
    }, 1400);

    return () => window.clearTimeout(timer);
  }, [callbackUrl, isSuccessful, router]);

  function clearFormError() {
    if (formError) {
      setFormError(null);
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    clearFormError();

    const nextErrors: FieldErrors = {
      name: validateName(name) ?? undefined,
      email: validateEmail(email) ?? undefined,
      password: validateNewPassword(password) ?? undefined,
      confirmPassword:
        validatePasswordConfirmation(password, confirmPassword) ?? undefined,
    };

    setFieldErrors(nextErrors);

    if (
      nextErrors.name ||
      nextErrors.email ||
      nextErrors.password ||
      nextErrors.confirmPassword
    ) {
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await signUp.email({
        name: name.trim(),
        email: normalizeEmail(email),
        password,
      });

      if (error) {
        setFormError(getAuthErrorMessage(error, "sign-up"));
        return;
      }

      setIsSuccessful(true);
    } catch (error) {
      setFormError(getAuthErrorMessage(error, "sign-up"));
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSuccessful) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="space-y-5 text-center"
      >
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-50 text-green-700">
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-7 w-7"
          >
            <path d="m5 12 4 4L19 6" />
          </svg>
        </div>

        <div>
          <h2 className="text-xl font-bold text-gray-900">
            অ্যাকাউন্ট তৈরি হয়েছে
          </h2>
          <p className="mt-2 text-sm leading-6 text-gray-600">
            স্বাগতম, {name.trim()}। আপনাকে পরবর্তী পাতায় নিয়ে যাওয়া হচ্ছে…
          </p>
        </div>

        <Link
          href={callbackUrl}
          className="inline-flex items-center justify-center rounded-md bg-red-700 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-red-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2"
        >
          এখনই যান
        </Link>
      </div>
    );
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

      <AuthField
        name="name"
        label="নাম"
        type="text"
        value={name}
        onChange={(event) => {
          setName(event.target.value);
          clearFormError();

          if (fieldErrors.name) {
            setFieldErrors((previous) => ({
              ...previous,
              name: undefined,
            }));
          }
        }}
        error={fieldErrors.name}
        autoComplete="name"
        placeholder="আপনার নাম"
        maxLength={80}
        required
        disabled={isSubmitting}
      />

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
        hint="কমপক্ষে ৮ অক্ষর ব্যবহার করুন।"
        autoComplete="new-password"
        placeholder="একটি শক্তিশালী পাসওয়ার্ড"
        required
        disabled={isSubmitting}
      />

      <AuthField
        name="confirmPassword"
        label="পাসওয়ার্ড নিশ্চিত করুন"
        type="password"
        revealPassword
        value={confirmPassword}
        onChange={(event) => {
          setConfirmPassword(event.target.value);
          clearFormError();

          if (fieldErrors.confirmPassword) {
            setFieldErrors((previous) => ({
              ...previous,
              confirmPassword: undefined,
            }));
          }
        }}
        error={fieldErrors.confirmPassword}
        autoComplete="new-password"
        placeholder="পাসওয়ার্ডটি আবার লিখুন"
        required
        disabled={isSubmitting}
      />

      <AuthSubmitButton
        isLoading={isSubmitting}
        idleLabel="অ্যাকাউন্ট তৈরি করুন"
        loadingLabel="অ্যাকাউন্ট তৈরি হচ্ছে…"
      />

      <p className="text-center text-sm text-gray-600">
        আগেই অ্যাকাউন্ট আছে?{" "}
        <Link
          href={signInHref}
          className="font-semibold text-red-700 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2"
        >
          সাইন ইন করুন
        </Link>
      </p>
    </form>
  );
}
