import GatheringPackage from "@/components/GatheringPackage";
import PackageDetail from "@/components/PackageDetail";
import { getBaseMeta } from "@/lib/seo";
import React from "react";

const fetchPackages = async (locale, gatheringSlug) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_KEY}/api/v1/packages?category=${gatheringSlug}&lang=${locale}`,
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

const fetchCategory = async (locale, gatheringSlug) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_KEY}/api/v1/categories/${gatheringSlug}?lang=${locale}`,
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

export async function generateMetadata({ params }) {
  const { locale } = (await params) ?? "en";

  const meta = {
    id: {
      title: `Paket Gathering & Acara Komunitas | Safari Resort Bogor`,
      description: `Buat momen kebersamaan tak terlupakan dengan paket gathering kami. Cocok untuk reuni keluarga atau acara komunitas dengan fasilitas lengkap di alam terbuka.`,
      keywords: [
        "paket gathering bogor",
        "tempat reuni di puncak",
        "gathering keluarga",
        "acara komunitas bogor",
        "paket outbound bogor",
      ],
    },
    en: {
      title: `Gathering Packages | Group Events & Social Stays | Safari Resort`,
      description: `Create unforgettable memories with our bespoke gathering packages. Perfect for family reunions and social groups of all sizes in a natural setting.`,
      keywords: [
        "gathering packages bogor",
        "group events puncak",
        "family reunion bogor",
        "social gathering resort",
        "group activities bogor",
      ],
    },
  };

  return getBaseMeta({
    locale,
    path: `/packages/gathering`,
    ...meta[locale],
  });
}

const page = async ({ params }) => {
  const { locale } = (await params) ?? "en";
  const dataGathering = await fetchPackages(locale, "gathering-package");
  const dataPackage = await fetchCategory(locale, "gathering-package");
  return (
    <div className="">
      <GatheringPackage
        dataGathering={dataGathering}
        dataPackage={dataPackage}
      />
    </div>
  );
};

export default page;
