import MeetingPackage from "@/components/MeetingPackage";
import PackageDetail from "@/components/PackageDetail";
import { getBaseMeta } from "@/lib/seo";
import React from "react";

const fetchPackages = async (locale, meetingSlug) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_KEY}/api/v1/packages?category=${meetingSlug}&lang=${locale}`,
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

const fetchCategory = async (locale, meetingSlug) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_KEY}/api/v1/categories/${meetingSlug}?lang=${locale}`,
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
      title: `Paket Meeting & Bisnis | Ruang Pertemuan Modern di Safari Resort`,
      description: `Tingkatkan produktivitas tim Anda di ruang meeting profesional dengan pemandangan alam. Dilengkapi fasilitas modern untuk kesuksesan acara korporat Anda.`,
      keywords: [
        "ruang meeting bogor",
        "paket meeting puncak",
        "sewa ruang rapat bogor",
        "corporate event bogor",
        "meeting hotel taman safari",
      ],
    },
    en: {
      title: `Meeting Packages | Professional Corporate Events | Safari Resort`,
      description: `Elevate your corporate events in a setting that blends professional excellence with nature. High-tech facilities for successful business meetings.`,
      keywords: [
        "meeting room bogor",
        "corporate packages puncak",
        "business event bogor",
        "conference room bogor",
        "safari resort meeting",
      ],
    },
  };

  return getBaseMeta({
    locale,
    path: `/packages/meeting`,
    ...meta[locale],
  });
}
const page = async ({ params }) => {
  const { locale } = (await params) ?? "en";
  const dataMeeting = await fetchPackages(locale, "meeting-package");
  const dataPackage = await fetchCategory(locale, "meeting-package");

  return (
    <div className="">
      <MeetingPackage dataMeeting={dataMeeting} dataPackage={dataPackage} />
    </div>
  );
};

export default page;
