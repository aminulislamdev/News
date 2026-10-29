"use client";

import {
  useId,
  useState,
  type InputHTMLAttributes,
} from "react";

interface AuthFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "id" | "name"> {
  name: string;
  label: string;
  error?: string;
  hint?: string;
  revealPassword?: boolean;
}

const inputClassName =
  "block w-full rounded-md border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 shadow-sm outline-none transition placeholder:text-gray-400 focus:border-red-600 focus:ring-2 focus:ring-red-600/20 disabled:cursor-not-allowed disabled:bg-gray-100";

export default function AuthField({
  name,
  label,
  error,
  hint,
  revealPassword = false,
  type = "text",
  className,
  ...props
}: AuthFieldProps) {
  const generatedId = useId();
  const id = `${name}-${generatedId}`;
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;
  const [isRevealed, setIsRevealed] = useState(false);

  const showHint = Boolean(hint) && !error;
  const describedBy =
    [error ? errorId : null, showHint ? hintId : null]
      .filter(Boolean)
      .join(" ") || undefined;
  const resolvedType = revealPassword
    ? isRevealed
      ? "text"
      : "password"
    : type;

  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block text-sm font-medium text-gray-800"
      >
        {label}
      </label>

      <div className="relative">
        <input
          {...props}
          id={id}
          name={name}
          type={resolvedType}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={`${inputClassName} ${
            revealPassword ? "pr-12" : ""
          } ${className ?? ""}`}
        />

        {revealPassword && (
          <button
            type="button"
            onClick={() => setIsRevealed((value) => !value)}
            aria-label={
              isRevealed ? "পাসওয়ার্ড লুকান" : "পাসওয়ার্ড দেখান"
            }
            aria-pressed={isRevealed}
            aria-controls={id}
            className="absolute inset-y-0 right-0 flex w-11 items-center justify-center rounded-r-md text-gray-500 transition-colors hover:text-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-red-600"
          >
            {isRevealed ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        )}
      </div>

      {showHint && (
        <p id={hintId} className="mt-1 text-xs text-gray-500">
          {hint}
        </p>
      )}

      {error && (
        <p id={errorId} className="mt-1 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

function EyeIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
    >
      <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
    >
      <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
      <circle cx="12" cy="12" r="3" />
      <path d="m3 3 18 18" />
    </svg>
  );
}
