import { useTranslation } from 'react-i18next'
import { Clock, ChefHat } from 'lucide-react'
import PageHero from '@/components/PageHero'
import AnimatedSection from '@/components/AnimatedSection'
import SectionHeading from '@/components/SectionHeading'
import ImageGallery from '@/components/ImageGallery'
import { useGalleryImages } from '@/hooks/useGallery'

export default function Restaurant() {
  const { t } = useTranslation()
  const restaurantImages = useGalleryImages('restaurant')

  const specialties = ['specialty1', 'specialty2', 'specialty3', 'specialty4']

  return (
    <>
      <PageHero image="/images/Photo-Bar-et-Restaurants-1200.jpg" title={t('restaurant.heroTitle')} subtitle={t('restaurant.heroSubtitle')} />

      {/* Section intro */}
      <AnimatedSection className="container-luxe py-20 md:py-24">
        <SectionHeading
          eyebrow={t('restaurant.sectionEyebrow')}
          title={t('restaurant.sectionTitle')}
          text={t('restaurant.sectionText')}
        />
      </AnimatedSection>

      {/* Restaurant menus */}
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
          <ImageGallery images={restaurantImages.slice(0, 4)} columns={4} />
        </div>
      </AnimatedSection>
    </>
  )
}
