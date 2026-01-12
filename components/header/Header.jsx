"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  ChevronDown,
  ChevronRight
} from "lucide-react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useParams } from "next/navigation";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

import navigationData from "./navigationData";
import { FlagUK, FlagID } from "./flags";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import BookingModal from "../BookingModal";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const { toast } = useToast();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const [activeHover, setActiveHover] = useState(null);
  const [expandedMobileItem, setExpandedMobileItem] = useState(null);
  const [language, setLanguage] = useState("en");
  const locale = useLocale();

  const handleBookNow = () => {
    setIsBookingModalOpen(true);
    setIsMobileMenuOpen(false);
  };


  /* ================= SCROLL ================= */
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ================= NAVIGATION ================= */
  const handleNavClick = (id) => {
    if (pathname !== "/") {
      router.push(`/#${id}`);
      return;
    }

    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    } else {
      if (id !== "hero") {
        toast({
          title: "Navigation",
          description: "This page section is currently under construction."
        });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }

    setIsMobileMenuOpen(false);
    setActiveHover(null);
  };

  const handleItemClick = (e, href, external) => {
    e.preventDefault();

    if (href === "#") {
      toast({
        title: "Coming Soon",
        description: "This feature is currently under construction."
      });
      return;
    }

    if (external) {
      window.open(href, "_blank", "noopener,noreferrer");
      setIsMobileMenuOpen(false);
      return;
    }

    if (href.startsWith("/")) {
      router.push(href);
      setIsMobileMenuOpen(false);
      setActiveHover(null);
      return;
    }

    handleNavClick(href.replace("#", ""));
  };


  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    router.replace({ pathname, params }, { locale: lang });
    toast({
      title: "Language Changed",
      description: `Language switched to ${
        lang === "en" ? "English" : "Bahasa Indonesia"
      }`
    });
    setIsMobileMenuOpen(false);
  };

  const toggleMobileItem = (name) => {
    setExpandedMobileItem(expandedMobileItem === name ? null : name);
  };

  /* ================= RENDER ================= */
  return (
    <>
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white shadow-lg py-1"
          : "bg-white/95 backdrop-blur-sm py-2"
      }`}
      onMouseLeave={() => setActiveHover(null)}
    >
      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between relative">

          {/* LOGO */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            onClick={() => handleNavClick("hero")}
            className="cursor-pointer z-50"
          >
            <Image
              src="https://horizons-cdn.hostinger.com/b05a0347-ff2a-4d3e-b189-510345403291/565e33251b8aec90e86058a30a6a6ec8.webp"
              alt="Safari Resort"
              width={140}
              height={56}
              className="h-14 w-auto object-contain"
              priority
            />
          </motion.div>

          {/* DESKTOP MENU */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navigationData.map((item) => (
              <div
                key={item.name}
                onMouseEnter={() => setActiveHover(item.name)}
                className="relative"
              >
                <button
                  onClick={() =>
                    item.type === "link" && handleNavClick(item.id)
                  }
                  className={`px-3 py-2 text-sm font-bold flex items-center gap-1 transition-colors ${
                    activeHover === item.name
                      ? "text-[#F06934]"
                      : "text-[#7C3B1F]"
                  }`}
                >
                  {item.name}
                  {item.type !== "link" && (
                    <ChevronDown
                      size={14}
                      className={`transition-transform ${
                        activeHover === item.name ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </button>

                {/* ===== DROPDOWN / MEGA ===== */}
                <AnimatePresence>
                  {activeHover === item.name && item.type !== "link" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-max"
                    >
                      <div className="bg-white border border-orange-100 shadow-xl overflow-hidden">

                        {/* MEGA */}
                        {item.type === "mega" && (
                          <div className="flex p-6 gap-8 min-w-[600px]">
                            {item.columns.map((col, i) => (
                              <div
                                key={i}
                                className="flex-1 pr-6 border-r last:border-0"
                              >
                                <h3 className="font-bold text-[#F06934] mb-3 flex items-center gap-2">
                                  {item.icon} {col.title}
                                </h3>
                                {col.subcategories.map((sub, j) => (
                                  <div key={j} className="mb-4">
                                    <h4 className="font-bold text-[#7C3B1F] text-sm mb-2">
                                      {sub.name}
                                    </h4>
                                    {sub.items.map((s) => (
                                      <Link
                                        key={s.name}
                                        href={s.href}
                                        className="block text-sm text-gray-600 hover:text-[#F06934] px-2 py-1 hover:bg-orange-50"
                                      >
                                        {s.name}
                                      </Link>
                                    ))}
                                  </div>
                                ))}
                              </div>
                            ))}
                          </div>
                        )}

                        {/* MEGA GRID */}
                        {item.type === "mega-grid" && (
                          <div className="p-6 w-[500px]">
                            <div className="grid grid-cols-2 gap-3">
                              {item.items.map((i) => (
                                <Link
                                  key={i.name}
                                  href={i.href}
                                  onClick={(e) =>
                                    handleItemClick(e, i.href, i.external)
                                  }
                                  className="text-sm text-gray-700 hover:text-[#F06934] p-2 hover:bg-orange-50"
                                >
                                  {i.name}
                                </Link>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* DROPDOWN */}
                        {item.type === "dropdown" && (
                          <div className="p-2 min-w-[200px]">
                            {item.items.map((i) => (
                              <Link
                                key={i.name}
                                href={i.href}
                                onClick={(e) =>
                                  handleItemClick(e, i.href, i.external)
                                }
                                className="block px-4 py-2 text-sm text-gray-700 hover:text-[#F06934] hover:bg-orange-50"
                              >
                                {i.name}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* DESKTOP ACTIONS */}
          <div className="hidden lg:flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-2 uppercase">
                  {locale === "en" ? <FlagUK /> : <FlagID />}
                  {locale}
                  <ChevronDown size={14} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleLanguageChange("en")}>
                  <FlagUK /> English
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleLanguageChange("id")}>
                  <FlagID /> Indonesia
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              onClick={handleBookNow}
              className="bg-[#7C3B1F] text-white px-6"
            >
              Book Now
            </Button>
          </div>

          {/* MOBILE TOGGLE */}
          <button
            className="lg:hidden p-2 text-[#7C3B1F]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* MOBILE MENU */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white border-t"
            >
              <div className="p-4 space-y-2 h-[calc(100vh-80px)] overflow-y-auto">
                {navigationData.map((item) => (
                  <div key={item.name}>
                    {item.type === "link" ? (
                      <button
                        onClick={() => handleNavClick(item.id)}
                        className="w-full text-left py-3 font-bold text-[#7C3B1F]"
                      >
                        {item.name}
                      </button>
                    ) : (
                      <>
                        <button
                          onClick={() => toggleMobileItem(item.name)}
                          className="flex justify-between w-full py-3 font-bold text-[#7C3B1F]"
                        >
                          {item.name}
                          <ChevronRight
                            className={`transition-transform ${
                              expandedMobileItem === item.name
                                ? "rotate-90"
                                : ""
                            }`}
                          />
                        </button>

                        <AnimatePresence>
                          {expandedMobileItem === item.name && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="pl-4"
                            >
                              {(item.items || []).map((i) => (
                                <a
                                  key={i.name}
                                  href={i.href}
                                  onClick={(e) =>
                                    handleItemClick(e, i.href, i.external)
                                  }
                                  className="block py-2 text-sm"
                                >
                                  {i.name}
                                </a>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    )}
                  </div>
                ))}

                <Button
                  onClick={handleBookNow}
                  className="w-full mt-6 bg-[#7C3B1F]"
                >
                  Book Now
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
       <BookingModal 
       isOpen={isBookingModalOpen} 
       onClose={() => setIsBookingModalOpen(false)} 
     />
     </>
  );
}
