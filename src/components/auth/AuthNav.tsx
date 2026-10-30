"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useSession } from "@/lib/auth-client";
import SignOutButton from "./SignOutButton";

function getInitial(name?: string | null, email?: string | null) {
  const source = name?.trim() || email?.trim();

  if (!source) {
    return "?";
  }

  const firstCharacter = Array.from(source)[0];

  return firstCharacter ? firstCharacter.toLocaleUpperCase() : "?";
}

export default function AuthNav() {
  const { data: session, isPending } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuContainerRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    function handlePointerDown(event: PointerEvent) {
      if (
        menuContainerRef.current &&
        !menuContainerRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

  if (isPending) {
    return (
      <div role="status" className="flex items-center justify-end">
        <span className="sr-only">সেশন লোড হচ্ছে…</span>
        <span
          aria-hidden="true"
          className="h-9 w-9 animate-pulse rounded-full bg-gray-200"
        />
      </div>
    );
  }

  if (!session?.user) {
    return (
      <div className="flex items-center justify-end gap-1 min-[360px]:gap-1.5 sm:gap-3">
        <Link
          href="/sign-in"
          className="whitespace-nowrap rounded-md px-1 py-2 text-xs text-gray-700 transition-colors hover:text-red-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 min-[360px]:px-1.5 sm:px-2 sm:text-sm"
        >
          সাইন ইন
        </Link>
        <Link
          href="/sign-up"
          className="whitespace-nowrap rounded-md bg-red-700 px-2 py-2 text-xs text-white transition-colors hover:bg-red-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2 min-[360px]:px-2.5 sm:px-3 sm:text-sm"
        >
          সাইন আপ
        </Link>
      </div>
    );
  }

  const displayName = session.user.name?.trim() || "ব্যবহারকারী";
  const initial = getInitial(session.user.name, session.user.email);

  return (
    <div
      ref={menuContainerRef}
      className="relative flex items-center justify-end"
    >
      <button
        ref={menuButtonRef}
        type="button"
        onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
        aria-expanded={isMenuOpen}
        aria-controls="user-profile-menu"
        aria-label={`${displayName} — অ্যাকাউন্ট মেনু`}
        title={displayName}
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-red-700 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-red-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2"
      >
        {initial}
      </button>

      {isMenuOpen && (
        <div
          id="user-profile-menu"
          className="absolute right-0 top-full z-50 mt-2 w-64 max-w-[calc(100vw-3rem)] overflow-hidden rounded-xl border border-gray-200 bg-white text-left shadow-lg sm:w-72"
        >
          <Link
            href="/account"
            onClick={() => setIsMenuOpen(false)}
            className="block px-4 py-3 transition-colors hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-red-600"
          >
            <p className="break-words text-sm font-semibold text-gray-900">
              {displayName}
            </p>
            <p className="mt-0.5 break-all text-xs leading-5 text-gray-500">
              {session.user.email}
            </p>
          </Link>

          <div className="border-t border-gray-100 p-2">
            <SignOutButton
              onSignedOut={() => setIsMenuOpen(false)}
              containerClassName="w-full"
              className="w-full rounded-md bg-red-700 px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
            />
          </div>
        </div>
      )}
    </div>
  );
}
