import HeroTitle from "@/component/HeroSection";
import Navbar from "@/component/Navbar";


export const dynamic = "force-static";

export default function Home() {
  return (
    <div className="h-screen flex flex-col">
      <HeroTitle/>
    </div>
  );
}
