import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";

const Marquee = async () => {
  const res = await fetch(
    "https://news-api-v2.vercel.app/api/news?limit=10"
  );
  const data = await res.json();
  const headLine = data.data;

  return (
    <div className="bg-red-600 text-white overflow-hidden my-4">
      <div className="flex items-center container mx-auto ">

        <div className="bg-red-700 px-4 py-2 font-bold shrink-0">
          সর্বশেষ
        </div>

        <div className="flex-1 min-w-0 py-2">
          <MarqueeText direction="right" duration={10}>
            {headLine.map((h: { id: string; title: string }) => (
              <span key={h.id} className="mx-4">
                {h.title}
                <span className="mx-3">•</span>
              </span>
            ))}
          </MarqueeText>
        </div>
      </div>
    </div >
  );
};

export default Marquee;