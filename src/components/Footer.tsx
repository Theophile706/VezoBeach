import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Facebook, Instagram, MapPin, Phone, Mail } from 'lucide-react'
import { useState } from 'react'
import { api } from '@/utils/api'

export default function Footer() {
  const { t } = useTranslation()
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [subscribing, setSubscribing] = useState(false)

  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubscribing(true)
    try {
      await api.subscribeNewsletter(email)
      setSubscribed(true)
      setEmail('')
    } catch {
      console.error('[Le Vezo Beach] Newsletter signup failed')
    } finally {
      setSubscribing(false)
    }
  }

  return (
    <footer className="bg-charcoal text-white/80">
      <div className="container-luxe py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* About */}
        <div>
          <div className="font-serif text-xl text-white tracking-wider mb-4">Le Vezo Beach</div>
          <p className="text-sm leading-relaxed">{t('footer.aboutText')}</p>
          <div className="flex items-center gap-4 mt-5">
            <a href="https://www.facebook.com/hotelvezobeachmorondava?mibextid=rS40aB7S9Ucbxw6v" target="_blank" rel="noreferrer" aria-label="Facebook" className="text-brand-gold hover:text-white transition-colors">
              <Facebook size={20} />
            </a>
            <a href="https://www.instagram.com/hotelvezobeach_morondava?dlrf=MWQwcHJuM3V1MnhhMQ==" target="_blank" rel="noreferrer" aria-label="Instagram" className="text-brand-gold hover:text-white transition-colors">
              <Instagram size={20} />
            </a>
          </div>
        </div>

        {/* Quick links */}
        <div>
          <div className="text-white uppercase tracking-widest2 text-xs mb-5 font-medium">{t('footer.linksTitle')}</div>
          <ul className="space-y-3 text-sm">
            <li><Link to="/chambres-suites" className="hover:text-gold-500 transition-colors">{t('nav.rooms')}</Link></li>
            <li><Link to="/restaurant" className="hover:text-gold-500 transition-colors">{t('nav.restaurant')}</Link></li>
            <li><Link to="/piscine-bien-etre" className="hover:text-gold-500 transition-colors">{t('nav.spa')}</Link></li>
            <li><Link to="/reunions-evenements" className="hover:text-gold-500 transition-colors">{t('nav.events')}</Link></li>
            <li><Link to="/decouvrir-morondava" className="hover:text-gold-500 transition-colors">{t('nav.discover')}</Link></li>
            <li><Link to="/contact" className="hover:text-gold-500 transition-colors">{t('nav.contact')}</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <div className="font-serif text-xl text-white mb-5">{t('contact.infoTitle')}</div>
          <div className="text-sm space-y-4 leading-relaxed">
            <div className="flex items-start gap-3">
              <MapPin size={18} className="text-brand-gold shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <span className="block text-white/50 text-xs uppercase tracking-widest2 mb-1">{t('contact.addressLabel')}</span>
                <p>{t('contact.address')}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone size={18} className="text-brand-gold shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <span className="block text-white/50 text-xs uppercase tracking-widest2 mb-1">{t('contact.phoneInfoLabel')}</span>
                <a href="tel:+261320434040" className="block hover:text-gold-500 transition-colors">+261 32 04 340 40</a>
                <a href="tel:+261349934640" className="block hover:text-gold-500 transition-colors">+261 34 99 346 40</a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Mail size={18} className="text-brand-gold shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <span className="block text-white/50 text-xs uppercase tracking-widest2 mb-1">{t('contact.emailInfoLabel')}</span>
                <a href="mailto:vezobeach@gmail.com" className="block hover:text-gold-500 transition-colors break-all">vezobeach@gmail.com</a>
                <a href="mailto:direction.vezobeach@telma.net" className="block hover:text-gold-500 transition-colors break-all">direction.vezobeach@telma.net</a>
                <a href="mailto:resa.vezobeach@telma.net" className="block hover:text-gold-500 transition-colors break-all">resa.vezobeach@telma.net</a>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div>
          <div className="text-white uppercase tracking-widest2 text-xs mb-5 font-medium">{t('footer.newsletterTitle')}</div>
          <p className="text-sm mb-4">{t('footer.newsletterText')}</p>
          {subscribed ? (
            <p className="text-gold-400 text-sm">✓ Merci de votre inscription !</p>
          ) : (
            <form onSubmit={handleNewsletter} className="flex">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('footer.newsletterPlaceholder')}
                className="bg-white/10 border border-white/20 text-sm px-4 py-2.5 w-full focus:outline-none focus:border-gold-500 placeholder:text-white/40"
              />
              <button type="submit" disabled={subscribing} className="bg-gold-500 hover:bg-gold-600 px-4 text-white transition-colors disabled:opacity-60" aria-label="Subscribe">
                {subscribing ? '...' : '→'}
              </button>
            </form>
          )}
        </div>
      </div>

      <div className="border-t border-white/10 py-6">
        <div className="container-luxe flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-white/50">
          <span>© {new Date().getFullYear()} Le Vezo Beach Morondava. {t('footer.rights')}</span>
          <span>Madagascar</span>
        </div>
      </div>
    </footer>
  )
}
