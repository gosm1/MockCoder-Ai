import HeroSection from "@/components/HeroSection";
import PainPointsSection from "@/components/PainPointsSection";
import Sidebar from "@/components/Sidebar";

export default function Home() {
  return (
    <main>
      <main className="overflow-x-hidden">
        <HeroSection/>
        <PainPointsSection/>
      </main>
    </main>
  );
}
