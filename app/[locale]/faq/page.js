import FAQPage from "@/components/FAQPage";
import { getBaseMeta } from "@/lib/seo";
import { mapFaqData } from "@/lib/utils";
import React from "react";

export async function generateMetadata({ params }) {
  const { locale } = (await params) ?? "en";

  const meta = {
    id: {
      title: `FAQ - Pusat Bantuan & Informasi Tamu | Safari Resort Bogor`,
      description: `Temukan jawaban atas pertanyaan umum mengenai reservasi, fasilitas kamar, tiket Taman Safari, hingga kebijakan hotel di Pusat Bantuan Safari Resort.`,
      keywords: [
        "faq safari resort",
        "informasi taman safari",
        "bantuan reservasi hotel",
        "tanya jawab safari resort",
        "panduan menginap bogor",
      ],
    },
    en: {
      title: `FAQ - Help Center & Guest Information | Safari Resort Bogor`,
      description: `Find answers to frequently asked questions about reservations, room facilities, Taman Safari tickets, and resort policies in our Help Center.`,
      keywords: [
        "safari resort faq",
        "help center bogor",
        "guest information safari",
        "booking assistance bogor",
        "safari resort guide",
      ],
    },
  };

  return getBaseMeta({
    locale,
    path: `/faq`,
    ...meta[locale],
  });
}

const fetchFaq = async (locale) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_KEY}/api/v1/faqs?lang=${locale}`,
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
  const data = await fetchFaq(locale);
  const faqData = mapFaqData(data) || null;
  return (
    <div className="">
      <FAQPage dataFaq={faqData || null} />
    </div>
  );
};

export default page;
