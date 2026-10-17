import Image from "next/image";

const categoryPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const res = await fetch(`https://news-api-v2.vercel.app/api/category/${id}`);
  const data = await res.json();
  const news = data.data;

  return (
   
    <section className="container mx-auto px-4 py-8 space-y-6 pb-10">

     
      <div className="space-y-3">
        <h2 className="text-2xl font-bold text-gray-900">{data.title}</h2>
        
        <div className="h-1 w-full bg-red-600 rounded"></div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {news.map(
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
             
              className="flex flex-col h-full bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <figure className="relative w-full h-52">
                <Image
                  src={news.imageUrl}
                  alt={news.imageAlt || news.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </figure>

              
              <div className="flex flex-col grow p-4 md:p-5">
                
                <span className="text-red-600 text-sm font-semibold mb-2 block">
                  {data.title || 'বিশ্ব'}
                </span>

                <h3 className="text-lg font-bold text-gray-900 leading-snug mb-2 line-clamp-2 hover:text-red-600 transition-colors">
                  {news.title}
                </h3>

                <p className="text-sm text-gray-600 line-clamp-3 mb-4 grow">
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

export default categoryPage;