'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Instagram } from 'lucide-react';
import { FaFacebook, FaInstagram, FaTwitter, FaWhatsapp } from 'react-icons/fa';
import { SiTripadvisor } from 'react-icons/si';
import { useToast } from '@/components/ui/use-toast';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';

export default function Footer({settings}) {
  const { toast } = useToast();
  const router = useRouter();
  const scrollRef = useRef(null);
  const link_ig = settings?.find((item) => item.key === "link_ig")?.value || "https://www.instagram.com/safariresort.id/?hl=en";
  const link_fb = settings?.find((item) => item.key === "link_fb")?.value || "https://www.facebook.com/safariresort/?locale=id_ID";
  const link_trip = settings?.find((item) => item.key === "link_trip")?.value || "https://www.tripadvisor.com/Hotel_Review-g844506-d2041188-Reviews-or40-Safari_Resort-Puncak_West_Java_Java.html";
  const link_wa = settings?.find((item) => item.key === "whatsapp_number")?.value || "+6282125222756";
  /* ===== Navigation Handler ===== */
  const handleLinkClick = (e, link) => {
    e.preventDefault();

    if (link.external) {
      window.open(link.href, '_blank', 'noopener,noreferrer');
      return;
    }

    if (link.href.startsWith('/')) {
      router.push(link.href);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      toast({
        title: 'Navigation',
        description:
          "🚧 This feature isn't implemented yet—but don't worry! 🚀",
      });
    }
  };

  const handleInstagramClick = () => {
    if (typeof window !== 'undefined') {
      const igUrl = link_ig || 'https://www.instagram.com/safariresort.id/?hl=en';
      window.open(igUrl, '_blank', 'noopener,noreferrer');
    }
  };
  
  const handleSocmedClick = (link) => {
    if (typeof window !== 'undefined') {
      const url = link || 'https://www.instagram.com/safariresort.id/?hl=en';
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  /* ===== Horizontal Scroll ===== */
  const scroll = direction => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -300 : 300,
      behavior: 'smooth',
    });
  };

  /* ===== Data ===== */
  const sitemapLinks = {
    Stay: [
      { name: 'Standard Twin', href: '/rooms/standard-room' },
      { name: 'Deluxe Twin', href: '/rooms/deluxe-room' },
      { name: 'Suite Room', href: '/rooms/junior-suite-rooms' },
      { name: 'Treehouse', href: '/stay/treehouse' },
      { name: 'Caravan', href: '/stay/caravan-resort' },
      { name: 'Bungalow', href: '/stay/bungalow' },
    ],
    Experiences: [
      { name: 'Safari Journey', href: 'https://tamansafari.com/', external: true },
      { name: 'Night Safari', href: 'https://tamansafari.com/', external: true },
      { name: 'Buggy Explorer', href: '/#experiences' },
      { name: 'Feeding Animal', href: '/#experiences' },
      { name: 'Animal Ride', href: '/#experiences' },
      { name: 'Dine Experience', href: '/#experiences' },
    ],
    Dining: [
      { name: 'Caravan Restaurant', href: '/dining/caravan-restaurant' },
      { name: 'Caravan Cafe', href: '/dining/caravan-cafe' },
    ],
    Info: [
      { name: 'Press & Media', href: '/articles' },
      { name: 'Maps', href: '/#map' },
      { name: 'FAQ', href: '/faq' },
      { name: 'Contact', href: '/#contact' },
    ],
  };

  const socialIcons = [
    { Icon: FaFacebook, name: 'Facebook', action: () => handleSocmedClick(link_fb) },
    { Icon: FaInstagram, name: 'Instagram', action: handleInstagramClick },
    { Icon: FaTwitter, name: 'Twitter'},
    { Icon: SiTripadvisor, name: 'TripAdvisor', action: () => handleSocmedClick(link_trip) },
    { Icon: FaWhatsapp, name: 'WhatsApp', action: () => handleSocmedClick(`https://wa.me/${link_wa}?text=Hello%20Safari%20Resort%2C%20I%20have%20a%20question.`) },
  ];



  return (
    <footer className="bg-[#faf7f5] border-t-4 border-[#F06934] pt-16 pb-8">
      <div className="container mx-auto px-4">

        {/* ================= Instagram Section ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-6 mb-16 max-w-7xl mx-auto">
          {/* Instagram Card */}
          <div
            onClick={handleInstagramClick}
            className="flex flex-col items-center justify-center text-center p-8 bg-white shadow-sm hover:shadow-md border border-gray-100 cursor-pointer group relative"
          >
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="p-4 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 rounded-full mb-4 text-white group-hover:scale-110 transition-transform">
              <FaInstagram size={32} />
            </div>
            <h4 className="text-2xl font-bold text-[#7C3B1F] mb-1 font-mikado">
              Follow Our Journey
            </h4>
            <p className="text-gray-500 mb-4">@safariresort.id</p>
            <Button variant="outline" className="border-[#F06934] text-[#F06934] hover:bg-[#F06934] hover:text-white">
              Follow on Instagram
            </Button>
          </div>

          {/* Instagram Slider */}
          {/* <div className="lg:col-span-2 bg-white p-4 shadow-sm border border-gray-100 relative group">
            <Button
              size="icon"
              variant="secondary"
              onClick={() => scroll('left')}
              className="hidden md:flex absolute top-1/2 -left-4 z-10 rounded-full"
            >
              <ChevronLeft />
            </Button>

            <Button
              size="icon"
              variant="secondary"
              onClick={() => scroll('right')}
              className="hidden md:flex absolute top-1/2 -right-4 z-10 rounded-full"
            >
              <ChevronRight />
            </Button>

            <div
              ref={scrollRef}
              className="flex gap-4 overflow-x-auto snap-x snap-mandatory [&::-webkit-scrollbar]:hidden"
            >
              {[1,2,3,4,5,6,7].map(id => (
                <motion.div
                  key={id}
                  whileHover={{ scale: 1.02 }}
                  onClick={handleInstagramClick}
                  className="min-w-[200px] md:min-w-[240px] h-[240px] rounded-lg overflow-hidden snap-center relative cursor-pointer"
                >
                  <Image
                    src="https://instagram.fcgk52-1.fna.fbcdn.net/v/t51.82787-15/584403520_18346917046207650_606281224088273072_n.jpg"
                    alt="Instagram preview"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 flex items-center justify-center text-white transition-opacity">
                    <Instagram />
                  </div>
                </motion.div>
              ))}
            </div>
          </div> */}
        </div>

        {/* ================= Footer Content ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 border-t pt-12">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <Image
                src="https://horizons-cdn.hostinger.com/b05a0347-ff2a-4d3e-b189-510345403291/565e33251b8aec90e86058a30a6a6ec8.webp"
                alt="Safari Resort Logo"
                width={48}
                height={48}
              />
              <span className="text-2xl font-bold text-[#7C3B1F] font-mikado">
                Safari Resort
              </span>
            </div>

            <p className="text-[#7C3B1F]/80 mb-6">
              Jl. Kapten Harun Kabir No.724, Cisarua, Bogor<br />
              Email: info@safariresort.com
            </p>

            <div className="flex gap-4">
              {socialIcons.map(({ Icon, action }, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.1 }}
                  onClick={action}
                  className="p-2 rounded-full bg-[#7C3B1F] text-white"
                >
                  <Icon size={20} />
                </motion.button>
              ))}
            </div>
          </div>

          {Object.entries(sitemapLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="font-bold mb-4 text-[#7C3B1F]">{title}</h3>
              <ul className="space-y-3">
                {links.map((link, i) => (
                  <li key={i}>
                    <Link
                      href={link.href}
                      onClick={e => handleLinkClick(e, link)}
                      className="text-sm text-[#7C3B1F]/70 hover:text-[#F06934]"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t pt-8 mt-8 text-center text-sm text-[#7C3B1F]/60">
          © 2025 Safari Resort. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
