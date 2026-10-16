import BDNews from "@/components/BDNews";
import HealthNews from "@/components/HealthNews";
import INDNews from "@/components/INDNews";
import MainNews from "@/components/MainNews";
import Marquee from "@/components/Marquee";
import SelectedNews from "@/components/SelectedNews";
import Video from "@/components/Video";
import WorldNews from "@/components/WorldNews";

export default function Home() {
  return (
    <div>
      <Marquee></Marquee>
      <div className=" grid grid-cols-3 container mx-auto">
        <div className="col-span-2">
          <MainNews></MainNews>
          <SelectedNews></SelectedNews>
          <BDNews></BDNews>
          <INDNews></INDNews>
          <WorldNews></WorldNews>
          <HealthNews></HealthNews>
          <Video></Video>
        </div>
        <div className="col-span-1">2</div>
      </div>
    </div>
  );
}
