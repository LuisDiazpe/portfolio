import { useForm } from 'react-hook-form'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, CheckCircle, AlertCircle, Loader2, Github, Gitlab, MessageCircle, Mail } from 'lucide-react'
import { SectionHeader } from '../ui/SectionHeader'
import { FadeIn } from '../ui/FadeIn'
import { useContact } from '@/presentation/hooks/useContact'
import type { ContactMessage } from '@/domain/contact/ContactMessage'
import { useEffect } from 'react'

// Anti-scraping: reversed strings, assembled at click-time only
function getWaHref(): string {
  const parts = ['https://wa.me/', '51', '954', '162', '053', '?text=Hola%20Jorge!']
  return parts.join('')
}
function getMailHref(): string {
  const u = ['u', 'd', 'i', 'l', 'u', '8', '7', '6', 'i'].reverse().join('')
  const d = ['m', 'o', 'c', '.', 'l', 'i', 'a', 'm', 'g', '@'].reverse().join('')
  return `mailto:${u}${d}`
}

const SOCIAL_LINKS = [
  {
    id: 'whatsapp',
    icon: <MessageCircle size={20} />,
    label: 'WhatsApp',
    getHref: getWaHref,
    color: 'hover:text-green-400 hover:border-green-400/30 hover:bg-green-400/8',
  },
  {
    id: 'email',
    icon: <Mail size={20} />,
    label: 'Gmail',
    getHref: getMailHref,
    color: 'hover:text-aurora-blue hover:border-aurora-blue/30 hover:bg-aurora-blue/8',
  },
  {
    id: 'github',
    icon: <Github size={20} />,
    label: 'GitHub',
    getHref: () => 'https://github.com/LuisDiazpe',
    color: 'hover:text-text-primary hover:border-white/20 hover:bg-white/5',
  },
  {
    id: 'gitlab',
    icon: <Gitlab size={20} />,
    label: 'GitLab',
    getHref: () => 'https://gitlab.com/LuisDiazpe',
    color: 'hover:text-orange-400 hover:border-orange-400/30 hover:bg-orange-400/8',
  },
]

function SocialIcon({ item }: { item: typeof SOCIAL_LINKS[0] }) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    window.open(item.getHref(), '_blank', 'noopener,noreferrer')
  }

  return (
      <motion.a
          href="#"
          onClick={handleClick}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          aria-label={item.label}
          title={item.label}
          className={`flex items-center justify-center w-12 h-12 rounded-xl border border-border
        text-text-muted transition-all duration-200 cursor-pointer ${item.color}`}
      >
        {item.icon}
      </motion.a>
  )
}

