import Image from "next/image";

const HealthNews = async() => {
  const res = await fetch(
    "https://news-api-v2.vercel.app/api/news/sections"
  );

  const data = await res.json();
  const mainNews = data.data[7];
  return (
    <section className="space-y-6 pb-5">
          <h2 className="text-xl font-bold">{mainNews.title}</h2>
    
          <hr />
    
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {mainNews.articles.map(
              (
                news: {
                  id?: string | number;
                  imageUrl: string;
                  imageAlt?: string;
                  title: string;
                  description: string;
                },
                ind: number
              ) => (
                <div
                  key={news.id ?? ind}
                  className="card h-full bg-base-100 shadow-sm"
                >
                  <figure>
                    <Image
                      src={news.imageUrl}
                      alt={news.imageAlt || news.title}
                      width={400}
                      height={250}
                      className="h-48 w-full object-cover"
                    />
                  </figure>
    
                  <div className="card-body">
                    <h3 className="card-title">{news.title}</h3>
    
                    <p className="line-clamp-3 text-sm text-gray-600">
                      {news.description}
                    </p>
    
                  </div>
                </div>
              )
            )}
          </div>
        </section>
  );
};

export default HealthNews;