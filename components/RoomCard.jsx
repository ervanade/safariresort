"use client";
import React from "react";
import { motion } from "framer-motion";
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
  Info,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Link } from "@/i18n/navigation";

const featureIcons = {
  guests: Users,
  beds: Bed,
  bathroom: Bath,
  size: Ruler,
  balcony: Mountain,
  view: ScanEye,
  tv: Tv,
  wifi: Wifi,
  ac: Snowflake,
  breakfast: Coffee,
  minibar: Refrigerator,
  shower: ShowerHead,
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
  // Conditionally render the Best Seller badge based on the room.bestSeller property
  const isBestSeller = room.bestSeller;

  return (
    <motion.div
      className="bg-white overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-[#7C3B1F]/10 h-full flex flex-col group relative rounded-2xl"
      initial={{ y: 0 }}
      whileHover={{ y: -5 }}
      {...props}
    >
      {/* Image Section - ~65% of height for prominence */}
      <div className="relative h-[65%] overflow-hidden shrink-0">
        <img
          alt={`${room.name} at Safari Resort`}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          src={room.image}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

        {/* Existing Badge (Left) */}
        {room.badge && (
          <div
            className="absolute top-4 left-4 px-3 py-1 font-bold shadow-lg backdrop-blur-sm bg-[#F06934] text-white rounded-lg border border-white/20 z-20"
            style={{ fontFamily: "Nunito, sans-serif" }}
          >
            <span className="text-xs tracking-wider">{room.badge}</span>
          </div>
        )}

        {/* Best Seller Badge (Right) */}
        {isBestSeller && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="absolute top-4 right-4 z-20"
          >
            <div className="bg-amber-400 text-[#7C3B1F] text-[10px] font-extrabold px-3 py-1.5 rounded-full shadow-lg uppercase tracking-wider flex items-center gap-1 border border-white/30">
              <Star size={10} fill="currentColor" /> Best Seller
            </div>
          </motion.div>
        )}

        {/* Price Overlay */}
        <div
          className="absolute bottom-3 right-3 px-3 py-1.5 font-bold shadow-lg backdrop-blur-sm bg-white/95 text-[#F06934] rounded-lg border border-[#F06934]/20"
          style={{ fontFamily: "Nunito, sans-serif" }}
        >
          <span className="text-sm md:text-base">{room.price}</span>
          <span className="text-[9px] text-gray-500 font-normal block text-right leading-none -mt-0.5">
            /night
          </span>
        </div>
      </div>

      {/* Content Section - Compact & Reduced gaps */}
      <div className="p-4 flex flex-col h-[35%] justify-between">
        <div>
          <h3
            className="text-lg font-bold mb-1.5 line-clamp-1 text-[#7C3B1F]"
            style={{ fontFamily: "Mikado, sans-serif" }}
          >
            {room.name}
          </h3>

          <p
            className="text-[#7C3B1F]/70 text-xs line-clamp-2 font-medium leading-relaxed"
            style={{ fontFamily: "Nunito, sans-serif" }}
          >
            {room.description}
          </p>
          {/* <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-6"> 
          {room.features && room.features.slice(0, 10).map((feature, idx) => {
            const IconComponent = getFeatureIcon(feature);
            return (
              <div 
                key={idx} 
                className="text-[11px] font-semibold py-1 flex items-center gap-2 text-[#7C3B1F]/80 border-transparent" // Removed background, left-aligned
              >
                <IconComponent size={14} className="flex-shrink-0 text-[#F06934]" />
                <span className="truncate">{feature}</span>
              </div>
            );
          })}
        </div> */}
        </div>

        <div className="mt-2">
          <Link href={`/rooms/${room?.id}`} className="block w-full">
            <Button className="w-full h-9 text-xs font-bold bg-[#F06934] hover:bg-[#d65523] text-white transition-colors shadow-md rounded-lg">
              <Calendar size={14} className="mr-2" />
              Book Now
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default RoomCard;
