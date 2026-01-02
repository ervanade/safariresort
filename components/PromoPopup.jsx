"use client"
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const PromoPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    {
      src: "https://scontent.cdninstagram.com/v/t39.30808-6/596754097_851606630791670_276783735470387585_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=107&ig_cache_key=Mzc4NTIyOTE0MDkyMTMzNzY5NA%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjEwMjR4MTI4MC5zZHIuQzMifQ%3D%3D&_nc_ohc=rgKnHc0V3TcQ7kNvwEZ3BXe&_nc_oc=AdkCk6rhtzN0Qnw0xiihlJaQMueS-xLw7Z-bdkh43EVuBXlVu5ix5lu5etIyLNG-YxXcMOouShuiZ6zsuEX0GePf&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&_nc_gid=Ie047GsncEOYjsQ9gStrHA&oh=00_AflcAo5600Oj0DH5DWlN9qfswqu3tWHY0mEIQ7a0WvX7-A&oe=694A25D8",
      alt: "SAFARI RESORT 12.12",
      link: "#Promo" 
    },
    {
      src: "https://scontent.cdninstagram.com/v/t39.30808-6/597163458_851375997481400_9097260567763197192_n.jpg?stp=dst-jpg_e35_p720x720_tt6&_nc_cat=102&ig_cache_key=Mzc4NDk5MjkwNzI1MTAzNzc2Mg%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjEwODB4MTM1MC5zZHIuQzMifQ%3D%3D&_nc_ohc=GtEgLR0tIrYQ7kNvwHWcN8B&_nc_oc=Adlm-0Sx8bMyo1UOv5xYN-QQNNE8Z4dOTH9lcXjGFU7bT7vAoLrSlYGsnx9VhHfLWLPoubZFUUesUHb13OxXw8Rz&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&_nc_gid=uVeHPYDtLo17HG6Z9VKDDQ&oh=00_AflkKgvIK9JWKiHMkAn5GTPoB23vSx2bhMTDENQzT39W9w&oe=694A1A84",
      alt: "Special Offer Christmas Holidaze",
      link: "#Promo"
    }    
  ];

  // Show popup after a short delay on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Auto-close logic
  useEffect(() => {
    let closeTimer;
    if (isVisible) {
      closeTimer = setTimeout(() => {
        setIsVisible(false);
      }, 15000); // Extended to 15 seconds to allow reading, user can click to close earlier
    }
    return () => clearTimeout(closeTimer);
  }, [isVisible]);

  // Handle manual navigation
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      setIsVisible(false);
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm cursor-pointer"
          onClick={handleBackdropClick}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative w-full max-w-lg bg-transparent overflow-hidden shadow-2xl cursor-default"
            onClick={(e) => e.stopPropagation()} // Prevent clicks inside the modal from closing it
          >
            {/* Close Button */}
            <button
              onClick={() => setIsVisible(false)}
              className="absolute top-4 right-4 z-20 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors backdrop-blur-md"
            >
              <X size={20} />
            </button>

            {/* Slider Content */}
            <div className="relative aspect-[4/5] md:aspect-square w-full bg-black group">
              <AnimatePresence mode="wait">
                <motion.a
                  key={currentIndex}
                  href={images[currentIndex].link}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.3 }}
                  className="block w-full h-full relative"
                >
                  <img
                    src={images[currentIndex].src}
                    alt={images[currentIndex].alt}
                    className="w-full h-full object-contain"
                  />
                  {/* Overlay to indicate clickability */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
                </motion.a>
              </AnimatePresence>
              
              {/* Navigation Arrows (Only show if multiple images) */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={(e) => { e.stopPropagation(); prevSlide(); }}
                    className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-black/30 hover:bg-black/50 text-white rounded-full transition-colors z-30"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); nextSlide(); }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-black/30 hover:bg-black/50 text-white rounded-full transition-colors z-30"
                  >
                    <ChevronRight size={24} />
                  </button>
                </>
              )}

              {/* Dots Indicator */}
              {images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-30">
                  {images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={(e) => { e.stopPropagation(); setCurrentIndex(idx); }}
                      className={`w-2 h-2 rounded-full transition-all ${
                        idx === currentIndex ? 'bg-white w-4' : 'bg-white/50 hover:bg-white/80'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
            
            {/* Progress Bar for Auto Close */}
            <motion.div 
              className="h-1 bg-white/30 w-full absolute bottom-0 left-0"
            >
              <motion.div 
                className="h-full bg-[#F06934]"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 15, ease: "linear" }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PromoPopup;