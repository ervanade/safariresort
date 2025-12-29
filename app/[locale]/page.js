import Hero from "@/components/Hero";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen relative pb-16 md:pb-0">
      <main>
        <Hero />
      </main>
    </div>
  );
}
