"use client";

import Link from "next/link";
import { useSession } from "@/lib/auth-client";
import SignOutButton from "./SignOutButton";

export default function AuthNav() {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return (
      <div
        role="status"
        className="flex items-center justify-end gap-3"
      >
        <span className="sr-only">সেশন লোড হচ্ছে…</span>
        <span
          aria-hidden="true"
          className="h-4 w-14 animate-pulse rounded bg-gray-200"
        />
        <span
          aria-hidden="true"
          className="h-9 w-20 animate-pulse rounded-md bg-gray-200"
        />
      </div>
    );
  }

  if (!session?.user) {
    return (
      <div className="flex items-center justify-end gap-2 sm:gap-3">
        <Link
          href="/sign-in"
          className="rounded-md px-2 py-2 text-sm text-gray-700 transition-colors hover:text-red-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600"
        >
          সাইন ইন
        </Link>
        <Link
          href="/sign-up"
          className="rounded-md bg-red-700 px-3 py-2 text-sm text-white transition-colors hover:bg-red-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2"
        >
          সাইন আপ
        </Link>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-end gap-2 sm:gap-3">
      <Link
        href="/account"
        title={session.user.name}
        className="max-w-24 truncate text-sm font-medium text-gray-700 transition-colors hover:text-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2 sm:max-w-40"
      >
        {session.user.name}
      </Link>

      <SignOutButton className="rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-700 transition-colors hover:border-red-300 hover:text-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2" />
    </div>
  );
}
