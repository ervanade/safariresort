'use client'
import React from 'react';
import { motion } from 'framer-motion';

const MobileFooter = ({ onChatToggle }) => {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToBottom = () => {
      window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth'
      });
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#3E1C0F] h-16 md:hidden flex items-center justify-between px-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
        
      {/* Left Button */}
      <button 
        onClick={() => scrollToSection('hero')}
        className="flex-1 text-white text-sm font-bold tracking-widest uppercase py-3 border border-[#F06934] bg-[#3E1C0F] hover:bg-[#522514] active:bg-[#2a130a] transition-colors"
        style={{ fontFamily: 'Mikado, sans-serif' }}
      >
        Book Now
      </button>

      {/* Center Chatbot Trigger */}
      <div className="relative w-20 flex justify-center -mt-8">
        <motion.button
          onClick={onChatToggle}
          whileTap={{ scale: 0.95 }}
          className="absolute -top-6 w-20 h-20 bg-[#3E1C0F] rounded-full shadow-lg flex items-center justify-center border-4 border-[#3E1C0F] z-10 p-1"
        >
          <img 
            src="https://i.imgur.com/kRdv0Fb.png" 
            alt="Chatbot" 
            className="w-full h-full object-contain"
          />
        </motion.button>
        {/* Background filler for the arch effect behind the circle */}
        <div className="absolute top-0 w-24 h-12 bg-transparent rounded-full -z-0" /> 
      </div>

      {/* Right Button */}
      <button 
        onClick={scrollToBottom}
        className="flex-1 text-white text-sm font-bold tracking-widest uppercase py-3 border border-[#F06934] bg-[#3E1C0F] hover:bg-[#522514] active:bg-[#2a130a] transition-colors"
        style={{ fontFamily: 'Mikado, sans-serif' }}
      >
        Contact Us
      </button>
    </div>
  );
};

export default MobileFooter;