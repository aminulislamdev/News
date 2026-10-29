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
    <article className="flex flex-col h-full bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
      <Link
        href={`/news/${article.id}`}
        className="flex flex-col h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-red-600"
      >
        {imageUrl && (
          <figure className="relative w-full h-52">
            <Image
              src={imageUrl}
              alt={article.imageAlt || article.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </figure>
        )}

        <div className="flex flex-col grow p-4 md:p-5">
          <span className="text-red-600 text-sm font-semibold mb-2 block">
            {categoryTitle}
          </span>

          <h3 className="text-lg font-bold text-gray-900 leading-snug mb-2 line-clamp-2 hover:text-red-600 transition-colors">
            {article.title}
          </h3>

          <p className="text-sm text-gray-600 line-clamp-3 mb-4 grow">
            {article.description}
          </p>
        </div>
      </Link>
    </article>
  );
};

export default CategoryNewsCard;
