import Dining from "@/components/Dining";
import React from "react";

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
