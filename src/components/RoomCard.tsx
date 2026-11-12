import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { useTranslation } from 'react-i18next'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, ImagePlus, X } from 'lucide-react'
import type { RoomCategory } from '@/data/roomCategories'

interface RoomCardProps {
  category: RoomCategory
}

export default function RoomCard({ category }: RoomCardProps) {
  const { t, i18n } = useTranslation()
  const [isEnlarged, setIsEnlarged] = useState(false)
  const name = t(`rooms.categories.${category.id}.name`)
  const description = t(`rooms.categories.${category.id}.description`)
  const equipments = t('rooms.equipments', { returnObjects: true }) as string[]

  useEffect(() => {
    if (!isEnlarged) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsEnlarged(false)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [isEnlarged])

  return (
    <article className="group bg-white shadow-card rounded-md overflow-hidden flex flex-col h-full transition-transform duration-500 hover:-translate-y-1">
      <div className="relative aspect-[16/10] sm:aspect-[4/3] overflow-hidden bg-cream">
        {category.image ? (
          <button
            type="button"
            onClick={() => setIsEnlarged(true)}
            aria-label={name}
            className="w-full h-full cursor-zoom-in"
          >
            <img
              src={category.image}
              alt={name}
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </button>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-cream text-gray-400">
            <ImagePlus size={24} />
            <span className="text-[10px] uppercase tracking-widest2">{t('rooms.photoSoon')}</span>
          </div>
        )}
      </div>

      <div className="p-5 sm:p-6 flex flex-col flex-1 min-w-0">
        <h3 className="font-serif text-xl text-charcoal mb-2 break-words">{name}</h3>
        <p className="text-sm text-gray-600 leading-relaxed mb-5 break-words">{description}</p>

        <p className="font-serif text-2xl text-charcoal tabular-nums">
          {category.price.toLocaleString(i18n.language)} Ar
        </p>
        <p className="text-xs text-gray-500 mb-6">{t('rooms.perRoomNight')}</p>

        <ul className="mt-auto flex flex-wrap gap-x-4 gap-y-2 text-xs text-gray-500 border-t border-gray-100 pt-4">
          {equipments.map((item) => (
            <li key={item} className="flex items-center gap-1.5">
              <Check size={12} className="text-brand-gold shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      {createPortal(
        <AnimatePresence>
          {isEnlarged && category.image && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
              onClick={() => setIsEnlarged(false)}
              role="dialog"
              aria-modal="true"
              aria-label={name}
            >
              <button
                type="button"
                onClick={() => setIsEnlarged(false)}
                className="absolute top-6 right-6 text-white/80 hover:text-white"
                aria-label="Close"
              >
                <X size={28} />
              </button>
              <motion.img
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                src={category.image}
                alt={name}
                className="max-h-[90vh] max-w-[95vw] object-contain rounded shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              />
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </article>
  )
}
