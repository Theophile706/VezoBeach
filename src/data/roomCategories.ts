export interface RoomCategory {
  id: string
  /** Tarif public non-résident, en Ariary (haute saison 2026). */
  price: number
  /** Photo réelle de la catégorie ; sans valeur, la carte affiche un emplacement à compléter. */
  image?: string
}

export const roomCategories: RoomCategory[] = [
  { id: 'standardGroundFloor', price: 273000, image: '/images/Photo-chambre.jpg' },
  { id: 'standardSimple', price: 288750, image: '/images/chmabres%20standars%20simple.jpg' },
  { id: 'standardPanoramic', price: 328650 },
  { id: 'suite', price: 404250 },
  { id: 'juniorApartment', price: 498750 },
  { id: 'seniorApartment120', price: 603750 },
  { id: 'seniorApartment150', price: 682500 },
  { id: 'villa02', price: 262500 },
  { id: 'villa01', price: 315000 },
]
