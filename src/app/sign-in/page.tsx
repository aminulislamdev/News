import type { Metadata } from "next";
import { Suspense } from "react";
import AuthFormSkeleton from "@/components/forms/AuthFormSkeleton";
import AuthShell from "@/components/auth/AuthShell";
import SignInForm from "@/components/forms/SignInForm";
import { getSafeCallbackUrl } from "@/lib/auth-validation";
import { getServerSession } from "@/lib/session";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "সাইন ইন | Bangla News 24",
};

interface SignInPageProps {
  searchParams: Promise<{ callbackUrl?: string | string[] }>;
}

export default function SignInPage({ searchParams }: SignInPageProps) {
  return (
    <AuthShell
      title="সাইন ইন"
      subtitle="আপনার অ্যাকাউন্টে প্রবেশ করতে ইমেইল ও পাসওয়ার্ড দিন।"
    >
      <Suspense fallback={<AuthFormSkeleton />}>
        <SignInContent searchParams={searchParams} />
      </Suspense>
    </AuthShell>
  );
}

async function SignInContent({ searchParams }: SignInPageProps) {
  const params = await searchParams;
  const callbackUrl = getSafeCallbackUrl(params.callbackUrl);
  const session = await getServerSession();

  if (session) {
    redirect(callbackUrl);
  }

  return <SignInForm callbackUrl={callbackUrl} />;
}
