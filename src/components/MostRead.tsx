import Link from "next/link";
import { getMostRead } from "@/lib/news";

const MostRead = async () => {
  const mostRead = await getMostRead();

  return (
    <section className="space-y-5">
      <h2 className="text-xl font-bold border-b-2 border-red-500 pb-2">
        Most Read
      </h2>

      <div className="space-y-4">
        {mostRead.map((news, ind) => (
          <Link
            key={news.id}
            href={`/news/${news.id}`}
            className="flex items-start gap-4 border-b border-gray-200 pb-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2"
          >
            <p className="text-3xl font-bold text-red-600">
              {String(ind + 1).padStart(2, "0")}
            </p>

            <div className="flex flex-col gap-2">
              <h3 className="font-semibold leading-6 hover:text-red-600">
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
