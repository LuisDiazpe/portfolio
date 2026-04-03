import { motion, AnimatePresence } from 'framer-motion'
import { Loader2 } from 'lucide-react'
import { SectionHeader } from '../ui/SectionHeader'
import { ProjectCard } from './ProjectCard'
import { useProjects } from '@/presentation/hooks/useProjects'
import { PROJECT_CATEGORIES } from '@/domain/project/Project'
import type { ProjectCategory } from '@/domain/project/Project'

type FilterValue = ProjectCategory | 'all'

const ALL_FILTERS: { id: FilterValue; label: string }[] = [
  { id: 'all', label: 'Todos' },
  ...PROJECT_CATEGORIES.map(c => ({ id: c.id, label: c.label })),
]

export function ProjectsSection() {
  const { projects, filter, loading, changeFilter } = useProjects()

  return (
    <section id="projects" className="relative py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          tag="// proyectos"
          title={<>Lo que he <span className="gradient-text">construido</span></>}
          subtitle="Proyectos reales en producción, académicos de alto nivel y experimentos personales — en múltiples stacks."
        />

        {/* Category filter tabs */}
        <div className="mb-10">
          <div className="flex flex-wrap gap-2">
            {ALL_FILTERS.map(f => (
              <motion.button
                key={f.id}
                onClick={() => changeFilter(f.id)}
                whileTap={{ scale: 0.96 }}
                className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 focus-aurora ${
                  filter === f.id
                    ? 'text-bg-primary'
                    : 'text-text-muted hover:text-text-primary border border-border hover:border-aurora-cyan/30 bg-bg-card/40'
                }`}
              >
                {filter === f.id && (
                  <motion.span
                    layoutId="filter-bg"
                    className="absolute inset-0 bg-aurora-cyan rounded-xl"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                  />
                )}
                <span className="relative z-10">{f.label}</span>
              </motion.button>
            ))}
          </div>

          {/* Project count */}
          <motion.p
            key={filter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm text-text-subtle mt-3 font-mono"
          >
            {loading ? '...' : `${projects.length} proyecto${projects.length !== 1 ? 's' : ''}`}
          </motion.p>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-24">
            <Loader2 size={28} className="animate-spin text-aurora-cyan" />
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={filter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {projects.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} />
              ))}
            </motion.div>
          </AnimatePresence>
        )}

        {!loading && projects.length === 0 && (
          <div className="text-center py-20 text-text-subtle">
            <p className="text-lg font-mono">// sin proyectos en esta categoría aún</p>
          </div>
        )}
      </div>
    </section>
  )
}
