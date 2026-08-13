import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { FadeIn } from '../ui/FadeIn'
import { SectionHeader } from '../ui/SectionHeader'
import { SKILLS_DATA } from '@/shared/constants/skillsData'
import type { SkillLevel } from '@/domain/skill/Skill'

const LEVEL_PCT: Record<SkillLevel, string> = {
    expert:       '100%',
    advanced:     '80%',
    intermediate: '60%',
    learning:     '40%',
}

function SkillBar({ name, level, color }: { name: string; level: SkillLevel; color: string }) {
    const { t } = useTranslation()
    return (
        <div className="group py-2 sm:py-1.5">
            <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:gap-3">
                {/* Name + (level on mobile) */}
                <div className="flex items-center justify-between gap-2 sm:w-36 sm:flex-shrink-0 sm:justify-start">
                    <div className="flex items-center gap-2 min-w-0">
                        <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: color }} />
                        <span className="text-sm text-text-muted group-hover:text-text-primary transition-colors truncate">
                            {name}
                        </span>
                    </div>
                    <span className="text-xs text-text-subtle font-mono flex-shrink-0 sm:hidden">
                        {t(`skills.levels.${level}`)}
                    </span>
                </div>

                {/* Level bar — full width on mobile, flexible on desktop */}
                <div className="w-full sm:flex-1 h-2 sm:h-[5px] bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full rounded-full"
                        style={{ background: `linear-gradient(90deg, ${color}, ${color}66)` }}
                        initial={{ width: '0%' }}
                        whileInView={{ width: LEVEL_PCT[level] }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, ease: 'easeOut', delay: 0.05 }}
                    />
                </div>

                {/* Level label — desktop only */}
                <span className="hidden sm:block text-xs text-text-subtle w-20 text-right flex-shrink-0 font-mono">
                    {t(`skills.levels.${level}`)}
                </span>
            </div>
        </div>
    )
}

export function SkillsSection() {
    const { t } = useTranslation()

    return (
        <section id="skills" className="relative py-24 px-6">
            <div className="max-w-6xl mx-auto">
                <SectionHeader
                    tag={t('skills.tag')}
                    title={<>{t('skills.title')}<br /><span className="gradient-text">{t('skills.title_hl')}</span></>}
                    subtitle={t('skills.subtitle')}
                />

                <div className="grid md:grid-cols-2 gap-8">
                    {SKILLS_DATA.map((group, gi) => (
                        <FadeIn key={group.category} delay={gi * 0.05}>
                            <div className="card-glow rounded-2xl p-6">
                                <h3 className="section-tag mb-4">{t(`skills.groups.${group.category}`)}</h3>
                                <div className="flex flex-col divide-y divide-white/5">
                                    {group.skills.map(skill => (
                                        <SkillBar
                                            key={skill.id}
                                            name={skill.name}
                                            level={skill.level}
                                            color={skill.color}
                                        />
                                    ))}
                                </div>
                            </div>
                        </FadeIn>
                    ))}
                </div>
            </div>
        </section>
    )
}