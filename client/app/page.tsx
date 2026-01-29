import HeroTitle from "@/component/HeroSection";
import Navbar from "@/component/Navbar";
import { BackgroundLines } from "@/components/ui/background-lines";


export const dynamic = "force-static";

export default function Home() {
  return (
    <div className="h-[calc(100vh-5rem)]  flex flex-col">
      <BackgroundLines svgOptions={{ duration: 10 }} children={<HeroTitle />} />
    </div>
  );
}
