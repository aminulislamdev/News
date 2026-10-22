import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container mx-auto max-w-3xl px-4 py-16 text-center">
      <p className="text-sm font-semibold text-red-600">৪০৪</p>

      <h1 className="mt-2 text-2xl font-bold text-gray-900">
        পৃষ্ঠাটি পাওয়া যায়নি
      </h1>

      <p className="mt-3 text-gray-600">
        আপনি যে পৃষ্ঠাটি খুঁজছেন সেটি নেই অথবা সরিয়ে ফেলা হয়েছে।
      </p>

      <Link
        href="/"
        className="mt-6 inline-block rounded-md bg-red-700 px-4 py-2 text-sm font-semibold text-white hover:bg-red-900"
      >
        হোমে ফিরে যান
      </Link>
    </section>
  );
}
