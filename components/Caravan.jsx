'use client'
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import RoomCard from '@/components/RoomCard';

import { Truck, Compass, Flame } from 'lucide-react';
import { roomsData } from './data/roomsData';

const Caravan = () => {
  
  // Filter only Caravan type rooms
  const caravanRooms = roomsData.filter(room => 
    room.name.toLowerCase().includes('caravan')
  );

  return (
    <div className="min-h-screen bg-[#faf7f5]">
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative h-[60vh] min-h-[500px] overflow-hidden">
            <div className="absolute inset-0">
                <img 
                    src="https://horizons-cdn.hostinger.com/b05a0347-ff2a-4d3e-b189-510345403291/ca48ecbddd2a09957d29c839545a2aee.jpg" 
                    alt="Caravan Adventure" 
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40" />
            </div>
            <div className="relative container mx-auto px-4 h-full flex flex-col justify-center text-white">
                <motion.span 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-[#F06934] font-bold tracking-widest uppercase mb-4 bg-black/50 w-fit px-4 py-1 rounded-full backdrop-blur-sm"
                >
                    Glamping Experience
                </motion.span>
                <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-5xl md:text-7xl font-bold mb-6 max-w-4xl leading-tight"
                    style={{ fontFamily: 'Mikado, sans-serif' }}
                >
                    Caravan Adventure
                </motion.h1>
                <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-lg md:text-2xl max-w-2xl font-medium text-white/90"
                    style={{ fontFamily: 'Nunito, sans-serif' }}
                >
                    Experience the thrill of camping without sacrificing comfort. Stay in our unique caravans for an unforgettable outdoor getaway.
                </motion.p>
            </div>
        </section>

        {/* Intro Section */}
        <section className="py-16 md:py-24 relative overflow-hidden">
             <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    <div className="bg-white p-8 shadow-sm border border-[#7C3B1F]/10 text-center group hover:bg-[#7C3B1F] transition-colors duration-300">
                        <div className="bg-[#faf7f5] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-white/10 transition-colors">
                            <Truck className="text-[#7C3B1F] group-hover:text-white" size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-[#7C3B1F] mb-3 group-hover:text-white" style={{ fontFamily: 'Mikado, sans-serif' }}>Unique Themes</h3>
                        <p className="text-[#7C3B1F]/70 group-hover:text-white/80" style={{ fontFamily: 'Nunito, sans-serif' }}>
                            Choose from classic caravans, rhino-themed units, or even a transformed bus for a quirky stay.
                        </p>
                    </div>
                    <div className="bg-white p-8 shadow-sm border border-[#7C3B1F]/10 text-center group hover:bg-[#7C3B1F] transition-colors duration-300">
                        <div className="bg-[#faf7f5] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-white/10 transition-colors">
                            <Compass className="text-[#7C3B1F] group-hover:text-white" size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-[#7C3B1F] mb-3 group-hover:text-white" style={{ fontFamily: 'Mikado, sans-serif' }}>Outdoor Adventure</h3>
                        <p className="text-[#7C3B1F]/70 group-hover:text-white/80" style={{ fontFamily: 'Nunito, sans-serif' }}>
                            Perfectly situated for easy access to our safari parks and outdoor trekking routes.
                        </p>
                    </div>
                    <div className="bg-white p-8 shadow-sm border border-[#7C3B1F]/10 text-center group hover:bg-[#7C3B1F] transition-colors duration-300">
                        <div className="bg-[#faf7f5] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-white/10 transition-colors">
                            <Flame className="text-[#7C3B1F] group-hover:text-white" size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-[#7C3B1F] mb-3 group-hover:text-white" style={{ fontFamily: 'Mikado, sans-serif' }}>Bonfire & BBQ</h3>
                        <p className="text-[#7C3B1F]/70 group-hover:text-white/80" style={{ fontFamily: 'Nunito, sans-serif' }}>
                            Enjoy the camping vibe with private terrace areas perfect for evening relaxation.
                        </p>
                    </div>
                </div>

                <div className="text-center mb-12">
                    <span className="text-[#F06934] font-bold text-sm tracking-widest uppercase mb-3 block">Accommodations</span>
                    <h2 className="text-4xl md:text-5xl font-bold text-[#7C3B1F]" style={{ fontFamily: 'Mikado, sans-serif' }}>
                        Select Your Caravan
                    </h2>
                </div>

                {/* Room Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {caravanRooms.map((room, index) => (
                        <motion.div
                            key={room.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <RoomCard room={room} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
      </main>

    </div>
  );
};

export default Caravan;