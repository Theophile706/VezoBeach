import { useTranslation } from 'react-i18next'
import { CheckCircle2, AlertCircle } from 'lucide-react'
import { useState } from 'react'
import PageHero from '@/components/PageHero'
import AnimatedSection from '@/components/AnimatedSection'
import SectionHeading from '@/components/SectionHeading'
import type { EventFormData } from '@/types'
import { validateEmail } from '@/utils/helpers'
import { sendRequest } from '@/utils/api'

export default function Events() {
  const { t } = useTranslation()
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle')
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [form, setForm] = useState<EventFormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    eventDate: '',
    guestCount: '',
  })

  function update<K extends keyof EventFormData>(key: K, value: string) {
    setForm((p) => ({ ...p, [key]: value }))
    if (submitError) setSubmitError(null)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitError(null)

    if (!form.name.trim()) {
      setSubmitError(t('events.errorName'))
      return
    }
    if (!validateEmail(form.email)) {
      setSubmitError(t('events.errorEmail'))
      return
    }
    if (!form.eventDate) {
      setSubmitError(t('events.errorDate'))
      return
    }
    if (!form.guestCount || Number(form.guestCount) < 1) {
      setSubmitError(t('events.errorGuests'))
      return
    }
    if (!form.message.trim()) {
      setSubmitError(t('events.errorDescription'))
      return
    }

    setStatus('sending')
    try {
      await sendRequest('event', form)
      setStatus('success')
    } catch (err) {
      console.error('[Le Vezo Beach] Event inquiry failed:', err)
      setSubmitError(t('events.sendFailed'))
      setStatus('idle')
    }
  }

  const inputClass =
    'w-full border border-gray-300 focus:border-gold-500 focus:ring-1 focus:ring-gold-500/30 px-4 py-3 text-sm outline-none transition-colors bg-white'

  return (
    <>
      <PageHero image="/images/Photo-Evenements-1200.jpg" title={t('events.heroTitle')} slideTitle="serif" loupe />

      <AnimatedSection className="container-luxe py-20 md:py-24">
        <SectionHeading title={t('events.introTitle')} text={t('events.introText')} />
      </AnimatedSection>

      {/* Quote request form */}
      <section className="bg-charcoal py-20 md:py-24">
        <div className="container-luxe max-w-3xl">
          <SectionHeading title={t('events.formTitle')} text={t('events.formText')} light />
          {status === 'success' ? (
            <div className="mt-10 text-center text-gold-400 bg-white/5 border border-gold-500/30 rounded-md p-8">
              <CheckCircle2 size={32} className="mx-auto mb-3" />
              {t('contact.successMessage')}
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="mt-10 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <input
                  required
                  placeholder={t('contact.namePlaceholder')}
                  value={form.name}
                  onChange={(e) => update('name', e.target.value)}
                  className={inputClass}
                />
                <input
                  required
                  type="email"
                  placeholder={t('contact.emailPlaceholder')}
                  value={form.email}
                  onChange={(e) => update('email', e.target.value)}
                  className={inputClass}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <input
                  type="tel"
                  placeholder={t('contact.phoneLabel')}
                  value={form.phone}
                  onChange={(e) => update('phone', e.target.value)}
                  className={inputClass}
                />
                <input
                  required
                  type="number"
                  min={1}
                  placeholder={t('events.guestCountPlaceholder')}
                  value={form.guestCount}
                  onChange={(e) => update('guestCount', e.target.value)}
                  className={inputClass}
                />
              </div>

              <input
                required
                type="date"
                value={form.eventDate}
                onChange={(e) => update('eventDate', e.target.value)}
                className={inputClass}
              />

              <textarea
                required
                rows={4}
                placeholder={t('contact.messagePlaceholder')}
                value={form.message}
                onChange={(e) => update('message', e.target.value)}
                className={inputClass}
              />

              {submitError && (
                <div
                  role="alert"
                  className="flex items-start gap-2 text-sm text-red-300 bg-red-500/10 border border-red-500/30 rounded-md px-4 py-3"
                >
                  <AlertCircle size={18} className="shrink-0 mt-0.5" />
                  <span>{submitError}</span>
                </div>
              )}

              <button type="submit" disabled={status === 'sending'} className="btn-gold disabled:opacity-60">
                {status === 'sending' ? t('common.sending') : t('common.send')}
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  )
}
