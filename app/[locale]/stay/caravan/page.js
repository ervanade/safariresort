import Caravan from "@/components/Caravan";
import { getBaseMeta } from "@/lib/seo";
import React from "react";

export async function generateMetadata({ params }) {
  const { locale } = (await params) ?? "id";

  const meta = {
    id: {
      title: `Caravan Collection | Penginapan Unik Ikonik Safari Resort Bogor`,
      description: `Rasakan sensasi petualangan menginap di Caravan Safari Resort Bogor. Akomodasi ikonik yang memadukan kenyamanan modern dengan suasana alam liar Taman Safari yang autentik.`,
      keywords: [
        "Caravan Safari Resort",
        "Penginapan Karavan Bogor",
        "Hotel Unik Puncak",
        "Safari Resort Bogor",
        "Taman Safari Indonesia Caravan",
        "Liburan Keluarga Unik",
        "Adventure Lodging Bogor",
      ],
    },
    en: {
      title: `Caravan Collection | Iconic Adventure Lodges Safari Resort Bogor`,
      description: `Experience a unique adventure at Safari Resort Bogor's Caravan Collection. Stay in our iconic caravans and immerse yourself in the authentic wilderness of Taman Safari.`,
      keywords: [
        "Safari Resort Caravan",
        "Iconic Lodging Bogor",
        "Caravan Experience Indonesia",
        "Taman Safari Bogor Stay",
        "Unique Adventure Hotel",
        "Resort Collection Puncak",
        "Nature Wilderness Stay",
      ],
    },
  };

  return getBaseMeta({
    locale,
    path: `/caravan`,
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
    room.name.toLowerCase().includes("caravan"),
  );
  return (
    <div className="">
      <Caravan dataRooms={dataRooms} />
    </div>
  );
};

export default page;
