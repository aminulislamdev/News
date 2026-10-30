import Image from "next/image";
import Link from "next/link";
import { resolveNewsImageUrl } from "@/lib/news";
import type { INewsArticle } from "@/types/news";

interface CategoryNewsCardProps {
  article: INewsArticle;
  categoryTitle: string;
}

const CategoryNewsCard = ({
  article,
  categoryTitle,
}: CategoryNewsCardProps) => {
  const imageUrl = resolveNewsImageUrl(article.imageUrl);

  return (
    <article className="flex h-full min-w-0 flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-shadow duration-300 hover:shadow-md">
      <Link
        href={`/news/${article.id}`}
        className="flex h-full min-w-0 flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-red-600"
      >
        {imageUrl && (
          <figure className="relative h-52 w-full">
            <Image
              src={imageUrl}
              alt={article.imageAlt || article.title}
              fill
              className="object-cover"
              sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
            />
          </figure>
        )}

        <div className="flex min-w-0 grow flex-col p-4 md:p-5">
          <span className="mb-2 block break-words text-sm font-semibold text-red-600">
            {categoryTitle}
          </span>

          <h3 className="mb-2 line-clamp-2 break-words text-lg font-bold leading-snug text-gray-900 transition-colors hover:text-red-600">
            {article.title}
          </h3>

          <p className="mb-4 line-clamp-3 grow break-words text-sm text-gray-600">
            {article.description}
          </p>
        </div>
      </Link>
    </article>
  );
};

export default CategoryNewsCard;
