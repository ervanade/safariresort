'use client'
import React from 'react';
import { motion } from 'framer-motion';
import { Utensils, Heart, Wine, Music, Star, Clock, MapPin, ChefHat } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const DiningDetail = () => {
  const { toast } = useToast();

  const handleBook = () => {
    toast({
      title: "Reservation Request Received",
      description: "Our concierge will contact you shortly to finalize the details of your romantic evening.",
    });
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const menuOptions = [
    {
      title: "Secret Garden Menu",
      description: "A culinary journey featuring local delicacies with a modern twist.",
      price: "$120 / couple",
      items: ["Amuse-bouche: Truffle Arancini", "Starter: Pan-seared Scallops", "Main: Herb-Crusted Lamb Rack", "Dessert: Dark Chocolate Fondant"],
      imageAlt: "Gourmet lamb rack dish with artistic plating and herbs"
    },
    {
      title: "Ocean Breeze Menu",
      description: "Fresh seafood selection caught daily, perfect for ocean lovers.",
      price: "$150 / couple",
      items: ["Amuse-bouche: Oyster Shooter", "Starter: Tuna Tartare", "Main: Grilled Lobster Tail", "Dessert: Lemon Basil Tart"],
      imageAlt: "Fresh grilled lobster tail served with lemon and butter sauce"
    },
    {
      title: "Vegetarian Bliss",
      description: "A vibrant and flavorful plant-based experience.",
      price: "$100 / couple",
      items: ["Amuse-bouche: Cucumber Gazpacho", "Starter: Wild Mushroom Risotto", "Main: Roasted Eggplant Steak", "Dessert: Coconut Panna Cotta"],
      imageAlt: "Colorful vegetarian risotto with edible flowers"
    }
  ];

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-stone-800">

      <main>
        {/* Hero Section */}
        <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
             <img className="w-full h-full object-cover" alt="Romantic dinner table setup with candlelight by a river at twilight" src="https://images.unsplash.com/photo-1573813394804-402cbf6f9832" />
            <div className="absolute inset-0 bg-black/40"></div>
          </div>
          
          <div className="relative z-10 text-center px-4 max-w-4xl mx-auto text-white">
            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={fadeInUp}
              viewport={{ once: true }}
            >
              <span className="text-[#F06934] font-bold tracking-widest uppercase mb-4 block text-sm md:text-base">Dining Experience</span>
              <h1 className="text-5xl md:text-7xl font-serif mb-6" style={{ fontFamily: 'Mikado, sans-serif' }}>Dinner Under the Stars</h1>
              <p className="text-xl md:text-2xl font-light font-nunito max-w-2xl mx-auto">
                Celebrate your love with an intimate culinary journey in the heart of nature.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-20 container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-4xl font-bold text-[#7C3B1F]" style={{ fontFamily: 'Mikado, sans-serif' }}>An Unforgettable Evening</h2>
              <Separator className="bg-[#F06934] w-20 h-1" />
              <p className="text-lg leading-relaxed text-gray-600 font-nunito">
                Escape the ordinary and immerse yourselves in a world of romance. Our dedicated team creates a magical setting tailored just for you. Whether it's an anniversary, a proposal, or simply a celebration of togetherness, our romantic dinner packages offer the perfect blend of privacy, luxury, and gastronomic delight.
              </p>
              <div className="grid grid-cols-2 gap-6 pt-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-orange-100 rounded-full text-[#F06934]"><Heart size={20} /></div>
                  <span className="font-medium text-stone-700">Private Setting</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-orange-100 rounded-full text-[#F06934]"><ChefHat size={20} /></div>
                  <span className="font-medium text-stone-700">Curated Menu</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-orange-100 rounded-full text-[#F06934]"><Wine size={20} /></div>
                  <span className="font-medium text-stone-700">Premium Wine</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-orange-100 rounded-full text-[#F06934]"><Music size={20} /></div>
                  <span className="font-medium text-stone-700">Soft Ambient Music</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative h-[500px] w-full"
            >
               <div className="absolute inset-0 border-2 border-[#F06934] translate-x-4 translate-y-4 -z-10 rounded-lg"></div>
               <div className="h-full w-full overflow-hidden rounded-lg shadow-xl">
                 <img className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" alt="Detail shot of a romantic dinner table setting with flowers and wine glasses" src="https://images.unsplash.com/photo-1685260324158-c45b914c9cd1" />
               </div>
            </motion.div>
          </div>
        </section>

        {/* Menu Options */}
        <section className="py-20 bg-[#FAF9F6]">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-[#7C3B1F] mb-4" style={{ fontFamily: 'Mikado, sans-serif' }}>Curated Menus</h2>
              <p className="text-gray-600 max-w-2xl mx-auto font-nunito">Choose from our chef's specially designed set menus, or request a bespoke dining experience.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {menuOptions.map((menu, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full border-none shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col">
                    <div className="h-48 overflow-hidden relative">
                      <img className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" alt={menu.imageAlt} src="https://images.unsplash.com/photo-1569224456542-f9f1da42d301" />
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-[#F06934] uppercase tracking-wider">
                        {menu.price}
                      </div>
                    </div>
                    <CardHeader>
                      <CardTitle className="text-2xl text-[#7C3B1F] font-serif">{menu.title}</CardTitle>
                      <CardDescription className="font-nunito">{menu.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <ul className="space-y-3">
                        {menu.items.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#F06934] shrink-0"></span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button onClick={handleBook} className="w-full bg-[#7C3B1F] hover:bg-[#5a2b16] text-white">Select Menu</Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Experience Details / Info Strip */}
        <section className="py-16 bg-[#7C3B1F] text-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center md:text-left">
              <div className="flex flex-col items-center md:items-start gap-4">
                <Clock className="w-10 h-10 text-[#F06934]" />
                <div>
                  <h4 className="font-bold text-xl mb-1">Time</h4>
                  <p className="text-white/80 text-sm">Sunset Dinner: 18:00 - 20:00<br/>Starlight Dinner: 20:30 - 22:30</p>
                </div>
              </div>
              <div className="flex flex-col items-center md:items-start gap-4">
                <MapPin className="w-10 h-10 text-[#F06934]" />
                <div>
                  <h4 className="font-bold text-xl mb-1">Locations</h4>
                  <p className="text-white/80 text-sm">River Deck, Forest Gazebo,<br/>or Private Villa Terrace</p>
                </div>
              </div>
              <div className="flex flex-col items-center md:items-start gap-4">
                <Star className="w-10 h-10 text-[#F06934]" />
                <div>
                  <h4 className="font-bold text-xl mb-1">Inclusions</h4>
                  <p className="text-white/80 text-sm">Welcome Drink, Flower Decor,<br/>Personal Server</p>
                </div>
              </div>
              <div className="flex flex-col items-center md:items-start gap-4">
                <Utensils className="w-10 h-10 text-[#F06934]" />
                <div>
                  <h4 className="font-bold text-xl mb-1">Dietary</h4>
                  <p className="text-white/80 text-sm">Halal, Vegan, Gluten-free<br/>options available upon request</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto space-y-8"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#7C3B1F]" style={{ fontFamily: 'Mikado, sans-serif' }}>Create Memories That Last Forever</h2>
            <p className="text-xl text-gray-600 font-nunito">
              Spots for our romantic dining experiences are limited and require reservation at least 24 hours in advance to ensure the perfect setup.
            </p>
            <Button onClick={handleBook} size="lg" className="bg-[#F06934] hover:bg-[#d65220] text-white px-10 py-6 text-lg rounded-full shadow-lg hover:shadow-orange-500/20 transition-all">
              Book Your Table Now
            </Button>
          </motion.div>
        </section>

      </main>
    </div>
  );
};

export default DiningDetail;