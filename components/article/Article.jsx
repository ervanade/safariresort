"use client";
import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Monitor,
  Wifi,
  Users,
  Presentation,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link, useRouter } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { useSearchParams } from "next/navigation";
import { meetingRoomsData } from "../data/meetingRoomsData";
import useSWR from "swr";
import axios from "axios";
import Image from "next/image";

const fetcher = (url) =>
  axios
    .get(url, {
      headers: {
        "X-Api-Key": process.env.NEXT_PUBLIC_APP_X_API_KEY,
        "Content-Type": "application/json",
      },
    })
    .then((res) => res.data);

const Articles = () => {
  const locale = useLocale();
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = Number(searchParams.get("page")) || 1;

  const { data, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API_KEY}/api/v1/posts?lang=${locale}&page=${page}`,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 10000,
      keepPreviousData: true,
    },
  );

  const articles = useMemo(() => data || [], [data]);
  console.log(data);

  return (
    <div className="min-h-screen bg-[#faf7f5]">
      <main>
        {/* Hero Section */}
        <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              className="w-full h-full object-cover"
              alt="Modern conference room with glass walls overlooking nature"
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80"
            />
            <div className="absolute inset-0 bg-black/50"></div>
          </div>

          <div className="relative z-10 text-center px-4 max-w-4xl mx-auto text-white">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-[#F06934] font-bold tracking-widest uppercase mb-4 block">
                Articles & News
              </span>
              <h1
                className="text-5xl md:text-7xl font-bold mb-6"
                style={{ fontFamily: "Mikado, sans-serif" }}
              >
                Articles Press Release
              </h1>
              <p className="text-xl md:text-2xl font-light font-nunito max-w-2xl mx-auto text-gray-200">
                Elevate your corporate events in a setting that blends
                professional excellence with the tranquility of nature.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Meeting Rooms Grid */}
        <section className="py-20 container mx-auto px-4 relative z-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading ? (
              [...Array(3)].map((_, index) => (
                <div
                  key={index}
                  className="animate-pulse flex flex-col space-y-4 rounded-xl shadow-md p-6 bg-gray-200"
                >
                  <div className="h-56 bg-gray-300 rounded-t-lg"></div>
                  <div className="h-6 w-3/4 bg-gray-300 rounded"></div>
                  <div className="h-4 w-full bg-gray-300 rounded"></div>
                  <div className="h-4 w-5/6 bg-gray-300 rounded"></div>
                </div>
              ))
            ) : articles.length > 0 ? (
              articles.map((item) => (
                <div
                  key={item.slug}
                  className="relative flex flex-col mt-6 bg-white shadow-md rounded-xl group"
                >
                  <div className="relative h-56 -mt-6 overflow-hidden rounded-t-lg group-hover:scale-105">
                    <Image
                      src={
                        item.thumbnail_url?.startsWith("http")
                          ? item.thumbnail_url
                          : `${process.env.NEXT_PUBLIC_API_KEY}${item.thumbnail_url}`
                      }
                      alt={item.meta_title || item.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="p-6">
                    <Link href={`/articles/${item.slug}`}>
                      <h5 className="text-lg md:text-xl mb-2 font-semibold line-clamp-3 hover:underline text-[#7C3B1F]">
                        {locale === "en" ? item.title : item.title}
                      </h5>
                    </Link>
                    <p className="line-clamp-3 text-sm md:text-base font-light min-h-[76px]">
                      {locale === "en" ? item.excerpt : item.excerpt}
                    </p>
                  </div>

                  <div className="p-6 pt-0">
                    <Link href={`/articles/${item.slug}`} className="w-full">
                      <Button className="w-full bg-[#7C3B1F] hover:bg-[#5a2b16] text-white gap-2 group-hover:bg-[#F06934] transition-colors">
                        View Details <ArrowRight size={16} />
                      </Button>
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <p className="col-span-3 text-center text-gray-500">
                {locale === "en"
                  ? "No articles available."
                  : "Belum ada artikel."}
              </p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Articles;
