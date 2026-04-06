import { motion } from 'framer-motion'
import { ExternalLink, Github, Star } from 'lucide-react'
import type { Project } from '@/domain/project/Project'

interface ProjectCardProps {
  project: Project
  index: number
}

const PLACEHOLDER_COLORS: Record<string, string> = {
  AB: 'from-aurora-cyan/20 to-aurora-blue/20',
  SE: 'from-orange-500/20 to-green-500/20',
  WS: 'from-violet-500/20 to-blue-500/20',
  GS: 'from-green-500/20 to-teal-500/20',
  SH: 'from-blue-500/20 to-purple-500/20',
  EG: 'from-blue-500/20 to-cyan-500/20',
  SF: 'from-pink-500/20 to-red-500/20',
  FL: 'from-cyan-500/20 to-blue-500/20',
  KT: 'from-violet-500/20 to-purple-500/20',
  N8: 'from-orange-500/20 to-pink-500/20',
  PI: 'from-teal-500/20 to-green-500/20',
  AP: 'from-violet-500/20 to-blue-500/20',
  VT: 'from-orange-500/20 to-amber-500/20',
}

const STATUS_BADGE: Record<Project['status'], { label: string; class: string }> = {
  production:    { label: 'Producción', class: 'bg-aurora-cyan/10 text-aurora-cyan border-aurora-cyan/20' },
  academic:      { label: 'Académico',  class: 'bg-aurora-blue/10 text-aurora-blue border-aurora-blue/20' },
  personal:      { label: 'Personal',   class: 'bg-white/5 text-text-muted border-border' },
  'open-source': { label: 'Open Source', class: 'bg-green-500/10 text-green-400 border-green-500/20' },
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const badge = STATUS_BADGE[project.status]
  const gradientClass = PLACEHOLDER_COLORS[project.imagePlaceholder] ?? 'from-bg-tertiary to-bg-card'

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="card-glow rounded-2xl overflow-hidden flex flex-col group"
    >
      {/* Image / Placeholder */}
      <div className={`relative h-44 bg-gradient-to-br ${gradientClass} flex items-center justify-center overflow-hidden`}>
        {project.imageUrl ? (
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="flex flex-col items-center gap-2 opacity-60">
            <span className="font-display font-extrabold text-5xl text-text-muted">
              {project.imagePlaceholder}
            </span>
          </div>
        )}

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-bg-primary/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noreferrer"
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-aurora-cyan text-[#050a14] text-sm font-semibold hover:opacity-85 transition-opacity">
              <ExternalLink size={14} /> Ver proyecto
            </a>
          )}
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noreferrer"
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-border bg-bg-card/80 text-text-primary text-sm font-semibold hover:border-aurora-cyan/40 transition-colors">
              <Github size={14} /> Código
            </a>
          )}
        </div>

        {/* Featured star */}
        {project.featured && (
          <div className="absolute top-3 right-3">
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold bg-amber-500/15 text-amber-400 border border-amber-500/25">
              <Star size={10} fill="currentColor" /> Destacado
            </span>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-5">
        <div className="flex items-start justify-between gap-2 mb-3">
          <span className={`text-xs px-2.5 py-1 rounded-full border font-medium ${badge.class}`}>
            {badge.label}
          </span>
          <span className="font-mono text-xs text-text-subtle">{project.year}</span>
        </div>

        <h3 className="font-display font-bold text-base text-text-primary mb-2 leading-snug">
          {project.title}
        </h3>
        <p className="text-sm text-text-muted leading-relaxed flex-1 mb-4">
          {project.description}
        </p>

        {/* Tech pills */}
        <div className="flex flex-wrap gap-1.5 pt-3 border-t border-border/50">
          {project.techs.slice(0, 4).map(t => (
            <span key={t.name} className="tech-pill">{t.name}</span>
          ))}
          {project.techs.length > 4 && (
            <span className="tech-pill text-text-subtle">+{project.techs.length - 4}</span>
          )}
        </div>
      </div>
    </motion.article>
  )
}
