
'use client'
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { restaurantsData } from './data/restaurantsData';
import { useRouter } from '@/i18n/navigation';

const DiningDetail = ({diningSlug}) => {
  const [restaurant, setRestaurant] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const found = restaurantsData.find(r => r.slug === diningSlug);
    setRestaurant(found);
  }, [diningSlug]);

  if (!restaurant && restaurant !== null) {
      // Logic handled inside render or redirect if needed
      return router.push('/');
  }

  if (!restaurant) return null;

  return (
    <div className="min-h-screen bg-[#faf7f5]">

      <main>
        {/* Hero Section */}
        <section className="relative h-[60vh] min-h-[500px]">
          <div className="absolute inset-0">
            <img
              src={restaurant.mainImage}
              alt={restaurant.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>
          <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-center text-white">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-bold mb-4"
              style={{ fontFamily: 'Mikado, sans-serif' }}
            >
              {restaurant.name}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl max-w-2xl font-medium"
            >
              {restaurant.description}
            </motion.p>
          </div>
        </section>

        {/* Romantic Dinner Section */}
        {restaurant.romanticDinnerPackage && (
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <div className="bg-[#FAF7F5] overflow-hidden shadow-lg">
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="h-64 md:h-auto">
                    <img 
                      src={restaurant.romanticDinnerPackage.image} 
                      alt="Romantic Dinner" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-8 md:p-12 flex flex-col justify-center">
                    <span className="text-[#F06934] font-bold tracking-widest uppercase mb-2">Special Experience</span>
                    <h2 className="text-3xl font-bold text-[#7C3B1F] mb-4" style={{ fontFamily: 'Mikado, sans-serif' }}>
                      {restaurant.romanticDinnerPackage.title}
                    </h2>
                    <p className="text-gray-600 mb-6 text-lg">
                      {restaurant.romanticDinnerPackage.description}
                    </p>
                    <Button className="w-fit bg-[#7C3B1F] hover:bg-[#5a2b16] text-white rounded-none px-8 py-6 text-lg">
                      Book Romantic Dinner
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Menu Highlights */}
        {restaurant.menuHighlights && restaurant.menuHighlights.length > 0 && (
          <section className="py-16 md:py-24">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-[#7C3B1F] mb-4" style={{ fontFamily: 'Mikado, sans-serif' }}>
                  Menu Highlights
                </h2>
                <p className="text-gray-600">Discover our chef's recommended dishes</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {restaurant.menuHighlights.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
                  >
                    <div className="h-64 overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-[#7C3B1F] mb-2">{item.title}</h3>
                      <p className="text-gray-600 text-sm">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-16 text-center">
                <Button 
                  variant="outline" 
                  className="border-2 border-[#7C3B1F] text-[#7C3B1F] hover:bg-[#7C3B1F] hover:text-white px-8 py-6 text-lg font-bold transition-all"
                >
                  Download Full Menu
                </Button>
              </div>
            </div>
          </section>
        )}
      </main>

    </div>
  );
};

export default DiningDetail;
