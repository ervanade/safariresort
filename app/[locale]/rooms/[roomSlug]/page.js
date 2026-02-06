import RoomDetail from "@/components/RoomDetail";
import { getBaseMeta } from "@/lib/seo";
import { notFound } from "next/navigation";
import React from "react";

export async function generateMetadata({ params }) {
  const { roomSlug } = await params; // Pastikan pakai roomSlug
  const { locale } = (await params) ?? "en";

  const data = await fetchRoom(roomSlug);

  // Fetch model name based on slug if needed
  const modelName = data?.name?.toUpperCase();

  const meta = {
    id: {
      title: data?.meta_title
        ? data?.meta_title
        : `GWM ${modelName} - Spesifikasi & Fitur Mobil GWM | GWM Indonesia`,
      description: data?.meta_description
        ? data?.meta_description
        : `"GWM ${modelName}, ${data?.tipe}. Cek fitur lengkap, harga, lokasi dealer resmi, dan booking test drive di GWM Inchcape Indonesia.
`,
      keywords: [
        modelName,
        "SUV GWM",
        "Mobil Hybrid",
        "Spesifikasi",
        "Mobil GWM",
      ],
    },
    en: {
      title: data?.meta_title
        ? data?.meta_title
        : `GWM ${modelName} - GWM Car Specifications & Features | GWM Indonesia`,
      description: data?.meta_description
        ? data?.meta_description
        : `GWM ${modelName}, ${data?.tipe}. View full specs, price, official dealer locations, and schedule a test drive with GWM Inchcape Indonesia.`,
      keywords: [modelName, "GWM SUV", "Hybrid car", "Car specs", "GWM CAR"],
    },
  };

  return getBaseMeta({
    locale,
    path: `/rooms/${roomSlug}`,
    ...meta[locale],
  });
}

const fetchRoom = async (slug) => {
  // const res = await fetch(`http://10.29.101.99/api/news/slug/${slug}`, {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_KEY}/api/v1/accommodations/${slug}`,
    {
      next: { revalidate: 60 * 5 },
      // cache: 'no-store',
      method: "GET",
      headers: {
        "X-Api-Key": process.env.NEXT_PUBLIC_APP_X_API_KEY,
      },
    },
  );
  console.log(res.status);
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
  const { roomSlug } = await params;
  const data = await fetchRoom(roomSlug);

  return (
    <div className="">
      <RoomDetail dataRoom={data} roomSlug={roomSlug} />
    </div>
  );
};

export default page;
