"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { format, parseISO } from "date-fns";
import parse from "html-react-parser";
const HTMLDecoderEncoder = require("html-encoder-decoder");

import "./unreset.css";
import { useLocale } from "next-intl";
function scopeGrapeJSCSS(css, scopeClass = ".grapejs-wrapper") {
  const addScope = (selector) => {
    // Kalau sudah ada scopeClass, jangan ditambah lagi
    if (selector.includes(scopeClass)) return selector.trim();
    return `${scopeClass} ${selector.trim()}`;
  };

  // Tangani blok @media
  css = css.replace(/@media[^{]+\{([\s\S]+?)\}\s*\}/g, (match, inner) => {
    const scopedInner = inner.replace(
      /(^|\})\s*([^{\}]+)\s*\{/g,
      (m, p1, selector) => {
        if (selector.startsWith("@")) return m;
        const scopedSelectors = selector
          .split(",")
          .map((sel) => addScope(sel))
          .join(", ");
        return `${p1} ${scopedSelectors} {`;
      },
    );
    return match.replace(inner, scopedInner);
  });

  // Tangani selector di luar @media
  css = css.replace(/(^|\})\s*([^{\}]+)\s*\{/g, (match, p1, selector) => {
    if (selector.startsWith("@")) return match;
    const scopedSelectors = selector
      .split(",")
      .map((sel) => addScope(sel))
      .join(", ");
    return `${p1} ${scopedSelectors} {`;
  });

  return css;
}

const ArticlesDetails = ({ article }) => {
  const locale = useLocale() || "id";
  const title = locale === "en" ? article?.title : article?.title;
  const content = locale === "en" ? article?.content : article?.content;
  const excerpt = locale === "en" ? article?.excerpt : article?.excerpt;

  return (
    <div className="w-full min-h-screen bg-gray-50 py-12 px-6 lg:px-12 text-textDark">
      <main className="max-w-[1200px] pt-24 pb-20 mx-auto w-full overflow-hidden ">
        <div className="news-content">
          <h1 className="text-2xl xl:text-[32px] leading-tight font-bold mb-4 text-center text-[#7C3B1F]">
            {title}
          </h1>

          <div className="flex flex-col items-center justify-center gap-2 sm:flex-row sm:gap-4 text-sm mb-4 text-gray-700">
            {/* {article.tags?.length > 0 && (
              <div className="text-center text-primary font-medium text-sm">
                {article.tags.map((tag, i) => (
                  <span key={i}>
                    <Link
                      className="px-4 py-1.5 bg-primary text-white font-semibold rounded-full text-sm"
                      href={`/${locale}/news/tag/${tag.slug}`}
                    >
                      #{tag.tag_name}
                    </Link>
                  </span>
                ))}
              </div>
            )} */}
            {article.published_at && (
              <p>{format(parseISO(article.published_at), "yyyy MMM dd")}</p>
            )}
          </div>

          <div className="flex flex-col lg:flex-row w-full mt-5 gap-8">
            <div className="flex-[3_3_0%]">
              {article.thumbnail_url && (
                <div className="aspect-[16/8] lg:aspect-[16/7] w-full overflow-hidden relative">
                  <Image
                    src={article.thumbnail_url || article.image}
                    alt={article.alt_text || "Article Safari Resort"}
                    sizes="100vw"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              )}

              <div className="news-text mt-5 prose max-w-none prose-img:rounded-md prose-headings:scroll-mt-24">
                <div className="grapejs-wrapper">
                  <div dangerouslySetInnerHTML={{ __html: content }} />
                </div>
                {/* {content ? (
                  parse(HTMLDecoderEncoder.decode(content))
                ) : (
                  <p className="text-gray-500">Konten tidak tersedia.</p>
                )} */}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ArticlesDetails;
