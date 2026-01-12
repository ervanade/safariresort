
import About from "@/components/About";
import Awards from "@/components/Awards";
import Chatbot from "@/components/Chatbot";
import Experiences from "@/components/Experiences";
import Facilities from "@/components/Facilities";
import FAQ from "@/components/FAQ";
import Hero from "@/components/Hero";
import MapSection from "@/components/MapSection";
import MobileFooter from "@/components/MobileFooter";
import Packages from "@/components/Packages";
import PromoPopup from "@/components/PromoPopup";
import Rooms from "@/components/Rooms";
import { Calendar } from "lucide-react";
import Image from "next/image";

export default function Home() {

  return (
    <div className="min-h-screen relative pb-16 md:pb-0">
    {/* di div header bawah ini flex tidak bisa */}
      <main>
        <Hero />
        <About/>
        <Rooms />
        <Experiences />
        <Packages />
        <Facilities />
        {/* <FAQ /> */}
        <Awards />
        <MapSection />
      </main>
      {/* <MobileFooter onChatToggle={() => setIsChatOpen(!isChatOpen)} /> */}
      <PromoPopup />
      <Chatbot />
    </div>
  );
}
