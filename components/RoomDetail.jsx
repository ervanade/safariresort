"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Heart,
  ShowerHead,
  ShieldCheck,
  Mountain,
  ConciergeBell,
  Clock,
  Bath,
  Luggage,
  Sun,
  Flower2,
  Wind,
  BedDouble,
  Coffee,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { roomsData } from "./data/roomsData";
import Link from "next/link";

const IconMap = {
  ShowerHead,
  ShieldCheck,
  Mountain,
  ConciergeBell,
  Clock,
  Bath,
  Luggage,
  Sun,
  Flower2,
  Wind,
  BedDouble,
  Coffee,
};

/*************  ✨ Windsurf Command ⭐  *************/
/**
 * RoomDetail is a component that displays the details of a single room.
 * It takes two props: dataRoom and roomSlug.
 * dataRoom is an object containing the data of the room.
 * roomSlug is a string containing the slug of the room.
 * The component renders an image slider with navigation controls,
 * a content section with information about the room, and a footer
 * section with pricing information and a call-to-action button.
 */
/*******  972479ec-988f-42a3-88ac-55699e39c352  *******/
const RoomDetail = ({ dataRoom, roomSlug }) => {
  console.log(dataRoom);
  const { toast } = useToast();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const room = dataRoom ? dataRoom : roomsData.find((r) => r.id === roomSlug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [roomSlug]);

  // Fallback defaults if specific detail fields are missing
  const amenities =
    room.amenities ||
    room.features.slice(0, 8).map((f) => ({ name: f, icon: "ConciergeBell" }));
  const bedType = room.bedType || "Comfortable beds suitable for relaxation";
  // Mock gallery images if not present in data (use main image + generic placeholders for demo)
  const galleryImages = room.images || [
    room.image,
    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b", // Generic interior
    "https://images.unsplash.com/photo-1590490360182-c33d57733427", // Generic luxury
  ];

  const paginate = (newDirection) => {
    const nextIndex = currentImageIndex + newDirection;
    if (nextIndex >= 0 && nextIndex < galleryImages.length) {
      setCurrentImageIndex(nextIndex);
      setDirection(newDirection);
    } else if (nextIndex < 0) {
      setCurrentImageIndex(galleryImages.length - 1);
      setDirection(newDirection);
    } else {
      setCurrentImageIndex(0);
      setDirection(newDirection);
    }
  };

  const handleBook = () => {
    toast({
      title: "Booking Initiated",
      description: `Starting booking process for ${room.name}`,
    });
  };

  const handleWishlist = () => {
    toast({
      title: "Added to Wishlist",
      description: `${room.name} has been saved.`,
    });
  };

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
  };

  return (
    <div className="bg-[#FDFBF9]">
      <main className="min-h-screen flex flex-col md:flex-row relative pt-20">
        {/* Left: Image Slider Section */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full md:w-1/2 h-[50vh] md:h-[calc(100vh-80px)] md:sticky md:top-20 z-0 overflow-hidden bg-gray-900 group"
        >
          <AnimatePresence initial={false} custom={direction}>
            <motion.img
              key={currentImageIndex}
              src={galleryImages[currentImageIndex]}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);
                if (swipe < -swipeConfidenceThreshold) {
                  paginate(1);
                } else if (swipe > swipeConfidenceThreshold) {
                  paginate(-1);
                }
              }}
              className="absolute top-0 left-0 w-full h-full object-cover"
              alt={`${room.name} view ${currentImageIndex + 1}`}
            />
          </AnimatePresence>

          {/* Navigation Overlays */}
          <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <button
              onClick={() => paginate(-1)}
              className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/40 flex items-center justify-center text-white transition-all pointer-events-auto shadow-lg"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() => paginate(1)}
              className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/40 flex items-center justify-center text-white transition-all pointer-events-auto shadow-lg"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-10">
            {galleryImages.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setDirection(idx > currentImageIndex ? 1 : -1);
                  setCurrentImageIndex(idx);
                }}
                className={`h-2 rounded-full transition-all duration-300 shadow-sm ${idx === currentImageIndex ? "w-8 bg-white" : "w-2 bg-white/50 hover:bg-white/80"}`}
              />
            ))}
          </div>

          <Link href="/" className="absolute top-6 left-6 z-20">
            <div className="bg-white/80 backdrop-blur-md p-3 rounded-full hover:bg-white transition-all shadow-lg group">
              <ArrowLeft className="w-6 h-6 text-[#7C3B1F] group-hover:-translate-x-1 transition-transform" />
            </div>
          </Link>
        </motion.div>

        {/* Right: Content Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full md:w-1/2 min-h-screen bg-[#FDFBF9] p-6 md:p-12 lg:p-16 flex flex-col relative z-10"
        >
          <div className="max-w-xl mx-auto w-full pb-24 md:pb-0">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-baseline gap-4 mb-4">
                <h1
                  className="text-4xl md:text-5xl font-bold text-[#7C3B1F]"
                  style={{ fontFamily: "Mikado, sans-serif" }}
                >
                  {room.name}
                </h1>
                <span className="text-xl text-gray-400 font-medium font-nunito">
                  {room.size}
                </span>
              </div>

              {room.description && typeof window !== "undefined" ? (
                <div className="grapejs-wrapper">
                  <div dangerouslySetInnerHTML={{ __html: room.description }} />
                  {/* <style
            dangerouslySetInnerHTML={{
              __html: scopeGrapeJSCSS(room.description),
            }}
          /> */}
                </div>
              ) : (
                ""
              )}

              {/* <p className="text-[#7C3B1F]/70 text-lg leading-relaxed font-nunito mb-8">
                {room.description}
              </p> */}

              {/* Quick Info Grid */}
              <div className="flex gap-6 mb-10 pb-6 border-b border-[#7C3B1F]/10">
                <div className="flex items-center gap-3 text-[#7C3B1F]/80">
                  <BedDouble size={24} />
                  <span className="text-sm font-bold max-w-[120px] leading-tight">
                    1 Queen size bed
                  </span>
                </div>
                <div className="flex items-center gap-3 text-[#7C3B1F]/80">
                  <Coffee size={24} />
                  <span className="text-sm font-bold max-w-[120px] leading-tight">
                    Coffee & Tea included
                  </span>
                </div>
              </div>
            </div>

            {/* Amenities */}
            <div className="mb-10">
              <h3
                className="text-xl font-bold text-[#7C3B1F] mb-6"
                style={{ fontFamily: "Mikado, sans-serif" }}
              >
                Room Amenities
              </h3>
              <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                {amenities.map((item, idx) => {
                  const Icon = IconMap[item.icon] || ConciergeBell;
                  return (
                    <div
                      key={idx}
                      className="flex items-center gap-3 text-gray-600"
                    >
                      <Icon
                        strokeWidth={1.5}
                        className="w-6 h-6 text-[#7C3B1F]"
                      />
                      <span className="text-sm font-medium font-nunito">
                        {item.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bed Type */}
            <div className="mb-10">
              <h3
                className="text-xl font-bold text-[#7C3B1F] mb-4"
                style={{ fontFamily: "Mikado, sans-serif" }}
              >
                Bed Type
              </h3>
              <div className="flex items-start gap-4">
                <BedDouble className="w-8 h-8 text-[#7C3B1F] mt-1" />
                <p className="text-gray-600 text-sm font-medium max-w-xs">
                  {bedType}
                </p>
              </div>
            </div>

            {/* Cancellation Rules */}
            <div className="mb-12 p-6 bg-[#faf7f5] border border-[#7C3B1F]/10 ">
              <h3
                className="text-xl font-bold text-[#7C3B1F] mb-4"
                style={{ fontFamily: "Mikado, sans-serif" }}
              >
                Cancellation Rules
              </h3>
              <p className="text-gray-500 text-sm font-medium mb-3">
                Free Cancellation until{" "}
                <span className="text-[#7C3B1F] font-bold">22 October</span>
              </p>
              <p className="text-xs text-gray-400 leading-relaxed">
                According to time at{" "}
                <strong className="text-gray-600">the accommodation</strong>
                <br />
                <span className="text-[#F06934] font-bold">
                  Untill 22 October 22:59 %100 Free
                </span>
                <br />
                %100 money back
              </p>
              <p className="text-xs text-[#F06934] font-bold mt-2">
                After 26 October 23:59 No Refund
              </p>
            </div>

            {/* Footer / Pricing Action */}
            <div className="mt-auto border-t border-[#7C3B1F]/10 pt-8">
              <div className="flex flex-col gap-1 mb-4">
                <div className="flex items-center gap-4">
                  <span className="text-gray-400 text-sm line-through decoration-gray-400">
                    Normal Price
                  </span>
                  <span className="text-gray-400 text-sm line-through">
                    {room.originalPrice || "IDR 3.500.000"}
                  </span>
                  <span className="text-gray-400 text-sm">2 Nights</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-bold text-[#7C3B1F] text-sm w-20">
                    Promo
                  </span>
                  <span className="font-bold text-[#7C3B1F] text-lg">
                    {room.promoPrice || room.price}
                  </span>
                  <span className="text-[#7C3B1F] text-sm">2 Nights</span>
                </div>
                <div className="flex items-center gap-4 mt-2">
                  <span className="font-bold text-[#F06934] text-xl">
                    Save Total
                  </span>
                  <span className="font-bold text-[#F06934] text-xl">
                    {room.savings || "IDR 1.000.000"}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4 mt-6">
                <Button
                  onClick={handleBook}
                  className="flex-1 bg-[#F06934] hover:bg-[#d65523] text-white h-12 text-base font-bold rounded-none shadow-lg shadow-orange-200"
                >
                  CHOOSE
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default RoomDetail;
