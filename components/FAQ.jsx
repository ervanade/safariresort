'use client'
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const FAQItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="border-b border-[#7C3B1F]/10 last:border-none">
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between py-4 text-left focus:outline-none group"
      >
        <span className={`text-base md:text-lg font-bold transition-colors ${isOpen ? 'text-[#F06934]' : 'text-[#7C3B1F] group-hover:text-[#F06934]'}`} style={{ fontFamily: 'Mikado, sans-serif' }}>
          {question}
        </span>
        <span className={`ml-4 flex-shrink-0 transition-colors ${isOpen ? 'text-[#F06934]' : 'text-[#7C3B1F]'}`}>
            {isOpen ? <Minus size={20} /> : <Plus size={20} />}
        </span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pb-4 text-gray-600 leading-relaxed" style={{ fontFamily: 'Nunito, sans-serif' }}>
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQ = () => {
  const [openItem, setOpenItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const faqCategories = [
    {
      title: "General Information",
      items: [
        { 
          question: "What is Safari Resort – Taman Safari Bogor?", 
          answer: "Safari Resort is a unique accommodation destination situated within the premises of Taman Safari Indonesia, Bogor. Surrounded by lush tropical forests and picturesque mountains, Safari Resort offers a distinct stay experience, combining comfort with the allure of wildlife and nature." 
        },
        { 
          question: "Where is Safari Resort located?", 
          answer: "Safari Resort is located within the Taman Safari Indonesia area, Cisarua, Bogor, West Java." 
        },
        { 
          question: "Is Safari Resort suitable for families?", 
          answer: "Yes, Safari Resort is an ideal choice for family vacations, including children, as it offers family-friendly facilities and direct access to the Safari Park." 
        }
      ]
    },
    {
      title: "Reservation & Payment",
      items: [
        { 
          question: "How can a reservation be made?", 
          answer: "Reservations can be made through the official Safari Resort website, the official WhatsApp reservation channel, official email, or via collaborating Online Travel Agents (OTAs). Guests may also contact the reservation team directly by telephone for further assistance." 
        },
        { 
          question: "Is advance reservation necessary?", 
          answer: "We highly recommend making reservations in advance to ensure room availability, particularly during peak holiday seasons and weekends." 
        },
        { 
          question: "What payment methods are accepted?", 
          answer: "Payments can be made via bank transfer, credit card, or other payment methods in accordance with applicable policies." 
        },
        { 
          question: "Are prices subject to change?", 
          answer: "Prices are dynamic and may change depending on the period, occupancy level, and current ongoing promotions." 
        },
        { 
          question: "What is the reservation cancellation policy?", 
          answer: "Room reservations will be automatically cancelled if proof of payment and confirmation from the guest has not been received by the specified deadline." 
        }
      ]
    },
    {
      title: "Check-in & Check-out",
      items: [
        { 
          question: "What are the check-in and check-out times?", 
          answer: "Check-in time starts at 2:00 PM (14.00 WIB) and Check-out time is maximum at 12:00 PM (12.00 WIB)." 
        },
        { 
          question: "Is early check-in or late check-out available?", 
          answer: "Early check-in and late check-out are possible subject to room availability and may incur an additional charge." 
        },
        { 
          question: "What documents are required for check-in?", 
          answer: "Guests are required to present a valid form of identification (KTP/Passport) and proof of reservation." 
        },
        { 
          question: "Is a deposit required upon check-in?", 
          answer: "Yes. During the check-in process, guests are required to make a deposit in accordance with the applicable provisions." 
        }
      ]
    },
    {
      title: "Room Types & Facilities",
      items: [
        { 
          question: "What types of accommodation are available?", 
          answer: "Safari Resort offers various accommodation options such as Hotel Rooms, Caravans, Bungalows, and Treehouses with different capacities." 
        },
        { 
          question: "Are the rooms equipped with air conditioning?", 
          answer: "Consistent with its green hotel concept, Safari Resort does not utilize air conditioning (AC) in any of its accommodation types. Each unit is designed to maximize natural air circulation, providing the comfortable and healthy coolness typical of the mountain climate." 
        },
        { 
          question: "Is an extra bed available?", 
          answer: "Extra beds are available at an additional cost. Options for extra beds include those with breakfast or those without breakfast, according to the applicable provisions." 
        },
        { 
          question: "Is Wi-Fi available?", 
          answer: "Wi-Fi access is available in all areas within the Resort premises." 
        }
      ]
    },
    {
      title: "Food & Beverage",
      items: [
        { 
          question: "Is breakfast included in the room price?", 
          answer: "Yes, the room price includes breakfast for the capacity of the room or for 2 persons per room." 
        },
        { 
          question: "Where is breakfast served?", 
          answer: "Breakfast is served at Caravan Restaurant with varied Nusantara & Western menus starting from 06:30 WIB to 10:00 WIB." 
        },
        { 
          question: "Are there restaurants and cafes available within the resort area?", 
          answer: "Yes, Safari Resort features the Caravan Restaurant, which serves a diverse selection of local and international menus. Additionally, the Caravan Café is available as a relaxing spot for family or friends, offering charming views of Pelican Island." 
        },
        { 
          question: "What are the operating hours?", 
          answer: "The Caravan Restaurant operates daily from 06:00 WIB until 22:00 WIB, with the last order at 21:00 WIB. The Caravan Café is open daily from 08:00 WIB until 22:00 WIB, with the last order at 21:00 WIB." 
        },
        { 
          question: "Are outside food and beverages permitted?", 
          answer: "Bringing food and beverages from outside the hotel is not permitted." 
        }
      ]
    },
    {
      title: "Safari Park Tickets",
      items: [
        { 
          question: "Does a stay at Safari Resort include Taman Safari tickets?", 
          answer: "Guests who book specific packages or special promotions will receive entrance tickets to Taman Safari Bogor. Furthermore, Safari Resort offers special discounted Taman Safari Bogor tickets for staying guests, subject to applicable provisions." 
        },
        { 
          question: "How many times can guests enter Taman Safari?", 
          answer: "Guests staying at Safari Resort are privileged with access to enter over two days (check-in day and check-out day), in accordance with applicable policies." 
        },
        { 
          question: "Can the tickets be used by others?", 
          answer: "Tickets are valid only for the guests registered in the reservation." 
        }
      ]
    },
    {
      title: "Activities & Facilities",
      items: [
        { 
          question: "What activities are available at Safari Resort?", 
          answer: "Safari Resort offers various activities for guests, including animal exhibits (deer, siamangs, and pelicans), swimming pool facilities, a children's play area, and other outdoor activities." 
        },
        { 
          question: "Is a swimming pool available?", 
          answer: "Yes, a swimming pool is available for resort guests." 
        },
        { 
          question: "Is a buggy or shuttle service available?", 
          answer: "Safari Resort provides shuttle/buggy facilities within certain areas according to the operational schedule. A separate charge applies for the Buggy Journey within the Taman Safari area, based on the applicable package." 
        }
      ]
    },
    {
      title: "Child Policy & Extra Guests",
      items: [
        { 
          question: "Are children subject to a charge?", 
          answer: "The child charge policy is customized based on age and room type. Please contact the reservation team for further details." 
        },
        { 
          question: "Are infants allowed to stay overnight?", 
          answer: "Yes, infants are permitted to stay overnight with their parents." 
        }
      ]
    },
    {
      title: "Policies & Terms",
      items: [
        { 
          question: "Does Safari Resort permit guests to bring pets?", 
          answer: "It is not permitted. To maintain the comfort, security, and health of all guests, Safari Resort does not allow visitors to bring pets." 
        },
        { 
          question: "Is smoking allowed in the room?", 
          answer: "Smoking is not allowed inside the rooms. Designated smoking areas are available in specific locations." 
        },
        { 
          question: "What is the reservation cancellation policy?", 
          answer: "Once payment is made, the reservation is non-refundable and cannot be cancelled." 
        },
        { 
          question: "What is the reservation change policy?", 
          answer: "A maximum of 1 (one) change to the stay date is permitted, provided the request is submitted no later than H-3 (three days) before the arrival date. Sudden requests for date changes cannot be processed." 
        }
      ]
    },
    {
      title: "Contact & Assistance",
      items: [
        { 
          question: "How can Safari Resort be contacted?", 
          answer: "For further information, please contact Safari Resort reservations via the official contact information listed on the website." 
        }
      ]
    }
  ];

  const toggleItem = (id) => {
    setOpenItem(openItem === id ? null : id);
  };

  const filteredCategories = useMemo(() => {
    return faqCategories.map(category => {
      // Filter by category selection first
      if (selectedCategory !== "all" && category.title !== selectedCategory) {
        return null;
      }

      // If text search is active, filter items inside the category
      if (searchQuery.trim() !== "") {
        const filteredItems = category.items.filter(item => 
          item.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
          item.answer.toLowerCase().includes(searchQuery.toLowerCase())
        );

        if (filteredItems.length > 0) {
          return { ...category, items: filteredItems };
        }
        return null; // Category has no matching items
      }

      return category; // Return full category if no search query
    }).filter(Boolean); // Remove null categories
  }, [faqCategories, searchQuery, selectedCategory]);

  return (
    <section className="py-20 md:py-32 relative bg-white" id="faq-section">
      <div className="bg-zebra-pattern"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#7C3B1F]" style={{ fontFamily: 'Mikado, sans-serif' }}>
              Frequently Asked Questions
            </h2>
            <p className="text-[#7C3B1F]/80 text-lg font-medium max-w-2xl mx-auto" style={{ fontFamily: 'Nunito, sans-serif' }}>
              Find answers to common questions about staying, dining, and exploring at Safari Resort. 
              We've gathered everything you need to know to make your wildlife adventure unforgettable.
            </p>
          </div>

          <div className="mb-8 flex flex-col md:flex-row gap-4 bg-[#fdf8f6] p-4  border border-[#7C3B1F]/10">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#7C3B1F]/50 h-5 w-5" />
              <Input 
                type="text" 
                placeholder="Search questions..." 
                className="pl-10 bg-white border-[#7C3B1F]/20 focus:border-[#F06934] focus:ring-[#F06934]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="w-full md:w-64">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="bg-white border-[#7C3B1F]/20">
                  <div className="flex items-center gap-2 text-[#7C3B1F]">
                    <Filter className="h-4 w-4" />
                    <SelectValue placeholder="All Categories" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {faqCategories.map((cat, index) => (
                    <SelectItem key={index} value={cat.title}>{cat.title}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-8 min-h-[400px]">
            {filteredCategories.length > 0 ? (
              filteredCategories.map((category, catIndex) => (
                <div key={catIndex} className="bg-white shadow-lg border border-[#7C3B1F]/10 overflow-hidden">
                  <div className="bg-[#7C3B1F]/5 px-6 py-4 border-b border-[#7C3B1F]/10">
                    <h3 className="text-xl font-bold text-[#7C3B1F]" style={{ fontFamily: 'Mikado, sans-serif' }}>
                      {category.title}
                    </h3>
                  </div>
                  <div className="px-6 py-2">
                    {category.items.map((item, itemIndex) => {
                      // Generate a unique ID that persists even when filtering
                      // We use the question itself as part of the key to ensure uniqueness and stable animation
                      const uniqueId = item.question.replace(/\s+/g, '-').toLowerCase(); 
                      return (
                        <FAQItem
                          key={uniqueId}
                          question={item.question}
                          answer={item.answer}
                          isOpen={openItem === uniqueId}
                          onClick={() => toggleItem(uniqueId)}
                        />
                      );
                    })}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 bg-gray-50  border border-dashed border-gray-300">
                <p className="text-[#7C3B1F] font-medium text-lg">No matching questions found.</p>
                <button 
                  onClick={() => {setSearchQuery(""); setSelectedCategory("all")}}
                  className="mt-2 text-[#F06934] hover:underline text-sm font-bold"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};

export default FAQ;