'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import RoomCard from '@/components/RoomCard';

/* ===== Mobile Detection (Hydration Safe) ===== */
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return isMobile;
};

export default function RoomSlider({ rooms, page, setPage }) {
  const isMobile = useIsMobile();
  const [direction, setDirection] = useState(0);

  const roomsPerPage = isMobile ? 1 : 2;
  const totalPages = Math.ceil(rooms.length / roomsPerPage);

  useEffect(() => {
    setPage(0);
  }, [roomsPerPage, setPage]);

  const paginate = dir => {
    setDirection(dir);
    const next = page + dir;
    if (next >= 0 && next < totalPages) setPage(next);
    else setPage(next < 0 ? totalPages - 1 : 0);
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset, velocity) =>
    Math.abs(offset) * velocity;

  const displayedRooms = rooms.slice(
    page * roomsPerPage,
    (page + 1) * roomsPerPage
  );

  const variants = {
    enter: dir => ({
      x: dir > 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.95
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      zIndex: 1
    },
    exit: dir => ({
      x: dir < 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.95,
      zIndex: 0
    })
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto px-2 md:px-0">
      {isMobile && (
        <p className="text-center text-xs font-bold uppercase tracking-widest text-[#F06934]/60 mt-2 mb-2 animate-pulse">
          Swipe to explore
        </p>
      )}

      <div className="relative h-[720px] md:h-[680px] overflow-hidden">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={page}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
              scale: { duration: 0.2 }
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.7}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);
              if (swipe < -swipeConfidenceThreshold) paginate(1);
              else if (swipe > swipeConfidenceThreshold) paginate(-1);
            }}
            className="absolute inset-0 grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {displayedRooms.map(room => (
              <RoomCard key={room.id} room={room} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-between mt-6 px-4">
        <button
          onClick={() => paginate(-1)}
          className="w-10 h-10 bg-white shadow-md border border-[#7C3B1F]/10 flex items-center justify-center text-[#7C3B1F] hover:bg-[#7C3B1F] hover:text-white transition-all"
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
              className={`h-2.5 transition-all ${
                page === idx
                  ? 'w-8 bg-[#F06934]'
                  : 'w-2.5 bg-[#7C3B1F]/20 hover:bg-[#7C3B1F]/40'
              }`}
            />
          ))}
        </div>

        <button
          onClick={() => paginate(1)}
          className="w-10 h-10 bg-white shadow-md border border-[#7C3B1F]/10 flex items-center justify-center text-[#7C3B1F] hover:bg-[#7C3B1F] hover:text-white transition-all"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
}
