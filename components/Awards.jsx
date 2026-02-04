'use client'
import React from 'react';
import { motion } from 'framer-motion';

const Awards = ({dataAwards}) => {
  const awards = [
    {
      name: "CPSG",
      logo: "https://horizons-cdn.hostinger.com/b05a0347-ff2a-4d3e-b189-510345403291/2eb2d9b4ffd71c1a010cc3a3ff11c57e.png",
    },
    {
      name: "WAZA",
      logo: "https://horizons-cdn.hostinger.com/b05a0347-ff2a-4d3e-b189-510345403291/96f2c496916b2fb6027cf447eeb1ad93.png",
    },
    {
      name: "Kementerian Lingkungan Hidup",
      logo: "https://horizons-cdn.hostinger.com/b05a0347-ff2a-4d3e-b189-510345403291/6ce4b540cf2b905f3f01eeab99780e28.png",
    },
    {
      name: "TripAdvisor",
      logo: "https://horizons-cdn.hostinger.com/b05a0347-ff2a-4d3e-b189-510345403291/764d5f3f9c69eb075f6695fa66cfa5cb.png",
    },
    {
      name: "PKBSI",
      logo: "https://horizons-cdn.hostinger.com/b05a0347-ff2a-4d3e-b189-510345403291/4cb067b43101a11b13d1be3fef35b0a3.png",
    },
    {
      name: "ZOOS",
      logo: "https://horizons-cdn.hostinger.com/b05a0347-ff2a-4d3e-b189-510345403291/398bbe2257b18ebb6de72338c84f4cec.png",
    }
  ];

  function scopeGrapeJSCSS(css, scopeClass = ".grapejs-wrapper") {
    const addScope = (selector) => {
      // Kalau sudah ada scopeClass, jangan ditambah lagi
      if (selector.includes(scopeClass)) return selector.trim();
      return `${scopeClass} ${selector.trim()}`;
    };
  
    // Tangani blok @media
    css = css.replace(/@media[^{]+\{([\s\S]+?)\}\s*\}/g, (match, inner) => {
      const scopedInner = inner.replace(
        /(^|\})\s*([^{\}]+)\s*\{/g,
        (m, p1, selector) => {
          if (selector.startsWith("@")) return m;
          const scopedSelectors = selector
            .split(",")
            .map((sel) => addScope(sel))
            .join(", ");
          return `${p1} ${scopedSelectors} {`;
        },
      );
      return match.replace(inner, scopedInner);
    });
  
    // Tangani selector di luar @media
    css = css.replace(/(^|\})\s*([^{\}]+)\s*\{/g, (match, p1, selector) => {
      if (selector.startsWith("@")) return match;
      const scopedSelectors = selector
        .split(",")
        .map((sel) => addScope(sel))
        .join(", ");
      return `${p1} ${scopedSelectors} {`;
    });
  
    return css;
  }

   

  return (
    <section className="py-12 bg-white border-t border-[#7C3B1F]/5">
      {dataAwards && typeof window !== "undefined"? (
        <div className="grapejs-wrapper">
          <div
            dangerouslySetInnerHTML={{ __html: JSON.parse(dataAwards?.html) }}
          />
          <style
            dangerouslySetInnerHTML={{
              __html: scopeGrapeJSCSS(JSON.parse(dataAwards?.css)),
            }}
          />
        </div>
      ) : (
        ""
      )} 
      {/* <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <span className="text-[#F06934] font-bold text-xs tracking-widest uppercase mb-2 block">Excellence</span>
          <h2 
            className="text-2xl md:text-3xl font-bold text-[#7C3B1F]" 
            style={{ fontFamily: 'Mikado, sans-serif' }}
          >
            Awards & Recognition
          </h2>
        </motion.div>

        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-80">
          {awards.map((award, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.4 }}
              className="w-24 h-24 md:w-32 md:h-20 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300"
            >
              <img 
                src={award.logo} 
                alt={`${award.name} Logo`} 
                className="max-w-full max-h-full object-contain"
              />
            </motion.div>
          ))}
        </div>
      </div> */}
    </section>
  );
};

export default Awards;