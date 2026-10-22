import { notFound } from "next/navigation";
import { Suspense } from "react";
import CategoryNewsCard from "@/components/CategoryNewsCard";
import { getCategoryNews } from "@/lib/news";

export default function CategoryPage({
  params,
}: PageProps<"/category/[id]">) {
  return (
    <Suspense fallback={<CategoryPageSkeleton />}>
      <CategoryContent params={params} />
    </Suspense>
  );
}

async function CategoryContent({
  params,
}: {
  params: PageProps<"/category/[id]">["params"];
}) {
  const { id } = await params;
  const category = await getCategoryNews(id);

  if (!category) {
    notFound();
  }

  return (
    <section className="container mx-auto px-4 py-8 space-y-6 pb-10">
      <div className="space-y-3">
        <h2 className="text-2xl font-bold text-gray-900">{category.title}</h2>

        <div className="h-1 w-full bg-red-600 rounded"></div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {category.data.map((article) => (
          <CategoryNewsCard
            key={article.id}
            article={article}
            categoryTitle={category.title}
          />
        ))}
      </div>
    </section>
  );
}

function CategoryPageSkeleton() {
  return (
    <section className="container mx-auto animate-pulse px-4 py-8 space-y-6 pb-10">
      <div className="space-y-3">
        <div className="h-8 w-40 rounded bg-gray-200" />
        <div className="h-1 w-full rounded bg-gray-200" />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="h-80 rounded-lg border border-gray-200 bg-gray-100"
          />
        ))}
      </div>
    </section>
  );
}
