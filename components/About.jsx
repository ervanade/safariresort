'use client'
import React from 'react';
import { motion } from 'framer-motion';
const About = ({dataAbout}) => {
  return <section className="py-20 md:py-32 bg-white" id="about">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
          {/* Images Grid */}
          <motion.div initial={{
          opacity: 0,
          x: -50
        }} whileInView={{
          opacity: 1,
          x: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.8
        }} className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <img src="https://horizons-cdn.hostinger.com/b05a0347-ff2a-4d3e-b189-510345403291/8debefdb2bbc0cd5f8bd282053c5c7d9.webp" alt="Friends enjoying drinks by the pool" className="w-full h-48 md:h-64 object-cover  shadow-lg hover:scale-[1.02] transition-transform duration-300" />
               <img src="https://horizons-cdn.hostinger.com/b05a0347-ff2a-4d3e-b189-510345403291/screen-shot-2025-12-11-at-11.06.54-MlTyP.png" alt="Comfortable hotel room interior" className="w-full h-64 md:h-80 object-cover  shadow-lg hover:scale-[1.02] transition-transform duration-300" />
            </div>
            <div className="space-y-4 pt-8">
              <img src="https://horizons-cdn.hostinger.com/b05a0347-ff2a-4d3e-b189-510345403291/screen-shot-2025-12-11-at-11.03.03-ulKmF.png" alt="Unique wooden treehouse structure" className="w-full h-64 md:h-80 object-cover  shadow-lg hover:scale-[1.02] transition-transform duration-300" />
              <img src="https://horizons-cdn.hostinger.com/b05a0347-ff2a-4d3e-b189-510345403291/screen-shot-2025-12-11-at-11.15.56-0ZiZQ.png" alt="Person enjoying mountain view" className="w-full h-48 md:h-64 object-cover  shadow-lg hover:scale-[1.02] transition-transform duration-300" />
            </div>
          </motion.div>

          {/* Text Content */}
          <motion.div initial={{
          opacity: 0,
          x: 50
        }} whileInView={{
          opacity: 1,
          x: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.8
        }} className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{
            color: 'rgb(0,74,39)',
            fontFamily: 'Mikado, sans-serif'
          }}>{dataAbout?.title || `About Safari Resort`}</h2>
            <div className="space-y-6 text-gray-700" style={{
            fontFamily: 'Gotham Rounded, sans-serif'
          }}>
              <div className="bg-[#FAF7F5] p-6 border-l-4 border-[#F06934]">
                <h3 className="text-xl font-bold mb-2 text-[#7C3B1F]">Welcome to Safari Resort</h3>
                <p className="text-lg leading-relaxed italic">"Find peace and adventure in one stunning place."</p>
              </div>

            <p className="leading-relaxed">{dataAbout?.desc || `Safari Resort is a 4-star resort with unique room types of Caravan & Treehouse, building rooms and spacious rooms of Bungalows in the highland of Puncak. Standing on 8 hectares of land on the slopes of Mount Gede Pangrango, sensation of staying in a resort surrounded by Pines Forest, and inside The Great Taman Safari Bogor.`}</p>

            {/* <p className="leading-relaxed">The resort features diverse accommodation options, including hotel rooms, cozy bungalows for families, couples, or groups, as well as Indonesia's only caravan style lodgings and exclusive tree houses.</p>

            <p className="leading-relaxed">To complete the experience, Safari Resort provides a wide range of facilities, such as swimming pools, restaurants, animal exhibits, animal rides, and other amenities, all set against breathtaking natural backdrops. Guests also enjoy exclusive access to Taman Safari, making the resort an ideal destination for both recreation and education.</p>

            <p className="leading-relaxed">Perfect for nature lovers, families, and adventurers alike, Safari Resort invites guests to relax in nature, interact with animals, and breathe in the refreshing mountain air. Every stay promises unforgettable memories where adventure and relaxation meet in harmony.</p> */}
                            
            </div>

            
          </motion.div>
        </div>
      </div>
    </section>;
};
export default About;