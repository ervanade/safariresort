import Articles from '@/components/article/Article';
import { getBaseMeta } from '@/lib/seo';
import { notFound } from 'next/navigation';
import React from 'react'

export async function generateMetadata({ params }) {
  const { locale } = (await params) ?? "en";

  const meta = {
    id: {
      title: `Artikel & Berita Terbaru | Safari Resort Taman Safari Bogor`,
      description: `Temukan tips wisata, info satwa, dan kabar terbaru dari Safari Resort Bogor. Baca artikel menarik untuk panduan liburan seru Anda di Taman Safari Indonesia.`,
      keywords: [
        "artikel safari resort",
        "tips wisata bogor",
        "berita taman safari",
        "blog safari resort",
        "wisata edukasi bogor",
        "panduan liburan puncak",
      ],
    },
    en: {
      title: `Articles & Latest News | Safari Resort Taman Safari Bogor`,
      description: `Explore travel tips, wildlife information, and the latest updates from Safari Resort Bogor. Read our blog for your ultimate holiday guide at Taman Safari Indonesia.`,
      keywords: [
        "safari resort articles",
        "bogor travel tips",
        "taman safari news",
        "safari resort blog",
        "nature education bogor",
        "puncak holiday guide",
      ],
    },
  };

  return getBaseMeta({
    locale,
    path: `/articles`,
    ...meta[locale],
  });
}

const fetchCategory = async (locale, articleSlug) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_KEY}/api/v1/categories/${articleSlug}?lang=${locale}`,
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
const page = async ({params}) => {
  const { locale } = (await params) ?? "en";
  const dataArticles = await fetchCategory(locale, "articles");
  
    return (
      <div className=''>
       <Articles dataArticles={dataArticles}/>
  
      </div>
    )
  }

export default page
