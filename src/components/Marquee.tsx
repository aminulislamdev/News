import Link from "next/link";
import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";
import { getLatestNews } from "@/lib/news";

const Marquee = async () => {
  const headLine = await getLatestNews(10);

  return (
    <div className="bg-red-600 text-white overflow-hidden my-4">
      <div className="flex items-center container mx-auto">
        <div className="bg-red-700 px-4 py-2 font-bold shrink-0">
          সর্বশেষ
        </div>

        <div className="flex-1 min-w-0 py-2">
          <MarqueeText direction="right" duration={10}>
            {headLine.map((h) => (
              <span key={h.id} className="mx-4">
                <Link
                  href={`/news/${h.id}`}
                  className="hover:underline focus-visible:underline"
                >
                  {h.title}
                </Link>
                <span className="mx-3">•</span>
              </span>
            ))}
          </MarqueeText>
        </div>
      </div>
    </div>
  );
};

export default Marquee;
