import Image from "next/image";
import Link from "next/link";
import {
  formatBengaliDate,
  formatBengaliTime,
  getNewsSection,
  resolveNewsImageUrl,
} from "@/lib/news";

const MainNews = async () => {
  const section = await getNewsSection(0);

  if (!section || section.articles.length === 0) {
    return null;
  }

  const firstNews = section.articles[0];
  const extraNews = section.articles.slice(1, 5);

  const date = formatBengaliDate(firstNews.firstPublished);
  const time = formatBengaliTime(firstNews.firstPublished);
  const imageUrl = resolveNewsImageUrl(firstNews.imageUrl);

  return (
    <section className="bg-gray-50 py-6">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 px-4 md:grid-cols-2">
        {/* Main News */}
        <article className="overflow-hidden rounded-lg border border-gray-200 bg-white transition-shadow duration-300 hover:shadow-md">
          <Link
            href={`/news/${firstNews.id}`}
            className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-red-600"
          >
            {imageUrl && (
              <figure className="overflow-hidden">
                <Image
                  src={imageUrl}
                  alt={firstNews.imageAlt || "News Image"}
                  width={640}
                  height={360}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="h-auto max-h-64 w-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </figure>
            )}

            <div className="p-4">
              <p className="mb-2 text-xs font-semibold text-red-600">
                {firstNews.category}
              </p>

              <h2 className="mb-3 text-xl font-bold leading-snug text-gray-900 transition-colors hover:text-red-700">
                {firstNews.title}
              </h2>

              <p className="mb-4 line-clamp-3 text-sm leading-6 text-gray-600">
                {firstNews.description}
              </p>

              {date && time && (
                <p className="text-xs text-gray-400">
                  {date}, {time}
                </p>
              )}
            </div>
          </Link>
        </article>

        {/* Extra News */}
        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
          {extraNews.map((news, index) => (
            <Link
              key={news.id}
              href={`/news/${news.id}`}
              className={`block p-4 transition-colors duration-200 hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-red-600 ${
                index !== extraNews.length - 1
                  ? "border-b border-gray-200"
                  : ""
              }`}
            >
              <p className="mb-1.5 text-sm font-semibold text-red-600">
                {news.category}
              </p>

              <h3 className="text-base font-semibold leading-snug text-gray-900 transition-colors hover:text-red-700">
                {news.title}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MainNews;
