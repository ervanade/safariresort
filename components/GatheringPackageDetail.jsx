
'use client'
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Users, Check, Camera, Music, Star, LayoutGrid } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { gatheringPackagesData } from './data/gatheringPackagesData';
import { Link, useRouter } from '@/i18n/navigation';


const GatheringPackageDetail = ({gatheringSlug}) => {
  const [pkg, setPkg] = useState(null);
  const { toast } = useToast();
  const router = useRouter()

  useEffect(() => {
    const found = gatheringPackagesData.find(p => p.slug === gatheringSlug);
    setPkg(found);
    window.scrollTo(0, 0);
  }, [gatheringSlug]);

  if (!pkg && pkg !== null) {
          return router.push('/packages/gathering');
  }

  if (!pkg) return null;

  const handleBook = () => {
    toast({
        title: "Inquiry Sent",
        description: `Thank you for your interest in the ${pkg.name}. Our event planner will contact you shortly.`
    });
  };

  return (
    <div className="min-h-screen bg-[#faf7f5]">

      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
            {/* Back Link */}
            <Link href="/packages/gathering" className="inline-flex items-center gap-2 text-[#7C3B1F] hover:text-[#F06934] mb-8 font-bold transition-colors">
                <ArrowLeft size={20} /> Back to Gathering Packages
            </Link>

            <div className="flex flex-col lg:flex-row gap-12">
                {/* Left Column: Image & Details */}
                <div className="lg:w-2/3">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="rounded-3xl overflow-hidden shadow-2xl mb-10 h-[400px] md:h-[500px]"
                    >
                        <img src={pkg.mainImage} alt={pkg.name} className="w-full h-full object-cover" />
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <div className="flex flex-wrap items-baseline justify-between gap-4 mb-6">
                            <h1 className="text-4xl md:text-5xl font-bold text-[#7C3B1F]" style={{ fontFamily: 'Mikado, sans-serif' }}>{pkg.name}</h1>
                            <span className="bg-[#F06934]/10 text-[#F06934] px-4 py-2 rounded-full font-bold flex items-center gap-2">
                                <Users size={18} /> {pkg.capacity}
                            </span>
                        </div>
                        
                        <p className="text-lg text-gray-600 mb-10 leading-relaxed">{pkg.description}</p>

                        {/* Features Section */}
                        <div className="mb-10">
                            <h3 className="text-2xl font-bold text-[#7C3B1F] mb-6 flex items-center gap-3">
                                <Star size={24} /> Package Highlights
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {pkg.features.map((feature, idx) => (
                                    <div key={idx} className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                                        <div className="text-[#F06934]"><Check size={20} /></div>
                                        <span className="font-medium text-gray-700">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Amenities Section */}
                        <div className="mb-10">
                             <h3 className="text-2xl font-bold text-[#7C3B1F] mb-6 flex items-center gap-3">
                                <LayoutGrid size={24} /> Included Amenities
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {pkg.amenities.map((item, idx) => (
                                    <div key={idx} className="flex items-center gap-3 text-gray-600">
                                        <div className="w-2 h-2 rounded-full bg-[#F06934]" />
                                        <span>{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Right Column: Pricing & Booking Card */}
                <div className="lg:w-1/3">
                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="bg-white p-8 rounded-3xl shadow-xl border border-orange-100 sticky top-28"
                    >
                        <h3 className="text-xl font-bold text-gray-400 mb-2 uppercase tracking-wide">Package Price</h3>
                        <div className="text-3xl font-bold text-[#7C3B1F] mb-6 font-mikado">{pkg.pricing}</div>
                        
                        <div className="space-y-4 mb-8">
                            <p className="text-sm text-gray-500">
                                *Pricing subject to change based on date and group size customizations.
                            </p>
                        </div>

                        <Button onClick={handleBook} className="w-full bg-[#F06934] hover:bg-[#d65220] text-white py-6 text-lg rounded-xl shadow-lg hover:shadow-orange-200 transition-all">
                            Get Custom Quote
                        </Button>
                        
                        <div className="mt-6 text-center">
                            <p className="text-sm text-gray-500 mb-2">Need assistance?</p>
                            <a href="tel:+622518250000" className="text-[#7C3B1F] font-bold hover:underline">
                                +62 251 825 0000
                            </a>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
      </main>
    </div>
  );
};

export default GatheringPackageDetail;
