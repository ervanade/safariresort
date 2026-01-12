export const roomsData = [
  {
    id: 'r1',
    name: 'Treehouse With Slide',
    category: 'resort',
    size: '45m²',
    description: 'Add a fun twist to your stay, this treehouse includes a slide, making it an exciting option for families with children. Elevated among the trees, it offers a unique perspective of the surrounding wilderness.',
    image: 'https://horizons-cdn.hostinger.com/b05a0347-ff2a-4d3e-b189-510345403291/6e317251b19d78979aab5f16d2258404.jpg',
    price: 'IDR 2.788.000',
    bestSeller: true, // Added bestSeller property
    originalPrice: 'IDR 3.500.000',
    promoPrice: 'IDR 2.788.000',
    savings: 'IDR 712.000',
    features: ['Cozy bedroom with double bed','Mezzanine bedroom','Private Bathroom','Smart TV','Coffee & tea-making facilities','Mini refrigerator','Complimentary Wi-Fi','Balcony with jungle views','Fun slide for kids'],
    amenities: [
      { name: 'Shower', icon: 'ShowerHead' },
      { name: 'Safe', icon: 'ShieldCheck' },
      { name: 'Mountain view', icon: 'Mountain' },
      { name: 'Concierge', icon: 'ConciergeBell' },
      { name: '24/7 service', icon: 'Clock' },
      { name: 'Towel service', icon: 'Bath' },
      { name: 'Luggage', icon: 'Luggage' },
      { name: 'Sunlight', icon: 'Sun' }
    ],
    bedType: 'Queen size Bed Comfy fit for 2 people able to spread out',
    cancellationRule: 'Free Cancellation until 22 October. After 26 October 23:59 No Refund'
  },
  {
    id: 'h1',
    name: 'Standard Room',
    category: 'hotel',
    size: '32m²',
    description: 'Offers a cozy retreat, our room is perfect for travelers seeking comfort and simplicity. Equipped with modern amenities, guests can enjoy a restful stay amidst nature with easy access to all resort facilities.',
    image: 'https://horizons-cdn.hostinger.com/b05a0347-ff2a-4d3e-b189-510345403291/bf045d7e062fc7bd32841690d4248e9a.jpg',
    price: 'IDR 1.788.000',
    bestSeller: true, // Added bestSeller property
    originalPrice: 'IDR 2.500.000',
    promoPrice: 'IDR 1.788.000',
    savings: 'IDR 712.000',
    features: ['Queen-size or Twin beds', 'Bathroom with water heater', 'Hair Dryer', 'LED TV','Complimentary Wi-Fi','Coffee & tea making facilities','Mini refrigerator'],
    amenities: [
      { name: 'Shower', icon: 'ShowerHead' },
      { name: 'Safe', icon: 'ShieldCheck' },
      { name: 'Garden view', icon: 'Flower2' },
      { name: 'Concierge', icon: 'ConciergeBell' },
      { name: '24/7 service', icon: 'Clock' },
      { name: 'Towel service', icon: 'Bath' },
      { name: 'Luggage', icon: 'Luggage' },
      { name: 'AC', icon: 'Wind' }
    ],
    bedType: 'Queen size or Twin Beds available upon request',
    cancellationRule: 'Free Cancellation until 22 October. After 26 October 23:59 No Refund'
  },
  {
    id: 'r2',
    name: 'Treehouse Non Slide',
    category: 'resort',
    size: '40m²',
    description: 'Imagine yourself in nature with our unique Treehouse accommodation, offering a charming escape among the treetops.',
    image: 'https://d3ehecxdotm942.cloudfront.net/877dd77076bb458a2da853fbf13564a4/2544e5b1e7659a7/49ac916b7222de59fd537165b15b7a4d-w640-scale.jpg',
    price: 'IDR 2.788.000',
    features: ['Cozy bedroom with double bed','Mezzanine bedroom','Private Bathroom','Smart TV','Coffee & tea-making facilities','Mini refrigerator','Complimentary Wi-Fi','Balcony with jungle views']
  },
  {
    id: 'r3',
    name: 'Caravan',
    category: 'resort',
    size: '28m²',
    description: 'Experience a one-of-a-kind stay in our fully equipped Caravan, providing the perfect blend of adventure and comfort.',
    image: 'https://horizons-cdn.hostinger.com/b05a0347-ff2a-4d3e-b189-510345403291/ca48ecbddd2a09957d29c839545a2aee.jpg',
    price: 'IDR 4.388.000',
    features: ['Queen-size bed & Bunk beds','Bathroom','LED TV','Coffee & tea-making facilities','Mini refrigerator','Complimentary Wi-Fi','Terrace area']
  },
  {
    id: 'r4',
    name: 'Caravan Rhino',
    category: 'resort',
    size: '30m²',
    description: 'A unique version of our rhino caravan, is designed for families looking for a comfortable stay with the feeling of staying in a rhinoceros belly.',
    image: 'https://d3ehecxdotm942.cloudfront.net/877dd77076bb458a2da853fbf13564a4/2544e5b1e7659a7/753f3e59d2e34dea39ff0595354baffe-w640-scale.jpg',
    price: 'IDR 3.188.000',
    features: ['Queen-size bed','Bathroom','LED TV','Coffee & tea-making facilities','Mini refrigerator','Complimentary Wi-Fi','Terrace area']
  },
  {
    id: 'r5',
    name: 'Caravan Bus',
    category: 'resort',
    size: '35m²',
    description: 'A more unique and spacious accommodation option housed in a transformed bus, offering an adventurous yet comfortable retreat.',
    image: 'https://d3ehecxdotm942.cloudfront.net/877dd77076bb458a2da853fbf13564a4/2544e5b1e7659a7/c5838ab872503e4ef3260f2a6b2dc7fa-w640-scale.jpg',
    price: 'IDR 3.188.000',
    features: ['Queen-size bed & Bunk beds','Bathroom','LED TV','Coffee & tea-making facilities','Mini refrigerator','Complimentary Wi-Fi','Terrace area']
  },
  {
    id: 'r6',
    name: 'Bungalow Grand 2-Bedroom',
    category: 'resort',
    size: '80m²',
    description: 'Ideal for family, this spacious bungalow provides a home like atmosphere with elegant interiors and modern facilities.',
    image: 'https://d3ehecxdotm942.cloudfront.net/877dd77076bb458a2da853fbf13564a4/2544e5b1e7659a7/7ed63c416c3c00c9eeaf3582affdfc59-w640-scale.jpg',
    price: 'IDR 4.988.000',
    features: ['Two separate bedrooms','Private Bathroom','Living area','Smart TV','Coffee & tea-making facilities','Refrigerator','Complimentary Wi-Fi','Terrace area']
  },
  {
    id: 'r7',
    name: 'Bungalow Grand 3-Bedroom',
    category: 'resort',
    size: '120m²',
    description: 'Ideal for family, this spacious bungalow provides a home-like atmosphere with elegant interiors and modern facilities.',
    image: 'https://d3ehecxdotm942.cloudfront.net/877dd77076bb458a2da853fbf13564a4/2544e5b1e7659a7/b5458517c37723c0b4b7e716bee89afa-w704-scale.jpg',
    price: 'IDR 7.588.000',
    features: ['Three separate bedrooms','Private Bathroom','Living area','Smart TV','Coffee & tea-making facilities','Refrigerator','Complimentary Wi-Fi','Terrace area']
  },
  {
    id: 'r8',
    name: 'Bungalow Suite 3-Bedroom',
    category: 'resort',
    size: '150m²',
    description: 'A luxurious and expansive stay option, our 3-bedroom suite is perfect for larger families or groups seeking privacy and relaxation.',
    image: 'https://d3ehecxdotm942.cloudfront.net/877dd77076bb458a2da853fbf13564a4/2544e5b1e7659a7/8b557809eee5295eb0a77b70a7cbc237-w704-scale.jpg',
    price: 'IDR 7.988.000',
    features: ['Two spacious bedrooms','One mezzanine bedroom','Private Bathroom','Living area & slide','Smart TV','Coffee & tea-making facilities','Refrigerator','Complimentary Wi-Fi','Terrace area']
  },
  {
    id: 'h2',
    name: 'Deluxe Room',
    category: 'hotel',
    size: '36m²',
    bestSeller: true, // Added bestSeller property
    description: 'The comfortable rooms larger than the Standard Room. Equipped with modern amenities, this room offers a simple yet warm atmosphere.',
    image: 'https://horizons-cdn.hostinger.com/b05a0347-ff2a-4d3e-b189-510345403291/b0ce2a2d153633757ae40284db0795a8.jpg',
    price: 'IDR 2.888.000',
    features: ['Queen-size or Twin beds', 'Bathroom', 'Hair Dryer', 'LED TV','Sofa','Private balcony','Complimentary Wi-Fi','Coffee & tea making facilities','Mini refrigerator']
  },
  {
    id: 'h3',
    name: 'Suite Room',
    category: 'hotel',
    size: '50m²',
    description: 'Designed for ultimate relaxation, our Suite Room offers a luxurious space ideal for couples or families seeking extra comfort.',
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427',
    price: 'IDR 5.250.000',
    features: ['King-size bed','Separate living area','Private balcony','Bathroom','Hair Dryer','Smart TV','Complimentary Wi-Fi','Coffee & tea-making facilities','Mini refrigerator']
  }
];