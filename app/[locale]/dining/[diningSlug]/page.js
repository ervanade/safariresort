import DiningDetail from "@/components/DiningDetail";
import React from "react";

const fetchDining = async (locale, diningSlug) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_KEY}/api/v1/dinings?category=${diningSlug}&lang=${locale}`,
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

const fetchRestaurant = async (locale, diningSlug) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_KEY}/api/v1/categories/${diningSlug}?lang=${locale}`,
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
  const { diningSlug } = await params;
  const { locale } = (await params) ?? "en";
  const dataDining = await fetchDining(locale, diningSlug);
  const dataRestaurant = await fetchRestaurant(locale, diningSlug);

  return (
    <div className="">
      <DiningDetail
        diningSlug={diningSlug}
        dataDining={dataDining}
        dataRestaurant={dataRestaurant}
      />
    </div>
  );
};

export default page;
