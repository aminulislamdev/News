import type { Metadata } from "next";
import { Suspense } from "react";
import AuthFormSkeleton from "@/components/auth/AuthFormSkeleton";
import AuthShell from "@/components/auth/AuthShell";
import SignUpForm from "@/components/auth/SignUpForm";
import { getSafeCallbackUrl } from "@/lib/auth-validation";
import { getServerSession } from "@/lib/session";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "সাইন আপ | Bangla News 24",
};

interface SignUpPageProps {
  searchParams: Promise<{ callbackUrl?: string | string[] }>;
}

export default function SignUpPage({ searchParams }: SignUpPageProps) {
  return (
    <AuthShell
      title="অ্যাকাউন্ট তৈরি করুন"
      subtitle="নতুন অ্যাকাউন্ট তৈরি করে Bangla News 24-এর সঙ্গে যুক্ত হোন।"
    >
      <Suspense fallback={<AuthFormSkeleton />}>
        <SignUpContent searchParams={searchParams} />
      </Suspense>
    </AuthShell>
  );
}

async function SignUpContent({ searchParams }: SignUpPageProps) {
  const params = await searchParams;
  const callbackUrl = getSafeCallbackUrl(params.callbackUrl);
  const session = await getServerSession();

  if (session) {
    redirect(callbackUrl);
  }

  return <SignUpForm callbackUrl={callbackUrl} />;
}
