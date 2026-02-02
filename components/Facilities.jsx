'use client'
import React from 'react';
import { motion } from 'framer-motion';
import FacilityCard from '@/components/FacilityCard';
import { UtensilsCrossed, Users, Droplets, Coffee, UserSquare2, Sailboat, Trees, Bird, ShoppingBasket as Basketball, Sun } from 'lucide-react';
const Facilities = ({dataFacilities}) => {
  const facilities = [{
    id: 1,
    name: 'Swimming Pool',
    description: 'Large swimming pool for recreation and relaxation, surrounded by lush greenery.',
    icon: Droplets,
    image: 'Large outdoor swimming pool with blue water, surrounded by stone paving and tall green trees, with buildings in the background.',
    color: '#F06934' // Primary color
  }, {
    id: 2,
    name: 'Badminton & Basketball Court',
    description: 'Multi-purpose court for badminton and basketball, perfect for active guests.',
    icon: Basketball,
    // Using Basketball icon for this facility
    image: 'Outdoor court with red and green surfaces for badminton and basketball, set amidst a forest.',
    color: '#7C3B1F' // Secondary color
  }, {
    id: 3,
    name: 'Paddle Boat',
    description: 'Enjoy a leisurely ride on paddle boats on our scenic lake, surrounded by nature.',
    icon: Sailboat,
    // Using Sailboat icon for paddle boats
    image: 'Small lake with paddle boats, surrounded by dense trees and a small fountain in the water.',
    color: '#F06934' // Primary color
  }, {
    id: 4,
    name: 'Siamang Voice Experience',
    description: 'Observe the majestic Siamang in their natural-like habitat, an engaging wildlife experience.',
    icon: Trees,
    // Using Trees icon to represent natural habitat/wildlife
    image: 'A natural enclosure with a large body of water and wooden railings, home to Siamang primates.',
    color: '#7C3B1F' // Secondary color
  }, {
    id: 5,
    name: 'Meet & Feed Rusa',
    description: 'Encounter Rusa deer in a spacious exhibit designed to mimic their native environment.',
    icon: UserSquare2,
    // Using a generic user icon for animal exhibits, or perhaps an animal-specific one if available
    image: 'An open exhibit area with several Rusa deer, surrounded by wooden fences and lush vegetation.',
    color: '#F06934' // Primary color
  }, {
    id: 6,
    name: 'Pelican Island',
    description: 'Visit Pelican Island to see these graceful birds in a serene, natural water habitat.',
    icon: Bird,
    // Using Bird icon for Pelican Island
    image: 'A serene body of water with pelicans, an outdoor dining area with yellow umbrellas, and a wooden walkway.',
    color: '#7C3B1F' // Secondary color
  }];
  return <section className="py-20 md:py-32 bg-white" id="facilities">
      <div className="container mx-auto px-4">
        <motion.div initial={{
        opacity: 0,
        y: 30
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} transition={{
        duration: 0.8
      }} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#7C3B1F]" style={{
          fontFamily: 'Mikado, sans-serif'
        }}>Enjoy Our Facilities</h2>
          <p className="text-lg text-[#7C3B1F]/80 max-w-3xl mx-auto font-nunito">Discover our facilities designed to enhance every moment of your stay</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {dataFacilities.map((facility, index) => <FacilityCard key={facility.id} facility={facility} index={index} />)}
        </div>
      </div>
    </section>;
};
export default Facilities;