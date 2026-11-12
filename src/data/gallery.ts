import type { GalleryImage } from '@/types'

/**
 * GALLERY IMAGES
 * --------------
 * Central registry of all photos used across the site.
 * EASY TO REPLACE: simply swap the file under /public/images/<category>/
 * keeping the same filename, or update the `src` path here.
 * Recommended format: JPG, landscape 3:2, min. 1600px wide.
 * `alt` (FR) and `altEn` (EN) describe what the photo really shows.
 */
export const galleryImages: GalleryImage[] = [
  { id: 'hero-1', src: '/images/Photo-Gallerie-1-1200.jpg', alt: 'Façade du Vezo Beach', altEn: 'Facade of Le Vezo Beach', category: 'hero' },

  { id: 'room-1', src: '/images/Photo-chambre.jpg', alt: 'Chambre avec grand lit et canapé jaune', altEn: 'Room with double bed and yellow sofa', category: 'rooms' },
  { id: 'room-3', src: '/images/Image-GYX72HV.jpg', alt: 'Chambre avec plafond en bois et grand lit', altEn: 'Room with wooden ceiling and double bed', category: 'rooms' },
  { id: 'room-4', src: '/images/Photo-Gallerie-5-1200.jpg', alt: 'Chambre avec grand lit et grande fenêtre', altEn: 'Room with double bed and large window', category: 'rooms' },

  { id: 'restaurant-1', src: '/images/restaurant/terrace-real.jpg', alt: 'Terrasse du restaurant Le Vezo Beach', altEn: 'Restaurant terrace at Le Vezo Beach', category: 'restaurant' },
  { id: 'restaurant-2', src: '/images/restaurant/dish-real.jpg', alt: 'Plat du restaurant Le Vezo Beach', altEn: 'Dish from the Le Vezo Beach restaurant', category: 'restaurant' },
  { id: 'restaurant-3', src: '/images/restaurant/cocktails-real.jpg', alt: 'Cocktails et boissons fraîches', altEn: 'Cocktails and fresh drinks', category: 'restaurant' },
  { id: 'restaurant-4', src: '/images/Photo-nourriture-1.jpg', alt: 'Plat du restaurant', altEn: 'Restaurant dish', category: 'restaurant' },
  { id: 'restaurant-5', src: '/images/Photo-restaurant-1.jpg', alt: 'Ambiance du restaurant Le Vezo Beach', altEn: 'Atmosphere at the Le Vezo Beach restaurant', category: 'restaurant' },

  { id: 'spa-1', src: '/images/Photo-Gallerie-3-1200.jpg', alt: 'Salle de massage', altEn: 'Massage room', category: 'spa' },
  { id: 'spa-2', src: '/images/spa/spa-2.jpg', alt: 'Ambiance de détente', altEn: 'Relaxing atmosphere', category: 'spa' },
  { id: 'spa-3', src: '/images/spa/spa-3.jpg', alt: 'Salle de massage apaisante', altEn: 'Calm massage room', category: 'spa' },

  { id: 'events-1', src: '/images/Photo-Evenements-1200.jpg', alt: 'Événement au Vezo Beach', altEn: 'Event at Le Vezo Beach', category: 'events' },
  { id: 'events-2', src: '/images/Photo-Gallerie-1-1200.jpg', alt: 'Événement au Vezo Beach', altEn: 'Event at Le Vezo Beach', category: 'events' },
  { id: 'events-3', src: '/images/Photo-Gallerie-2-1200.jpg', alt: 'Réception au Vezo Beach', altEn: 'Reception at Le Vezo Beach', category: 'events' },

  { id: 'discover-1', src: '/images/discover/antsirabe-1.jpg', alt: 'Architecture de Madagascar', altEn: 'Architecture in Madagascar', category: 'discover' },
  { id: 'discover-2', src: '/images/discover/antsirabe-2.jpg', alt: 'Paysage des hauts-plateaux malgaches', altEn: 'Highland landscape of Madagascar', category: 'discover' },
  { id: 'discover-3', src: '/images/discover/antsirabe-3.jpg', alt: 'Paysage de Madagascar', altEn: 'Landscape of Madagascar', category: 'discover' },
  { id: 'discover-4', src: '/images/discover/garden-1.jpg', alt: 'Végétation tropicale', altEn: 'Tropical vegetation', category: 'discover' },

  { id: 'gallery-1', src: '/images/gallery/lobby-1.jpg', alt: "Hall d'accueil du Vezo Beach", altEn: 'Reception hall at Le Vezo Beach', category: 'gallery' },
]

export const getImagesByCategory = (category: GalleryImage['category']) =>
  galleryImages.filter((img) => img.category === category)

export default galleryImages
