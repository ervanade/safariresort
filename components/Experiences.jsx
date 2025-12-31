'use client'
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ExperienceCard from '@/components/ExperienceCard';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';

const Experiences = () => {
  const [showAll, setShowAll] = useState(false);

  const experiences = [
    {
      id: 1,
      name: 'Safari Journey',
      description: 'Embark on an unforgettable journey through the wild savanna.',
      image: 'https://horizons-cdn.hostinger.com/b05a0347-ff2a-4d3e-b189-510345403291/f5334b26f3107204a4869fcbdf1da606.webp', 
      duration: '3 hours',
      groupSize: 'Up to 6 guests',
      bookingUrl: 'https://tamansafari.com/'
    },
    {
      id: 2,
      name: 'Night Safari',
      description: 'Experience the thrill of the jungle after dark.',
      image: 'https://horizons-cdn.hostinger.com/b05a0347-ff2a-4d3e-b189-510345403291/52d8ec7fa6dfeda390409c40c14883b0.webp',
      duration: '2 hours',
      groupSize: 'Up to 8 guests',
      bookingUrl: 'https://tamansafari.com/'
    },
    {
      id: 3,
      name: 'Buggy Explorer',
      description: 'Drive your own buggy through challenging off-road trails.',
      image: 'https://horizons-cdn.hostinger.com/b05a0347-ff2a-4d3e-b189-510345403291/c417dbfc22239254582c605ab6e0448b.png', 
      duration: '1.5 hours',
      groupSize: '2 guests per buggy',
      whatsappMessage: 'Halo saya ingin mengetahui lebih lanjut tentang Buggy Explorer'
    },
    {
      id: 6,
      name: 'Feeding Animal',
      description: 'Participate in feeding sessions for giraffes and elephants.',
      image: 'https://horizons-cdn.hostinger.com/b05a0347-ff2a-4d3e-b189-510345403291/23c9addd0f21fd970944ff14654f1a64.png',
      duration: '30 mins',
      groupSize: 'Open',
      whatsappMessage: 'Halo saya ingin mengetahui lebih lanjut tentang Feeding Animal'
    },
    {
      id: 7,
      name: 'Animal Ride',
      description: 'Gentle rides on ponies or camels for a unique perspective.',
      image: 'https://horizons-cdn.hostinger.com/b05a0347-ff2a-4d3e-b189-510345403291/f1c6f67e20aa2fe4b9f5004af897fe57.png',
      duration: '20 mins',
      groupSize: 'Individual',
      whatsappMessage: 'Halo saya ingin mengetahui lebih lanjut tentang Animal Ride'
    },
    {
      id: 8,
      name: 'Safari Trek',
      description: 'Guided walking tour to explore flora and fauna on foot.',
      image: 'https://horizons-cdn.hostinger.com/b05a0347-ff2a-4d3e-b189-510345403291/a29fa7aa47458db0e396c1b983750f87.png', 
      duration: '2 hours',
      groupSize: 'Up to 10 guests',
      whatsappMessage: 'Halo saya ingin mengetahui lebih lanjut tentang Safari Trek'
    },
    {
      id: 9,
      name: 'Breakfast With Dolphin',
      description: 'Enjoy a delightful breakfast while watching dolphins play.',
      image: 'https://horizons-cdn.hostinger.com/b05a0347-ff2a-4d3e-b189-510345403291/9a62bec4b9e11f5807e97d564db3f377.png',
      duration: '1.5 hours',
      groupSize: 'Reservation only',
      whatsappMessage: 'Halo saya ingin mengetahui lebih lanjut tentang Breakfast With Dolphin'
    },
    {
      id: 10,
      name: 'Dine Experience',
      description: 'Exclusive dining surrounded by the sights and sounds of nature.',
      image: 'https://images.unsplash.com/photo-1616874421110-85f099553b47',
      duration: '2 hours',
      groupSize: 'Couples or Families',
      whatsappMessage: 'Halo saya ingin mengetahui lebih lanjut tentang Dine Experience'
    }
  ];

  const displayedExperiences = showAll ? experiences : experiences.slice(0, 4);

  return (
    <section id="experiences" className="py-20 md:py-32 relative bg-white">
      <div className="bg-zebra-pattern"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-[#F06934] font-bold text-sm tracking-widest uppercase mb-2 block">Adventures</span>
          <h2 
            className="text-4xl md:text-5xl font-bold mb-6" 
            style={{ color: '#7C3B1F', fontFamily: 'Mikado, sans-serif' }}
          >
            Unforgettable Experiences
          </h2>
          <p 
            className="text-lg text-[#7C3B1F] max-w-3xl mx-auto"
            style={{ fontFamily: 'Nunito, sans-serif' }}
          >
            Curated adventures that connect you with nature and create lasting memories
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto mb-12"
        style={{ fontFamily: 'Nunito, sans-serif' }}
        >
          {displayedExperiences.map((experience, index) => (
            <ExperienceCard key={experience.id} experience={experience} index={index} />
          ))}
        </div>

        <div className="text-center">
          <Button
            onClick={() => setShowAll(!showAll)}
            variant="outline"
            className="px-8 py-4 rounded-none border-2 text-lg font-bold gap-2 hover:bg-[#7C3B1F] transition-all hover:text-white"
            style={{ 
                borderColor: '#7C3B1F', 
                color: '#7C3B1F',
                fontFamily: 'Nunito, sans-serif' 
            }}
          >
            {showAll ? (
                <>Show Less <ChevronUp size={20} /></>
            ) : (
                <>View All Experiences <ChevronDown size={20} /></>
            )}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Experiences;