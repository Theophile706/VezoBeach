import { useTranslation } from 'react-i18next'
import { Check } from 'lucide-react'
import PageHero from '@/components/PageHero'
import AnimatedSection from '@/components/AnimatedSection'
import SectionHeading from '@/components/SectionHeading'
import RoomCard from '@/components/RoomCard'
import ImageGallery from '@/components/ImageGallery'
import { useGalleryImages } from '@/hooks/useGallery'
import { roomCategories } from '@/data/roomCategories'

export default function Rooms() {
  const { t } = useTranslation()
  const roomImages = useGalleryImages('rooms')

  return (
    <>
      <PageHero image="/images/Photo-titre.jpg" title={t('rooms.heroTitle')} subtitle={t('rooms.heroSubtitle')} loupe />

      {/* Intro */}
      <AnimatedSection className="container-luxe py-20 md:py-24">
        <SectionHeading eyebrow={t('common.ourStory')} title={t('rooms.introTitle')} text={t('rooms.introText')} />
      </AnimatedSection>

      {/* Amenities */}
      <section className="bg-cream py-16">
        <div className="container-luxe">
          <h3 className="font-serif text-2xl text-center mb-10">{t('rooms.amenitiesTitle')}</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {(t('rooms.amenities', { returnObjects: true }) as string[]).map((item) => (
              <div key={item} className="flex items-center gap-2 text-sm text-charcoal">
                <Check size={16} className="text-brand-gold shrink-0" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Chambres et appartements */}
      <AnimatedSection className="container-luxe py-20 md:py-24">
        <SectionHeading title={t('rooms.compareTitle')} text={t('rooms.compareText')} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-14">
          {roomCategories.map((category, idx) => (
            <AnimatedSection key={category.id} delay={idx * 0.06}>
              <RoomCard category={category} />
            </AnimatedSection>
          ))}
        </div>
        <ul className="mt-12 flex flex-wrap justify-center gap-x-8 gap-y-3 border-t border-gray-200 pt-8 text-sm text-charcoal">
          {(t('rooms.practicalInfo', { returnObjects: true }) as string[]).map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p className="mt-6 text-center text-xs text-gray-500">{t('rooms.seasonNote')}</p>
      </AnimatedSection>

      {/* Gallery */}
      <section className="bg-cream py-20 md:py-24">
        <div className="container-luxe">
          <SectionHeading eyebrow={t('home.galleryEyebrow')} title={t('rooms.heroTitle')} />
          <div className="mt-14">
            <ImageGallery images={roomImages} columns={4} />
          </div>
        </div>
      </section>
    </>
  )
}