export function ContactSection() {
  const { status, errorMsg, send, reset } = useContact()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset: resetForm,
  } = useForm<ContactMessage>()

  useEffect(() => {
    if (status === 'success') {
      resetForm()
      const t = setTimeout(reset, 6000)
      return () => clearTimeout(t)
    }
  }, [status, reset, resetForm])

  return (
      <section id="contact" className="relative py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
              tag="// contacto"
              title={<>¿Tienes un <span className="gradient-text">proyecto</span>?</>}
              subtitle="Estoy abierto a oportunidades freelance, colaboraciones o simplemente charlar sobre tech."
              align="center"
          />

          <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
            {/* Left: social icons + availability */}
            <FadeIn direction="left" delay={0.1}>
              <div className="flex flex-col gap-6 h-full">
                <div>
                  <h3 className="font-display font-bold text-xl text-text-primary mb-2">
                    Escríbeme directo
                  </h3>
                  <p className="text-text-muted text-sm leading-relaxed">
                    Prefiero el contacto directo por WhatsApp o el formulario. Respondo en menos de 24h.
                  </p>
                </div>

                {/* Icon grid */}
                <div className="flex flex-wrap gap-4">
                  {SOCIAL_LINKS.map(item => (
                      <div key={item.id} className="flex flex-col items-center gap-1.5">
                        <SocialIcon item={item} />
                        <span className="text-xs text-text-subtle font-mono">{item.label}</span>
                      </div>
                  ))}
                </div>



                {/* Availability card */}
                <div className="mt-auto p-5 rounded-xl bg-bg-card/40 border border-border space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="glow-dot" />
                    <span className="text-sm font-semibold text-text-primary">Disponible ahora</span>
                  </div>
                  <p className="text-xs text-text-muted leading-relaxed font-mono">
                    <span className="text-aurora-cyan">// estado actual</span><br />
                    Abierto a proyectos freelance,<br />
                    colaboraciones y oportunidades<br />
                    full-time o part-time.
                  </p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {['Freelance', 'Full-time', 'Part-time', 'Remoto'].map(tag => (
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
                  Envíame un mensaje
                </h3>

                <AnimatePresence mode="wait">
                  {status === 'success' ? (
                      <motion.div
                          key="success"
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex flex-col items-center text-center py-10 gap-4"
                      >
                        <CheckCircle size={48} className="text-aurora-cyan" />
                        <div>
                          <p className="font-display font-bold text-lg text-text-primary">
                            ¡Mensaje enviado!
                          </p>
                          <p className="text-text-muted text-sm mt-1">
                            Te respondo pronto, gracias por escribirme.
                          </p>
                        </div>
                      </motion.div>
                  ) : (
                      <motion.form
                          key="form"
                          onSubmit={handleSubmit(send)}
                          className="flex flex-col gap-5"
                      >
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs text-text-muted mb-1.5 font-mono">
                              Nombre *
                            </label>
                            <input
                                {...register('name', {
                                  required: 'Requerido',
                                  minLength: { value: 2, message: 'Mínimo 2 caracteres' },
                                })}
                                placeholder="Tu nombre"
                                className={`w-full px-4 py-3 rounded-xl bg-bg-tertiary border text-sm
                            text-text-primary placeholder:text-text-subtle transition-all duration-200
                            outline-none focus:ring-1 ${
                                    errors.name
                                        ? 'border-red-500/50 focus:ring-red-500/30'
                                        : 'border-border focus:border-aurora-cyan/50 focus:ring-aurora-cyan/20'
                                }`}
                            />
                            {errors.name && (
                                <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>
                            )}
                          </div>
                          <div>
                            <label className="block text-xs text-text-muted mb-1.5 font-mono">
                              Email *
                            </label>
                            <input
                                {...register('email', {
                                  required: 'Requerido',
                                  pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: 'Email inválido',
                                  },
                                })}
                                type="email"
                                placeholder="tu@email.com"
                                className={`w-full px-4 py-3 rounded-xl bg-bg-tertiary border text-sm
                            text-text-primary placeholder:text-text-subtle transition-all duration-200
                            outline-none focus:ring-1 ${
                                    errors.email
                                        ? 'border-red-500/50 focus:ring-red-500/30'
                                        : 'border-border focus:border-aurora-cyan/50 focus:ring-aurora-cyan/20'
                                }`}
                            />
                            {errors.email && (
                                <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>
                            )}
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs text-text-muted mb-1.5 font-mono">
                            Asunto *
                          </label>
                          <input
                              {...register('subject', { required: 'Requerido' })}
                              placeholder="¿De qué se trata?"
                              className={`w-full px-4 py-3 rounded-xl bg-bg-tertiary border text-sm
                          text-text-primary placeholder:text-text-subtle transition-all duration-200
                          outline-none focus:ring-1 ${
                                  errors.subject
                                      ? 'border-red-500/50 focus:ring-red-500/30'
                                      : 'border-border focus:border-aurora-cyan/50 focus:ring-aurora-cyan/20'
                              }`}
                          />
                          {errors.subject && (
                              <p className="text-red-400 text-xs mt-1">{errors.subject.message}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-xs text-text-muted mb-1.5 font-mono">
                            Mensaje *
                          </label>
                          <textarea
                              {...register('message', {
                                required: 'Requerido',
                                minLength: { value: 10, message: 'Mínimo 10 caracteres' },
                              })}
                              rows={5}
                              placeholder="Cuéntame sobre tu proyecto o idea..."
                              className={`w-full px-4 py-3 rounded-xl bg-bg-tertiary border text-sm
                          text-text-primary placeholder:text-text-subtle transition-all duration-200
                          outline-none focus:ring-1 resize-none ${
                                  errors.message
                                      ? 'border-red-500/50 focus:ring-red-500/30'
                                      : 'border-border focus:border-aurora-cyan/50 focus:ring-aurora-cyan/20'
                              }`}
                          />
                          {errors.message && (
                              <p className="text-red-400 text-xs mt-1">{errors.message.message}</p>
                          )}
                        </div>

                        {status === 'error' && errorMsg && (
                            <div className="flex items-start gap-2 p-3 rounded-xl bg-red-500/10
                        border border-red-500/20 text-red-400 text-sm">
                              <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
                              {errorMsg}
                            </div>
                        )}

                        {/* Honeypot — hidden from users, catches bots */}
                        <input
                            type="text"
                            name="website"
                            tabIndex={-1}
                            autoComplete="off"
                            style={{ display: 'none' }}
                        />

                        <button
                            type="submit"
                            disabled={status === 'loading'}
                            className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl
                        font-semibold text-sm bg-aurora-cyan text-bg-primary hover:opacity-85
                        disabled:opacity-50 transition-all duration-200 focus-aurora"
                        >
                          {status === 'loading' ? (
                              <><Loader2 size={16} className="animate-spin" /> Enviando...</>
                          ) : (
                              <><Send size={16} /> Enviar mensaje</>
                          )}
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