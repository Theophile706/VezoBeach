import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { defaultSeo, seoByPath } from '@/data/seo'

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function upsertCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!el) {
    el = document.createElement('link')
    el.rel = 'canonical'
    document.head.appendChild(el)
  }
  el.href = href
}

export default function Seo() {
  const { pathname } = useLocation()
  const { i18n } = useTranslation()
  const english = i18n.resolvedLanguage?.startsWith('en') ?? false

  useEffect(() => {
    if (pathname.startsWith('/admin')) {
      document.title = 'Administration | Le Vezo Beach'
      return
    }

    const seo = seoByPath[pathname] ?? defaultSeo
    const url = `${window.location.origin}${seo.canonicalPath ?? pathname}`
    const title = english ? seo.titleEn : seo.title
    const description = english ? seo.descriptionEn : seo.description

    document.documentElement.lang = english ? 'en' : 'fr'
    document.title = title
    upsertMeta('name', 'description', description)
    upsertMeta('property', 'og:title', title)
    upsertMeta('property', 'og:description', description)
    upsertMeta('property', 'og:url', url)
    upsertMeta('property', 'og:locale', english ? 'en_GB' : 'fr_FR')
    upsertCanonical(url)
  }, [pathname, english])

  return null
}
