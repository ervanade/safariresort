'use client'
import React from 'react';
import { motion } from 'framer-motion';

const MobileFooter = ({ settings }) => {

  const link_wa = settings?.find((item) => item.key === "whatsapp_number")?.value || "+6282125222756";
  const whatsappNumber = link_wa || "+6282125222756";
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

    const handleToggleChat = () => {

      // Open WhatsApp link if chatbot is closed
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=Hello%20Safari%20Resort%2C%20I%20have%20a%20question.`;
      window.open(whatsappUrl, '_blank');

  };
  
  const handleBook = () => {
    // 1. Definisikan nomor WhatsApp dan pesan (opsional)
    const link = `https://www.book-secure.com/index.php?s=results&property=idbog27674&arrival=2026-02-12&departure=2026-02-13&adults1=2&children1=0&locale=en_GB&currency=IDR&stid=cms52h5o8&showBestPriceFirst=1&showPromotions=3&langue=EN&Clusternames=ASIAIDTAMHTLSafariRe&cluster=ASIAIDTAMHTLSafariRe&Hotelnames=ASIAIDTAMHTLSafariRe&hname=ASIAIDTAMHTLSafariRe&nbNightsValue=1&adulteresa=2&nbAdultsValue=2&CurrencyLabel=IDR&redir=BIZ-so5523q0o4&rt=1770910934`;

    // 2. Buka di tab baru
    window.open(link, "_blank", "noopener,noreferrer");
    // setIsModalOpen(true);
    // toast({
    //   title: "Reservation Form",
    //   description: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
    // });
  };
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#3E1C0F] h-16 md:hidden flex items-center justify-between px-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
        
      {/* Left Button */}
      <button 
        onClick={handleBook}
        className="flex-1 text-white text-sm font-bold tracking-widest uppercase py-3 border border-[#F06934] bg-[#3E1C0F] hover:bg-[#522514] active:bg-[#2a130a] transition-colors"
        style={{ fontFamily: 'Mikado, sans-serif' }}
      >
        Book Now
      </button>

      {/* Center Chatbot Trigger */}
      <div className="relative w-20 flex justify-center -mt-8">
        <motion.button
          onClick={handleToggleChat}
          whileTap={{ scale: 0.95 }}
          className="absolute -top-6 w-20 h-20 bg-[#3E1C0F] rounded-full shadow-lg flex items-center justify-center border-4 border-[#3E1C0F] z-10 p-1"
        >
          <img 
            src={"/assets/icon/icon-wa4.png" || "https://i.imgur.com/kRdv0Fb.png" }
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