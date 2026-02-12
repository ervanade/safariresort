"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import RoomCard from "@/components/RoomCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { roomsData } from "./data/roomsData";
import { mapAccommodationsToRooms } from "@/lib/utils";

// Improved helper for mobile detection with immediate initialization
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth < 768 : false,
  );
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  return isMobile;
};

const RoomSlider = ({ rooms, page, setPage }) => {
  const isMobile = useIsMobile();
  const [direction, setDirection] = useState(0);
  const roomsPerPage = isMobile ? 1 : 2;
  const totalPages = Math.ceil(rooms.length / roomsPerPage);

  useEffect(() => {
    setPage(0);
  }, [roomsPerPage, setPage]);

  const paginate = (newDirection) => {
    const nextPage = page + newDirection;
    setDirection(newDirection);
    if (nextPage >= 0 && nextPage < totalPages) {
      setPage(nextPage);
    } else if (nextPage < 0) {
      setPage(totalPages - 1);
    } else {
      setPage(0);
    }
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
  };
  const displayedRooms = rooms.slice(
    page * roomsPerPage,
    (page + 1) * roomsPerPage,
  );

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 0.95,
    }),
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto px-2 md:px-0">
      {isMobile && (
        <p className="text-center text-xs font-bold uppercase tracking-widest text-[#F06934]/60 mt-2 mb-2 animate-pulse">
          Swipe to explore
        </p>
      )}
      {/* Reduced height for slider container to match new card aspect ratio */}
      <div className="relative h-[480px] md:h-[500px] overflow-hidden w-full touch-pan-y ">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={page}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
              scale: { duration: 0.2 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.7}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);
              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
            className="absolute top-0 left-0 w-full h-full grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {displayedRooms.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-between mt-6 px-4">
        <button
          onClick={() => paginate(-1)}
          className="w-10 h-10  bg-white shadow-md border border-[#7C3B1F]/10 flex items-center justify-center text-[#7C3B1F] hover:bg-[#7C3B1F] hover:text-white transition-all active:scale-90"
          aria-label="Previous slide"
        >
          <ChevronLeft size={24} />
        </button>

        <div className="flex gap-2">
          {Array.from({ length: totalPages }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setDirection(idx > page ? 1 : -1);
                setPage(idx);
              }}
              className={`transition-all duration-300  h-2.5 ${page === idx ? "w-8 bg-[#F06934]" : "w-2.5 bg-[#7C3B1F]/20 hover:bg-[#7C3B1F]/40"}`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        <button
          onClick={() => paginate(1)}
          className="w-10 h-10  bg-white shadow-md border border-[#7C3B1F]/10 flex items-center justify-center text-[#7C3B1F] hover:bg-[#7C3B1F] hover:text-white transition-all active:scale-90"
          aria-label="Next slide"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
};

const Rooms = ({ accomodations, dataAccommodations }) => {
  const [resortPage, setResortPage] = useState(0);
  const [hotelPage, setHotelPage] = useState(0);

  const rooms = accomodations?.length
    ? mapAccommodationsToRooms(accomodations)
    : roomsData;

  // Filter data from shared source
  const resortRooms = rooms.filter((r) => r.category === "resort");
  const hotelRooms = rooms.filter((r) => r.category === "hotel");

  return (
    <section
      id="stay"
      className="py-20 md:py-32 relative overflow-hidden bg-[#faf7f5]"
    >
      <div className="bg-zebra-pattern opacity-10 absolute inset-0 z-0 pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-[#F06934] font-bold text-sm tracking-widest uppercase mb-3 block">
            {dataAccommodations?.title || `Accommodations`}
          </span>
          <h2
            className="text-4xl md:text-5xl font-bold mb-6 text-[#7C3B1F]"
            style={{ fontFamily: "Mikado, sans-serif" }}
          >
            {dataAccommodations?.subtitle || `Choose Your Sanctuary`}
          </h2>
          <p
            className="text-lg text-[#7C3B1F]/80 max-w-2xl mx-auto font-medium"
            style={{ fontFamily: "Nunito, sans-serif" }}
          >
            {dataAccommodations?.desc ||
              `Nestled within the lush greenery of Taman Safari Indonesia Bogor,
            Safari Resort offers a variety of themed accommodations designed to
            provide guests with an extraordinary stay.`}
          </p>
        </motion.div>

        <Tabs defaultValue="resort" className="w-full">
          <div className="flex justify-center mb-6">
            <TabsList className="grid w-full grid-cols-2 max-w-[400px] h-auto p-1.5 bg-white border border-[#7C3B1F]/10  shadow-sm">
              <TabsTrigger
                value="resort"
                className=" py-3 text-base font-bold data-[state=active]:bg-[#7C3B1F] data-[state=active]:text-white transition-all text-[#7C3B1F]/70"
              >
                Resort
              </TabsTrigger>
              <TabsTrigger
                value="hotel"
                className=" py-3 text-base font-bold data-[state=active]:bg-[#7C3B1F] data-[state=active]:text-white transition-all text-[#7C3B1F]/70"
              >
                Hotel
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="resort" className="focus-visible:outline-none">
            <RoomSlider
              rooms={resortRooms}
              page={resortPage}
              setPage={setResortPage}
            />
          </TabsContent>

          <TabsContent value="hotel" className="focus-visible:outline-none">
            <RoomSlider
              rooms={hotelRooms}
              page={hotelPage}
              setPage={setHotelPage}
            />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};
export default Rooms;
