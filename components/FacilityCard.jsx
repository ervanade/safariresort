'use client'
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
const FacilityCard = ({
  facility,
  index
}) => {
  const {
    toast
  } = useToast();
  const Icon = facility.icon;
  const handleLearnMore = () => {
    toast({
      title: "Facility Information",
      description: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
    });
  };
  const getImageSrc = name => {
    switch (name) {
      case 'Swimming Pool':
        return 'https://horizons-cdn.hostinger.com/b05a0347-ff2a-4d3e-b189-510345403291/screen-shot-2025-12-19-at-04.19.10-iuHU6.png';
      // This is the combined image URL, I need to use specific img-replace for each
      case 'Badminton & Basketball Court':
        return 'https://horizons-cdn.hostinger.com/b05a0347-ff2a-4d3e-b189-510345403291/screen-shot-2025-12-19-at-04.21.32-52Ox8.png';
      case 'Paddle Boat':
        return 'https://horizons-cdn.hostinger.com/b05a0347-ff2a-4d3e-b189-510345403291/screen-shot-2025-12-19-at-04.21.39-VjiAP.png';
      case 'Siamang Voice Experience':
        return 'https://horizons-cdn.hostinger.com/b05a0347-ff2a-4d3e-b189-510345403291/screen-shot-2025-12-19-at-04.21.55-zu3LR.png';
      case 'Meet & Feed Rusa':
        return 'https://horizons-cdn.hostinger.com/b05a0347-ff2a-4d3e-b189-510345403291/screen-shot-2025-12-19-at-04.21.45-08OnI.png';
      case 'Pelican Island':
        return 'https://horizons-cdn.hostinger.com/b05a0347-ff2a-4d3e-b189-510345403291/screen-shot-2025-12-19-at-04.22.04-3AapP.png';
      default:
        return 'https://horizons-cdn.hostinger.com/b05a0347-ff2a-4d3e-b189-510345403291/screen-shot-2025-12-19-at-04.19.10-iuHU6.png';
      // Default placeholder
    }
  };
  return <motion.div initial={{
    opacity: 0,
    y: 50
  }} whileInView={{
    opacity: 1,
    y: 0
  }} viewport={{
    once: true
  }} transition={{
    duration: 0.6,
    delay: index * 0.1
  }} whileHover={{
    y: -8
  }} className="bg-white rounded-none overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer group" onClick={handleLearnMore}>
      <div className="relative h-56 overflow-hidden">
      <img name={facility.name} alt={facility.image} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" src={facility?.image || getImageSrc(facility?.name)} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute top-4 left-4 p-3 rounded-none" style={{
        backgroundColor: facility.color
      }}>
          <Icon size={28} className="text-white" />
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold mb-3" style={{
        color: '#7C3B1F',
        fontFamily: 'Mikado, sans-serif'
      }}>
          {facility.name}
        </h3>
        <p className="text-gray-600 mb-4 font-nunito" // Changed font family to Nunito
      >
          {facility.description}
        </p>
        
      </div>
    </motion.div>;
};
export default FacilityCard;