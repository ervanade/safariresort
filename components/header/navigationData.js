import { Bed, Map, Utensils, Camera, Gift } from "lucide-react";

const navigationData = [
  {
    name: "Home",
    id: "hero",
    type: "link"
  },
  {
    name: "Stay",
    id: "stay",
    type: "mega",
    icon: <Bed size={16} />,
    columns: [
      {
        title: "Hotels",
        subcategories: [
          {
            name: "Room Collection",
            items: [
              { name: "Standard Room", href: "/rooms/h1" },
              { name: "Deluxe Room", href: "/rooms/h2" },
              { name: "Junior Suite Room", href: "/rooms/h3" },
              { name: "Executive Suite Room", href: "/rooms/h4" }
            ]
          }
        ]
      },
      {
        title: "Resort",
        subcategories: [
          {
            name: "Nature Lodges",
            items: [
              { name: "Treehouse", href: "/stay/treehouse" },
              { name: "Caravan", href: "/stay/caravan" },
            { name: "Bungalow", href: "/stay/bungalow" }
            ]
          }
        ]
      }
    ]
  },
  {
    name: "Experiences",
    id: "experiences",
    type: "mega-grid",
    icon: <Map size={16} />,
    items: [
      { name: "Safari Journey", href: "https://tamansafari.com/", external: true },
      { name: "Night Safari", href: "https://tamansafari.com/", external: true },
      { name: "Buggy Explorer", href: "#experiences" },
      { name: "Feeding Animal", href: "#experiences" },
      { name: "Animal Ride", href: "#experiences" },
      { name: "Safari Trek", href: "#experiences" },
      { name: "Breakfast With Dolphins", href: "#experiences" },
      { name: "Dine Experience", href: "#experiences" }
    ]
  },
  {
    name: "Package & Offers",
    id: "packages",
    type: "dropdown",
    icon: <Gift size={16} />,
    items: [
      { name: "Gathering Package", href: "/packages/gathering" },
      { name: "Meeting Package", href: "#packages" },
      { name: "Buggy Journey", href: "#packages" },
      { name: "Stay & Explore", href: "#packages" }
    ]
  },
  {
    name: "Dining",
    id: "dining",
    type: "dropdown",
    icon: <Utensils size={16} />,
    items: [
      { name: "Barbeque", href: "#" },
      { name: "Romantic Dinner", href: "/dining/romantic-dinner" },
      { name: "Seasonal Dinner", href: "#" },
      { name: "Jungle Hot Pot", href: "#" }
    ]
  },
  {
    name: "Gallery & Stories",
    id: "gallery",
    type: "dropdown",
    icon: <Camera size={16} />,
    items: [
      { name: "Virtual Tour 360", href: "/gallery/virtual-tour" },
      { name: "Guest Stories", href: "/guest-stories" },
      { name: "Video Highlight", href: "#" }
    ]
  }
];

export default navigationData;
