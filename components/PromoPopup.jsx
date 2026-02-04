'use client'
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { mapPromo } from '@/lib/utils';

const PromoPopup = ({dataPromo}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const dummyPromos = [
    {
      id: 1,
      image: "https://horizons-cdn.hostinger.com/b05a0347-ff2a-4d3e-b189-510345403291/ccb7556c5dfe8b86de55a58dc7cf682f.png",
      title: "1.1 FLASH SALE",
      subtitle: "11-20 Jan 2026",
      description: "Exclusive flash sale! Special rates for your wild stay.",
      price: "IDR 1,500,000",
      cta: "Book Now"
    },
    {
      id: 2,
      image: "https://horizons-cdn.hostinger.com/b05a0347-ff2a-4d3e-b189-510345403291/1df41e0bdf8643f50c57d11942921d44.png",
      title: "UNFORGETTABLE STAY",
      subtitle: "PIK Avenue (5-11 Jan)",
      description: "Visit our booth for exclusive caravan packages.",
      price: "IDR 2,100,000",
      cta: "Learn More"
    },
    {
      id: 3,
      image: "https://horizons-cdn.hostinger.com/b05a0347-ff2a-4d3e-b189-510345403291/beef569d2f21968d7d4855f55f98f873.png",
      title: "Treehouse Retreat",
      subtitle: "Nature's Embrace",
      description: "Reconnect with nature in our stunning treehouses.",
      price: "IDR 3,200,000",
      cta: "View Details"
    }
  ];

  const promos = dataPromo.length ? mapPromo(dataPromo) :  dummyPromos

  // Show popup after a short delay on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Auto-rotate logic
  useEffect(() => {
    if (!isVisible) return;

    const timer = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % promos.length);
    }, 6000); // 6 seconds

    return () => clearTimeout(timer);
  }, [isVisible, currentIndex, promos.length]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const currentPromo = promos[currentIndex];

  function scopeGrapeJSCSS(css, scopeClass = ".grapejs-wrapper") {
    const addScope = (selector) => {
      // Kalau sudah ada scopeClass, jangan ditambah lagi
      if (selector.includes(scopeClass)) return selector.trim();
      return `${scopeClass} ${selector.trim()}`;
    };
  
    // Tangani blok @media
    css = css.replace(/@media[^{]+\{([\s\S]+?)\}\s*\}/g, (match, inner) => {
      const scopedInner = inner.replace(/(^|\})\s*([^{\}]+)\s*\{/g, (m, p1, selector) => {
        if (selector.startsWith("@")) return m;
        const scopedSelectors = selector
          .split(",")
          .map(sel => addScope(sel))
          .join(", ");
        return `${p1} ${scopedSelectors} {`;
      });
      return match.replace(inner, scopedInner);
    });
  
    // Tangani selector di luar @media
    css = css.replace(/(^|\})\s*([^{\}]+)\s*\{/g, (match, p1, selector) => {
      if (selector.startsWith("@")) return match;
      const scopedSelectors = selector
        .split(",")
        .map(sel => addScope(sel))
        .join(", ");
      return `${p1} ${scopedSelectors} {`;
    });
  
    return css;
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.95 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed bottom-8 left-5 -translate-x-1/2 md:left-5 md:translate-x-0 z-[100] w-[90vw] max-w-[420px] hidden md:block"
        >
          <div className="relative bg-white rounded-xl md:rounded-none shadow-2xl overflow-hidden border border-gray-100/50 backdrop-blur-xl flex h-[180px] md:h-[200px]">
            {/* Close Button */}
            <button
              onClick={() => setIsVisible(false)}
              className="absolute top-2 right-2 z-30 p-1.5 bg-black/10 hover:bg-black/20 text-gray-500 hover:text-gray-800 rounded-full transition-all duration-300 backdrop-blur-sm"
              aria-label="Close promotion"
            >
              <X size={14} strokeWidth={2.5} />
            </button>

            {/* Content Container - Horizontal Layout */}
            <div className="flex w-full">
              
              {/* Left Side: Image */}
              <div className="w-[140px] md:w-[160px] h-full shrink-0 relative overflow-hidden bg-gray-100">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentIndex}
                    src={currentPromo.image}
                    alt={currentPromo.title}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full h-full object-cover absolute inset-0"
                  />
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-transparent pointer-events-none" />
              </div>

              {/* Right Side: Content */}
              <div className="flex-1 flex flex-col p-4 md:p-5 relative">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.3 }}
                    className="flex-1 flex flex-col justify-center"
                  >
                    <h3 className="text-sm md:text-base font-bold text-[#7C3B1F] leading-tight mb-1 line-clamp-2" style={{ fontFamily: 'Mikado, sans-serif' }}>
                      {currentPromo.title}
                    </h3>

                    {currentPromo?.content && typeof window !== "undefined"? (
        <div className="grapejs-wrapper">
          <div
            dangerouslySetInnerHTML={{ __html: currentPromo?.content }}
          />
          <style
            dangerouslySetInnerHTML={{
              __html: scopeGrapeJSCSS(currentPromo?.content),
            }}
          />
        </div>
      ) : (
        ""
      )}
                    
                    {/* <p className="text-[10px] md:text-[11px] font-bold text-[#F06934] uppercase tracking-wide mb-1.5" style={{ fontFamily: 'Nunito, sans-serif' }}>
                      {currentPromo.subtitle}
                    </p>
                    
                    <p className="text-[11px] md:text-xs text-gray-500 leading-snug line-clamp-2 mb-3" style={{ fontFamily: 'Nunito, sans-serif' }}>
                      {currentPromo.description}
                    </p> */}

                    <div className="mt-auto flex items-center justify-between gap-2">
                       {/* <div className="flex flex-col">
                          <span className="text-[9px] text-gray-400 uppercase font-medium">From</span>
                          <span className="text-sm md:text-base font-bold text-[#7C3B1F] leading-none" style={{ fontFamily: 'Mikado, sans-serif' }}>
                             {currentPromo.price}
                          </span>
                       </div> */}
                       
                       <button
                        className="px-3 py-1.5 bg-[#F06934] hover:bg-[#d65523] text-white text-[10px] md:text-xs font-bold rounded-lg md:rounded-none transition-all duration-300 shadow-sm hover:shadow-md active:scale-95 whitespace-nowrap"
                        style={{ fontFamily: 'Nunito, sans-serif' }}
                      >
                        {currentPromo.cta}
                      </button>
                    </div>
                  </motion.div>
                </AnimatePresence>

                 {/* Dots Indicator inside right panel at bottom */}
                 <div className="absolute bottom-1.5 right-4 flex gap-1 z-20">
                  {promos.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => goToSlide(idx)}
                      className={`h-1 rounded-full transition-all duration-300 ${
                        idx === currentIndex ? 'w-4 bg-[#F06934]/60' : 'w-1 bg-gray-200 hover:bg-gray-300'
                      }`}
                      aria-label={`Go to promotion ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="h-[2px] bg-gray-50 w-full absolute bottom-0 left-0 overflow-hidden pointer-events-none">
              <motion.div
                key={currentIndex}
                className="h-full bg-[#F06934]"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 6, ease: "linear" }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PromoPopup;
