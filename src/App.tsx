import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { WifiOff } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ImageLoupe from '@/components/ImageLoupe'
import Seo from '@/components/Seo'
import Home from '@/pages/Home'
import Rooms from '@/pages/Rooms'
import Restaurant from '@/pages/Restaurant'
import Spa from '@/pages/Spa'
import Events from '@/pages/Events'
import Discover from '@/pages/Discover'
import Contact from '@/pages/Contact'


function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash)
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 100)
        return
      }
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}

function OfflineNotice() {
  const { t } = useTranslation()
  const [online, setOnline] = useState(navigator.onLine)

  useEffect(() => {
    const updateStatus = () => setOnline(navigator.onLine)
    window.addEventListener('online', updateStatus)
    window.addEventListener('offline', updateStatus)
    return () => {
      window.removeEventListener('online', updateStatus)
      window.removeEventListener('offline', updateStatus)
    }
  }, [])

  if (online) return null

  return (
    <div
      role="status"
      className="fixed inset-x-0 bottom-0 z-[60] flex items-center justify-center gap-2 bg-charcoal px-4 py-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] text-center text-sm text-white shadow-lg"
    >
      <WifiOff size={16} aria-hidden="true" />
      <span>{t('common.offline')}</span>
    </div>
  )
}

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      <Seo />
      <OfflineNotice />
      <Header />
      <ImageLoupe />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chambres-suites" element={<Rooms />} />
          <Route path="/restaurant" element={<Restaurant />} />
          <Route path="/piscine-bien-etre" element={<Spa />} />
          <Route path="/reunions-evenements" element={<Events />} />
          <Route path="/decouvrir-morondava" element={<Discover />} />
          <Route path="/decouvrir-antsirabe" element={<Discover />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
