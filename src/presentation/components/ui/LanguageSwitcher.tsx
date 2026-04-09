import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

const LANGS = [
    { code: 'es', label: 'ES', flag: '🇵🇪' },
    { code: 'en', label: 'EN', flag: '🇺🇸' },
    { code: 'pt', label: 'PT', flag: '🇧🇷' },
]

export function LanguageSwitcher() {
    const { i18n } = useTranslation()
    const [open, setOpen] = useState(false)

    const current = LANGS.find(l => l.code === i18n.language) ?? LANGS[0]

    const change = (code: string) => {
        i18n.changeLanguage(code)
        localStorage.setItem('lang', code)
        setOpen(false)
    }

    return (
        <div className="relative">
            <button
                onClick={() => setOpen(v => !v)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium
          text-text-muted border border-border hover:border-aurora-cyan/30
          hover:text-text-primary transition-all duration-200"
            >
                <span>{current.flag}</span>
                <span className="font-mono">{current.label}</span>
                <motion.span
                    animate={{ rotate: open ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-xs opacity-60"
                >
                    ▾
                </motion.span>
            </button>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: -6, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -6, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 top-full mt-1.5 bg-bg-secondary border border-border
              rounded-xl overflow-hidden shadow-xl z-50 min-w-[100px]"
                    >
                        {LANGS.map(lang => (
                            <button
                                key={lang.code}
                                onClick={() => change(lang.code)}
                                className={`flex items-center gap-2 w-full px-4 py-2.5 text-sm text-left
                  transition-colors duration-150 ${
                                    lang.code === i18n.language
                                        ? 'bg-aurora-cyan/10 text-aurora-cyan'
                                        : 'text-text-muted hover:bg-white/5 hover:text-text-primary'
                                }`}
                            >
                                <span>{lang.flag}</span>
                                <span className="font-mono font-medium">{lang.label}</span>
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Backdrop */}
            {open && (
                <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
            )}
        </div>
    )
}