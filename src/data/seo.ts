export interface PageSeo {
  title: string
  description: string
}

export const defaultSeo: PageSeo = {
  title: 'Hôtel à Morondava | Le Vezo Beach – Chambres, Restaurant & Spa',
  description:
    'Le Vezo Beach, hôtel de charme à Morondava sur la côte ouest de Madagascar : chambres et suites, restaurant, piscine, spa et salles de réunion.',
}

export const seoByPath: Record<string, PageSeo> = {
  '/': defaultSeo,
  '/chambres-suites': {
    title: 'Chambres & Suites à Morondava | Hôtel Le Vezo Beach',
    description:
      "Chambres et suites de l'hôtel Le Vezo Beach à Morondava, Madagascar : un séjour confortable et raffiné sur la côte ouest.",
  },
  '/restaurant': {
    title: 'Restaurant à Morondava | Hôtel Le Vezo Beach',
    description:
      "Restaurant de l'hôtel Le Vezo Beach à Morondava : saveurs authentiques malgaches et inspirations internationales.",
  },
  '/piscine-bien-etre': {
    title: 'Piscine & Spa à Morondava | Hôtel Le Vezo Beach',
    description:
      "Piscine, jardin luxuriant et soins spa à l'hôtel Le Vezo Beach, à Morondava, sur la côte ouest de Madagascar.",
  },
  '/reunions-evenements': {
    title: 'Séminaires & Mariages à Morondava | Hôtel Le Vezo Beach',
    description:
      "Espaces élégants pour séminaires, mariages et réceptions à l'hôtel Le Vezo Beach, à Morondava.",
  },
  '/decouvrir-morondava': {
    title: 'Découvrir Morondava & ses baobabs | Hôtel Le Vezo Beach',
    description:
      "Baobabs, littoral et découvertes autour de Morondava : préparez votre séjour depuis l'hôtel Le Vezo Beach.",
  },
  '/contact': {
    title: 'Contact & Réservation | Hôtel Le Vezo Beach Morondava',
    description:
      "Contactez l'hôtel Le Vezo Beach à Morondava pour planifier votre séjour et réserver votre chambre.",
  },
}
