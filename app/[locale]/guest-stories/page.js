


import GuestStories from '@/components/GuestStories'
import { getBaseMeta } from '@/lib/seo';
import React from 'react'

export async function generateMetadata({ params }) {
  const { locale } = (await params) ?? "en";

  const meta = {
    id: {
      title: `Ulasan Tamu & Pengalaman Menginap | Safari Resort Bogor`,
      description: `Baca cerita asli dari tamu kami tentang pengalaman menginap di Safari Resort. Temukan alasan mengapa keluarga dan petualang memilih kami untuk liburan mereka di Puncak.`,
      keywords: [
        "Ulasan Safari Resort",
        "Testimoni Hotel Bogor",
        "Pengalaman Menginap Puncak",
        "Review Safari Resort Bogor",
        "Rekomendasi Hotel Keluarga Bogor",
        "Guest Stories Safari Resort",
        "Taman Safari Bogor Review",
      ],
    },
    en: {
      title: `Guest Stories & Real Stay Experiences | Safari Resort Bogor`,
      description: `Discover genuine stories and reviews from our guests at Safari Resort Bogor. Read about real wilderness experiences, family adventures, and unforgettable stays.`,
      keywords: [
        "Safari Resort Reviews",
        "Guest Testimonials Bogor",
        "Stay Experience Puncak",
        "Safari Resort Guest Stories",
        "Best Family Resort Bogor Review",
        "Customer Reviews Safari Resort",
        "Taman Safari Lodging Feedback",
      ],
    },
  };

  return getBaseMeta({
    locale,
    path: `/guest-stories`,
    ...meta[locale],
  });
}

async function getData(lang) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_KEY}/api/v1/web-settings?lang=${lang ?? "en"}`,
    {
      // cache: 'no-store',
      // next: { revalidate: 3600 },
      method: "GET",
      headers: {
        "X-Api-Key": process.env.NEXT_PUBLIC_APP_X_API_KEY,
      },
    },
  );
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

const page = async ({params}) => {
  const { locale } = (await params) ?? "en";
  const data = await getData(locale);


  const targetKey = locale === "en" ? "guest_header_en" : "guest_header_id";
  // 2. Cari di dalam settings
  const guestData =
    data?.settings?.find((item) => item.key === targetKey)?.value || {};
  
    return (
      <div className=''>
        <GuestStories guestData={guestData}/>
      </div>
    )
  }

export default page
