import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const mapAccommodationsToRooms = (apiData = []) => {
  return apiData.map(item => {
    const price = Number(item.price);
    const promo = Number(item.promoPrice);

    return {
      id: item.id,
      slug: item.slug,
      name: item.name,
      category: item.category?.toLowerCase() === 'resort'
        ? 'resort'
        : 'hotel',

      size: item.size || '-',
      description:
        item.excerpt ||
        'Enjoy a comfortable stay surrounded by nature and wildlife at Safari Resort.',

      // UI pakai image + images
      image: item.images?.[0] || '',
      images: item.images || [],

      // format harga string (samain dummy)
      price: `IDR ${price.toLocaleString('id-ID')}`,
      promoPrice: promo < price
        ? `IDR ${promo.toLocaleString('id-ID')}`
        : null,

      originalPrice: promo < price
        ? `IDR ${price.toLocaleString('id-ID')}`
        : null,

      savings: promo < price
        ? `IDR ${(price - promo).toLocaleString('id-ID')}`
        : null,

      bestSeller: promo < price, // heuristik sederhana

      // OPTIONAL (biar RoomCard aman)
      features: [],
      amenities: [],
    };
  });
};


export const mapActivitiesToExperiences = (apiActivities = []) => {
  return apiActivities.map(item => {
    const price = Number(item.price);

    return {
      id: item.id,
      slug: item.slug,

      // UI pakai name
      name: item.title,

      // UI pakai description
      description:
        item.excerpt ||
        'Enjoy a unique and unforgettable experience at Safari Resort.',

      // fallback image WAJIB (ExperienceCard almost always pakai image)
      image:
        item.images?.[0] ||
        '/assets/experiences/default-experience.jpg',

      // OPTIONAL – belum ada di API, kasih default aman
      duration: '—',
      groupSize: '—',

      // OPTIONAL – behavior
      bookingUrl: 'https://tamansafari.com/',

      whatsappMessage: `Halo saya ingin mengetahui lebih lanjut tentang ${item.title}`,

      // OPTIONAL kalau mau dipakai nanti
      price: price
        ? `IDR ${price.toLocaleString('id-ID')}`
        : null,
    };
  });
};


