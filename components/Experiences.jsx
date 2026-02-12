"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import ExperienceCard from "@/components/ExperienceCard";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { mapActivitiesToExperiences } from "@/lib/utils";

const Experiences = ({ activites }) => {
  const [showAll, setShowAll] = useState(false);

  const dummyExperiences = [
    {
      id: 6,
      name: "Deer Feeding",
      description: "Participate in feeding sessions for deer.",
      image: "/assets/experiences/feeding-animal.png",
      duration: "30 mins",
      groupSize: "Open",
      whatsappMessage:
        "Halo saya ingin mengetahui lebih lanjut tentang Feeding Animal",
    },
    {
      id: 7,
      name: "Poni Ride",
      description: "Gentle rides on ponies or camels for a unique perspective.",
      image: "/assets/experiences/animal-ride.png",
      duration: "20 mins",
      groupSize: "Individual",
      whatsappMessage:
        "Halo saya ingin mengetahui lebih lanjut tentang Animal Ride",
    },
    {
      id: 3,
      name: "Explore TSI Buggy Car",
      description: "Drive your own buggy through challenging off-road trails.",
      image: "/assets/experiences/buggy.png",
      duration: "1.5 hours",
      groupSize: "2 guests per buggy",
      whatsappMessage:
        "Halo saya ingin mengetahui lebih lanjut tentang Buggy Explorer",
    },
    {
      id: 1,
      name: "Safari Journey",
      description:
        "Embark on an unforgettable journey through the wild savanna.",
      image: "/assets/experiences/safari-journey.png",
      duration: "3 hours",
      groupSize: "Up to 6 guests",
      bookingUrl: "https://tamansafari.com/",
    },
    {
      id: 2,
      name: "Night Safari",
      description: "Experience the thrill of the jungle after dark.",
      image: "/assets/experiences/safari-night.png",
      duration: "2 hours",
      groupSize: "Up to 8 guests",
      bookingUrl: "https://tamansafari.com/",
    },
    {
      id: 8,
      name: "Safari Trek",
      description: "Guided walking tour to explore flora and fauna on foot.",
      image: "/assets/experiences/safari-trek.png",
      duration: "2 hours",
      groupSize: "Up to 10 guests",
      whatsappMessage:
        "Halo saya ingin mengetahui lebih lanjut tentang Safari Trek",
    },
    {
      id: 9,
      name: "Meet & Feed Rusa",
      description: "Enjoy a delightful Meet & Feed Rusa.",
      image: "/assets/experiences/feeding-rusa.png",
      duration: "1.5 hours",
      groupSize: "Reservation only",
      whatsappMessage:
        "Halo saya ingin mengetahui lebih lanjut tentang Breakfast With Dolphin",
    },
    {
      id: 10,
      name: "Dine Experience",
      description:
        "Exclusive dining surrounded by the sights and sounds of nature.",
      image: "/assets/experiences/restaurant-caravan.jpg",
      duration: "2 hours",
      groupSize: "Couples or Families",
      whatsappMessage:
        "Halo saya ingin mengetahui lebih lanjut tentang Dine Experience",
    },
  ];

  const experiences = activites?.length
    ? mapActivitiesToExperiences(activites)
    : dummyExperiences;

  const displayedExperiences = showAll ? experiences : experiences.slice(0, 4);

  return (
    <section id="experiences" className="py-20 md:py-32 relative bg-white">
      <div className="bg-zebra-pattern"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-[#F06934] font-bold text-sm tracking-widest uppercase mb-2 block">
            Adventures
          </span>
          <h2
            className="text-4xl md:text-5xl font-bold mb-6"
            style={{ color: "#7C3B1F", fontFamily: "Mikado, sans-serif" }}
          >
            Unforgettable Experiences
          </h2>
          <p
            className="text-lg text-[#7C3B1F] max-w-3xl mx-auto"
            style={{ fontFamily: "Nunito, sans-serif" }}
          >
            Curated adventures that connect you with nature and create lasting
            memories
          </p>
        </motion.div>

        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto mb-12"
          style={{ fontFamily: "Nunito, sans-serif" }}
        >
          {displayedExperiences.map((experience, index) => (
            <ExperienceCard
              key={experience.id}
              experience={experience}
              index={index}
            />
          ))}
        </div>

        <div className="text-center">
          <Button
            onClick={() => setShowAll(!showAll)}
            variant="outline"
            className="px-8 py-4 rounded-none border-2 text-lg font-bold gap-2 hover:bg-[#7C3B1F] transition-all hover:text-white text-[#7C3B1F]"
            style={{
              borderColor: "#7C3B1F",
              fontFamily: "Nunito, sans-serif",
            }}
          >
            {showAll ? (
              <>
                Show Less <ChevronUp size={20} />
              </>
            ) : (
              <>
                View All Experiences <ChevronDown size={20} />
              </>
            )}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Experiences;
