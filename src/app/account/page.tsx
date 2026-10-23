import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import SignOutButton from "@/components/auth/SignOutButton";
import { requireSession } from "@/lib/session";

export const metadata: Metadata = {
  title: "আমার অ্যাকাউন্ট | Bangla News 24",
};

export default function AccountPage() {
  return (
    <section className="mx-auto w-full max-w-2xl px-4 py-10 sm:py-14">
      <Suspense fallback={<AccountSkeleton />}>
        <AccountContent />
      </Suspense>
    </section>
  );
}

async function AccountContent() {
  const session = await requireSession("/account");
  const memberSince = new Intl.DateTimeFormat("bn-BD", {
    dateStyle: "long",
    timeZone: "Asia/Dhaka",
  }).format(new Date(session.user.createdAt));

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <div aria-hidden="true" className="h-1.5 bg-red-700" />

      <div className="p-6 sm:p-8">
        <p className="text-sm font-semibold text-red-700">আমার অ্যাকাউন্ট</p>

        <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl">
          স্বাগতম, {session.user.name}
        </h1>

        <p className="mt-2 text-sm leading-6 text-gray-600">
          আপনি সাইন ইন অবস্থায় আছেন। আপনার সেশন সার্ভারে যাচাই করা হয়েছে।
        </p>

        <dl className="mt-6 space-y-4 border-t border-gray-200 pt-6">
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wide text-gray-500">
              নাম
            </dt>
            <dd className="mt-1 text-sm text-gray-900">
              {session.user.name}
            </dd>
          </div>

          <div>
            <dt className="text-xs font-semibold uppercase tracking-wide text-gray-500">
              ইমেইল
            </dt>
            <dd className="mt-1 break-all text-sm text-gray-900">
              {session.user.email}
            </dd>
          </div>

          <div>
            <dt className="text-xs font-semibold uppercase tracking-wide text-gray-500">
              সদস্য হয়েছেন
            </dt>
            <dd className="mt-1 text-sm text-gray-900">{memberSince}</dd>
          </div>
        </dl>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-gray-300 px-4 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:border-red-300 hover:text-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2"
          >
            হোমে ফিরে যান
          </Link>

          <SignOutButton
            containerClassName="w-full sm:w-auto"
            className="w-full rounded-md bg-red-700 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-red-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
          />
        </div>
      </div>
    </div>
  );
}

function AccountSkeleton() {
  return (
    <div
      role="status"
      className="animate-pulse overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm"
    >
      <span className="sr-only">অ্যাকাউন্ট লোড হচ্ছে…</span>
      <div aria-hidden="true" className="h-1.5 bg-gray-200" />
      <div aria-hidden="true" className="space-y-4 p-6 sm:p-8">
        <div className="h-4 w-28 rounded bg-gray-200" />
        <div className="h-8 w-3/4 rounded bg-gray-200" />
        <div className="h-4 w-full rounded bg-gray-100" />
        <div className="mt-6 h-px w-full bg-gray-200" />
        <div className="h-12 w-full rounded bg-gray-100" />
        <div className="h-12 w-full rounded bg-gray-100" />
      </div>
    </div>
  );
}
