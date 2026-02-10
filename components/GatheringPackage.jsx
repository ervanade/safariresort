"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

import { Users, Music, Calendar, ArrowRight, CheckCircle2 } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { gatheringPackagesData } from "./data/gatheringPackagesData";
import { mapGatheringData } from "@/lib/utils";

const GatheringPackage = ({ dataGathering, dataPackage }) => {
  const gatheringData = dataGathering?.length
    ? mapGatheringData(dataGathering)
    : gatheringPackagesData;
  const highlights = [
    {
      icon: <Users className="w-10 h-10 text-[#F06934]" />,
      title: "Group Coordination",
      description:
        "Expert planners to handle logistics for groups of any size.",
    },
    {
      icon: <Music className="w-10 h-10 text-[#F06934]" />,
      title: "Entertainment Options",
      description: "From live bands to DJ sets and traditional performances.",
    },
    {
      icon: <Calendar className="w-10 h-10 text-[#F06934]" />,
      title: "Tailored Itineraries",
      description:
        "Custom schedules including dining, activities, and free time.",
    },
    {
      icon: <CheckCircle2 className="w-10 h-10 text-[#F06934]" />,
      title: "All-Inclusive Packages",
      description: "Hassle-free pricing covering meals, venue, and activities.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#faf7f5]">
      <main>
        {/* Hero Section */}
        <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              className="w-full h-full object-cover"
              alt="Large outdoor gathering event with white tents"
              src={
                dataPackage?.image_url ||
                "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80"
              }
            />
            <div className="absolute inset-0 bg-black/40"></div>
          </div>

          <div className="relative z-10 text-center px-4 max-w-4xl mx-auto text-white">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-[#F06934] font-bold tracking-widest uppercase mb-4 block">
                Events & Groups
              </span>
              <h1
                className="text-5xl md:text-7xl font-bold mb-6"
                style={{ fontFamily: "Mikado, sans-serif" }}
              >
                {dataPackage?.title || `Gather Together`}
              </h1>
              <p className="text-xl md:text-2xl font-light font-nunito max-w-2xl mx-auto text-gray-200">
                {dataPackage?.subtitle ||
                  `Create unforgettable memories with our bespoke gathering
                packages tailored for groups of all sizes.`}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Packages Grid */}
        <section className="py-20 container mx-auto px-4 relative z-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {gatheringData.map((pkg, index) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border-none shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col group overflow-hidden bg-white">
                  <div className="h-64 overflow-hidden relative">
                    <img
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      alt={pkg.name}
                      src={pkg.mainImage}
                    />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1  text-xs font-bold text-[#F06934] uppercase tracking-wider shadow-sm">
                      {pkg.capacity}
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle
                      className="text-2xl text-[#7C3B1F]"
                      style={{ fontFamily: "Mikado, sans-serif" }}
                    >
                      {pkg.name}
                    </CardTitle>
                    <CardDescription className="line-clamp-2 font-nunito">
                      {pkg?.description && typeof window !== "undefined" ? (
                        <div className="grapejs-wrapper">
                          <div
                            dangerouslySetInnerHTML={{
                              __html: pkg?.description,
                            }}
                          />
                        </div>
                      ) : (
                        ""
                      )}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <div className="space-y-2 mb-4">
                      {pkg.features.slice(0, 3).map((feature, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 text-sm text-gray-600"
                        >
                          <CheckCircle2 size={16} className="text-[#F06934]" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="pt-0">
                    <Link
                      href={`/packages/gathering/${pkg.slug}`}
                      className="w-full"
                    >
                      <Button className="w-full bg-[#7C3B1F] hover:bg-[#5a2b16] text-white gap-2 group-hover:bg-[#F06934] transition-colors">
                        View Details <ArrowRight size={16} />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* USP Highlights */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2
                className="text-4xl font-bold text-[#7C3B1F] mb-4"
                style={{ fontFamily: "Mikado, sans-serif" }}
              >
                The Perfect Venue
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto font-nunito">
                Whether it's business or pleasure, we have the perfect setting
                and services to make your event a success.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {highlights.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="p-6 bg-gray-50  hover:shadow-lg transition-shadow border border-gray-100 text-center"
                >
                  <div className="mb-4 flex justify-center">{item.icon}</div>
                  <h3
                    className="text-xl font-bold text-[#7C3B1F] mb-3"
                    style={{ fontFamily: "Mikado, sans-serif" }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default GatheringPackage;
