'use client'
import React from 'react';
import { motion } from 'framer-motion';
import { 
  Eye, 
  Calendar, 
  Users, 
  Bed, 
  Bath, 
  Ruler, 
  Mountain, 
  ScanEye, 
  Tv, 
  Wifi, 
  Snowflake, 
  Coffee, 
  Refrigerator, 
  ShowerHead, 
  Info 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import Link from 'next/link';

const featureIcons = {
  "guests": Users,
  "beds": Bed,
  "bathroom": Bath,
  "size": Ruler,
  "balcony": Mountain,
  "view": ScanEye,
  "tv": Tv,
  "wifi": Wifi,
  "ac": Snowflake,
  "breakfast": Coffee,
  "minibar": Refrigerator,
  "shower": ShowerHead,
};

const getFeatureIcon = (featureText) => {
  if (!featureText) return Info;
  const normalizedFeature = featureText.toLowerCase();
  for (const key in featureIcons) {
    if (normalizedFeature.includes(key)) {
      return featureIcons[key];
    }
  }
  return Info;
};

const RoomCard = ({ room, ...props }) => {
  const { toast } = useToast();

  const handleBookNow = () => {
    toast({
      title: "Book Room",
      description: "Redirecting to booking engine...",
    });
  };

  return (
    <motion.div
      className="bg-white overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-[#7C3B1F]/10 h-full flex flex-col group relative"
      initial={{ y: 0 }}
      whileHover={{ y: -5 }}
      {...props}
    >
      <div className="relative h-60 sm:h-64 overflow-hidden shrink-0">
        <img 
          alt={`${room.name} at Safari Resort`}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          src={room.image} 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-60"></div>
        
        <div className="absolute top-4 right-4 px-4 py-2  font-bold shadow-lg backdrop-blur-sm bg-white/90 text-[#F06934] border border-[#F06934]/20" 
             style={{ fontFamily: 'Nunito, sans-serif' }}>
          <span className="text-sm">{room.price}</span>
          <span className="text-[10px] text-gray-500 font-normal block text-right leading-none -mt-0.5">/night</span>
        </div>
      </div>

      <div className="p-5 md:p-6 flex flex-col flex-grow">
        <h3 
          className="text-xl md:text-2xl font-bold mb-2 line-clamp-1" 
          style={{ color: '#7C3B1F', fontFamily: 'Mikado, sans-serif' }}
        >
          {room.name}
        </h3>
        
        <p 
          className="text-[#7C3B1F]/70 text-sm mb-4 line-clamp-2 md:line-clamp-3 flex-grow font-medium"
          style={{ fontFamily: 'Nunito, sans-serif' }}
        >
          {room.description}
        </p>

        <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-6"> {/* Adjusted layout to maintain 2 columns */}
          {room.features && room.features.slice(0, 10).map((feature, idx) => {
            const IconComponent = getFeatureIcon(feature);
            return (
              <div 
                key={idx} 
                className="text-[11px] font-semibold py-1 flex items-center gap-2 text-[#7C3B1F]/80 border-transparent" // Removed background, left-aligned
              >
                <IconComponent size={14} className="flex-shrink-0 text-[#F06934]" /> {/* Added accent color to icon */}
                <span className="truncate">{feature}</span>
              </div>
            );
          })}
        </div>

        <div className="flex gap-3 mt-auto pt-4 pb-4 border-t border-[#7C3B1F]/10">
          <Link href={`/room/${room.id}`} className="flex-1">
            <Button
              variant="outline"
              className="w-full h-10 text-xs font-bold border-[#F06934] text-[#F06934] hover:bg-[#F06934] hover:text-white transition-colors"
            >
              <Eye size={16} className="mr-2" />
              Details
            </Button>
          </Link>
          <Button
            onClick={handleBookNow}
            className="flex-1 h-10 text-xs font-bold bg-[#7C3B1F] hover:bg-[#5e2d17] text-white transition-colors"
          >
            <Calendar size={16} className="mr-2" />
            Book
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default RoomCard;