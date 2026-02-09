"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import * as Icons from "lucide-react"; // Import semua ikon
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";

const faqDataDummy = [
  {
    id: "general",
    title: "General Information",
    icon: "Info",
    items: [
      {
        q: "What is Safari Resort – Taman Safari Bogor?",
        a: "Safari Resort is a unique accommodation destination situated within the premises of Taman Safari Indonesia, Bogor. Surrounded by lush tropical forests and picturesque mountains, Safari Resort offers a distinct stay experience, combining comfort with the allure of wildlife and nature.",
      },
      {
        q: "Where is Safari Resort located?",
        a: "Safari Resort is located within the Taman Safari Indonesia area, Cisarua, Bogor, West Java.",
      },
      {
        q: "Is Safari Resort suitable for families?",
        a: "Yes, Safari Resort is an ideal choice for family vacations, including children, as it offers family-friendly facilities and direct access to the Safari Park.",
      },
    ],
  },
  {
    id: "reservation",
    title: "Reservation & Payment",
    icon: "CalendarCheck",
    items: [
      {
        q: "How can a reservation be made?",
        a: "Reservations can be made through the official Safari Resort website, the official WhatsApp reservation channel, official email, or via collaborating Online Travel Agents (OTAs). Guests may also contact the reservation team directly by telephone for further assistance.",
      },
      {
        q: "Is advance reservation necessary?",
        a: "We highly recommend making reservations in advance to ensure room availability, particularly during peak holiday seasons and weekends.",
      },
      {
        q: "What payment methods are accepted?",
        a: "Payments can be made via bank transfer, credit card, or other payment methods in accordance with applicable policies.",
      },
      {
        q: "Are prices subject to change?",
        a: "Prices are dynamic and may change depending on the period, occupancy level, and current ongoing promotions.",
      },
      {
        q: "What is the reservation cancellation policy?",
        a: "Room reservations will be automatically cancelled if proof of payment and confirmation from the guest has not been received by the specified deadline.",
      },
    ],
  },
  {
    id: "checkin",
    title: "Check-in & Check-out",
    icon: "Clock",
    items: [
      {
        q: "What are the check-in and check-out times?",
        a: "Check-in time starts at 2:00 PM (14.00 WIB) and Check-out time is maximum at 12:00 PM (12.00 WIB).",
      },
      {
        q: "Is early check-in or late check-out available?",
        a: "Early check-in and late check-out are possible subject to room availability and may incur an additional charge.",
      },
      {
        q: "What documents are required for check-in?",
        a: "Guests are required to present a valid form of identification (KTP/Passport) and proof of reservation.",
      },
      {
        q: "Is a deposit required upon check-in?",
        a: "Yes. During the check-in process, guests are required to make a deposit in accordance with the applicable provisions.",
      },
    ],
  },
  {
    id: "rooms",
    title: "Room Types & Facilities",
    icon: "BedDouble",
    items: [
      {
        q: "What types of accommodation are available?",
        a: "Safari Resort offers various accommodation options such as Hotel Rooms, Caravans, Bungalows, and Treehouses with different capacities.",
      },
      {
        q: "Are the rooms equipped with air conditioning?",
        a: "Consistent with its green hotel concept, Safari Resort does not utilize air conditioning (AC) in any of its accommodation types. Each unit is designed to maximize natural air circulation, providing the comfortable and healthy coolness typical of the mountain climate.",
      },
      {
        q: "Is an extra bed available?",
        a: "Extra beds are available at an additional cost. Options for extra beds include those with breakfast or those without breakfast, according to the applicable provisions.",
      },
      {
        q: "Is Wi-Fi available?",
        a: "Wi-Fi access is available in all areas within the Resort premises.",
      },
    ],
  },
  {
    id: "dining",
    title: "Food & Beverage",
    icon: "Utensils",
    items: [
      {
        q: "Is breakfast included in the room price?",
        a: "Yes, the room price includes breakfast for the capacity of the room or for 2 persons per room.",
      },
      {
        q: "Where is breakfast served?",
        a: "Breakfast is served at Caravan Restaurant with varied Nusantara & Western menus starting from 06:30 WIB to 10:00 WIB.",
      },
      {
        q: "Are there restaurants and cafes available within the resort area?",
        a: "Yes, Safari Resort features the Caravan Restaurant, which serves a diverse selection of local and international menus. Additionally, the Caravan Café is available as a relaxing spot for family or friends, offering charming views of Pelican Island.",
      },
      {
        q: "What are the operating hours?",
        a: "The Caravan Restaurant operates daily from 06:00 WIB until 22:00 WIB, with the last order at 21:00 WIB. The Caravan Café is open daily from 08:00 WIB until 22:00 WIB, with the last order at 21:00 WIB.",
      },
      {
        q: "Are outside food and beverages permitted?",
        a: "Bringing food and beverages from outside the hotel is not permitted.",
      },
    ],
  },
  {
    id: "ticket",
    title: "Safari Park Tickets",
    icon: "Ticket",
    items: [
      {
        q: "Does a stay at Safari Resort include Taman Safari tickets?",
        a: "Guests who book specific packages or special promotions will receive entrance tickets to Taman Safari Bogor. Furthermore, Safari Resort offers special discounted Taman Safari Bogor tickets for staying guests, subject to applicable provisions.",
      },
      {
        q: "How many times can guests enter Taman Safari?",
        a: "Guests staying at Safari Resort are privileged with access to enter over two days (check-in day and check-out day), in accordance with applicable policies.",
      },
      {
        q: "Can the tickets be used by others?",
        a: "Tickets are valid only for the guests registered in the reservation.",
      },
    ],
  },
  {
    id: "activities",
    title: "Activities & Facilities",
    icon: "Palmtree",
    items: [
      {
        q: "What activities are available at Safari Resort?",
        a: "Safari Resort offers various activities for guests, including animal exhibits (deer, siamangs, and pelicans), swimming pool facilities, a children's play area, and other outdoor activities.",
      },
      {
        q: "Is a swimming pool available?",
        a: "Yes, a swimming pool is available for resort guests.",
      },
      {
        q: "Is a buggy or shuttle service available?",
        a: "Safari Resort provides shuttle/buggy facilities within certain areas according to the operational schedule. A separate charge applies for the Buggy Journey within the Taman Safari area, based on the applicable package.",
      },
    ],
  },
  {
    id: "kids",
    title: "Child Policy & Extra Guests",
    icon: "Baby",
    items: [
      {
        q: "Are children subject to a charge?",
        a: "The child charge policy is customized based on age and room type. Please contact the reservation team for further details.",
      },
      {
        q: "Are infants allowed to stay overnight?",
        a: "Yes, infants are permitted to stay overnight with their parents.",
      },
    ],
  },
  {
    id: "policy",
    title: "Policies & Terms",
    icon: "ScrollText",
    items: [
      {
        q: "Does Safari Resort permit guests to bring pets?",
        a: "It is not permitted. To maintain the comfort, security, and health of all guests, Safari Resort does not allow visitors to bring pets.",
      },
      {
        q: "Is smoking allowed in the room?",
        a: "Smoking is not allowed inside the rooms. Designated smoking areas are available in specific locations.",
      },
      {
        q: "What is the reservation cancellation policy?",
        a: "Once payment is made, the reservation is non-refundable and cannot be cancelled.",
      },
      {
        q: "What is the reservation change policy?",
        a: "A maximum of 1 (one) change to the stay date is permitted, provided the request is submitted no later than H-3 (three days) before the arrival date. Sudden requests for date changes cannot be processed.",
      },
    ],
  },
  {
    id: "contact",
    title: "Contact & Assistance",
    icon: "Phone",
    items: [
      {
        q: "How can Safari Resort be contacted?",
        a: "For further information, please contact Safari Resort reservations via the official contact information listed on the website.",
      },
    ],
  },
];

