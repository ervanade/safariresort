import RoomDetail from "@/components/RoomDetail";
import React from "react";

export async function generateMetadata({ params }) {
  const useParams = await params;
  const { locale } = (await params) ?? "en";

  const slug = useParams.modelSlug;
  const { data } = await fetchModels(slug);

  // Fetch model name based on slug if needed
  const modelName = data?.model.toUpperCase();

  const meta = {
    id: {
      title: data?.meta_title
        ? data?.meta_title
        : `GWM ${modelName} - Spesifikasi & Fitur Mobil GWM | GWM Indonesia`,
      description: data?.meta_desc
        ? data?.meta_desc
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
      title: data?.meta_title_en
        ? data?.meta_title_en
        : `GWM ${modelName} - GWM Car Specifications & Features | GWM Indonesia`,
      description: data?.meta_desc_en
        ? data?.meta_desc_en
        : `GWM ${modelName}, ${data?.tipe}. View full specs, price, official dealer locations, and schedule a test drive with GWM Inchcape Indonesia.`,
      keywords: [modelName, "GWM SUV", "Hybrid car", "Car specs", "GWM CAR"],
    },
  };

  return getBaseMeta({
    locale,
    path: `/models/${slug}`,
    ...meta[locale],
  });
}

const fetchRoom = async (slug) => {
  // const res = await fetch(`http://10.29.101.99/api/news/slug/${slug}`, {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_KEY}/api/v1/products/slug/${slug}`,
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
  const { roomSlug } = await params;

  return (
    <div className="">
      <RoomDetail roomSlug={roomSlug} />
    </div>
  );
};

export default page;
