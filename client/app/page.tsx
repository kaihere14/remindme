import HeroTitle from "@/component/HeroSection";
import Navbar from "@/component/Navbar";
import { BackgroundLines } from "@/components/ui/background-lines";


export const dynamic = "force-static";

export default function Home() {
  return (
    <div className="overflow-hidden">
      <BackgroundLines svgOptions={{ duration: 10 }} children={<HeroTitle />} />
    </div>
  );
}
