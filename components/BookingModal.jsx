'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { createPortal } from 'react-dom';

const BookingModal = ({ isOpen, onClose }) => {

  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = 'unset';
      return;
    }

    document.body.style.overflow = 'hidden';

    /** -----------------------------
     * 1. Load CSS (once)
     ------------------------------ */
    const cssId = 'dedge-widget-css';
    if (!document.getElementById(cssId)) {
      const link = document.createElement('link');
      link.id = cssId;
      link.rel = 'stylesheet';
      link.href = '//websdk.fastbooking-services.com/widgets/app.css';
      document.head.appendChild(link);
    }

    /** -----------------------------
     * 2. Inject Config JSON
     ------------------------------ */
    const configScript = document.createElement('script');
    configScript.type = 'application/json';
    configScript.className = 'fb-widget-config';
    configScript.dataset.fbconfig = '0';
    configScript.innerHTML = JSON.stringify({
      params: [
        {
          calendar: {
            nbMonths2display: 2,
            title: 'BOOK YOUR STAY',
            showBestPrice: true,
            openBookingFunnel: false // 🔥 OPEN POPUP
          },
          currency: 'IDR',
          locale: 'en_GB',
          property: 'idbog27674',
          fbWidget: 'Calendar'
        }
      ],
      _authCode: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzY29wZXMiOiIuKiIsInByb3BlcnRpZXMiOiJpZGJvZzI3Njc0IiwiZ3JvdXBzIjoiXiQiLCJmb3IiOiJCYWNrb2ZmaWNlIiwiaWF0IjoxNzY3NzkzNTgxLCJqaWQiOiI2OTVlNDc4ZDYyNDIxIn0.qduvwJIb2vK2opLKFhq2K9AJzeXvz7ZGSlGzaanr72w',
      propertyIndex: 0,
      version: '1.76.0',
      baseHost: 'websdk.fastbooking-services.com'
    });

    document.body.appendChild(configScript);

    /** -----------------------------
     * 3. Load JS (once)
     ------------------------------ */
    const jsId = 'dedge-widget-js';
    if (!document.getElementById(jsId)) {
      const script = document.createElement('script');
      script.id = jsId;
      script.src = '//websdk.fastbooking-services.com/widgets/app.js';
      script.async = true;
      document.body.appendChild(script);
    }

    return () => {
      document.body.style.overflow = 'unset';
      configScript.remove();
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">

        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-full bg-white rounded-xl shadow-2xl flex flex-col max-h-[90vh]"
        >

          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b bg-gray-50">
            <h3 className="font-bold text-[#7C3B1F] text-lg">
              Book Your Stay
            </h3>
            <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full">
              <X size={20} />
            </button>
          </div>

          {/* Widget */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6">
            <div
              id="fb-widget-modal"
              className="fb-widget w-full"
              data-fbconfig="0"
            />
          </div>

          {/* Footer */}
          <div className="p-3 text-center text-xs text-gray-400 border-t">
            Secure booking powered by D-EDGE
          </div>
        </motion.div>
      </div>
    </AnimatePresence>,
    document.body
  );
};

export default BookingModal;
