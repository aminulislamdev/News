
const MostRead = async () => {
  const res = await fetch(
    "https://news-api-v2.vercel.app/api/news/most-read"
  );

  const data = await res.json();
  const mostRead = data.data;

  return (
    <section className="space-y-5">
      <h2 className="text-xl font-bold border-b-2 border-red-500 pb-2">
        Most Read
      </h2>

      <div className="space-y-4">
        {mostRead.map(
          (
            news: {
              id: string | number;
              category: string;
              title: string;
            },
            ind: number
          ) => (
            <div
              key={news.id}
              className="flex items-start gap-4 border-b border-gray-200 pb-4"
            >
              <p className="text-3xl font-bold text-red-600">
                {String(ind + 1).padStart(2, "0")}
              </p>

              <div className="flex flex-col gap-2">

                <h3 className="font-semibold leading-6 hover:text-red-600 cursor-pointer">
                  {news.title}
                </h3>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default MostRead;
