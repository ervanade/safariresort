'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import RoomSlider from './RoomSlider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { roomsData } from './data/roomsData';



export default function Rooms() {
  const [resortPage, setResortPage] = useState(0);
  const [hotelPage, setHotelPage] = useState(0);

  const resortRooms = roomsData.filter(r => r.category === 'resort');
  const hotelRooms = roomsData.filter(r => r.category === 'hotel');

  return (
    <section
      id="stay"
      className="py-20 md:py-32 relative overflow-hidden bg-[#faf7f5]"
    >
      <div className="bg-zebra-pattern opacity-10 absolute inset-0 z-0 pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-[#F06934] font-bold text-sm tracking-widest uppercase mb-3 block">
            Accommodations
          </span>

          <h2
            className="text-4xl md:text-5xl font-bold mb-6 text-[#7C3B1F]"
            style={{ fontFamily: 'Mikado, sans-serif' }}
          >
            Choose Your Sanctuary
          </h2>

          <p
            className="text-lg text-[#7C3B1F]/80 max-w-2xl mx-auto font-medium"
            style={{ fontFamily: 'Nunito, sans-serif' }}
          >
            Nestled within the lush greenery of Taman Safari Indonesia Bogor,
            Safari Resort offers a variety of themed accommodations designed to
            provide guests with an extraordinary stay.
          </p>
        </motion.div>

        <Tabs defaultValue="resort" className="w-full">
          <div className="flex justify-center mb-6">
            <TabsList className="grid grid-cols-2 max-w-[400px] w-full p-1.5 bg-white border border-[#7C3B1F]/10 shadow-sm">
              <TabsTrigger
                value="resort"
                className="py-3 text-base font-bold data-[state=active]:bg-[#7C3B1F] data-[state=active]:text-white text-[#7C3B1F]/70"
              >
                Resort
              </TabsTrigger>

              <TabsTrigger
                value="hotel"
                className="py-3 text-base font-bold data-[state=active]:bg-[#7C3B1F] data-[state=active]:text-white text-[#7C3B1F]/70"
              >
                Hotel
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="resort">
            <RoomSlider
              rooms={resortRooms}
              page={resortPage}
              setPage={setResortPage}
            />
          </TabsContent>

          <TabsContent value="hotel">
            <RoomSlider
              rooms={hotelRooms}
              page={hotelPage}
              setPage={setHotelPage}
            />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
