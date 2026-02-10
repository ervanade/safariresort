import ArticlesDetails from "@/components/article/ArticleDetails";
import MeetingRoomDetail from "@/components/MeetingRoomDetail";
import { getBaseMeta } from "@/lib/seo";
import { notFound } from "next/navigation";
import React from "react";

const fetchArticle = async (slug, locale) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_KEY}/api/v1/posts/${slug}?lang=${locale}`,
    {
      next: { revalidate: 3600 },
      method: "GET",
      headers: {
        "X-Api-Key": process.env.NEXT_PUBLIC_APP_X_API_KEY,
      },
    },
  );

  if (!res.ok) throw new Error("Failed to fetch article");

  return res.json();
};

// ✅ SEO Metadata Generator
export async function generateMetadata({ params }) {
  const { articleSlug, locale } = await params;
  const article = await fetchArticle(articleSlug, locale);

  if (!article) return notFound();

  const isEnglish = locale === "en";

  return getBaseMeta({
    locale,
    path: `/articles/${article.slug}`,
    title: isEnglish
      ? article?.meta_title + " | Safari Resort Bogor"
      : article?.meta_title + " | Safari Resort Bogor" ||
        article?.title + " | Safari Resort Bogor",
    description: isEnglish ? article?.meta_desc : article?.meta_desc || "",
    keywords: isEnglish
      ? article?.meta_keywords_en
      : article?.meta_keywords || "",
    image: article?.cover_large || article?.cover || "/og-default.jpg",
  });
}

const page = async ({ params }) => {
  const { articleSlug } = await params;

  const { locale } = (await params) ?? "en";

  const data = await fetchArticle(articleSlug, locale);
  if (!data) return notFound();

  return (
    <div className="">
      <ArticlesDetails articleSlug={articleSlug} article={data} />
    </div>
  );
};

export default page;
