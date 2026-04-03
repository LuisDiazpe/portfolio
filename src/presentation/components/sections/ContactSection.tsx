import { useForm } from 'react-hook-form'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, CheckCircle, AlertCircle, Loader2, MessageSquare, Mail, Phone } from 'lucide-react'
import { SectionHeader } from '../ui/SectionHeader'
import { FadeIn } from '../ui/FadeIn'
import { useContact } from '@/presentation/hooks/useContact'
import type { ContactMessage } from '@/domain/contact/ContactMessage'
import { useEffect } from 'react'

// Anti-scraping: assembled at runtime
function getContactLinks() {
  const wa = ['51', '954', '162', '053'].join('')
  const em = ['luidi', '678u', '@', 'gmail', '.com'].join('')
  return { wa, em }
}

export function ContactSection() {
  const { status, errorMsg, send, reset } = useContact()
  const { register, handleSubmit, formState: { errors }, reset: resetForm } = useForm<ContactMessage>()

  useEffect(() => {
    if (status === 'success') {
      resetForm()
      const t = setTimeout(reset, 6000)
      return () => clearTimeout(t)
    }
  }, [status, reset, resetForm])

  const { wa, em } = getContactLinks()

  const CONTACT_METHODS = [
    {
      icon: <Phone size={18} />,
      label: 'WhatsApp',
      value: `+${wa.slice(0,2)} ${wa.slice(2,5)} ${wa.slice(5,8)} ${wa.slice(8)}`,
      href: `https://wa.me/${wa}?text=Hola%20Jorge!`,
      color: 'text-green-400 border-green-500/20 bg-green-500/6 hover:border-green-500/40',
    },
    {
      icon: <Mail size={18} />,
      label: 'Email',
      value: em,
      href: `mailto:${em}`,
      color: 'text-aurora-blue border-aurora-blue/20 bg-aurora-blue/6 hover:border-aurora-blue/40',
    },
    {
      icon: <MessageSquare size={18} />,
      label: 'GitHub',
      value: 'LuisDiazpe',
      href: 'https://github.com/LuisDiazpe',
      color: 'text-text-muted border-border bg-bg-card/40 hover:border-aurora-cyan/30',
    },
  ]

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
          {/* Left: contact methods */}
          <FadeIn direction="left" delay={0.1}>
            <div className="flex flex-col gap-4 h-full">
              <h3 className="font-display font-bold text-xl text-text-primary mb-2">
                Escríbeme directo
              </h3>
              {CONTACT_METHODS.map(m => (
                <a
                  key={m.label}
                  href={m.href}
                  target={m.href.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  className={`flex items-center gap-4 p-4 rounded-xl border transition-all duration-200 ${m.color}`}
                >
                  <div className="flex-shrink-0">{m.icon}</div>
                  <div>
                    <p className="font-semibold text-sm text-text-primary">{m.label}</p>
                    <p className="text-xs text-text-muted font-mono mt-0.5">{m.value}</p>
                  </div>
                </a>
              ))}

              <div className="mt-auto pt-4 p-4 rounded-xl bg-bg-card/40 border border-border">
                <p className="text-xs text-text-subtle leading-relaxed font-mono">
                  <span className="text-aurora-cyan">// disponibilidad</span><br />
                  Respondo normalmente en menos de 24h. Si es urgente, WhatsApp es la vía más rápida.
                </p>
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
                      <p className="font-display font-bold text-lg text-text-primary">¡Mensaje enviado!</p>
                      <p className="text-text-muted text-sm mt-1">Te respondo pronto, gracias por escribirme.</p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit(send)}
                    className="flex flex-col gap-5"
                  >
                    {/* Name + Email row */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-text-muted mb-1.5 font-mono">Nombre *</label>
                        <input
                          {...register('name', { required: 'Requerido', minLength: { value: 2, message: 'Mínimo 2 caracteres' } })}
                          placeholder="Tu nombre"
                          className={`w-full px-4 py-3 rounded-xl bg-bg-tertiary border text-sm text-text-primary
                            placeholder:text-text-subtle transition-all duration-200 outline-none focus:ring-1
                            ${errors.name ? 'border-red-500/50 focus:ring-red-500/30' : 'border-border focus:border-aurora-cyan/50 focus:ring-aurora-cyan/20'}`}
                        />
                        {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
                      </div>
                      <div>
                        <label className="block text-xs text-text-muted mb-1.5 font-mono">Email *</label>
                        <input
                          {...register('email', {
                            required: 'Requerido',
                            pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Email inválido' }
                          })}
                          type="email"
                          placeholder="tu@email.com"
                          className={`w-full px-4 py-3 rounded-xl bg-bg-tertiary border text-sm text-text-primary
                            placeholder:text-text-subtle transition-all duration-200 outline-none focus:ring-1
                            ${errors.email ? 'border-red-500/50 focus:ring-red-500/30' : 'border-border focus:border-aurora-cyan/50 focus:ring-aurora-cyan/20'}`}
                        />
                        {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
                      </div>
                    </div>

                    {/* Subject */}
                    <div>
                      <label className="block text-xs text-text-muted mb-1.5 font-mono">Asunto *</label>
                      <input
                        {...register('subject', { required: 'Requerido' })}
                        placeholder="¿De qué se trata?"
                        className={`w-full px-4 py-3 rounded-xl bg-bg-tertiary border text-sm text-text-primary
                          placeholder:text-text-subtle transition-all duration-200 outline-none focus:ring-1
                          ${errors.subject ? 'border-red-500/50 focus:ring-red-500/30' : 'border-border focus:border-aurora-cyan/50 focus:ring-aurora-cyan/20'}`}
                      />
                      {errors.subject && <p className="text-red-400 text-xs mt-1">{errors.subject.message}</p>}
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-xs text-text-muted mb-1.5 font-mono">Mensaje *</label>
                      <textarea
                        {...register('message', { required: 'Requerido', minLength: { value: 10, message: 'Mínimo 10 caracteres' } })}
                        rows={5}
                        placeholder="Cuéntame sobre tu proyecto o idea..."
                        className={`w-full px-4 py-3 rounded-xl bg-bg-tertiary border text-sm text-text-primary
                          placeholder:text-text-subtle transition-all duration-200 outline-none focus:ring-1 resize-none
                          ${errors.message ? 'border-red-500/50 focus:ring-red-500/30' : 'border-border focus:border-aurora-cyan/50 focus:ring-aurora-cyan/20'}`}
                      />
                      {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message.message}</p>}
                    </div>

                    {/* Error global */}
                    {status === 'error' && errorMsg && (
                      <div className="flex items-start gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                        <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
                        {errorMsg}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-semibold text-sm
                        bg-aurora-cyan text-bg-primary hover:opacity-85 disabled:opacity-50 transition-all duration-200 focus-aurora"
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
