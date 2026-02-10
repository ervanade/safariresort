"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Users,
  Check,
  Wifi,
  Monitor,
  Mic,
  LayoutGrid,
  Coffee,
  PenTool,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { meetingRoomsData } from "./data/meetingRoomsData";
import { Link, useRouter } from "@/i18n/navigation";

const MeetingRoomDetail = ({ meetingSlug, dataMeeting }) => {
  const { toast } = useToast();
  const room = dataMeeting || meetingRoomsData[0];

  const handleBook = () => {
    toast({
      title: "Inquiry Sent",
      description: `Thank you for your interest in ${room.name}. Our sales team will contact you shortly.`,
    });
  };

  const featureIcons = {
    "High-speed Wi-Fi": <Wifi size={20} />,
    "HD Projector & Screen": <Monitor size={20} />,
    "Video Conferencing System": <Monitor size={20} />,
    "Wireless Microphone": <Mic size={20} />,
    "Glass Whiteboard": <PenTool size={20} />,
    "Coffee Break": <Coffee size={20} />,
  };

  return (
    <div className="min-h-screen bg-[#faf7f5]">
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          {/* Back Link */}
          <Link
            href="/packages/meeting"
            className="inline-flex items-center gap-2 text-[#7C3B1F] hover:text-[#F06934] mb-8 font-bold transition-colors"
          >
            <ArrowLeft size={20} /> Back to Meeting Packages
          </Link>

          <div className="flex flex-col lg:flex-row gap-12">
            {/* Left Column: Image & Details */}
            <div className="lg:w-2/3">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className=" overflow-hidden shadow-2xl mb-10 h-[400px] md:h-[500px]"
              >
                <img
                  src={room.images[0] || room.mainImage}
                  alt={room.title}
                  className="w-full h-full object-cover"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex flex-wrap items-baseline justify-between gap-4 mb-6">
                  <h1
                    className="text-4xl md:text-5xl font-bold text-[#7C3B1F]"
                    style={{ fontFamily: "Mikado, sans-serif" }}
                  >
                    {room.title}
                  </h1>
                  <span className="bg-[#F06934]/10 text-[#F06934] px-4 py-2  font-bold flex items-center gap-2">
                    <Users size={18} /> {room.capacity}
                  </span>
                </div>

                {/* <p className="text-lg text-gray-600 mb-10 leading-relaxed">
                  {room.description}
                </p> */}
                {room?.description && typeof window !== "undefined" ? (
                  <div className="grapejs-wrapper">
                    <div
                      dangerouslySetInnerHTML={{ __html: room?.description }}
                    />
                  </div>
                ) : (
                  ""
                )}
                {/* Features Section */}
                <div className="mb-10 mt-8">
                  <h3 className="text-2xl font-bold text-[#7C3B1F] mb-6 flex items-center gap-3">
                    <LayoutGrid size={24} /> Room Features
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {room?.features?.map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 p-4 bg-white  shadow-sm border border-gray-100"
                      >
                        <div className="text-[#F06934]">
                          {featureIcons[feature] || <Check size={20} />}
                        </div>
                        <span className="font-medium text-gray-700">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Amenities Section */}
                <div className="mb-10">
                  <h3 className="text-2xl font-bold text-[#7C3B1F] mb-6 flex items-center gap-3">
                    <Coffee size={24} /> Included Amenities
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {room?.amenities?.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 text-gray-600"
                      >
                        <div className="w-2 h-2  bg-[#F06934]" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Column: Pricing & Booking Card */}
            <div className="lg:w-1/3">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white p-8  shadow-xl border border-orange-100 sticky top-28"
              >
                <h3 className="text-xl font-bold text-gray-400 mb-2 uppercase tracking-wide">
                  Starting From
                </h3>
                <div className="text-3xl font-bold text-[#7C3B1F] mb-6 font-mikado">
                  {room.price || room.pricing}
                </div>

                <div className="space-y-4 mb-8">
                  <p className="text-sm text-gray-500">
                    *Pricing may vary based on specific requirements and
                    additional services.
                  </p>
                </div>

                <Button
                  onClick={handleBook}
                  className="w-full bg-[#F06934] hover:bg-[#d65220] text-white py-6 text-lg  shadow-lg hover:shadow-orange-200 transition-all"
                >
                  Request Quotation
                </Button>

                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-500 mb-2">Need help?</p>
                  <a
                    href="tel:+622518250000"
                    className="text-[#7C3B1F] font-bold hover:underline"
                  >
                    +62 821 2522 2756
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MeetingRoomDetail;
