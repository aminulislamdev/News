import Image from "next/image";

const MainNews = async () => {
  const res = await fetch(
    "https://news-api-v2.vercel.app/api/news/sections"
  );

  const data = await res.json();
  const mainNews = data.data[0].articles;

  const firstNews = mainNews[0];
  const extraNews = mainNews.slice(1, 5);

  const date = new Date().toLocaleDateString("bn-BD", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const time = new Date().toLocaleTimeString("bn-BD", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <section className="bg-gray-50 py-6">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 px-4 md:grid-cols-2">
        {/* Main News */}
        <article className="overflow-hidden rounded-lg border border-gray-200 bg-white transition-shadow duration-300 hover:shadow-md">
          <figure className="overflow-hidden">
            <Image
              src={firstNews.imageUrl}
              alt={firstNews.imageAlt || "News Image"}
              width={640}
              height={360}
              className="h-auto max-h-64 w-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </figure>

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

            <p className="text-xs text-gray-400">
              {date}, {time}
            </p>
          </div>
        </article>

        {/* Extra News */}
        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
          {extraNews.map(
            (news: { id?: string | number; category: string; title: string }, index: number) => (
              <article
                key={news.id ?? index}
                className={`p-4 transition-colors duration-200 hover:bg-gray-50 ${index !== extraNews.length - 1
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
              </article>
            ))}
        </div>
      </div>
    </section>
  );
};

export default MainNews;