import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { getSafeCallbackUrl } from "@/lib/auth-validation";

export async function getServerSession() {
  return auth.api.getSession({
    headers: await headers(),
  });
}

export async function requireSession(callbackUrl: string) {
  const session = await getServerSession();

  if (!session) {
    const safeCallbackUrl = getSafeCallbackUrl(callbackUrl);
    redirect(
      `/sign-in?callbackUrl=${encodeURIComponent(safeCallbackUrl)}`
    );
  }

  return session;
}
