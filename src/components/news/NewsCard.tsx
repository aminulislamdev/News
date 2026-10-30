import Image from "next/image";
import Link from "next/link";
import { resolveNewsImageUrl } from "@/lib/news";
import type { INewsArticle } from "@/types/news";

interface NewsCardProps {
  article: INewsArticle;
}

const NewsCard = ({ article }: NewsCardProps) => {
  const imageUrl = resolveNewsImageUrl(article.imageUrl);

  return (
    <article className="card h-full overflow-hidden bg-base-100 shadow-sm">
      <Link
        href={`/news/${article.id}`}
        className="flex h-full min-w-0 flex-col rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2"
      >
        {imageUrl && (
          <figure>
            <Image
              src={imageUrl}
              alt={article.imageAlt || article.title}
              width={400}
              height={250}
              sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, (max-width: 1279px) 33vw, 25vw"
              className="h-48 w-full object-cover"
            />
          </figure>
        )}

        <div className="card-body min-w-0">
          <h3 className="card-title break-words">{article.title}</h3>

          <p className="line-clamp-3 break-words text-sm text-gray-600">
            {article.description}
          </p>
        </div>
      </Link>
    </article>
  );
};

export default NewsCard;
