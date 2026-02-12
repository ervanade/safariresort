"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Users, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import BookingModal from "./BookingModal";

const swipeConfidenceThreshold = 10000;
const swipePower = (offset, velocity) => {
  return Math.abs(offset) * velocity;
};

const Hero = ({ banners }) => {
  const { toast } = useToast();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    checkIn: "",
    checkOut: "",
    guests: "2",
    roomType: "treehouse",
  });

  const slidesDummy = [
    {
      id: 1,
      image:
        "https://horizons-cdn.hostinger.com/b05a0347-ff2a-4d3e-b189-510345403291/54630fb92081fec3b2304da74a9222c2.png",
      image_mobile:
        "https://horizons-cdn.hostinger.com/b05a0347-ff2a-4d3e-b189-510345403291/54630fb92081fec3b2304da74a9222c2.png",
      alt: "Family with an elephant on a wooden deck overlooking the forest",
      heading: "Find Your Wild Escape",
    },
    {
      id: 2,
      image:
        "https://horizons-cdn.hostinger.com/b05a0347-ff2a-4d3e-b189-510345403291/cd199248e24c139d05253e41c8651d47.png",
      image_mobile:
        "https://horizons-cdn.hostinger.com/b05a0347-ff2a-4d3e-b189-510345403291/cd199248e24c139d05253e41c8651d47.png",
      alt: "Luxury resort bedroom with panoramic views",
      heading: "Wake Up to Nature",
    },
  ];

  const slides =
    banners.map((banner) => ({
      id: banner?.id,
      image: banner?.image_desktop,
      alt: banner?.title,
      heading: banner?.title,
      image_mobile: banner?.image_mobile,
    })) || slidesDummy;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 10000); // Auto-rotate every 10 seconds
    return () => clearInterval(timer);
  }, [currentSlide, slides.length]); // Reset timer on slide change

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 1. Definisikan nomor WhatsApp dan pesan (opsional)
    const link = `https://www.book-secure.com/index.php?s=results&property=idbog27674&arrival=2026-02-12&departure=2026-02-13&adults1=2&children1=0&locale=en_GB&currency=IDR&stid=cms52h5o8&showBestPriceFirst=1&showPromotions=3&langue=EN&Clusternames=ASIAIDTAMHTLSafariRe&cluster=ASIAIDTAMHTLSafariRe&Hotelnames=ASIAIDTAMHTLSafariRe&hname=ASIAIDTAMHTLSafariRe&nbNightsValue=1&adulteresa=2&nbAdultsValue=2&CurrencyLabel=IDR&redir=BIZ-so5523q0o4&rt=1770910934`;

    // 2. Buka di tab baru
    window.open(link, "_blank", "noopener,noreferrer");
    setIsModalOpen(true);
    // toast({
    //   title: "Reservation Form",
    //   description: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
    // });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-end pb-12 md:pb-12 justify-center overflow-hidden"
    >
      {/* Slider Background */}
      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        adults={parseInt(formData.guests)} // Konversi string ke number
        checkin={formData.checkIn}
        checkout={formData.checkOut}
      />
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 z-0 touch-pan-y"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);
            if (swipe < -swipeConfidenceThreshold) {
              nextSlide();
            } else if (swipe > swipeConfidenceThreshold) {
              prevSlide();
            }
          }}
        >
          <img
            alt={slides[currentSlide].alt}
            className="w-full h-full object-cover brightness-110 pointer-events-none"
            src={slides[currentSlide].image}
          />
          {/* Light Brown Color Overlay */}
          <div
            className="absolute inset-0 z-10 opacity-10 pointer-events-none"
            style={{ backgroundColor: "#7C3B1F" }}
          ></div>
        </motion.div>
      </AnimatePresence>

      {/* Dots Navigation - Moved higher on mobile to avoid overlap */}
      <div className="absolute top-1/2 right-4 -translate-y-1/2 md:top-auto md:right-auto md:bottom-6 md:left-1/2 md:-translate-x-1/2 z-20 flex flex-col md:flex-row gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`w-3 h-3 transition-all ${currentSlide === idx ? "bg-white scale-110" : "bg-white/50 hover:bg-white/80"}`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

      <div className="container mx-auto px-2 md:px-4 relative z-20 mb-8 md:mb-0">
        {/* Booking Form - More compact on mobile */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-5xl mx-auto backdrop-blur-md rounded-none shadow-2xl p-4 md:p-8"
          style={{
            backgroundColor: "rgba(124, 59, 31, 0.25)",
            borderTop: "4px solid #F06934",
          }}
        >
          <h2
            className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-center text-white"
            style={{ fontFamily: "Mikado, sans-serif" }}
          >
            {slides[currentSlide].heading}
          </h2>
          {/* Changed grid columns for mobile compactness */}
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-2 lg:grid-cols-5 gap-3 md:gap-4"
          >
            <div className="flex flex-col gap-1 md:gap-2 col-span-1">
              <label
                className="text-xs md:text-sm font-bold flex items-center gap-2 text-white"
                style={{ fontFamily: "Nunito, sans-serif" }}
              >
                <Calendar size={14} className="md:w-4 md:h-4" />
                Check-In
              </label>
              <input
                type="date"
                name="checkIn"
                value={formData.checkIn}
                onChange={handleInputChange}
                className="w-full px-2 md:px-4 py-2 md:py-3 text-xs md:text-base border-2 border-transparent rounded-none focus:outline-none focus:ring-2 focus:ring-[#F06934] transition-all bg-white/90"
                style={{ fontFamily: "Nunito, sans-serif" }}
                required
              />
            </div>

            <div className="flex flex-col gap-1 md:gap-2 col-span-1">
              <label
                className="text-xs md:text-sm font-bold flex items-center gap-2 text-white"
                style={{ fontFamily: "Nunito, sans-serif" }}
              >
                <Calendar size={14} className="md:w-4 md:h-4" />
                Check-Out
              </label>
              <input
                type="date"
                name="checkOut"
                value={formData.checkOut}
                onChange={handleInputChange}
                className="w-full px-2 md:px-4 py-2 md:py-3 text-xs md:text-base border-2 border-transparent rounded-none focus:outline-none focus:ring-2 focus:ring-[#F06934] transition-all bg-white/90"
                style={{ fontFamily: "Nunito, sans-serif" }}
                required
              />
            </div>

            <div className="flex flex-col gap-1 md:gap-2 col-span-1">
              <label
                className="text-xs md:text-sm font-bold flex items-center gap-2 text-white"
                style={{ fontFamily: "Nunito, sans-serif" }}
              >
                <Users size={14} className="md:w-4 md:h-4" />
                Guests
              </label>
              <select
                name="guests"
                value={formData.guests}
                onChange={handleInputChange}
                className="w-full px-2 md:px-4 py-2 md:py-3 text-xs md:text-base border-2 border-transparent rounded-none focus:outline-none focus:ring-2 focus:ring-[#F06934] transition-all bg-white/90"
                style={{ fontFamily: "Nunito, sans-serif" }}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                  <option key={num} value={num}>
                    {num} Guest{num > 1 ? "s" : ""}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1 md:gap-2 col-span-1">
              <label
                className="text-xs md:text-sm font-bold flex items-center gap-2 text-white"
                style={{ fontFamily: "Nunito, sans-serif" }}
              >
                <Home size={14} className="md:w-4 md:h-4" />
                Room Type
              </label>
              <select
                name="roomType"
                value={formData.roomType}
                onChange={handleInputChange}
                className="w-full px-2 md:px-4 py-2 md:py-3 text-xs md:text-base border-2 border-transparent rounded-none focus:outline-none focus:ring-2 focus:ring-[#F06934] transition-all bg-white/90"
                style={{ fontFamily: "Nunito, sans-serif" }}
              >
                <option value="hotels">Resort</option>
                <option value="caravan">Caravan</option>
                <option value="bungalow">Bungalow</option>
                <option value="treehouse">Treehouse</option>
              </select>
            </div>

            <div className="flex flex-col justify-end col-span-2 lg:col-span-1">
              <Button
                type="submit"
                className="w-full p-3 md:p-8 rounded-none font-bold text-sm md:text-lg transition-all hover:shadow-xl hover:scale-105"
                style={{
                  backgroundColor: "#F06934",
                  color: "white",
                  fontFamily: "Nunito, sans-serif",
                }}
              >
                Book Now
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
