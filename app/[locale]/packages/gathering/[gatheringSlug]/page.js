import GatheringPackageDetail from "@/components/GatheringPackageDetail";
import PackageDetail from "@/components/PackageDetail";
import { getBaseMeta } from "@/lib/seo";
import { notFound } from "next/navigation";
import React from "react";

export async function generateMetadata({ params }) {
  const { gatheringSlug } = await params; // Pastikan pakai gatheringSlug
  const { locale } = (await params) ?? "en";

  const data = await fetchPackages(locale, gatheringSlug);

  // Fetch model name based on slug if needed
  const modelName = data?.name?.toUpperCase();

  const meta = {
    id: {
      title: data?.meta_title
        ? data?.meta_title
        : `Tipe Paket Gathering | Safari Resort Taman Safari Bogor`,
      description: data?.meta_description
        ? data?.meta_description
        : `Menginap di ${data?.name || "Safari Resort"}. Nikmati kesejukan alami pegunungan tanpa AC, pemandangan hutan tropis, dan akses langsung ke Taman Safari Bogor. Booking sekarang!`,
      keywords: [
        data?.name,
        "Safari Resort Bogor",
        "Hotel Taman Safari",
        "Penginapan Cisarua",
        "Akomodasi Caravan",
        "Treehouse Bogor",
      ],
    },
    en: {
      title: data?.meta_title
        ? data?.meta_title
        : `Gathering Package Type | Safari Resort Taman Safari Bogor`,
      description: data?.meta_description
        ? data?.meta_description
        : `Stay at ${data?.name || "Safari Resort"}. Experience natural mountain coolness, tropical forest views, and direct access to Taman Safari Bogor. Book your unique stay today!`,
      keywords: [
        data?.name,
        "Safari Resort Bogor",
        "Taman Safari Hotel",
        "Cisarua Accommodation",
        "Caravan Stay",
        "Treehouse Resort",
      ],
    },
  };

  return getBaseMeta({
    locale,
    path: `/packages/gathering/${gatheringSlug}`,
    ...meta[locale],
  });
}

const fetchPackages = async (locale, gatheringSlug) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_KEY}/api/v1/packages/${gatheringSlug}?lang=${locale}`,
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
  const { gatheringSlug } = await params;
  const { locale } = (await params) ?? "en";
  const dataGathering = await fetchPackages(locale, gatheringSlug);

  return (
    <div className="">
      <GatheringPackageDetail
        gatheringSlug={gatheringSlug}
        dataGathering={dataGathering}
      />
    </div>
  );
};

export default page;
