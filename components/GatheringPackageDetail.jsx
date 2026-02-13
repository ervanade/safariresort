"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Users,
  Check,
  Camera,
  Music,
  Star,
  LayoutGrid,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { gatheringPackagesData } from "./data/gatheringPackagesData";
import { Link, useRouter } from "@/i18n/navigation";

const swipeConfidenceThreshold = 10000;

const swipePower = (offset, velocity) => {
  return Math.abs(offset) * velocity;
};

const GatheringPackageDetail = ({ gatheringSlug, dataGathering }) => {
  const pkg = dataGathering || gatheringPackagesData[0];
  const { toast } = useToast();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
const [direction, setDirection] = useState(0);

const galleryImages =
  pkg?.images?.length > 0
    ? pkg.images
    : ["/assets/default-package.jpg"];

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

  const handleBook = () => {
    const link = `https://www.book-secure.com/index.php?s=results&property=idbog27674&arrival=2026-02-12&departure=2026-02-13&adults1=2&children1=0&locale=en_GB&currency=IDR&stid=cms52h5o8&showBestPriceFirst=1&showPromotions=3&langue=EN&Clusternames=ASIAIDTAMHTLSafariRe&cluster=ASIAIDTAMHTLSafariRe&Hotelnames=ASIAIDTAMHTLSafariRe&hname=ASIAIDTAMHTLSafariRe&nbNightsValue=1&adulteresa=2&nbAdultsValue=2&CurrencyLabel=IDR&redir=BIZ-so5523q0o4&rt=1770910934`;

    // 2. Buka di tab baru
    window.open(link, "_blank", "noopener,noreferrer");
    toast({
      title: "Inquiry Sent",
      description: `Thank you for your interest in the ${pkg.name}. Our event planner will contact you shortly.`,
    });
  };

  return (
    <div className="min-h-screen bg-[#faf7f5]">
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          {/* Back Link */}
          <Link
            href="/packages/gathering"
            className="inline-flex items-center gap-2 text-[#7C3B1F] hover:text-[#F06934] mb-8 font-bold transition-colors"
          >
            <ArrowLeft size={20} /> Back to Gathering Packages
          </Link>

          <div className="flex flex-col lg:flex-row gap-12">
            {/* Left Column: Image & Details */}
            <div className="lg:w-2/3">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className=" overflow-hidden shadow-2xl mb-10 h-[400px] md:h-[500px]"
              >
             <div className="relative w-full h-full group overflow-hidden">
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

  /* ✅ TAMBAHKAN INI */
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
  alt={`${pkg?.title} ${currentImageIndex + 1}`}
/>

  </AnimatePresence>

  {/* Arrow Navigation */}
  {galleryImages.length > 1 && (
  <>
    {/* Arrow Navigation */}
    <div className="absolute inset-0 z-20 flex items-center justify-between p-4">
      <button
        onClick={() => paginate(-1)}
        className="w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 flex items-center justify-center text-white transition-all shadow-lg"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        onClick={() => paginate(1)}
        className="w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 flex items-center justify-center text-white transition-all shadow-lg"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>

    {/* Dots */}
    <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center gap-2">
      {galleryImages.map((_, idx) => (
        <button
          key={idx}
          onClick={() => {
            setDirection(idx > currentImageIndex ? 1 : -1);
            setCurrentImageIndex(idx);
          }}
          className={`h-2 rounded-full transition-all duration-300 ${
            idx === currentImageIndex
              ? "w-6 bg-white"
              : "w-2 bg-white/50"
          }`}
        />
      ))}
    </div>
  </>
)}

</div>

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
                    {pkg.title}
                  </h1>
                  <span className="bg-[#F06934]/10 text-[#F06934] px-4 py-2 font-bold flex items-center gap-2">
                    <Users size={18} /> {pkg.capacity}
                  </span>
                </div>
                {/* 
                <p className="text-lg text-gray-600 mb-10 leading-relaxed">
                  {pkg?.description}
                </p> */}

                {pkg?.description && typeof window !== "undefined" ? (
                  <div className="grapejs-wrapper">
                    <div
                      dangerouslySetInnerHTML={{ __html: pkg?.description }}
                    />
                  </div>
                ) : (
                  ""
                )}

                {/* Features Section */}
                <div className="mt-8 mb-10">
                  <h3 className="text-2xl font-bold text-[#7C3B1F] mb-6 flex items-center gap-3">
                    <Star size={24} /> Package Highlights
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {pkg?.features?.map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 p-4 bg-white  shadow-sm border border-gray-100"
                      >
                        <div className="text-[#F06934]">
                          <Check size={20} />
                        </div>
                        <span className="font-medium text-gray-700">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Amenities Section */}
                {/* <div className="mb-10">
                  <h3 className="text-2xl font-bold text-[#7C3B1F] mb-6 flex items-center gap-3">
                    <LayoutGrid size={24} /> Included Amenities
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {pkg?.amenities?.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 text-gray-600"
                      >
                        <div className="w-2 h-2 bg-[#F06934]" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div> */}
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
                  Package Price
                </h3>
                <div className="text-3xl font-bold text-[#7C3B1F] mb-6 font-mikado">
                  IDR {Number(pkg.price).toLocaleString("id-ID")}
                </div>

                <div className="space-y-4 mb-8">
                  <p className="text-sm text-gray-500">
                    *Pricing subject to change based on date and group size
                    customizations.
                  </p>
                </div>

                <Button
                  onClick={handleBook}
                  className="w-full bg-[#F06934] hover:bg-[#d65220] text-white py-6 text-lg  shadow-lg hover:shadow-orange-200 transition-all"
                >
                  Get Custom Quote
                </Button>

                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-500 mb-2">Need assistance?</p>
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

export default GatheringPackageDetail;
