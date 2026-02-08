import Bungalow from "@/components/Bungalow";
import { getBaseMeta } from "@/lib/seo";
import React from "react";

export async function generateMetadata({ params }) {
  const { locale } = (await params) ?? "id";

  const meta = {
    id: {
      title: `Bungalow Collection | Penginapan Keluarga Nyaman Safari Resort Bogor`,
      description: `Temukan kenyamanan menginap bersama keluarga di Bungalow Safari Resort Bogor. Akomodasi luas dengan fasilitas modern di tengah alam asri, pilihan tepat untuk liburan keluarga yang tak terlupakan.`,
      keywords: [
        "Bungalow Safari Resort",
        "Penginapan Keluarga Bogor",
        "Bungalow Murah Cisarua",
        "Safari Resort Bogor",
        "Hotel Keluarga Taman Safari",
        "Sewa Bungalow Puncak",
        "Akomodasi Grup Bogor",
      ],
    },
    en: {
      title: `Bungalow Collection | Spacious Family Friendly Safari Resort Bogor`,
      description: `Discover your home away from home at Safari Resort Bogor's Bungalow Collection. Spacious living areas and modern comforts in the heart of nature, perfect for families and groups.`,
      keywords: [
        "Safari Resort Bungalow",
        "Family Friendly Hotel Bogor",
        "Spacious Villa Cisarua",
        "Bungalow Puncak Mountains",
        "Taman Safari Family Stay",
        "Resort Collection Bogor",
        "Group Accommodation Cisarua",
      ],
    },
  };

  return getBaseMeta({
    locale,
    path: `/bungalow`,
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
    room.name.toLowerCase().includes("bungalow"),
  );
  return (
    <div className="">
      <Bungalow dataRooms={dataRooms} />
    </div>
  );
};

export default page;
