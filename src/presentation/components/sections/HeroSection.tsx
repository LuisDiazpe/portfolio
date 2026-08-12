import { motion } from 'framer-motion'
import { ArrowDown, Github, Linkedin, Gitlab, ExternalLink, Download } from 'lucide-react'
import { lazy, Suspense } from 'react'
import { useTranslation } from 'react-i18next'

const LlamaModel = lazy(() =>
    import('./LlamaModel').then(m => ({ default: m.LlamaModel }))
)

const stagger = {
  container: { animate: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } } },
  item: {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] } },
  },
}

export function HeroSection() {
  const { t } = useTranslation()
  const scrollTo = (id: string) =>
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  const roles = t('hero.roles', { returnObjects: true }) as string[]

  return (
      <section id="hero" className="relative min-h-screen flex flex-col justify-center pt-24 pb-20 px-6">
        <div className="max-w-6xl mx-auto w-full flex flex-col lg:flex-row lg:items-center lg:gap-8">

          <motion.div
              variants={stagger.container}
              initial="initial"
              animate="animate"
              className="flex flex-col lg:max-w-[52%] z-10"
          >
            {/* Available badge */}
            <motion.div variants={stagger.item} className="mb-7">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm
              font-medium bg-aurora-cyan/8 border border-aurora-cyan/20 text-aurora-cyan">
              <span className="glow-dot" />
              {t('hero.available')}
            </span>
            </motion.div>

            {/* Name */}
            <motion.div variants={stagger.item} className="mb-5">
              <h1 className="font-display font-extrabold leading-[1.02] tracking-tight text-balance">
              <span className="block text-4xl sm:text-5xl md:text-6xl text-text-primary mb-1">
                Jorge Luis
              </span>
                <span className="block text-4xl sm:text-5xl md:text-6xl gradient-text">
                Díaz Fiestas
              </span>
              </h1>
            </motion.div>

            {/* Role pills */}
            <motion.div variants={stagger.item} className="flex flex-wrap gap-2 mb-5">
              {roles.map(role => (
                  <span key={role} className="px-3 py-1 rounded-full text-sm border border-border text-text-muted bg-bg-card/50">
                {role}
              </span>
              ))}
            </motion.div>

            {/* Description */}
            <motion.p variants={stagger.item} className="text-text-muted text-base md:text-lg max-w-lg mb-8 leading-relaxed">
              {t('hero.description')}
            </motion.p>

            {/* CTAs */}
            <motion.div variants={stagger.item} className="flex flex-wrap gap-3 mb-14">
              <button
                  onClick={() => scrollTo('projects')}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm
                bg-aurora-cyan text-[#050a14] hover:opacity-85 transition-opacity focus-aurora"
              >
                {t('hero.cta_projects')}
                <ExternalLink size={15} />
              </button>
              <button
                  onClick={() => scrollTo('contact')}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm
                border border-aurora-cyan/30 text-aurora-cyan hover:bg-aurora-cyan/8 transition-colors focus-aurora"
              >
                {t('hero.cta_contact')}
              </button>
              {/* CV Download in hero */}
              <a
                  href="/cv-jorge-luis-diaz.pdf"
                  download
                  className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold
                text-text-muted border border-border hover:border-aurora-cyan/30 hover:text-aurora-cyan
                transition-all focus-aurora"
              >
                <Download size={15} />
                CV
              </a>
              <a href="https://github.com/LuisDiazpe" target="_blank" rel="noreferrer" aria-label="GitHub"
                 className="flex items-center px-4 py-3 rounded-xl text-sm text-text-muted
                border border-border hover:border-aurora-cyan/30 hover:text-text-primary transition-all focus-aurora">
                <Github size={16} />
              </a>
              <a href="https://gitlab.com/LuisDiazpe" target="_blank" rel="noreferrer" aria-label="GitLab"
                 className="flex items-center px-4 py-3 rounded-xl text-sm text-text-muted
                border border-border hover:border-orange-400/30 hover:text-orange-400 transition-all focus-aurora">
                <Gitlab size={16} />
              </a>
              <a href="https://www.linkedin.com/in/luis-d%C3%ADaz-b2b537293/" target="_blank" rel="noreferrer" aria-label="LinkedIn"
                 className="flex items-center px-4 py-3 rounded-xl text-sm text-text-muted
                border border-border hover:border-aurora-blue/30 hover:text-aurora-blue transition-all focus-aurora">
                <Linkedin size={16} />
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div variants={stagger.item} className="flex flex-wrap gap-8 md:gap-12 pt-8 mt-4 border-t border-border/30">
              {[
                { value: '8°',  key: 'stats.semester' },
                { value: '3+',  key: 'stats.years' },
                { value: '12+', key: 'stats.projects' },
                { value: '3',   key: 'stats.languages' },
              ].map((s, i) => (
                  <motion.div key={s.key}
                              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.9 + i * 0.08, duration: 0.5 }}
                              className="flex flex-col"
                  >
                    <span className="font-display font-extrabold text-3xl md:text-4xl gradient-text">{s.value}</span>
                    <span className="text-xs text-text-subtle mt-1 tracking-wide">{t(`hero.${s.key}`)}</span>
                  </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* 3D Alpaca */}
          <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.8, ease: 'easeOut' }}
              className="hidden lg:flex flex-1 items-center justify-center"
              style={{ height: '520px' }}
          >
            <Suspense fallback={
              <div className="w-full h-full rounded-2xl border border-border/20 bg-bg-card/10 flex items-center justify-center">
                <div className="flex flex-col items-center gap-3 opacity-40">
                  <div className="w-8 h-8 border-2 border-aurora-cyan/40 border-t-aurora-cyan rounded-full animate-spin" />
                  <span className="text-xs font-mono text-text-subtle">Loading...</span>
                </div>
              </div>
            }>
              <LlamaModel />
            </Suspense>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.button
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 1.8, duration: 0.5 }}
            onClick={() => scrollTo('about')}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2
          text-text-subtle hover:text-aurora-cyan transition-colors group"
        >
          <span className="text-xs tracking-widest uppercase font-mono">{t('hero.scroll')}</span>
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}>
            <ArrowDown size={16} />
          </motion.div>
        </motion.button>
      </section>
  )
}