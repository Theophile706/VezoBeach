import { useTranslation } from 'react-i18next'
import { Check, ImagePlus } from 'lucide-react'
import type { RoomCategory } from '@/data/roomCategories'

interface RoomCardProps {
  category: RoomCategory
}

export default function RoomCard({ category }: RoomCardProps) {
  const { t, i18n } = useTranslation()
  const name = t(`rooms.categories.${category.id}.name`)
  const description = t(`rooms.categories.${category.id}.description`)
  const equipments = t('rooms.equipments', { returnObjects: true }) as string[]

  return (
    <article className="group bg-white shadow-card rounded-md overflow-hidden flex flex-col h-full transition-transform duration-500 hover:-translate-y-1">
      <div className="relative aspect-[4/3] overflow-hidden bg-cream">
        {category.image ? (
          <img
            src={category.image}
            alt={name}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-2 border border-dashed border-gray-300 text-gray-400">
            <ImagePlus size={28} />
            <span className="text-[10px] uppercase tracking-widest2">{t('rooms.photoSoon')}</span>
          </div>
        )}
      </div>

      <div className="p-6 flex flex-col flex-1">
        <h3 className="font-serif text-xl text-charcoal mb-2">{name}</h3>
        <p className="text-sm text-gray-600 leading-relaxed mb-5">{description}</p>

        <p className="font-serif text-2xl text-charcoal mb-6">
          {category.price.toLocaleString(i18n.language)} Ar
        </p>

        <ul className="mt-auto flex flex-wrap gap-x-4 gap-y-2 text-xs text-gray-500 border-t border-gray-100 pt-4">
          {equipments.map((item) => (
            <li key={item} className="flex items-center gap-1.5">
              <Check size={12} className="text-brand-gold shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </article>
  )
}
