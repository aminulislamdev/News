import { getNewsSection } from "@/lib/news";
import NewsCard from "./NewsCard";

interface NewsSectionProps {
  index: number;
}

const NewsSection = async ({ index }: NewsSectionProps) => {
  const section = await getNewsSection(index);

  if (!section) {
    return null;
  }

  return (
    <section className="space-y-6 pb-5">
      <h2 className="text-xl font-bold">{section.title}</h2>

      <hr />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {section.articles.map((article) => (
          <NewsCard key={article.id} article={article} />
        ))}
      </div>
    </section>
  );
};

export default NewsSection;
