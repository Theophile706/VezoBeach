import { motion, useReducedMotion } from 'framer-motion'

interface PageHeroProps {
  image: string
  title: string
  subtitle?: string
  preserveAspectRatio?: boolean
  expanded?: boolean
}

/**
 * PageHero
 * --------
 * Smaller banner hero used on secondary pages (Rooms, Restaurant, Spa...).
 * Keeps the same elegant gold/white aesthetic as the homepage hero.
 */
export default function PageHero({ image, title, subtitle, preserveAspectRatio = false, expanded = false }: PageHeroProps) {
  const reduceMotion = useReducedMotion()

  return (
    <section className={`relative w-full overflow-hidden mt-0 ${expanded ? 'aspect-video' : 'h-[55vh] min-h-[380px]'} ${preserveAspectRatio ? 'bg-black' : ''}`}>
      <motion.img
        src={image}
        alt={title}
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
      <div className="absolute inset-0 bg-black/45" />
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <h1 className="font-serif text-white text-4xl md:text-6xl tracking-wide">{title}</h1>
          {subtitle && (
            <p className="mt-4 text-white/85 font-serif italic text-base md:text-lg max-w-2xl mx-auto">{subtitle}</p>
          )}
          <div className="flex items-center justify-center gap-4 mt-5">
            <span className="h-px w-10 bg-gold-500" />
            <span className="h-1.5 w-1.5 rounded-full bg-gold-500" />
            <span className="h-px w-10 bg-gold-500" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
