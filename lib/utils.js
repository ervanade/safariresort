import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const mapAccommodationsToRooms = (apiData = []) => {
  return apiData.map((item) => {
    const price = Number(item.price);
    const promo = Number(item.promoPrice);

    return {
      id: item.id,
      slug: item.slug,
      name: item.name,
      category: item.category?.toLowerCase() === "resort" ? "resort" : "hotel",

      size: item.size || "-",
      description:
        item.excerpt ||
        "Enjoy a comfortable stay surrounded by nature and wildlife at Safari Resort.",

      // UI pakai image + images
      image: item.images?.[0] || "",
      images: item.images || [],

      // format harga string (samain dummy)
      price: `IDR ${price.toLocaleString("id-ID")}`,
      promoPrice: promo < price ? `IDR ${promo.toLocaleString("id-ID")}` : null,

      originalPrice:
        promo < price ? `IDR ${price.toLocaleString("id-ID")}` : null,

      savings:
        promo < price ? `IDR ${(price - promo).toLocaleString("id-ID")}` : null,

      bestSeller: promo < price, // heuristik sederhana

      // OPTIONAL (biar RoomCard aman)
      features: [],
      amenities: [],
    };
  });
};

export const mapActivitiesToExperiences = (apiActivities = []) => {
  return apiActivities.map((item) => {
    const price = Number(item.price);

    return {
      id: item.id,
      slug: item.slug,

      // UI pakai name
      name: item.title,

      // UI pakai description
      description:
        item.excerpt ||
        "Enjoy a unique and unforgettable experience at Safari Resort.",

      // fallback image WAJIB (ExperienceCard almost always pakai image)
      image: item.images?.[0] || "/assets/experiences/default-experience.jpg",

      // OPTIONAL – belum ada di API, kasih default aman
      duration: "—",
      groupSize: "—",

      // OPTIONAL – behavior
      bookingUrl: "https://tamansafari.com/",

      whatsappMessage: `Halo saya ingin mengetahui lebih lanjut tentang ${item.title}`,

      // OPTIONAL kalau mau dipakai nanti
      price: price ? `IDR ${price.toLocaleString("id-ID")}` : null,
    };
  });
};

export const mapPromo = (apiPromo = []) => {
  return apiPromo.map((item) => {
    return {
      id: item.id,
      image:
        item?.image ||
        "https://horizons-cdn.hostinger.com/b05a0347-ff2a-4d3e-b189-510345403291/ccb7556c5dfe8b86de55a58dc7cf682f.png",
      title: item?.title || "1.1 FLASH SALE",
      subtitle: "11-20 Jan 2026",
      content: item?.content || null,
      link_url: item?.item_url,
      description: "Exclusive flash sale! Special rates for your wild stay.",
      price: "IDR 1,500,000",
      cta: "Book Now",
    };
  });
};

export const mapDiningData = (apiData) => {
  return apiData.map((item) => {
    // Logika untuk mengambil id singkat dari slug (misal: 'caravan-restaurant' -> 'caravan')
    const shortId = item.slug.split("-")[0];

    return {
      id: item.id,
      slug: item.slug,
      name: item.title,
      // Karena deskripsi di data asal hanya 'excerpt', kita bisa gunakan excerpt
      // atau memberikan deskripsi default jika ingin lebih lengkap
      description:
        item.excerpt ||
        "Experience unique dining surrounded by nature with a variety of local and international cuisines.",
      mainImage: item.image_url,
      // Data paket makan malam romantis biasanya bersifat statis atau tambahan
      romanticDinnerPackage: {
        title: "Romantic Dinner Package",
        description:
          "Create unforgettable memories with our exclusive romantic dinner setup under the stars.",
        image: item.image_url, // Menggunakan image_url sebagai placeholder jika tidak ada image khusus
      },
    };
  });
};

export const mapFaqData = (apiData) => {
  const categoryConfig = {
    "Informasi Umum": {
      id: "general",
      title: "General Information",
      iconName: "Info",
    },
    "Reservation & Payment": {
      id: "reservation",
      title: "Reservation & Payment",
      iconName: "CalendarCheck",
    },
    "Check-in & Check-out": {
      id: "checkin",
      title: "Check-in & Check-out",
      iconName: "Clock",
    },
    "Room Types & Facilities": {
      id: "rooms",
      title: "Room Types & Facilities",
      iconName: "BedDouble",
    },
    "Food & Beverage": {
      id: "dining",
      title: "Food & Beverage",
      iconName: "Utensils",
    },
    "Safari Park Tickets": {
      id: "ticket",
      title: "Safari Park Tickets",
      iconName: "Ticket",
    },
    "Activities & Facilities": {
      id: "activities",
      title: "Activities & Facilities",
      iconName: "Palmtree",
    },
    "Child Policy & Extra Guests": {
      id: "kids",
      title: "Child Policy & Extra Guests",
      iconName: "Baby",
    },
    "Policies & Terms": {
      id: "policy",
      title: "Policies & Terms",
      iconName: "ScrollText",
    },
    "Contact & Assistance": {
      id: "contact",
      title: "Contact & Assistance",
      iconName: "Phone",
    },
  };

  return apiData.map((group) => {
    const config = categoryConfig[group.category] || {
      id: group.category.toLowerCase().replace(/\s+/g, "-"),
      title: group.category,
      iconName: "Info",
    };

    return {
      id: config.id,
      title: config.title,
      iconName: config.iconName, // Mengirim string, bukan objek/fungsi
      items: group.items.map((item) => ({
        q: item.question,
        a: item.answer
          .replace(/<[^>]*>/g, "")
          .replace(/&nbsp;/g, " ")
          .trim(),
      })),
    };
  });
};

export const mapGatheringData = (apiData = []) => {
  return apiData.map((item) => {
    return {
      id: item?.id || 'family',
      slug: item?.slug || 'family-reunion',
      name: item?.title || 'Family Reunion Package',
      description: 'Reconnect with loved ones in the heart of nature. Perfect for large families looking for adventure and relaxation.',
      mainImage: item?.images[0] || 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&q=80',
      capacity: 'Minimum 20 Pax',
      pricing: item?.price || 'From IDR 350.000 / person',
      features: ['Private BBQ Dinner', 'Reserved Picnic Area', 'Group Safari Tour', 'Kids Activities Coordinator'],
      amenities: ['Welcome Drink', 'Free Parking', 'Photo Spot Access', 'Souvenir for Kids']
    };
  });
};
