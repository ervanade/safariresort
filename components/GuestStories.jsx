"use client";
import React, { useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Star, MapPin, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { reviewsData } from "./data/reviewsData";
import { useLocale } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";
import axios from "axios";

const fetcher = (url) =>
  axios
    .get(url, {
      headers: {
        "X-Api-Key": process.env.NEXT_PUBLIC_APP_X_API_KEY,
        "Content-Type": "application/json",
      },
    })
    .then((res) => res.data);

const GuestStories = ({guestData}) => {
  const locale = useLocale();
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = Number(searchParams.get("page")) || 1;

  const { data, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API_KEY}/api/v1/guest-stories?lang=${locale}&page=${page}`,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 10000,
      keepPreviousData: true,
    },
  );

  const stories = useMemo(() => data?.data || [], [data]);
  const pagination = data;
  const totalPages = pagination?.last_page || 1;

  const changePage = (pageNum) => {
    if (pageNum < 1 || pageNum > totalPages) return;

    router.push(`/${locale}/guest-stories?page=${pageNum}`, { scroll: true });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const googleMapsUrl = "https://maps.app.goo.gl/SgTuAuhp8jTNue1F7";

  return (
    <div className="min-h-screen bg-[#faf7f5]">
      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="container mx-auto px-4 mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[#F06934] font-bold text-sm tracking-widest uppercase mb-3 block">
              {guestData?.title || `Guest Stories`}
            </span>
            <h1
              className="text-4xl md:text-5xl font-bold mb-6 text-[#7C3B1F]"
              style={{ fontFamily: "Mikado, sans-serif" }}
            >
              {guestData?.subtitle || `Memories from the Wild`}
            </h1>
            <p className="text-lg text-[#7C3B1F]/80 max-w-2xl mx-auto font-medium font-nunito">
              {guestData?.desc || `Discover why travelers love their stay at Safari Resort. Real
              experiences from real guests who have explored the wilderness with
              us.`}
            </p>
          </motion.div>
        </section>

        {/* Google Maps Summary Card */}
        <section className="container mx-auto px-4 mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white  p-8 shadow-xl border border-[#7C3B1F]/10 max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-orange-50  -mr-32 -mt-32 opacity-50 pointer-events-none"></div>

            <div className="flex flex-col md:flex-row items-center gap-6 z-10">
              <div className="bg-[#4285F4] p-4  shadow-lg">
                <MapPin className="w-10 h-10 text-white" />
              </div>
              <div className="text-center md:text-left">
                <h2 className="text-2xl font-bold text-[#7C3B1F] mb-1">
                  Safari Resort
                </h2>
                <div className="flex items-center gap-1 justify-center md:justify-start mb-1">
                  <span className="text-[#F06934] font-bold text-lg">{guestData?.rating || `4.5`}</span>
                  <div className="flex text-[#FBC02D]">
                    {[1, 2, 3, 4].map((i) => (
                      <Star key={i} fill="currentColor" size={18} />
                    ))}
                    <Star
                      fill="currentColor"
                      size={18}
                      className="opacity-50"
                    />
                  </div>
                  <span className="text-gray-400 text-sm ml-1">
                    ({guestData?.total_rating || `3,500+ reviews`})
                  </span>
                </div>
                <p className="text-gray-500 text-sm">
                  Cibeureum, Cisarua, Bogor Regency, West Java
                </p>
              </div>
            </div>

            <div className="z-10">
              <Button
                onClick={() => window.open(googleMapsUrl, "_blank")}
                className="bg-[#7C3B1F] hover:bg-[#5e2d17] text-white px-8 py-6 text-lg  shadow-lg hover:shadow-xl transition-all"
              >
                Write a Review
              </Button>
            </div>
          </motion.div>
        </section>

        {/* Reviews Grid */}
        <section className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stories.map((review, idx) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white p-6  shadow-md hover:shadow-lg transition-shadow border border-[#7C3B1F]/5 flex flex-col h-full"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10  bg-[#F06934]/10 text-[#F06934] flex items-center justify-center font-bold text-lg">
                      <img
                        src={review?.author_photo}
                        alt=""
                        className="w-10 h-10 rounded-full"
                      />
                      {/* {review.avatar} */}
                    </div>
                    <div>
                      <h4 className="font-bold text-[#7C3B1F] text-sm">
                        {review.author_name}
                      </h4>
                      <p className="text-xs text-gray-400">
                        {review.relative_time}
                      </p>
                    </div>
                  </div>
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/60px-Google_%22G%22_logo.svg.png"
                    alt="Google"
                    className="w-5 h-5 opacity-50"
                  />
                </div>

                <div className="flex text-[#FBC02D] mb-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      fill={i < review?.rating ? "currentColor" : "none"}
                      className={i < review?.rating ? "" : "text-gray-300"}
                    />
                  ))}
                </div>

                <div className="relative flex-grow">
                  <Quote className="absolute -top-2 -left-2 w-8 h-8 text-[#F06934]/10 transform -scale-x-100" />
                  <p className="text-gray-600 text-sm leading-relaxed relative z-10 pl-4 font-nunito italic">
                    "{review?.content}"
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-12 flex-wrap">
              <button
                onClick={() => changePage(page - 1)}
                disabled={page === 1}
                className="px-4 py-2 border rounded disabled:opacity-50 cursor-pointer"
              >
                Prev
              </button>

              {Array.from({ length: totalPages }).map((_, i) => {
                const p = i + 1;
                return (
                  <button
                    key={p}
                    onClick={() => changePage(p)}
                    className={`px-4 py-2 border rounded cursor-pointer ${
                      p === page
                        ? "bg-[#F06934] text-white"
                        : "bg-white text-black"
                    }`}
                  >
                    {p}
                  </button>
                );
              })}

              <button
                onClick={() => changePage(page + 1)}
                disabled={page === totalPages}
                className="px-4 py-2 border rounded cursor-pointer disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}

          <div className="mt-12 text-center">
            <Button
              variant="outline"
              onClick={() => window.open(googleMapsUrl, "_blank")}
              className="border-[#F06934] text-[#F06934] hover:bg-[#F06934] hover:text-white px-8 h-12 text-base rounded-lg"
            >
              Read More on Google Maps
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default GuestStories;
