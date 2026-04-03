import { motion } from 'framer-motion'
import { Briefcase, GraduationCap, User, Cpu } from 'lucide-react'
import { FadeIn } from '../ui/FadeIn'
import { SectionHeader } from '../ui/SectionHeader'
import { EXPERIENCE_DATA } from '@/shared/constants/experienceData'
import type { Experience } from '@/shared/constants/experienceData'

const TYPE_ICON: Record<Experience['type'], React.ReactNode> = {
  job:       <Briefcase size={14} />,
  academic:  <GraduationCap size={14} />,
  freelance: <User size={14} />,
  personal:  <Cpu size={14} />,
}

const TYPE_COLOR: Record<Experience['type'], string> = {
  job:       'bg-aurora-cyan text-bg-primary',
  academic:  'bg-aurora-blue/20 text-aurora-blue border border-aurora-blue/30',
  freelance: 'bg-[#7c3aed]/20 text-[#c4b5fd] border border-[#7c3aed]/30',
  personal:  'bg-white/5 text-text-muted border border-border',
}

const TYPE_LABEL: Record<Experience['type'], string> = {
  job:       'Trabajo',
  academic:  'Académico',
  freelance: 'Freelance',
  personal:  'Personal',
}

export function ExperienceSection() {
  return (
    <section id="experience" className="relative py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          tag="// trayectoria"
          title={<>Mi <span className="gradient-text">experiencia</span></>}
          subtitle="Trabajo real, proyectos académicos de alto nivel y proyectos propios. Todo suma."
        />

        <div className="relative">
          {/* Timeline vertical line */}
          <div className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-aurora-cyan via-aurora-violet to-transparent opacity-30" />

          <div className="flex flex-col gap-8 pl-14">
            {EXPERIENCE_DATA.map((exp, i) => (
              <FadeIn key={exp.id} delay={i * 0.08}>
                <div className="relative">
                  {/* Timeline dot */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 + 0.2, type: 'spring', stiffness: 300 }}
                    className={`absolute -left-[2.35rem] top-3 w-4 h-4 rounded-full border-2 flex items-center justify-center
                      ${exp.current ? 'border-aurora-cyan bg-aurora-cyan/20' : 'border-border bg-bg-secondary'}`}
                  >
                    {exp.current && <div className="glow-dot w-1.5 h-1.5" />}
                  </motion.div>

                  <div className="card-glow rounded-2xl p-6 hover:border-aurora-cyan/20 transition-all duration-300">
                    {/* Header */}
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${TYPE_COLOR[exp.type]}`}>
                            {TYPE_ICON[exp.type]}
                            {TYPE_LABEL[exp.type]}
                          </span>
                          {exp.current && (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-aurora-cyan/8 text-aurora-cyan border border-aurora-cyan/20">
                              <span className="w-1.5 h-1.5 rounded-full bg-aurora-cyan animate-pulse" />
                              Actual
                            </span>
                          )}
                        </div>
                        <h3 className="font-display font-bold text-lg text-text-primary">{exp.role}</h3>
                        {exp.companyUrl ? (
                          <a href={exp.companyUrl} target="_blank" rel="noreferrer"
                            className="text-aurora-cyan text-sm hover:underline font-medium">
                            {exp.company}
                          </a>
                        ) : (
                          <span className="text-text-muted text-sm font-medium">{exp.company}</span>
                        )}
                      </div>
                      <span className="font-mono text-xs text-text-subtle bg-bg-tertiary px-3 py-1.5 rounded-lg border border-border whitespace-nowrap">
                        {exp.period}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-text-muted text-sm leading-relaxed mb-4">{exp.description}</p>

                    {/* Highlights */}
                    <ul className="flex flex-col gap-2 mb-4">
                      {exp.highlights.map(h => (
                        <li key={h} className="flex items-start gap-2 text-sm text-text-muted">
                          <span className="mt-1.5 w-1 h-1 rounded-full bg-aurora-cyan flex-shrink-0" />
                          {h}
                        </li>
                      ))}
                    </ul>

                    {/* Tech pills */}
                    <div className="flex flex-wrap gap-2 pt-3 border-t border-border/50">
                      {exp.techs.map(t => (
                        <span key={t} className="tech-pill">{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
