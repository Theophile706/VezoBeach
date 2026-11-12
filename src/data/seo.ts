export interface PageSeo {
  title: string
  description: string
  titleEn: string
  descriptionEn: string
  canonicalPath?: string
}

export const defaultSeo: PageSeo = {
  title: 'Hôtel à Morondava | Le Vezo Beach – Chambres, Restaurant & Piscine',
  description:
    'Le Vezo Beach, hôtel de charme en bord de mer à Morondava, sur la côte ouest de Madagascar : chambres et suites, restaurant, piscine et massages.',
  titleEn: 'Hotel in Morondava | Le Vezo Beach – Rooms, Restaurant & Pool',
  descriptionEn:
    "Le Vezo Beach, a charming beachfront hotel in Morondava on Madagascar's west coast: rooms and suites, restaurant, swimming pool and massages.",
}

const decouvrirMorondava: PageSeo = {
  title: 'Découvrir Morondava & ses baobabs | Hôtel Le Vezo Beach',
  description:
    "Baobabs, littoral et découvertes autour de Morondava : préparez votre séjour depuis l'hôtel Le Vezo Beach.",
  titleEn: 'Discover Morondava & its baobabs | Le Vezo Beach Hotel',
  descriptionEn:
    'Baobabs, coastline and discoveries around Morondava: plan your stay from Le Vezo Beach hotel.',
}

export const seoByPath: Record<string, PageSeo> = {
  '/': defaultSeo,
  '/chambres-suites': {
    title: 'Chambres & Suites à Morondava | Hôtel Le Vezo Beach',
    description:
      "Chambres et suites de l'hôtel Le Vezo Beach à Morondava, Madagascar : un séjour confortable et raffiné sur la côte ouest.",
    titleEn: 'Rooms & Suites in Morondava | Le Vezo Beach Hotel',
    descriptionEn:
      'Rooms and suites at Le Vezo Beach in Morondava, Madagascar: a comfortable stay on the west coast.',
  },
  '/restaurant': {
    title: 'Restaurant à Morondava | Hôtel Le Vezo Beach',
    description:
      "Restaurant de l'hôtel Le Vezo Beach à Morondava : saveurs authentiques malgaches et inspirations internationales.",
    titleEn: 'Restaurant in Morondava | Le Vezo Beach Hotel',
    descriptionEn:
      'Restaurant at Le Vezo Beach in Morondava: authentic Malagasy flavours and international inspirations.',
  },
  '/piscine-bien-etre': {
    title: 'Piscine & Bien-être à Morondava | Hôtel Le Vezo Beach',
    description:
      "Piscine et massages à l'hôtel Le Vezo Beach, à Morondava, sur la côte ouest de Madagascar.",
    titleEn: 'Pool & Wellness in Morondava | Le Vezo Beach Hotel',
    descriptionEn:
      "Swimming pool and massages at Le Vezo Beach in Morondava, on Madagascar's west coast.",
  },
  '/reunions-evenements': {
    title: 'Événements à Morondava | Hôtel Le Vezo Beach',
    description:
      "Séminaires, mariages et réceptions sur mesure, organisés au restaurant de l'hôtel Le Vezo Beach à Morondava.",
    titleEn: 'Events in Morondava | Le Vezo Beach Hotel',
    descriptionEn:
      'Seminars, weddings and receptions tailored to your needs, held at the Le Vezo Beach restaurant in Morondava.',
  },
  '/decouvrir-morondava': decouvrirMorondava,
  '/decouvrir-antsirabe': { ...decouvrirMorondava, canonicalPath: '/decouvrir-morondava' },
  '/contact': {
    title: 'Contact & Réservation | Hôtel Le Vezo Beach Morondava',
    description:
      "Contactez l'hôtel Le Vezo Beach à Morondava pour planifier votre séjour et réserver votre chambre.",
    titleEn: 'Contact & Booking | Le Vezo Beach Hotel Morondava',
    descriptionEn:
      'Contact Le Vezo Beach in Morondava to plan your stay and send your booking request.',
  },
}
