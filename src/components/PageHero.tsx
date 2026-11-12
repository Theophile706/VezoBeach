import { useLayoutEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

interface PageHeroProps {
  image: string
  title: string
  subtitle?: string
  preserveAspectRatio?: boolean
  expanded?: boolean
  loupe?: boolean
  slideTitle?: 'uppercase' | 'serif'
}

/**
 * PageHero
 * --------
 * Smaller banner hero used on secondary pages (Rooms, Restaurant, Spa...).
 * Keeps the same elegant gold/white aesthetic as the homepage hero.
 */
export default function PageHero({
  image,
  title,
  subtitle,
  preserveAspectRatio = false,
  expanded = false,
  loupe = false,
  slideTitle,
}: PageHeroProps) {
  const reduceMotion = useReducedMotion()
  const slide = Boolean(slideTitle) && !reduceMotion
  const slideRef = useRef<HTMLHeadingElement>(null)
  const [shift, setShift] = useState(0)

  useLayoutEffect(() => {
    const el = slideRef.current
    if (!el || !el.parentElement) return
    const container = el.parentElement
    const measure = () => {
      const free = (container.clientWidth - el.offsetWidth) / 2 - 24
      setShift(Math.max(0, Math.min(free, window.innerWidth * 0.28)))
    }
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(container)
    observer.observe(el)
    return () => observer.disconnect()
  }, [slide, title, slideTitle])

  return (
    <section className={`relative w-full overflow-hidden mt-0 ${expanded ? 'aspect-video' : 'h-[55vh] min-h-[380px]'} ${preserveAspectRatio ? 'bg-black' : ''}`}>
      <motion.img
        src={image}
        alt={title}
        data-loupe={loupe || undefined}
        className={`absolute inset-0 w-full h-full ${preserveAspectRatio ? 'object-contain' : 'object-cover'}`}
        initial={reduceMotion ? false : { opacity: 0, scale: 1.08 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={
          reduceMotion
            ? { duration: 0 }
            : {
                opacity: { duration: 2.4, ease: [0.22, 1, 0.36, 1] },
                scale: { duration: 12, ease: [0.25, 0.1, 0.25, 1] },
              }
        }
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/50" />
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        {slide ? (
          <motion.h1
            ref={slideRef}
            className={
              slideTitle === 'serif'
                ? 'max-w-full font-serif text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-wide'
                : 'max-w-full font-sans font-bold uppercase text-white text-4xl sm:text-5xl md:text-6xl tracking-wider'
            }
            initial={{ x: 0 }}
            animate={{ x: shift }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {title}
          </motion.h1>
        ) : (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="font-serif text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-wide">{title}</h1>
            <div className="flex items-center justify-center gap-4 mt-3">
              <span className="h-px w-10 bg-gold-500" />
              <span className="h-1.5 w-1.5 rounded-full bg-gold-500" />
              <span className="h-px w-10 bg-gold-500" />
            </div>
            {subtitle && (
              <p className="mt-6 max-w-2xl mx-auto text-white/85 font-serif italic text-base md:text-lg tracking-wide">{subtitle}</p>
            )}
          </motion.div>
        )}
      </div>
    </section>
  )
}
