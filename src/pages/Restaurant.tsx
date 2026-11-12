import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Clock, ChefHat } from 'lucide-react'
import PageHero from '@/components/PageHero'
import AnimatedSection from '@/components/AnimatedSection'
import SectionHeading from '@/components/SectionHeading'
import ImageGallery from '@/components/ImageGallery'
import { useGalleryImages } from '@/hooks/useGallery'

const FORMULA_ROTATION_MS = 2500

export default function Restaurant() {
  const { t } = useTranslation()
  const restaurantImages = useGalleryImages('restaurant')
  const formulas = t('restaurant.formulas', { returnObjects: true }) as { title: string; items: string[] }[]
  const [activeFormula, setActiveFormula] = useState(0)

  useEffect(() => {
    const id = window.setInterval(
      () => setActiveFormula((i) => (i + 1) % formulas.length),
      FORMULA_ROTATION_MS,
    )
    return () => window.clearInterval(id)
  }, [formulas.length])

  const specialties = ['specialty1', 'specialty2', 'specialty3', 'specialty4']

  return (
    <>
      <PageHero image="/images/Photo-Bar-et-Restaurants-1200.jpg" title={t('restaurant.heroTitle')} slideTitle="serif" loupe />

      {/* Section intro */}
      <AnimatedSection className="container-luxe py-20 md:py-24">
        <SectionHeading
          eyebrow={t('restaurant.sectionEyebrow')}
          title={t('restaurant.sectionTitle')}
          text={t('restaurant.sectionText')}
        />
      </AnimatedSection>

      {/* Nos menus et offres spéciales (section temporairement masquée)
      <section className="bg-cream py-20 md:py-24">
        <div className="container-luxe">
          <SectionHeading title={t('restaurant.specialMenusTitle')} />
          <div className="mt-14 grid grid-cols-1 items-start gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              { titleKey: 'pizzaMenu', img: '/images/restaurant/pizza.jpg' },
              { titleKey: 'easterMenu', img: '/images/restaurant/Paque.jpg' },
              { titleKey: 'christmasMenu', img: '/images/restaurant/noel.jpg' },
              { titleKey: 'mothersDayMenu', img: '/images/restaurant/mere.jpg' },
              { titleKey: 'pentecostMenu', img: '/images/restaurant/Pentecote.jpg' },
              { titleKey: 'specialMenu', img: '/images/restaurant/special.jpg' },
            ].map((item, idx) => (
              <AnimatedSection key={item.titleKey} delay={idx * 0.05} className="overflow-hidden rounded-md bg-white shadow-card">
                <img
                  src={item.img}
                  alt={t(`restaurant.${item.titleKey}`)}
                  className="block h-auto w-full object-contain"
                  loading="lazy"
                  decoding="async"
                />
                <h3 className="px-5 py-4 text-center font-serif text-lg text-charcoal">
                  {t(`restaurant.${item.titleKey}`)}
                </h3>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
      */}

      {/* Hours + Specialties */}
      <AnimatedSection className="container-luxe py-20 md:py-24 grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <h3 className="font-serif text-2xl mb-6 flex items-center gap-3">
            <Clock className="text-brand-gold" size={24} /> {t('restaurant.hoursTitle')}
          </h3>
          <div className="space-y-4">
            {[
              ['breakfast', 'breakfastHours'],
              ['lunch', 'lunchHours'],
              ['dinner', 'dinnerHours'],
              ['snack', 'snackHours'],
            ].map(([label, hours]) => (
              <div key={label} className="flex justify-between border-b border-gray-100 pb-3">
                <span className="font-medium text-charcoal">{t(`restaurant.${label}`)}</span>
                <span className="text-gray-600">{t(`restaurant.${hours}`)}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-serif text-2xl mb-6 flex items-center gap-3">
            <ChefHat className="text-brand-gold" size={24} /> {t('restaurant.specialtiesTitle')}
          </h3>
          <ul className="space-y-3">
            {specialties.map((key) => (
              <li key={key} className="flex items-center gap-3 text-gray-700">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-500 shrink-0" />
                {t(`restaurant.${key}`)}
              </li>
            ))}
          </ul>
        </div>
      </AnimatedSection>

      <AnimatedSection className="container-luxe pb-20 md:pb-24">
        <h4 className="font-serif text-2xl mb-1">{t('restaurant.formulasTitle')}</h4>
        <p className="text-xs text-gray-500 mb-8">{t('restaurant.formulasNote')}</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12">
          {formulas.map((formula, idx) => (
            <motion.div
              key={formula.title}
              animate={{ scale: activeFormula === idx ? 1.08 : 1 }}
              transition={{ duration: 1.2, ease: [0.45, 0, 0.55, 1] }}
              className={`rounded-md p-6 transition-shadow duration-1000 ${
                activeFormula === idx ? 'bg-white shadow-soft-lg ring-1 ring-gold-500/40' : 'bg-cream'
              }`}
            >
              <div className="font-medium text-charcoal mb-3">{formula.title}</div>
              <ul className="space-y-1.5 text-sm text-gray-600">
                {formula.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </AnimatedSection>

      {/*
      <section className="bg-cream py-20 md:py-24">
        <div className="container-luxe">
          <SectionHeading title={t('restaurant.menuTitle')} text={t('restaurant.menuText')} />
          <div className="mt-14 max-w-5xl mx-auto overflow-hidden rounded-md shadow-card bg-white">
            <img
              src="/images/restaurant/menu-snack-hd.png"
              alt={t('restaurant.menuTitle')}
              className="w-full h-auto"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </section>
      */}

      {/* Gallery + CTA */}
      <AnimatedSection className="container-luxe py-20 md:py-24">
        <SectionHeading title={t('restaurant.ctaTitle')} />
        <div className="mt-14">
          <ImageGallery images={restaurantImages.slice(0, 4)} columns={4} fit="cover" entrance />
        </div>
      </AnimatedSection>
    </>
  )
}
