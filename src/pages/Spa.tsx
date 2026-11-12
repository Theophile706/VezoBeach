import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import PageHero from '@/components/PageHero'
import AnimatedSection from '@/components/AnimatedSection'
import SectionHeading from '@/components/SectionHeading'
import ImageGallery from '@/components/ImageGallery'
import { useGalleryImages } from '@/hooks/useGallery'

export default function Spa() {
  const { t } = useTranslation()
  const poolImages = useGalleryImages('pool')
  const spaImages = useGalleryImages('spa')

  return (
    <>
      <PageHero image="/images/Photo-Bien-etre-1200.jpg" title={t('spa.heroTitle')} subtitle={t('spa.heroSubtitle')} loupe />

      {/* Pool section */}
      <AnimatedSection className="container-luxe py-20 md:py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <div className="section-eyebrow">{t('spa.poolEyebrow')}</div>
          <h2 className="section-title mb-5">{t('spa.poolTitle')}</h2>
          <p className="text-gray-600 leading-relaxed">{t('spa.poolText')}</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <motion.img
            src="/images/Photo-Spa-et-Detente-2.jpg"
            alt={t('spa.imgPool')}
            className="rounded-md aspect-square object-cover bg-cream"
            loading="lazy"
            initial={{ opacity: 0, x: -120, y: 30 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 1.4, delay: 0, ease: [0.22, 1, 0.36, 1] }}
          />
          <motion.img
            src="/images/Photo-Gallerie-2-1200.jpg"
            alt={t('spa.imgPoolRelax')}
            className="rounded-md aspect-square object-cover bg-cream mt-8"
            loading="lazy"
            initial={{ opacity: 0, x: 140, y: -20 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 1.4, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      </AnimatedSection>

      {/* Massage section */}
      <section className="bg-cream py-20 md:py-24">
        <div className="container-luxe grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1 grid grid-cols-2 gap-4">
            <motion.img
              src="/images/Photo-Gallerie-3-1200.jpg"
              alt={t('spa.imgMassage')}
              className="rounded-md aspect-square object-cover bg-cream"
              loading="lazy"
              animate={{ x: [-10, 10, -10] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.img
              src="/images/Photo.jpg"
              alt={t('spa.imgRelax')}
              className="rounded-md aspect-square object-cover bg-cream mt-8"
              loading="lazy"
              animate={{ x: [10, -10, 10] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
          <div className="order-1 lg:order-2">
            <div className="section-eyebrow">{t('spa.spaEyebrow')}</div>
            <h2 className="section-title mb-5">{t('spa.spaTitle')}</h2>
            <p className="text-gray-600 leading-relaxed">{t('spa.spaText')}</p>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="bg-cream py-20 md:py-24">
        <div className="container-luxe">
          <SectionHeading eyebrow={t('home.galleryEyebrow')} title={t('spa.heroTitle')} />
          <div className="mt-14">
            <ImageGallery images={[...poolImages, ...spaImages]} columns={3} fit="cover" drop />
          </div>
        </div>
      </section>
    </>
  )
}
