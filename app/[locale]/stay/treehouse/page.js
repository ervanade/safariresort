import TreeHouse from "@/components/TreeHouse";
import { getBaseMeta } from "@/lib/seo";
import React from "react";

export async function generateMetadata({ params }) {
  const { locale } = (await params) ?? "id";

  const meta = {
    id: {
      title: `Treehouse Collection | Penginapan Rumah Pohon Safari Resort Bogor`,
      description: `Nikmati pengalaman menginap unik di Treehouse Collection Safari Resort Bogor. Bangun tidur di tengah rimbunnya hutan tropis dengan udara pegunungan yang segar dan asri.`,
      keywords: [
        "Treehouse Bogor",
        "Rumah Pohon Safari Resort",
        "Nature Lodges Bogor",
        "Safari Resort Bogor",
        "Penginapan Unik Cisarua",
        "Hotel Ramah Lingkungan Bogor",
        "Wisata Taman Safari",
      ],
    },
    en: {
      title: `Treehouse Collection | Signature Nature Lodges Safari Resort Bogor`,
      description: `Elevate your stay at Safari Resort Bogor's Treehouse Collection. Wake up to the sounds of nature and immersive jungle views in our signature high-altitude lodges.`,
      keywords: [
        "Treehouse Resort Bogor",
        "Safari Resort Treehouse",
        "Nature Lodges Indonesia",
        "Jungle Immersion Stay",
        "Puncak Mountain Lodging",
        "Unique Accommodation Bogor",
        "Taman Safari Hotel",
      ],
    },
  };

  return getBaseMeta({
    locale,
    path: `/treehouse`,
    ...meta[locale],
  });
}

const fetchRooms = async (locale) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_KEY}/api/v1/accommodations?lang=${locale}`,
    {
      next: { revalidate: 60 * 5 },
      // cache: 'no-store',
      method: "GET",
      headers: {
        "X-Api-Key": process.env.NEXT_PUBLIC_APP_X_API_KEY,
      },
    },
  );
  if (res?.status === 404) {
    return notFound(); // Pastikan tidak menyebabkan error
  }

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
};
const page = async ({ params }) => {
  const { locale } = (await params) ?? "en";
  const data = await fetchRooms(locale);
  const dataRooms = data.filter((room) =>
    room.name.toLowerCase().includes("treehouse"),
  );
  return (
    <div className="">
      <TreeHouse dataRooms={dataRooms} />
    </div>
  );
};

export default page;
