import { motion } from 'framer-motion'
import { ArrowDown, Github, Linkedin, ExternalLink } from 'lucide-react'

const stagger = {
  container: { animate: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } } },
  item: {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] } },
  },
}

const STATS = [
  { value: '7°',  label: 'Semestre UPC' },
  { value: '3+',  label: 'Años programando' },
  { value: '12+', label: 'Proyectos' },
  { value: '3',   label: 'Idiomas' },
]

export function HeroSection() {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center pt-20 pb-16 px-6 max-w-6xl mx-auto"
    >
      <motion.div
        variants={stagger.container}
        initial="initial"
        animate="animate"
        className="flex flex-col"
      >
        {/* Available badge */}
        <motion.div variants={stagger.item} className="mb-8">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium
            bg-aurora-cyan/8 border border-aurora-cyan/20 text-aurora-cyan">
            <span className="glow-dot" />
            Disponible para oportunidades
          </span>
        </motion.div>

        {/* Name */}
        <motion.div variants={stagger.item} className="mb-6">
          <h1 className="font-display font-extrabold leading-[1.02] tracking-tight text-balance">
            <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-text-primary mb-1">
              Jorge Luis
            </span>
            <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl gradient-text">
              Díaz Fiestas
            </span>
          </h1>
        </motion.div>

        {/* Role pills */}
        <motion.div variants={stagger.item} className="flex flex-wrap gap-2 mb-6">
          {['Fullstack Developer', 'N8N Automation', 'UPC · Lima, Perú'].map(role => (
            <span
              key={role}
              className="px-3 py-1 rounded-full text-sm border border-border text-text-muted bg-bg-card/50"
            >
              {role}
            </span>
          ))}
        </motion.div>

        {/* Subtitle */}
        <motion.p
          variants={stagger.item}
          className="text-text-muted text-base md:text-lg max-w-xl mb-10 leading-relaxed"
        >
          Construyo productos digitales completos — desde interfaces que enamoran
          hasta backends que escalan. Apasionado por la arquitectura limpia, la
          automatización y hacer que las cosas funcionen de verdad.
        </motion.p>

        {/* CTAs */}
        <motion.div variants={stagger.item} className="flex flex-wrap gap-3 mb-16">
          <button
            onClick={() => scrollTo('projects')}
            className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm
              bg-aurora-cyan text-bg-primary hover:opacity-85 transition-opacity focus-aurora"
          >
            Ver proyectos
            <ExternalLink size={15} />
          </button>
          <button
            onClick={() => scrollTo('contact')}
            className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm
              border border-aurora-cyan/30 text-aurora-cyan hover:bg-aurora-cyan/8 transition-colors focus-aurora"
          >
            Hablemos
          </button>
          <a
            href="https://github.com/LuisDiazpe"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm text-text-muted
              border border-border hover:border-border-glow hover:text-text-primary transition-all focus-aurora"
          >
            <Github size={16} />
          </a>
          <a
            href="https://www.linkedin.com"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm text-text-muted
              border border-border hover:border-border-glow hover:text-text-primary transition-all focus-aurora"
          >
            <Linkedin size={16} />
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div variants={stagger.item} className="flex flex-wrap gap-8 md:gap-12">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + i * 0.08, duration: 0.5 }}
              className="flex flex-col"
            >
              <span className="font-display font-extrabold text-3xl md:text-4xl gradient-text">
                {s.value}
              </span>
              <span className="text-xs text-text-subtle mt-1 tracking-wide">{s.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.5 }}
        onClick={() => scrollTo('about')}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2
          text-text-subtle hover:text-aurora-cyan transition-colors group"
      >
        <span className="text-xs tracking-widest uppercase font-mono">scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown size={16} className="group-hover:text-aurora-cyan transition-colors" />
        </motion.div>
      </motion.button>
    </section>
  )
}
