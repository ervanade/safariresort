'use client'
import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Users2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const ExperienceCard = ({ experience, index }) => {
  const { toast } = useToast();

  const handleBookExperience = () => {
    if (experience.bookingUrl) {
      window.open(experience.bookingUrl, '_blank', 'noopener,noreferrer');
      return;
    }

    if (experience.whatsappMessage) {
      const phoneNumber = "6282125222756";
      const message = encodeURIComponent(experience.whatsappMessage);
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      return;
    }

    toast({
      title: "Book Experience",
      description: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      className="bg-white rounded-none overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-[#7C3B1F]/10"
    >
      <div className="relative h-64 overflow-hidden">
        <img 
          alt={`${experience.name} at Safari Resort`}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
         src={experience.image} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
      </div>

      <div className="p-6">
        <h3 
          className="text-xl font-bold mb-3" 
          style={{ color: '#7C3B1F', fontFamily: 'Gotham Rounded, sans-serif' }}          
        >
          {experience.name}
        </h3>
        <p 
          className="text-gray-600 mb-4 min-h-[60px]"
          style={{ fontFamily: 'Mikado, sans-serif' }}
        >
          {experience.description}
        </p>

        <div className="space-y-2 mb-6">
          <div className="flex items-center gap-2 text-sm" style={{ color: '#7C3B1F', fontFamily: 'Mikado, sans-serif' }}>
            <Clock size={16} />
            <span>{experience.duration}</span>
          </div>
          <div className="flex items-center gap-2 text-sm" style={{ color: '#7C3B1F', fontFamily: 'Mikado, sans-serif' }}>
            <Users2 size={16} />
            <span>{experience.groupSize}</span>
          </div>
        </div>

        <Button
          onClick={handleBookExperience}
          className="w-full font-medium rounded-none transition-all hover:scale-105 text-white"
          style={{ backgroundColor: '#7C3B1F', fontFamily: 'Nunito, sans-serif' }}
        >
          {experience.bookingUrl ? 'Book Online' : 'Inquire via WhatsApp'}
        </Button>
      </div>
    </motion.div>
  );
};

export default ExperienceCard;