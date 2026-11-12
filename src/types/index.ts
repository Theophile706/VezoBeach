// ============================================================
// Global TypeScript type definitions for Le Vezo Beach Morondava
// ============================================================

export interface GalleryImage {
  id: string
  src: string
  alt: string
  altEn: string
  category: 'hero' | 'rooms' | 'restaurant' | 'pool' | 'spa' | 'events' | 'discover' | 'gallery'
}

export interface MenuItem {
  id: string
  name: string
  nameEn: string
  description: string
  descriptionEn: string
  price: number
  order?: number
}

export interface MenuSection {
  id: string
  title: string
  titleEn: string
  items: MenuItem[]
  order?: number
}


export interface DiscoverItem {
  id: string
  type: 'activity' | 'attraction'
  key?: string | null
  title?: string | null
  titleEn?: string | null
  text?: string | null
  textEn?: string | null
  icon?: string | null
  image?: string | null
  order?: number
}


export interface BookingState {
  checkIn: Date | null
  checkOut: Date | null
  rooms: number
  adults: number
  children: number
}

export interface ContactFormData {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}

export interface EventFormData extends ContactFormData {
  eventDate: string
  guestCount: string
}
