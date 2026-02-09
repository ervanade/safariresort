import Dining from "@/components/Dining";
import { getBaseMeta } from "@/lib/seo";
import React from "react";

export async function generateMetadata({ params }) {
  const { locale } = (await params) ?? "en";

  const meta = {
    id: {
      title: `Restoran & Kuliner Unik | Safari Resort Taman Safari Bogor`,
      description: `Nikmati hidangan lokal dan internasional terbaik di Caravan Restaurant dan Panda Restaurant. Pengalaman makan unik dengan suasana hutan tropis yang asri.`,
      keywords: [
        "restoran taman safari",
        "tempat makan di bogor",
        "caravan restaurant",
        "panda restaurant",
        "kuliner puncak",
        "farm to table bogor",
      ],
    },
    en: {
      title: `Dining Experience | Unique Restaurants at Safari Resort Bogor`,
      description: `Savor exquisite local and international flavors at our signature restaurants. Experience unique farm-to-table dining set against a lush wilderness backdrop.`,
      keywords: [
        "dining safari resort",
        "restaurants in bogor",
        "caravan restaurant",
        "panda restaurant",
        "bogor culinary",
        "wilderness dining",
      ],
    },
  };

  return getBaseMeta({
    locale,
    path: `/dining`,
    ...meta[locale],
  });
}

const fetchCategories = async (locale) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_KEY}/api/v1/categories?lang=${locale}`,
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
  const data = await fetchCategories(locale);
  const dataDining = data?.filter((category) =>
    category.type.toLowerCase()?.includes("dining"),
  );
  return (
    <div className="">
      <Dining dataDining={dataDining || []} />
    </div>
  );
};

export default page;
