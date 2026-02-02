
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
import { getBaseMeta } from "@/lib/seo";
import { Calendar } from "lucide-react";
import Image from "next/image";

export async function generateMetadata({ params }) {
  const { locale } = await params ?? "en";

  const meta = {
    id: {
      title: `Safari Resort Bogor | Resort di Taman Safari Indonesia & Staycation Alam`,
      description: `Safari Resort Bogor adalah resort eksklusif di kawasan Taman Safari Indonesia Cisarua. Nikmati pengalaman menginap bernuansa alam & satwa, pilihan kamar unik, fasilitas lengkap, dan paket staycation keluarga.`,
      keywords: [
        "safari resort bogor",
        "safari resort",
        "resort taman safari",
        "hotel taman safari bogor",
        "penginapan di taman safari",
        "resort bogor",
        "staycation bogor",
        "hotel puncak bogor",
        "resort alam bogor",
        "penginapan keluarga bogor",
        "safari lodge bogor",
        "caravan hotel bogor",
        "tree house bogor",
        "taman safari indonesia resort",
      ],
    },
    en: {
      title: `Safari Resort Bogor | Nature & Wildlife Resort at Taman Safari Indonesia`,
      description: `Safari Resort Bogor is a unique nature and wildlife resort located inside Taman Safari Indonesia, Cisarua. Enjoy an unforgettable stay surrounded by tropical forest, exotic animals, family-friendly facilities, and exclusive safari experiences.`,
      keywords: [
        "safari resort bogor",
        "safari resort",
        "taman safari resort",
        "hotel near taman safari",
        "bogor nature resort",
        "family resort bogor",
        "staycation bogor",
        "puncak bogor resort",
        "wildlife resort indonesia",
        "safari lodge bogor",
        "tree house resort bogor",
        "caravan hotel bogor",
        "taman safari indonesia accommodation",
      ],
    },
  };

  return getBaseMeta({
    locale,
    path: `/`,
    ...meta[locale],
  });
}


async function getData(locale) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_KEY}/api/v1/home?lang=${locale}`,
    {
      // cache: 'no-store',
      // next: { revalidate: 300 },
      method: "GET",
      headers: {
        "X-Api-Key": process.env.NEXT_PUBLIC_APP_X_API_KEY,
        "Cache-Control": "max-age=300", // browser dan CDN cache 5 menit
      },
    }
  );
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Home({params}) {
  const { locale } = await params ?? "en";
  const data = await getData(locale)
  return (
    <div className="min-h-screen relative pb-16 md:pb-0">
    {/* di div header bawah ini flex tidak bisa */}
      <main>
        <Hero banners={data?.banners || null}/>
        <About dataAbout={data?.settings[0] || null} />
        <Rooms accomodations={data?.featuredAccommodations || null}/>
        <Experiences activites={data?.activities || null}/>
        <Packages />
        <Facilities dataFacilities={data?.facilities || null} />
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
