"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { signOut } from "@/lib/auth-client";

interface SignOutButtonProps {
  className?: string;
  containerClassName?: string;
  label?: string;
  onSignedOut?: () => void;
  redirectTo?: string;
}

const defaultButtonClassName =
  "rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-700 transition-colors hover:border-red-300 hover:text-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60";

export default function SignOutButton({
  className,
  containerClassName,
  label = "সাইন আউট",
  onSignedOut,
  redirectTo = "/",
}: SignOutButtonProps) {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSignOut() {
    setError(null);
    setIsPending(true);

    try {
      const result = await signOut();

      if (result.error) {
        setError("সাইন আউট করা যায়নি। আবার চেষ্টা করুন।");
        return;
      }

      onSignedOut?.();
      router.replace(redirectTo);
      router.refresh();
    } catch {
      setError("সাইন আউট করা যায়নি। আবার চেষ্টা করুন।");
    } finally {
      setIsPending(false);
    }
  }

  return (
    <div
      className={`flex flex-col items-end gap-1 ${
        containerClassName ?? ""
      }`}
    >
      <button
        type="button"
        onClick={handleSignOut}
        disabled={isPending}
        className={className ?? defaultButtonClassName}
      >
        {isPending ? "সাইন আউট হচ্ছে…" : label}
      </button>

      {error && (
        <p role="alert" className="text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
