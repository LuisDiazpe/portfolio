import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useScrollSpy } from '@/presentation/hooks/useScrollSpy'
import { LanguageSwitcher } from '../ui/LanguageSwitcher'

const SECTION_IDS = ['about', 'skills', 'experience', 'projects', 'contact']

export function Navbar() {
  const { t } = useTranslation()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobile] = useState(false)
  const active = useScrollSpy(SECTION_IDS)

  const NAV_ITEMS = [
    { id: 'about',      label: t('nav.about') },
    { id: 'skills',     label: t('nav.skills') },
    { id: 'experience', label: t('nav.experience') },
    { id: 'projects',   label: t('nav.projects') },
    { id: 'contact',    label: t('nav.contact') },
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMobile(false)
  }

  return (
      <>
        <motion.nav
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                scrolled
                    ? 'bg-bg-primary/90 backdrop-blur-xl border-b border-border/50 shadow-[0_1px_30px_rgba(0,0,0,0.5)]'
                    : 'bg-transparent'
            }`}
        >
          <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
            <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="font-display font-extrabold text-xl tracking-tight gradient-text hover:opacity-80 transition-opacity"
            >
              JLDF
            </button>

            <ul className="hidden md:flex items-center gap-1">
              {NAV_ITEMS.map(item => (
                  <li key={item.id}>
                    <button
                        onClick={() => scrollTo(item.id)}
                        className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 focus-aurora ${
                            active === item.id ? 'text-aurora-cyan' : 'text-text-muted hover:text-text-primary'
                        }`}
                    >
                      {active === item.id && (
                          <motion.span
                              layoutId="nav-indicator"
                              className="absolute inset-0 bg-aurora-cyan/8 rounded-lg border border-aurora-cyan/20"
                              transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                          />
                      )}
                      <span className="relative z-10">{item.label}</span>
                    </button>
                  </li>
              ))}
            </ul>

            <div className="flex items-center gap-2">
              <LanguageSwitcher />
              <a
                  href="#contact"
                  onClick={e => { e.preventDefault(); scrollTo('contact') }}
                  className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold
                bg-aurora-cyan text-[#050a14] hover:opacity-85 transition-opacity focus-aurora"
              >
                {t('nav.cta')}
              </a>
              <button
                  className="md:hidden p-2 text-text-muted hover:text-text-primary transition-colors"
                  onClick={() => setMobile(v => !v)}
                  aria-label="Toggle menu"
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </motion.nav>

        <AnimatePresence>
          {mobileOpen && (
              <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="fixed top-16 left-0 right-0 z-40 bg-bg-primary/95 backdrop-blur-xl border-b border-border shadow-xl"
              >
                <ul className="flex flex-col p-4 gap-1">
                  {NAV_ITEMS.map(item => (
                      <li key={item.id}>
                        <button
                            onClick={() => scrollTo(item.id)}
                            className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                                active === item.id
                                    ? 'text-aurora-cyan bg-aurora-cyan/8'
                                    : 'text-text-muted hover:text-text-primary hover:bg-white/5'
                            }`}
                        >
                          {item.label}
                        </button>
                      </li>
                  ))}
                </ul>
              </motion.div>
          )}
        </AnimatePresence>
      </>
  )
}