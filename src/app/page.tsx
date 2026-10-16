import BDNews from "@/components/BDNews";
import INDNews from "@/components/INDNews";
import MainNews from "@/components/MainNews";
import Marquee from "@/components/Marquee";
import SelectedNews from "@/components/SelectedNews";

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
        </div>
        <div className="col-span-1">2</div>
      </div>
    </div>
  );
}
