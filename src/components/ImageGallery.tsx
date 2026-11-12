import { useState, useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { AnimatePresence, motion } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { resolveImageUrl } from '@/utils/api'
import type { GalleryImage } from '@/types'
import { isMobileViewport } from '@/utils/isMobileViewport'

interface ImageGalleryProps {
  images: GalleryImage[]
  columns?: 2 | 3 | 4
  fit?: 'contain' | 'cover'
  entrance?: boolean
  drop?: boolean
}

const ENTRANCE_OFFSETS = [
  { x: -120, y: 30, delay: 0 },
  { x: 140, y: -20, delay: 0.12 },
  { x: -90, y: -40, delay: 0.2 },
  { x: 110, y: 50, delay: 0.06 },
]

/**
 * ImageGallery
 * ------------
 * Responsive image grid with a fullscreen lightbox (prev/next/close,
 * keyboard navigation). Lazy-loads images via native `loading="lazy"`.
 */
export default function ImageGallery({
  images,
  columns = 3,
  fit = 'contain',
  entrance = false,
  drop = false,
}: ImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const { i18n } = useTranslation()
  const english = i18n.resolvedLanguage?.startsWith('en')
  const altOf = (img: GalleryImage) => (english ? img.altEn || img.alt : img.alt)

  const isMobile = isMobileViewport()
  const close = useCallback(() => setActiveIndex(null), [])
  const next = useCallback(() => setActiveIndex((i) => (i === null ? null : (i + 1) % images.length)), [images.length])
  const prev = useCallback(
    () => setActiveIndex((i) => (i === null ? null : (i - 1 + images.length) % images.length)),
    [images.length]
  )

  useEffect(() => {
    if (activeIndex === null) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [activeIndex, close, next, prev])

  const gridCols =
    columns === 2 ? 'grid-cols-2' : columns === 4 ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4' : 'grid-cols-2 sm:grid-cols-3'

  return (
    <>
      <div className={`grid ${gridCols} gap-3 md:gap-4`}>
        {images.map((img, idx) => {
          const offset = ENTRANCE_OFFSETS[idx % ENTRANCE_OFFSETS.length]
          const entranceProps = isMobile
            ? {}
            : entrance
            ? {
                initial: { opacity: 0, x: offset.x, y: offset.y },
                whileInView: { opacity: 1, x: 0, y: 0 },
                viewport: { once: false, amount: 0.2 },
                transition: { duration: 1.4, delay: offset.delay, ease: [0.22, 1, 0.36, 1] as const },
              }
            : drop
              ? {
                  initial: { opacity: 0, y: -360 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: false, amount: 0.2 },
                  transition: { duration: 1.4, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] as const },
                }
              : {}
          return (
            <motion.button
              key={img.id}
              type="button"
              onClick={() => setActiveIndex(idx)}
              className="group relative aspect-[4/3] overflow-hidden rounded-md bg-gray-100"
              {...entranceProps}
            >
              <img
                src={resolveImageUrl(img.src)}
                alt={altOf(img)}
                loading="lazy"
                className={`w-full h-full ${fit === 'cover' ? 'object-cover' : 'object-contain'}`}
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
            </motion.button>
          )
        })}
      </div>

      <AnimatePresence>
        {activeIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            data-no-loupe
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center px-4"
            onClick={close}
          >
            <button
              type="button"
              onClick={close}
              className="absolute top-6 right-6 text-white/80 hover:text-white"
              aria-label="Close"
            >
              <X size={28} />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                prev()
              }}
              className="absolute left-4 md:left-8 text-white/70 hover:text-white p-2"
              aria-label="Previous"
            >
              <ChevronLeft size={32} />
            </button>
            <motion.img
              key={images[activeIndex].id}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              src={resolveImageUrl(images[activeIndex].src)}
              alt={altOf(images[activeIndex])}
              className="max-h-[85vh] max-w-[90vw] object-contain rounded shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                next()
              }}
              className="absolute right-4 md:right-8 text-white/70 hover:text-white p-2"
              aria-label="Next"
            >
              <ChevronRight size={32} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
