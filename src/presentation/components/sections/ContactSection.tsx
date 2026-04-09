import { useForm } from 'react-hook-form'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, CheckCircle, AlertCircle, Loader2, Github, Gitlab, MessageCircle, Mail } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { SectionHeader } from '../ui/SectionHeader'
import { FadeIn } from '../ui/FadeIn'
import { useContact } from '@/presentation/hooks/useContact'
import type { ContactMessage } from '@/domain/contact/ContactMessage'
import { useEffect } from 'react'

function getWaHref(): string {
  return ['https://wa.me/', '51', '954', '162', '053', '?text=Hola%20Jorge!'].join('')
}
function getMailHref(): string {
  const u = ['u', 'd', 'i', 'l', 'u', '8', '7', '6', 'i'].reverse().join('')
  const d = ['m', 'o', 'c', '.', 'l', 'i', 'a', 'm', 'g', '@'].reverse().join('')
  return `mailto:${u}${d}`
}

export function ContactSection() {
  const { t } = useTranslation()
  const { status, errorMsg, send, reset } = useContact()
  const { register, handleSubmit, formState: { errors }, reset: resetForm } = useForm<ContactMessage>()

  useEffect(() => {
    if (status === 'success') {
      resetForm()
      const timer = setTimeout(reset, 6000)
      return () => clearTimeout(timer)
    }
  }, [status, reset, resetForm])

  const SOCIAL_LINKS = [
    { id: 'whatsapp', icon: <MessageCircle size={20} />, label: 'WhatsApp', getHref: getWaHref,
      color: 'hover:text-green-400 hover:border-green-400/30 hover:bg-green-400/8' },
    { id: 'email',    icon: <Mail size={20} />,          label: 'Gmail',    getHref: getMailHref,
      color: 'hover:text-aurora-blue hover:border-aurora-blue/30 hover:bg-aurora-blue/8' },
    { id: 'github',   icon: <Github size={20} />,        label: 'GitHub',   getHref: () => 'https://github.com/LuisDiazpe',
      color: 'hover:text-text-primary hover:border-white/20 hover:bg-white/5' },
    { id: 'gitlab',   icon: <Gitlab size={20} />,        label: 'GitLab',   getHref: () => 'https://gitlab.com/LuisDiazpe',
      color: 'hover:text-orange-400 hover:border-orange-400/30 hover:bg-orange-400/8' },
  ]

  const tags = t('contact.tags', { returnObjects: true }) as string[]

  return (
      <section id="contact" className="relative py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
              tag={t('contact.tag')}
              title={<>{t('contact.title')} <span className="gradient-text">{t('contact.title_hl')}</span>{t('contact.title_end')}</>}
              subtitle={t('contact.subtitle')}
              align="center"
          />

          <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
            {/* Left */}
            <FadeIn direction="left" delay={0.1}>
              <div className="flex flex-col gap-6 h-full">
                <div>
                  <h3 className="font-display font-bold text-xl text-text-primary mb-2">
                    {t('contact.direct')}
                  </h3>
                  <p className="text-text-muted text-sm leading-relaxed">{t('contact.description')}</p>
                </div>

                <div className="flex flex-col gap-3">
                  {SOCIAL_LINKS.map(item => (
                      <motion.a
                          key={item.id}
                          href="#"
                          onClick={e => { e.preventDefault(); window.open(item.getHref(), '_blank', 'noopener,noreferrer') }}
                          whileHover={{ scale: 1.01 }}
                          aria-label={item.label}
                          className={`flex items-center gap-4 p-4 rounded-xl border border-border
                      text-text-muted transition-all duration-200 cursor-pointer ${item.color}`}
                      >
                        <div className="flex-shrink-0">{item.icon}</div>
                        <span className="font-medium text-sm">{item.label}</span>
                      </motion.a>
                  ))}
                </div>

                <div className="mt-auto p-5 rounded-xl bg-bg-card/40 border border-border space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="glow-dot" />
                    <span className="text-sm font-semibold text-text-primary">{t('contact.availability')}</span>
                  </div>
                  <p className="text-xs text-text-muted leading-relaxed font-mono whitespace-pre-line">
                    <span className="text-aurora-cyan">{t('contact.status_comment')}</span>{'\n'}
                    {t('contact.status_text')}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {tags.map(tag => (
                        <span key={tag} className="tech-pill">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Right: form */}
            <FadeIn direction="right" delay={0.2}>
              <div className="card-glow rounded-2xl p-6 md:p-8">
                <h3 className="font-display font-bold text-xl text-text-primary mb-6">
                  {t('contact.form.title')}
                </h3>

                <AnimatePresence mode="wait">
                  {status === 'success' ? (
                      <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                                  exit={{ opacity: 0 }} className="flex flex-col items-center text-center py-10 gap-4">
                        <CheckCircle size={48} className="text-aurora-cyan" />
                        <div>
                          <p className="font-display font-bold text-lg text-text-primary">{t('contact.success_title')}</p>
                          <p className="text-text-muted text-sm mt-1">{t('contact.success_desc')}</p>
                        </div>
                      </motion.div>
                  ) : (
                      <motion.form key="form" onSubmit={handleSubmit(send)} className="flex flex-col gap-5">
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs text-text-muted mb-1.5 font-mono">{t('contact.form.name')} *</label>
                            <input {...register('name', { required: t('contact.form.required'), minLength: { value: 2, message: t('contact.form.min2') } })}
                                   placeholder={t('contact.form.name_ph')}
                                   className={`w-full px-4 py-3 rounded-xl bg-bg-tertiary border text-sm text-text-primary
                            placeholder:text-text-subtle transition-all duration-200 outline-none focus:ring-1
                            ${errors.name ? 'border-red-500/50 focus:ring-red-500/30' : 'border-border focus:border-aurora-cyan/50 focus:ring-aurora-cyan/20'}`}
                            />
                            {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
                          </div>
                          <div>
                            <label className="block text-xs text-text-muted mb-1.5 font-mono">{t('contact.form.email')} *</label>
                            <input {...register('email', { required: t('contact.form.required'), pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: t('contact.form.invalid_email') } })}
                                   type="email" placeholder={t('contact.form.email_ph')}
                                   className={`w-full px-4 py-3 rounded-xl bg-bg-tertiary border text-sm text-text-primary
                            placeholder:text-text-subtle transition-all duration-200 outline-none focus:ring-1
                            ${errors.email ? 'border-red-500/50 focus:ring-red-500/30' : 'border-border focus:border-aurora-cyan/50 focus:ring-aurora-cyan/20'}`}
                            />
                            {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs text-text-muted mb-1.5 font-mono">{t('contact.form.subject')} *</label>
                          <input {...register('subject', { required: t('contact.form.required') })}
                                 placeholder={t('contact.form.subject_ph')}
                                 className={`w-full px-4 py-3 rounded-xl bg-bg-tertiary border text-sm text-text-primary
                          placeholder:text-text-subtle transition-all duration-200 outline-none focus:ring-1
                          ${errors.subject ? 'border-red-500/50 focus:ring-red-500/30' : 'border-border focus:border-aurora-cyan/50 focus:ring-aurora-cyan/20'}`}
                          />
                          {errors.subject && <p className="text-red-400 text-xs mt-1">{errors.subject.message}</p>}
                        </div>

                        <div>
                          <label className="block text-xs text-text-muted mb-1.5 font-mono">{t('contact.form.message')} *</label>
                          <textarea {...register('message', { required: t('contact.form.required'), minLength: { value: 10, message: t('contact.form.min10') } })}
                                    rows={5} placeholder={t('contact.form.message_ph')}
                                    className={`w-full px-4 py-3 rounded-xl bg-bg-tertiary border text-sm text-text-primary
                          placeholder:text-text-subtle transition-all duration-200 outline-none focus:ring-1 resize-none
                          ${errors.message ? 'border-red-500/50 focus:ring-red-500/30' : 'border-border focus:border-aurora-cyan/50 focus:ring-aurora-cyan/20'}`}
                          />
                          {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message.message}</p>}
                        </div>

                        {status === 'error' && errorMsg && (
                            <div className="flex items-start gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                              <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
                              {errorMsg}
                            </div>
                        )}

                        <input type="text" name="website" tabIndex={-1} autoComplete="off" style={{ display: 'none' }} />

                        <button type="submit" disabled={status === 'loading'}
                                className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-semibold text-sm
                        bg-aurora-cyan text-[#050a14] hover:opacity-85 disabled:opacity-50 transition-all duration-200 focus-aurora">
                          {status === 'loading'
                              ? <><Loader2 size={16} className="animate-spin" /> {t('contact.form.sending')}</>
                              : <><Send size={16} /> {t('contact.form.send')}</>}
                        </button>
                      </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
  )
}