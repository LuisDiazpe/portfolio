import { motion } from 'framer-motion'
import { Briefcase, GraduationCap, User, Cpu, Award, ExternalLink } from 'lucide-react'
import { FadeIn } from '../ui/FadeIn'
import { SectionHeader } from '../ui/SectionHeader'
import { EXPERIENCE_DATA } from '@/shared/constants/experienceData'
import type { Experience } from '@/shared/constants/experienceData'

const TYPE_ICON: Record<Experience['type'], React.ReactNode> = {
  job:           <Briefcase size={13} />,
  academic:      <GraduationCap size={13} />,
  freelance:     <User size={13} />,
  personal:      <Cpu size={13} />,
  certification: <Award size={13} />,
}

const TYPE_COLOR: Record<Experience['type'], string> = {
  job:           'bg-aurora-cyan/10 text-aurora-cyan border-aurora-cyan/20',
  academic:      'bg-aurora-blue/10 text-aurora-blue border-aurora-blue/20',
  freelance:     'bg-[#7c3aed]/10 text-[#c4b5fd] border-[#7c3aed]/30',
  personal:      'bg-white/5 text-text-muted border-border',
  certification: 'bg-amber-500/10 text-amber-400 border-amber-500/25',
}

const TYPE_LABEL: Record<Experience['type'], string> = {
  job:           'Trabajo',
  academic:      'Académico',
  freelance:     'Freelance',
  personal:      'Personal',
  certification: 'Certificación',
}

const DOT_COLOR: Record<Experience['type'], string> = {
  job:           'border-aurora-cyan bg-aurora-cyan/20',
  academic:      'border-aurora-blue bg-aurora-blue/20',
  freelance:     'border-[#7c3aed] bg-[#7c3aed]/20',
  personal:      'border-border bg-bg-secondary',
  certification: 'border-amber-400 bg-amber-500/15',
}

// Group entries by year for visual year separators
function groupByYear(data: Experience[]): { year: number; items: Experience[] }[] {
  const sorted = [...data].sort((a, b) =>
      b.sortYear !== a.sortYear
          ? b.sortYear - a.sortYear
          : b.sortMonth - a.sortMonth
  )
  const map = new Map<number, Experience[]>()
  for (const item of sorted) {
    if (!map.has(item.sortYear)) map.set(item.sortYear, [])
    map.get(item.sortYear)!.push(item)
  }
  return Array.from(map.entries())
      .sort(([a], [b]) => b - a)
      .map(([year, items]) => ({ year, items }))
}

function ExperienceCard({ exp, index }: { exp: Experience; index: number }) {
  return (
      <FadeIn delay={index * 0.06}>
        <div className="relative">
          {/* Timeline dot */}
          <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06 + 0.15, type: 'spring', stiffness: 300 }}
              className={`absolute -left-[2.35rem] top-4 w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${DOT_COLOR[exp.type]}`}
          >
            {exp.current && (
                <span className="w-1.5 h-1.5 rounded-full bg-aurora-cyan animate-pulse" />
            )}
          </motion.div>

          <div className="card-glow rounded-2xl p-5 md:p-6 hover:border-aurora-cyan/20 transition-all duration-300">
            {/* Header */}
            <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${TYPE_COLOR[exp.type]}`}>
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
                <h3 className="font-display font-bold text-base md:text-lg text-text-primary leading-snug">
                  {exp.role}
                </h3>
                {exp.companyUrl ? (
                    <a
                        href={exp.companyUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-aurora-cyan text-sm hover:underline font-medium mt-0.5"
                    >
                      {exp.company}
                      <ExternalLink size={11} />
                    </a>
                ) : (
                    <span className="text-text-muted text-sm font-medium">{exp.company}</span>
                )}
              </div>
              <span className="font-mono text-xs text-text-subtle bg-bg-tertiary px-3 py-1.5 rounded-lg border border-border whitespace-nowrap flex-shrink-0">
              {exp.period}
            </span>
            </div>

            <p className="text-text-muted text-sm leading-relaxed mb-4">{exp.description}</p>

            <ul className="flex flex-col gap-1.5 mb-4">
              {exp.highlights.map(h => (
                  <li key={h} className="flex items-start gap-2 text-sm text-text-muted">
                    <span className="mt-2 w-1 h-1 rounded-full bg-aurora-cyan flex-shrink-0" />
                    {h}
                  </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-1.5 pt-3 border-t border-border/50">
              {exp.techs.map(t => (
                  <span key={t} className="tech-pill">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </FadeIn>
  )
}

export function ExperienceSection() {
  const groups = groupByYear(EXPERIENCE_DATA)

  return (
      <section id="experience" className="relative py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
              tag="// trayectoria"
              title={<>Mi <span className="gradient-text">experiencia</span></>}
              subtitle="Trabajo real en producción, freelance con clientes, formación académica y certificaciones internacionales."
          />

          <div className="relative">
            {/* Full timeline line */}
            <div className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-aurora-cyan via-aurora-violet to-transparent opacity-25" />

            <div className="flex flex-col gap-0 pl-14">
              {groups.map((group, gi) => (
                  <div key={group.year} className="mb-10">

                    {/* Year label */}
                    <FadeIn delay={gi * 0.05}>
                      <div className="relative flex items-center gap-3 mb-6 -ml-14">
                        {/* Year dot on timeline */}
                        <div className="w-10 h-10 rounded-full bg-bg-tertiary border border-aurora-cyan/30 flex items-center justify-center flex-shrink-0 z-10">
                      <span className="font-mono text-xs font-bold text-aurora-cyan">
                        {group.year}
                      </span>
                        </div>
                        <div className="flex-1 h-px bg-gradient-to-r from-aurora-cyan/20 to-transparent" />
                      </div>
                    </FadeIn>

                    {/* Items for this year */}
                    <div className="flex flex-col gap-4">
                      {group.items.map((exp, i) => (
                          <ExperienceCard key={exp.id} exp={exp} index={gi * 10 + i} />
                      ))}
                    </div>
                  </div>
              ))}
            </div>
          </div>
        </div>
      </section>
  )
}