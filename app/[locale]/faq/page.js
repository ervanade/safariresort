import FAQPage from "@/components/FAQPage";
import { mapFaqData } from "@/lib/utils";
import React from "react";

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