const FAQPage = ({ dataFaq }) => {
  const faqData = dataFaq?.length ? dataFaq : faqDataDummy;
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("general");
  // Fungsi helper untuk merender ikon berdasarkan string
  const renderIcon = (iconName, size = 24) => {
    const LucideIcon = Icons[iconName] || Icons.HelpCircle;
    return <LucideIcon size={size} />;
  };
  // Filter functionality
  const filteredCategories = faqData
    .map((category) => {
      // If search is empty, return category as is
      if (!searchQuery) return category;

      // Filter items inside category
      const filteredItems = category.items.filter(
        (item) =>
          item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.a.toLowerCase().includes(searchQuery.toLowerCase()),
      );

      // Only return category if it has matching items
      return filteredItems.length > 0
        ? { ...category, items: filteredItems }
        : null;
    })
    .filter(Boolean);

  const scrollToCategory = (id) => {
    setActiveCategory(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF9]">
      <main className="pt-24 pb-20">
        {/* Header Section */}
        <section className="bg-[#7C3B1F] text-white py-16 px-4 mb-10 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80')] bg-cover bg-center"></div>
          <div className="container mx-auto text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1
                className="text-4xl md:text-5xl font-bold mb-4"
                style={{ fontFamily: "Mikado, sans-serif" }}
              >
                Help Center
              </h1>
              <p className="text-white/80 max-w-2xl mx-auto text-lg mb-8 font-medium font-nunito">
                Find answers to your questions about the stay experience at
                Safari Resort.
              </p>

              <div className="max-w-xl mx-auto relative">
                <Input
                  type="text"
                  placeholder="Search questions..."
                  className="h-12 pl-12 pr-4 bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:bg-white/20 transition-all backdrop-blur-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Icons.Search
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60"
                  size={20}
                />
              </div>
            </motion.div>
          </div>
        </section>

        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Navigation (Desktop) */}
            <div className="hidden lg:block w-64 flex-shrink-0">
              <div className="sticky top-28 space-y-1">
                <h3 className="font-bold text-[#7C3B1F] mb-4 px-3 text-lg">
                  Categories
                </h3>
                {faqData.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => scrollToCategory(category.id)}
                    className={`w-full text-left px-3 py-2.5  text-sm font-semibold transition-colors flex items-center gap-3 ${
                      activeCategory === category.id
                        ? "bg-[#7C3B1F] text-white shadow-md"
                        : "text-gray-600 hover:bg-[#7C3B1F]/10"
                    }`}
                  >
                    {renderIcon(category.iconName, 16)}{" "}
                    {/* Panggil helper di sini */}
                    {category.title}
                  </button>
                ))}
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 min-w-0">
              {filteredCategories.length > 0 ? (
                <div className="space-y-10">
                  {filteredCategories.map((category) => (
                    <motion.div
                      key={category.id}
                      id={category.id}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      className="bg-white p-6 md:p-8 shadow-sm border border-[#7C3B1F]/5 scroll-mt-28"
                    >
                      <div className="flex items-center gap-3 mb-6 border-b border-[#7C3B1F]/10 pb-4">
                        <div className="p-2 bg-[#F06934]/10  text-[#F06934]">
                          {renderIcon(category.iconName, 16)}{" "}
                          {/* Panggil helper di sini */}
                        </div>
                        <h2
                          className="text-2xl font-bold text-[#7C3B1F]"
                          style={{ fontFamily: "Mikado, sans-serif" }}
                        >
                          {category.title}
                        </h2>
                      </div>

                      <Accordion type="single" collapsible className="w-full">
                        {category.items.map((item, idx) => (
                          <AccordionItem
                            key={idx}
                            value={`item-${category.id}-${idx}`}
                            className="border-b-[#7C3B1F]/10"
                          >
                            <AccordionTrigger
                              className="text-left font-bold text-gray-800 hover:text-[#F06934] py-4"
                              style={{ fontFamily: "Nunito, sans-serif" }}
                            >
                              {item.q}
                            </AccordionTrigger>
                            <AccordionContent
                              className="text-gray-600 leading-relaxed pb-4"
                              style={{ fontFamily: "Nunito, sans-serif" }}
                            >
                              {item.a}
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 bg-white border border-dashed border-gray-300">
                  <Icon.HelpCircle
                    size={48}
                    className="mx-auto text-gray-300 mb-4"
                  />
                  <h3 className="text-xl font-bold text-gray-600 mb-2">
                    Not found
                  </h3>
                  <p className="text-gray-500">
                    Sorry, we couldn't find an answer for "{searchQuery}".
                  </p>
                  <button
                    onClick={() => setSearchQuery("")}
                    className="mt-4 text-[#F06934] font-bold hover:underline"
                  >
                    View all questions
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FAQPage;
