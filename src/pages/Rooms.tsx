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
      <PageHero image="/images/Photo-titre.jpg" title={t('rooms.heroTitle')} slideTitle="serif" loupe />

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
            <AnimatedSection key={category.id} delay={idx * 0.06} className="h-full min-w-0">
              <RoomCard category={category} />
            </AnimatedSection>
          ))}
        </div>
        <ul className="mt-12 flex flex-wrap justify-center gap-x-8 gap-y-3 border-t border-gray-200 pt-8 text-sm text-charcoal">
          {(t('rooms.practicalInfo', { returnObjects: true }) as string[]).map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </AnimatedSection>

      <section className="container-luxe pb-20 md:pb-24">
        <div className="mx-auto max-w-3xl rounded-lg bg-white px-6 py-10 text-center shadow-md">
          <h3 className="font-sans text-lg font-semibold text-gray-900">{t('rooms.technicalSheetTitle')}</h3>
          <a
            href="/Fiche-technique.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative mt-6 inline-block bg-[#f0c419] px-6 py-3 text-xs font-medium uppercase tracking-widest text-black shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-[#d9b015] hover:shadow-lg active:translate-y-0 active:shadow-sm"
          >
            <span className="pointer-events-none absolute inset-0 animate-ping bg-[#f0c419] opacity-40" aria-hidden="true" />
            <span className="relative">{t('rooms.technicalSheetButton')}</span>
          </a>
        </div>
      </section>

      {/* Gallery */}
      <section className="bg-cream py-20 md:py-24">
        <div className="container-luxe">
          <SectionHeading eyebrow={t('home.galleryEyebrow')} title={t('rooms.heroTitle')} />
          <div className="mt-14">
            <ImageGallery images={roomImages} columns={3} fit="cover" />
          </div>
        </div>
      </section>
    </>
  )
}
