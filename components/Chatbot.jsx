'use client'
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa'; // Import WhatsApp icon
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
  const whatsappNumber = "+6282125222756"; // Placeholder WhatsApp number

  const handleToggleChat = () => {
    if (isOpen) {
      setIsOpen(false);
    } else {
      // Open WhatsApp link if chatbot is closed
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=Hello%20Safari%20Resort%2C%20I%20have%20a%20question.`;
      window.open(whatsappUrl, '_blank');
      
      toast({
        title: "Opening WhatsApp Chat",
        description: "Redirecting you to our WhatsApp support.",
      });
    }
  };

  const handleSendMessage = () => {
    toast({
      title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
    });
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-24 right-4 z-[60] w-[calc(100vw-2rem)] md:w-96 bg-white rounded-xl overflow-hidden shadow-2xl border border-gray-100"
          >
            {/* Header */}
            <div className="bg-[#7C3B1F] p-4 flex justify-between items-center text-white">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-full">
                  <FaWhatsapp size={20} /> {/* WhatsApp icon in header */}
                </div>
                <div>
                  <h3 className="font-bold text-sm" style={{ fontFamily: 'Mikado, sans-serif' }}>WhatsApp Chat</h3>
                  <p className="text-xs opacity-80" style={{ fontFamily: 'Nunito, sans-serif' }}>Online</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-1 rounded transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Body */}
            <div className="h-80 p-4 overflow-y-auto bg-[#faf7f5] flex flex-col gap-3">
               <div className="self-start bg-white p-3 rounded-2xl rounded-tl-none shadow-sm max-w-[80%] border border-gray-100">
                  <p className="text-sm text-gray-700" style={{ fontFamily: 'Nunito, sans-serif' }}>Hello! 👋 Welcome to Safari Resort. How can I help you today via WhatsApp?</p>
               </div>
               <div className="self-start bg-white p-3 rounded-2xl rounded-tl-none shadow-sm max-w-[80%] border border-gray-100 delay-300">
                  <p className="text-sm text-gray-700" style={{ fontFamily: 'Nunito, sans-serif' }}>You can chat with us about room availability, park tickets, or dining reservations!</p>
               </div>
            </div>

            {/* Input */}
            <div className="p-3 bg-white border-t border-gray-100">
              <div className="flex gap-2">
                <input 
                  type="text" 
                  placeholder="Type your message..." 
                  className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#F06934]/50"
                  style={{ fontFamily: 'Nunito, sans-serif' }}
                />
                <Button onClick={handleSendMessage} size="icon" className="rounded-full bg-[#F06934] hover:bg-[#d95a28]">
                  <Send size={16} />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button for WhatsApp (always links to WhatsApp) */}
      <motion.button
        onClick={handleToggleChat} // Use the new handler
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 z-50 p-0 rounded-full text-white hidden md:flex items-center justify-center transition-all overflow-hidden bg-transparant w-20 h-20  hover:shadow-2xl" // Smaller, more appropriate for WhatsApp
      >
        {/* WhatsApp icon using img tag for the provided URL */}
        <img 
          src="/assets/icon/icon-wa4.png" 
          alt="WhatsApp icon" 
          className="w-full h-full object-contain p-1" // Adjusted padding to fit
        />
      </motion.button>
    </>
  );
};

export default Chatbot;