import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Loader2, Star } from 'lucide-react'
import { SectionHeader } from '../ui/SectionHeader'
import { ProjectCard } from './ProjectCard'
import { useProjects } from '@/presentation/hooks/useProjects'
import type { ProjectCategory } from '@/domain/project/Project'

type FilterValue = ProjectCategory | 'all' | 'featured'

interface FilterDef {
  id: FilterValue
  key: string
  icon?: React.ReactNode
}

const FILTER_DEFS: FilterDef[] = [
  { id: 'featured',   key: 'featured',   icon: <Star size={12} fill="currentColor" /> },
  { id: 'fullstack',  key: 'fullstack' },
  { id: 'frontend',   key: 'frontend' },
  { id: 'mobile',     key: 'mobile' },
  { id: 'automation', key: 'automation' },
  { id: 'iot',        key: 'iot' },
  { id: 'ai',         key: 'ai' },
  { id: 'backend',    key: 'backend' },
  { id: 'all',        key: 'all' },
]

export function ProjectsSection() {
  const { t } = useTranslation()
  const { projects, filter, loading, changeFilter } = useProjects()

  const filters = FILTER_DEFS.map(f => ({
    ...f,
    label: t(`projects.filters.${f.key}`),
  }))

  return (
      <section id="projects" className="relative py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
              tag={t('projects.tag')}
              title={<>{t('projects.title')} <span className="gradient-text">{t('projects.title_hl')}</span></>}
              subtitle={t('projects.subtitle')}
          />

          {/* Filters */}
          <div className="mb-10">
            <div className="flex flex-wrap gap-2">
              {filters.map(f => (
                  <motion.button
                      key={f.id}
                      onClick={() => changeFilter(f.id)}
                      whileTap={{ scale: 0.96 }}
                      className={`relative flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium
                  transition-all duration-200 focus-aurora ${
                          filter === f.id
                              ? 'text-[#050a14]'
                              : 'text-text-muted hover:text-text-primary border border-border hover:border-aurora-cyan/30 bg-bg-card/40'
                      }`}
                  >
                    {filter === f.id && (
                        <motion.span
                            layoutId="filter-bg"
                            className={`absolute inset-0 rounded-xl ${f.id === 'featured' ? 'bg-amber-400' : 'bg-aurora-cyan'}`}
                            transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                        />
                    )}
                    {f.icon && (
                        <span className={`relative z-10 ${filter === f.id ? 'text-[#050a14]' : 'text-amber-400'}`}>
                    {f.icon}
                  </span>
                    )}
                    <span className="relative z-10">{f.label}</span>
                  </motion.button>
              ))}
            </div>

            <motion.p
                key={filter}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm text-text-subtle mt-3 font-mono"
            >
              {loading ? '...' : t(projects.length !== 1 ? 'projects.count_other' : 'projects.count_one', { count: projects.length })}
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
                <p className="text-lg font-mono">{t('projects.empty')}</p>
              </div>
          )}
        </div>
      </section>
  )
}