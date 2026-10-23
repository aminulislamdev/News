export default function AuthFormSkeleton() {
  return (
    <div className="space-y-5" role="status">
      <span className="sr-only">ফর্ম লোড হচ্ছে…</span>

      {Array.from({ length: 2 }).map((_, index) => (
        <div key={index} className="space-y-1.5" aria-hidden="true">
          <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
          <div className="h-10 w-full animate-pulse rounded-md bg-gray-100" />
        </div>
      ))}

      <div
        aria-hidden="true"
        className="h-10 w-full animate-pulse rounded-md bg-gray-200"
      />
    </div>
  );
}
