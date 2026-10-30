import BDNews from "@/components/news/BDNews";
import ExtraNews from "@/components/news/ExtraNews";
import HealthNews from "@/components/news/HealthNews";
import INDNews from "@/components/news/INDNews";
import MainNews from "@/components/news/MainNews";
import MostRead from "@/components/news/MostRead";
import SelectedNews from "@/components/news/SelectedNews";
import Video from "@/components/news/Video";
import WorldNews from "@/components/news/WorldNews";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
        <div className="min-w-0 lg:col-span-2">
          <MainNews></MainNews>
          <SelectedNews></SelectedNews>
          <BDNews></BDNews>
          <INDNews></INDNews>
          <WorldNews></WorldNews>
          <HealthNews></HealthNews>
          <Video></Video>
          <ExtraNews></ExtraNews>
        </div>
        <div className="min-w-0 lg:col-span-1"><MostRead></MostRead></div>
      </div>
    </div>
  );
}
