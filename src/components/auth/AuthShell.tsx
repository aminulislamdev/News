import type { ReactNode } from "react";

interface AuthShellProps {
  title: string;
  subtitle: string;
  children: ReactNode;
}

export default function AuthShell({
  title,
  subtitle,
  children,
}: AuthShellProps) {
  return (
    <section className="mx-auto w-full max-w-lg px-4 py-8 sm:py-14">
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div aria-hidden="true" className="h-1.5 bg-red-700" />

        <div className="p-5 sm:p-8">
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            {title}
          </h1>
          <p className="mt-2 text-sm leading-6 text-gray-600">{subtitle}</p>

          <div className="mt-6">{children}</div>
        </div>
      </div>
    </section>
  );
}
