export interface Room {
  id: string
  title: string
  client: string
  img: string
  tagline: string
  description: string[]
  features: string[]
  price: string
  priceNote: string
  sqm: string
  occupancy: string
  bed: string
  acType: 'ac' | 'non-ac' | 'both'
  maxChildren: number
}

export const rooms: Room[] = [
  {
    id: '01',
    title: 'Deluxe Suite',
    client: 'Royal Wing',
    img: '/images/room-deluxe-suite.jpg',
    tagline: 'A refined sanctuary where traditional Nepalese elegance meets modern comfort.',
    description: [
      'Located in our prestigious Royal Wing, the Deluxe Suite offers a generous living space adorned with hand-carved wooden furnishings and premium fabrics in warm gold and burgundy tones. The centerpiece is a magnificent king bed with a traditional carved headboard.',
      'The en-suite bathroom features imported marble, a deep soaking tub, and rainfall shower. Floor-to-ceiling windows offer panoramic views of Nepalgunj city, while the crystal chandelier bathes the room in warm, ambient light.',
    ],
    features: [
      'Premium air conditioning with climate control',
      'King bed with hand-carved wooden headboard',
      'Marble bathroom with deep soaking tub',
      'Crystal chandelier and ambient lighting',
      'Panoramic city views',
      'Daily housekeeping & evening turndown',
      'Complimentary Wi-Fi & room service',
      'Mini bar with premium beverages',
    ],
    price: 'Rs. 8,500',
    priceNote: 'per night, breakfast included',
    sqm: '55m²',
    occupancy: '2 guests',
    bed: 'King bed',
    acType: 'ac',
    maxChildren: 1,
  },
  {
    id: '02',
    title: 'Presidential Suite',
    client: 'Platinum Wing',
    img: '/images/room-presidential.jpg',
    tagline: 'The pinnacle of luxury living with a private living room and garden views.',
    description: [
      'Our Presidential Suite occupies the most prestigious corner of the Platinum Wing, featuring a separate living area and bedroom. The expansive space opens to floor-to-ceiling windows framing our lush tropical gardens.',
      'A dedicated butler is available throughout your stay. The suite includes a private dining area, fully stocked minibar, and a luxurious bathroom with both a soaking tub and walk-in rain shower. Perfect for distinguished guests seeking the finest experience in Nepalgunj.',
    ],
    features: [
      'Separate living room with garden views',
      'Dedicated butler service (6am – 11pm)',
      'Premium AC with individual zone control',
      'King bed with Egyptian cotton linens',
      'Private dining area for 6 guests',
      'Walk-in rain shower & Jacuzzi tub',
      'Airport pickup & drop included',
      'VIP lounge access',
    ],
    price: 'Rs. 15,000',
    priceNote: 'per night, all meals included',
    sqm: '95m²',
    occupancy: '2 guests',
    bed: 'King bed',
    acType: 'ac',
    maxChildren: 2,
  },
  {
    id: '03',
    title: 'Honeymoon Suite',
    client: 'Garden Wing',
    img: '/images/room-honeymoon.jpg',
    tagline: 'A romantic retreat designed for couples beginning their journey together.',
    description: [
      'Our Honeymoon Suite is thoughtfully designed to create unforgettable memories. The four-poster canopy bed draped in sheer white fabric sets a dreamy atmosphere, while rose petals and candles welcome you upon arrival.',
      'The suite features a private balcony overlooking our serene garden, a heart-shaped Jacuzzi tub, and premium amenities including champagne service and couples spa treatments. Every detail is curated for romance and intimacy.',
    ],
    features: [
      'Romantic four-poster canopy bed',
      'Heart-shaped Jacuzzi tub for two',
      'Private garden-view balcony',
      'Champagne & fruit basket on arrival',
      'Couples spa treatment included',
      'Rose petal turndown service',
      'Full air conditioning',
      'Late checkout available',
    ],
    price: 'Rs. 12,000',
    priceNote: 'per night, couples package',
    sqm: '60m²',
    occupancy: '2 guests',
    bed: 'King bed',
    acType: 'ac',
    maxChildren: 0,
  },
  {
    id: '04',
    title: 'Twin Deluxe Room',
    client: 'City View Wing',
    img: '/images/room-twin-deluxe.jpg',
    tagline: 'Modern comfort with twin beds, ideal for friends or colleagues.',
    description: [
      'The Twin Deluxe Room offers a contemporary retreat with two premium single beds featuring high-quality linens. The geometric wooden accent wall adds warmth and character to the minimalist design.',
      'A dedicated work desk, high-speed Wi-Fi, and ample natural light make this room perfect for business travelers. The large windows frame views of Nepalgunj and the surrounding Terai landscape.',
    ],
    features: [
      'Two premium single beds with quality linens',
      'Work desk with ergonomic chair',
      'Split air conditioning unit',
      'Large window with city views',
      'Smart TV with international channels',
      'Modern bathroom with rain shower',
      'Complimentary breakfast',
      'Laundry service available',
    ],
    price: 'Rs. 5,500',
    priceNote: 'per night, breakfast included',
    sqm: '38m²',
    occupancy: '2 guests',
    bed: '2 single beds',
    acType: 'ac',
    maxChildren: 0,
  },
  {
    id: '05',
    title: 'Family Suite',
    client: 'Garden Wing',
    img: '/images/room-family.jpg',
    tagline: 'Spacious accommodation designed for families with children.',
    description: [
      'Our Family Suite is thoughtfully designed to accommodate families comfortably. The spacious room features a king bed for parents and two single beds for children, all adorned with colorful, elegant decor.',
      'The suite includes a cozy sitting area with a sofa, perfect for family time. Large windows overlook our tropical gardens, and the room is equipped with child-friendly amenities upon request.',
    ],
    features: [
      'King bed + 2 single beds for children',
      'Family sitting area with sofa',
      'Powerful air conditioning',
      'Garden views from large windows',
      'Child-friendly amenities available',
      'Connecting room option',
      'Kids meals available at restaurant',
      'Baby cot available on request',
    ],
    price: 'Rs. 10,000',
    priceNote: 'per night, family breakfast included',
    sqm: '72m²',
    occupancy: '4 guests (2 adults + 2 children)',
    bed: '1 King + 2 Single beds',
    acType: 'ac',
    maxChildren: 2,
  },
  {
    id: '06',
    title: 'Standard Room',
    client: 'Value Wing',
    img: '/images/room-standard.jpg',
    tagline: 'Comfortable and affordable luxury for the discerning traveler.',
    description: [
      'Our Standard Room offers exceptional value without compromising on quality. The clean, modern design features a comfortable queen bed, a functional work area, and all essential amenities for a pleasant stay.',
      'The room includes a view of Nepalgunj city, a well-appointed bathroom, and access to all hotel facilities including the swimming pool, restaurant, and fitness center. Perfect for budget-conscious travelers seeking quality accommodation.',
    ],
    features: [
      'Comfortable queen bed with quality linens',
      'Wall-mounted air conditioning',
      'Work desk and chair',
      'City views',
      'En-suite bathroom with modern fixtures',
      'Flat-screen TV with cable channels',
      'Access to pool & gym facilities',
      'Economy breakfast option available',
    ],
    price: 'Rs. 3,500',
    priceNote: 'per night, budget friendly',
    sqm: '28m²',
    occupancy: '2 guests',
    bed: 'Queen bed',
    acType: 'both',
    maxChildren: 1,
  },
]
