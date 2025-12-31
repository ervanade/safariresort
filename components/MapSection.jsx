'use client'
import React from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
const MapSection = () => {
  return <section className="relative w-full h-[500px] overflow-hidden">
      <div className="absolute inset-0 bg-black/20 z-10 pointer-events-none"></div>
      <img src="https://horizons-cdn.hostinger.com/b05a0347-ff2a-4d3e-b189-510345403291/screen-shot-2025-12-11-at-13.03.30-RtjVd.png" alt="Map Location" className="w-full h-full object-cover" />
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center p-4">
        <motion.div initial={{
        scale: 0.8,
        opacity: 0
      }} whileInView={{
        scale: 1,
        opacity: 1
      }} transition={{
        duration: 0.6
      }} className="bg-white/95 backdrop-blur-md p-8  shadow-2xl max-w-md border-t-4 border-[#F06934]">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-[#7C3B1F] rounded-full text-white">
                <MapPin size={32} />
            </div>
          </div>
          <h2 className="text-3xl font-bold mb-4" style={{
          color: '#7C3B1F',
          fontFamily: 'Mikado, sans-serif'
        }}>
            Start Your Journey
          </h2>
          <p className="text-[#7C3B1F] mb-6" style={{
          fontFamily: 'Nunito, sans-serif'
        }}>
            Located in the heart of the national park, our resort is easily accessible via main routes.
          </p>
          <Button className="w-full text-white font-bold" style={{
          backgroundColor: '#F06934',
          fontFamily: 'Nunito, sans-serif'
        }}>
            Get Directions
          </Button>
        </motion.div>
      </div>
    </section>;
};
export default MapSection;