'use client'
import React from 'react';
import { motion } from 'framer-motion';
import { Users, Briefcase, Calendar, Check, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
const PackageDetail = () => {
  const {
    toast
  } = useToast();
  const handleInquiry = pkgName => {
    toast({
      title: "Inquiry Sent",
      description: `We've received your interest in the ${pkgName}. Our event planner will contact you shortly.`
    });
  };
  const packages = [{
    title: "Family Reunion",
    description: "Reconnect with loved ones in the heart of nature. Perfect for large families looking for adventure and relaxation.",
    price: "From $85 / person",
    features: ["Private BBQ Dinner", "Reserved Picnic Area", "Group Safari Tour", "Kids Activities Coordinator"],
    icon: <Users className="w-10 h-10 text-[#F06934]" />,
    imageAlt: "Large happy family having a picnic lunch on a grassy field with safari tents in the background"
  }, {
    title: "Corporate Retreat",
    description: "Boost team morale and productivity with our specialized team-building packages.",
    price: "From $120 / person",
    features: ["Meeting Room Access", "Team Building Facilitator", "Coffee Breaks & Lunch", "High-speed Wi-Fi"],
    icon: <Briefcase className="w-10 h-10 text-[#F06934]" />,
    imageAlt: "Corporate team working together outdoors on a wooden deck surrounded by trees"
  }, {
    title: "Social Celebration",
    description: "Birthdays, anniversaries, or just a get-together. We make every moment special.",
    price: "From $95 / person",
    features: ["Custom Decor Setup", "Photography Session", "Buffet or Set Menu", "Live Acoustic Music"],
    icon: <Calendar className="w-10 h-10 text-[#F06934]" />,
    imageAlt: "Group of friends toasting with drinks at an outdoor evening party with string lights"
  }];
  return <div className="min-h-screen bg-stone-50 font-sans text-stone-800">

      <main>
        {/* Hero Section */}
        <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
             <img className="w-full h-full object-cover" alt="Large outdoor gathering event with white tents and tables set up on a green lawn" src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=1920" />
            <div className="absolute inset-0 bg-black/50"></div>
          </div>
          
          <div className="relative z-10 text-center px-4 max-w-4xl mx-auto text-white">
            <motion.div initial={{
            opacity: 0,
            y: 30
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.8
          }}>
              <span className="text-[#F06934] font-bold tracking-widest uppercase mb-4 block">Events & Groups</span>
              <h1 className="text-5xl md:text-7xl font-bold mb-6" style={{
              fontFamily: 'Mikado, sans-serif'
            }}>Gather Together</h1>
              <p className="text-xl md:text-2xl font-light font-nunito max-w-2xl mx-auto">
                Create unforgettable memories with our bespoke gathering packages tailored for groups of all sizes.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Packages Grid */}
        <section className="py-20 container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#7C3B1F] mb-4" style={{
            fontFamily: 'Mikado, sans-serif'
          }}>Choose Your Experience</h2>
            <p className="text-gray-600 max-w-2xl mx-auto font-nunito">
              Whether it's business or pleasure, we have the perfect setting and services to make your event a success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => <motion.div key={index} initial={{
            opacity: 0,
            y: 30
          }} whileInView={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: index * 0.2,
            duration: 0.5
          }} viewport={{
            once: true
          }}>
                <Card className="h-full border-none shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col group">
                  <div className="h-48 overflow-hidden relative">
                    <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt={pkg.imageAlt} src={index === 0 ? "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&q=80" : index === 1 ? "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80" : "https://images.unsplash.com/photo-1530103862676-de3c9a59af57?auto=format&fit=crop&q=80"} />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                  </div>
                  <CardHeader>
                    <div className="mb-4">{pkg.icon}</div>
                    <CardTitle className="text-2xl text-[#7C3B1F] font-serif">{pkg.title}</CardTitle>
                    <CardDescription className="font-nunito text-base">{pkg.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <div className="font-bold text-lg text-[#F06934] mb-4">{pkg.price}</div>
                    <ul className="space-y-2">
                      {pkg.features.map((feature, idx) => <li key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                          <Check size={16} className="text-[#F06934]" />
                          <span>{feature}</span>
                        </li>)}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button onClick={() => handleInquiry(pkg.title)} className="w-full bg-[#7C3B1F] hover:bg-[#5a2b16] text-white gap-2">
                      Request Quote <ArrowRight size={16} />
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>)}
          </div>
        </section>

        {/* Custom Event Section */}
        <section className="py-20 bg-[#FAF9F6]">
          <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 space-y-6">
              <h2 className="text-4xl font-bold text-[#7C3B1F]" style={{
              fontFamily: 'Mikado, sans-serif'
            }}>Need Something Custom?</h2>
              <p className="text-lg text-gray-600 font-nunito leading-relaxed">
                Our event planners are experts at bringing visions to life. If our standard packages don't quite fit your needs, we're happy to create a fully customized itinerary for your group. From large-scale weddings to intimate executive summits, the sky is the limit.
              </p>
              <Button onClick={() => handleInquiry("Custom Event")} variant="outline" className="border-[#F06934] text-[#F06934] hover:bg-[#F06934] hover:text-white px-8 py-6">
                Contact Event Planner
              </Button>
            </div>
            <div className="flex-1 w-full h-[400px] rounded-lg overflow-hidden shadow-2xl relative">
              <img className="w-full h-full object-cover" alt="Elegant wedding reception setup outdoors with flowers and white chairs" src="https://horizons-cdn.hostinger.com/b05a0347-ff2a-4d3e-b189-510345403291/welcomepic-Xfuxb.webp" />
            </div>
          </div>
        </section>

      </main>

    </div>;
};
export default PackageDetail;