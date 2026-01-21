'use client'
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const Packages = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('gathering');

  const tabs = [        
    {
      id: 'gathering',
      label: 'Gathering Package',
      title: 'Gathering Package',
      description: 'Host memorable social events in our versatile outdoor spaces. Whether it is a family reunion, a corporate team-building event, or a casual get-together, our gathering packages provide the perfect setting with customized catering and activity options.',
      imageAlt: "Caravan Canopy Meeting Room set up for an event, with round tables and chairs, illuminated at dusk.",
      imageTerm: "https://pix8.agoda.net/hotelImages/335864/0/92b64b031ac3b27d1d31fbabdacd3740.jpg" 
    },
    {
      id: 'meeting',
      label: 'Meeting Package',
      title: 'Meeting Package',
      description: 'Elevate your business meetings with our state-of-the-art facilities surrounded by nature. Our meeting packages include access to modern conference rooms, high-speed internet, and curated coffee breaks to keep your team energized and focused.',
      imageAlt: "Modern conference room with glass walls overlooking a forest, featuring a long table and presentation equipment.",
      imageTerm: "https://pix8.agoda.net/property/335864/0/b071a9cc36875b5623b78b60ff87c2ea.jpeg"
    },
    // {
    //   id: 'buggy',
    //   label: 'Buggy Journey',
    //   title: 'Buggy Journey',
    //   description: 'Explore the vast landscapes of our resort with a guided Buggy Journey. Discover hidden trails, scenic viewpoints, and local wildlife in comfort. A perfect adventure for guests of all ages looking to see more of our beautiful grounds.',
    //   imageAlt: "A rugged buggy vehicle driving along a dirt path through a lush tropical forest.",
    //   imageTerm: "https://horizons-cdn.hostinger.com/b05a0347-ff2a-4d3e-b189-510345403291/c417dbfc22239254582c605ab6e0448b.png"
    // },        
    // {
    //   id: 'stay',
    //   label: 'Stay & Explore',
    //   title: 'Stay & Explore',
    //   description: 'The ultimate getaway package combining luxury accommodation with guided exploration. Enjoy a premium stay in our lodges or treehouses, complete with inclusive tours, dining credits, and exclusive access to resort activities.',
    //   imageAlt: "A luxurious glamping tent interior with a cozy bed, looking out onto a peaceful morning forest scene.",
    //   imageTerm: "https://q-xx.bstatic.com/xdata/images/hotel/max1024x768/194259582.jpg?k=d96cd6e90cc3911bf995b1af523f9423230f3359cd79363168443f3e658990d2&o=&s=1024x"
    // }
  ];

  // Ensure activeContent is never undefined by falling back to the first tab
  const activeContent = tabs.find(tab => tab.id === activeTab) || tabs[0];

  if (!activeContent) return null;

  return (
    <section id="packages" className="relative py-20 min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Background Image with Dark Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          className="w-full h-full object-cover" 
          alt="Lush green bamboo forest background"
          src="https://pix8.agoda.net/hotelImages/335864/0/5e8730075ef3eef15e705ab1cb4c3775.jpg?ce=2&s=1024x" />
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10 h-full flex flex-col">
        {/* Main Heading */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
        <span className="text-[#F06934] font-bold text-sm tracking-widest  mb-2 block">Package & Offers</span>
          <h2 
            className="text-white text-4xl md:text-5xl font-bold mb-6" 
            style={{fontFamily: 'Mikado, sans-serif' }}
          >
            Where Exploration <br />
            <span className="font-normal">Meets Elegance</span>
          </h2>
          <p 
            className="text-lg text-white max-w-3xl mx-auto"
            style={{ fontFamily: 'Nunito, sans-serif' }}
          >
            Curated adventures that connect you with nature and create lasting memories
          </p>
          
        </motion.div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-12 mb-16 border-b border-white/10 pb-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`text-sm md:text-lg transition-all duration-300 pb-2 relative  ${
                activeTab === tab.id ? 'text-white' : 'text-gray-300 hover:text-white'
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <motion.div
                  layoutId="underline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#F06934]"
                />
              )}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1 flex items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeContent.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full max-w-6xl mx-auto"
            >
              {/* Left Side: Image with Frame */}
              <div className="relative group">
                 {/* The White Border Frame */}
                <div className="absolute inset-0 border border-white/30 translate-x-4 translate-y-4 md:translate-x-6 md:translate-y-6 z-0 pointer-events-none transition-transform duration-500 group-hover:translate-x-4 group-hover:translate-y-4"></div>
                
                {/* The Image Container */}
                <div className="relative z-10 overflow-hidden shadow-2xl aspect-[4/3]">
                  <img 
                    src={activeContent.imageTerm} // Although using img-replace, we pass src prop just in case, but rely on inner text/alt for AI
                    alt={activeContent.imageAlt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                </div>
              </div>

              {/* Right Side: Text Content */}
              <div className="text-white space-y-6 lg:pl-10">
                <h3 className="text-3xl md:text-4xl text-gray-300 max-w-3xl mx-auto"
            style={{ fontFamily: 'Nunito, sans-serif' }}
                >
                  {activeContent.title}
                </h3>
                <p className="text-gray-300 leading-relaxed text-lg font-light tracking-wide opacity-90 ">
                  {activeContent.description}
                </p>
                <div className="pt-4">
                  <Button 
                    variant="outline" 
                    className="border-white text-white hover:bg-[#7C3B1F] hover:text-white rounded-none px-8 py-6 uppercase tracking-widest text-xs font-bold transition-all bg-transparent hover:border-[#7C3B1F] "
                    onClick={() => toast({ title: "Inquiry", description: `Inquiring about ${activeContent.title}... Feature coming soon!` })}
                  >
                    Discover More
                  </Button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Packages;