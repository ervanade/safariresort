
'use client'
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Utensils, ChefHat, Wine, Flame, ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { restaurantsData } from './data/restaurantsData';

const Dining = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const highlights = [
    {
      icon: <Utensils size={32} />,
      title: "Culinary Excellence",
      description: "Masterfully crafted dishes by our expert chefs combining local flavors with international techniques."
    },
    {
      icon: <ChefHat size={32} />,
      title: "Farm-to-Table",
      description: "Fresh, seasonal ingredients sourced directly from local organic farms and our own gardens."
    },
    {
      icon: <Wine size={32} />,
      title: "Curated Selection",
      description: "An extensive collection of fine wines and signature cocktails to perfectly complement your meal."
    },
    {
      icon: <Flame size={32} />,
      title: "Unique Ambiance",
      description: "Immersive dining experiences set against the backdrop of lush wilderness and wildlife."
    }
  ];

  return (
    <div className="min-h-screen bg-[#faf7f5]">

      <main>
        {/* Hero Section */}
        <section className="relative h-screen min-h-[600px] overflow-hidden">
            <div className="absolute inset-0">
                <img 
                    src="https://images.unsplash.com/photo-1657727114768-d5c79fbfa9bd" 
                    alt="Dining at Safari Resort" 
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
            </div>
            <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-center text-white pt-20">
                <motion.span 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-[#F06934] font-bold tracking-[0.2em] uppercase mb-6 bg-black/40 px-6 py-2 rounded-full backdrop-blur-md border border-white/10"
                >
                    Taste of Nature
                </motion.span>
                <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-5xl md:text-7xl font-bold mb-8 tracking-tight drop-shadow-lg"
                    style={{ fontFamily: 'Mikado, sans-serif' }}
                >
                    Dining at Safari Resort
                </motion.h1>
                <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-lg md:text-2xl max-w-3xl font-medium text-white/95 leading-relaxed drop-shadow-md"
                    style={{ fontFamily: 'Nunito, sans-serif' }}
                >
                    Experience the perfect blend of exquisite flavors and breathtaking natural surroundings.
                </motion.p>
            </div>
        </section>

        {/* Restaurants Section */}
        <section className="py-20 md:py-24 relative z-10 -mt-32">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-7xl mx-auto">
                    {restaurantsData.map((restaurant, index) => (
                        <Link href={`/dining/${restaurant.slug}`} key={restaurant.id} className="block h-full transform transition-transform duration-300 hover:-translate-y-2">
                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2 }}
                                className="group relative h-[500px] rounded-3xl overflow-hidden shadow-2xl bg-white"
                            >
                                <img
                                    src={restaurant.mainImage}
                                    alt={restaurant.name}
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />
                                
                                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 text-white">
                                    <h3 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'Mikado, sans-serif' }}>
                                        {restaurant.name}
                                    </h3>
                                    <p className="text-white/80 line-clamp-2 mb-8 text-lg font-medium leading-relaxed">
                                        {restaurant.description}
                                    </p>
                                    <span className="inline-flex items-center gap-2 bg-[#F06934] text-white px-6 py-3 rounded-full font-bold text-sm tracking-widest uppercase hover:bg-[#d65523] transition-colors shadow-lg">
                                        Explore Menu <ArrowRight size={16} />
                                    </span>
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>

        {/* Highlights Section */}
        <section className="py-24 bg-white relative">
            <div className="container mx-auto px-4">
                <div className="text-center mb-20">
                     <span className="text-[#F06934] font-bold text-sm tracking-widest uppercase mb-4 block">Why Dine With Us</span>
                     <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#7C3B1F]" style={{ fontFamily: 'Mikado, sans-serif' }}>
                        A Feast for the Senses
                    </h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {highlights.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.05 }}
                            className="bg-[#faf7f5] p-10 rounded-3xl text-center shadow-lg border border-[#7C3B1F]/5 hover:border-[#F06934]/30 hover:shadow-xl transition-all duration-300 group"
                        >
                            <div className="w-20 h-20 mx-auto mb-8 bg-white rounded-2xl flex items-center justify-center text-[#F06934] shadow-md group-hover:bg-[#F06934] group-hover:text-white transition-colors duration-300">
                                {item.icon}
                            </div>
                            <h3 className="text-xl font-bold text-[#7C3B1F] mb-4" style={{ fontFamily: 'Mikado, sans-serif' }}>
                                {item.title}
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                {item.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
      </main>
    </div>
  );
};

export default Dining;
