import Link from "next/link";
import { getMostRead } from "@/lib/news";

const MostRead = async () => {
  const mostRead = await getMostRead();

  return (
    <section className="min-w-0 space-y-5">
      <h2 className="break-words border-b-2 border-red-500 pb-2 text-xl font-bold">
        Most Read
      </h2>

      <div className="space-y-4">
        {mostRead.map((news, ind) => (
          <Link
            key={news.id}
            href={`/news/${news.id}`}
            className="flex min-w-0 items-start gap-3 border-b border-gray-200 pb-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2 sm:gap-4"
          >
            <p className="shrink-0 text-3xl font-bold text-red-600">
              {String(ind + 1).padStart(2, "0")}
            </p>

            <div className="flex min-w-0 flex-1 flex-col gap-2">
              <h3 className="break-words font-semibold leading-6 hover:text-red-600">
                {news.title}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default MostRead;
