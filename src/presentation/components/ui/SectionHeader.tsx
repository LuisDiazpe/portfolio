import { FadeIn } from './FadeIn'

interface SectionHeaderProps {
  tag: string
  title: React.ReactNode
  subtitle?: string
  align?: 'left' | 'center'
}

export function SectionHeader({ tag, title, subtitle, align = 'left' }: SectionHeaderProps) {
  const alignClass = align === 'center' ? 'text-center items-center' : 'items-start'

  return (
    <FadeIn className={`flex flex-col gap-3 mb-12 ${alignClass}`}>
      <span className="section-tag">{tag}</span>
      <div className="aurora-divider" style={{ alignSelf: align === 'center' ? 'center' : 'flex-start' }} />
      <h2 className="font-display font-extrabold text-3xl md:text-4xl lg:text-5xl leading-tight text-balance">
        {title}
      </h2>
      {subtitle && (
        <p className="text-text-muted text-base md:text-lg max-w-2xl">{subtitle}</p>
      )}
    </FadeIn>
  )
}
