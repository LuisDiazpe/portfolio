import { MapPin, GraduationCap, Briefcase, Zap, Globe, Download } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { FadeIn } from '../ui/FadeIn'
import { SectionHeader } from '../ui/SectionHeader'

export function AboutSection() {
  const { t, i18n } = useTranslation()
  const cvLang = i18n.language === 'en' ? 'en' : i18n.language === 'pt' ? 'pt' : 'es'
  const cvHref = `/cv-jorge-luis-diaz-${cvLang}.pdf`

  const HIGHLIGHTS = [
    { icon: <Briefcase size={18} />, titleKey: 'about.highlights.arkabia_title', descKey: 'about.highlights.arkabia_desc', color: 'text-aurora-cyan border-aurora-cyan/20 bg-aurora-cyan/6' },
    { icon: <GraduationCap size={18} />, titleKey: 'about.highlights.upc_title', descKey: 'about.highlights.upc_desc', color: 'text-aurora-blue border-aurora-blue/20 bg-aurora-blue/6' },
    { icon: <Zap size={18} />, titleKey: 'about.highlights.n8n_title', descKey: 'about.highlights.n8n_desc', color: 'text-aurora-violet border-[#7c3aed]/20 bg-[#7c3aed]/6' },
    { icon: <Globe size={18} />, titleKey: 'about.highlights.lang_title', descKey: 'about.highlights.lang_desc', color: 'text-[#4dffc8] border-[#4dffc8]/20 bg-[#4dffc8]/6' },
    { icon: <MapPin size={18} />, titleKey: 'about.highlights.loc_title', descKey: 'about.highlights.loc_desc', color: 'text-text-muted border-border bg-bg-card/40' },
  ]

  return (
      <section id="about" className="relative py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
              tag={t('about.tag')}
              title={<>{t('about.title')}<br /><span className="gradient-text">{t('about.subtitle')}</span></>}
          />

          <div className="grid md:grid-cols-2 gap-12 items-start">
            <FadeIn delay={0.1} className="space-y-5">
              <p className="text-text-muted leading-relaxed text-[1.05rem]">
                {/* p1 — manually handle since JSX interpolation */}
                {t('about.tag') === '// sobre mí' && <>
                  Soy Jorge, 20 años, de <strong className="text-text-primary font-semibold">Cajamarca, Perú</strong>.
                  Estudio Ingeniería de Software en la UPC y trabajo como{' '}
                  <strong className="text-text-primary font-semibold">Fullstack Developer</strong> en{' '}
                  <a href="https://arkabia.com" target="_blank" rel="noreferrer" className="text-aurora-cyan hover:underline font-semibold">Arkabia</a>,
                  donde además lidero técnicamente el proyecto <a href="https://app.meproind.com" target="_blank" rel="noreferrer" className="text-aurora-cyan hover:underline font-semibold">Meproind</a>.
                </>}
                {t('about.tag') === '// about me' && <>
                  I'm Jorge, 20 years old, from <strong className="text-text-primary font-semibold">Cajamarca, Peru</strong>.
                  I study Software Engineering at UPC and work as a{' '}
                  <strong className="text-text-primary font-semibold">Fullstack Developer</strong> at{' '}
                  <a href="https://arkabia.com" target="_blank" rel="noreferrer" className="text-aurora-cyan hover:underline font-semibold">Arkabia</a>,
                  where I also technically lead the <a href="https://app.meproind.com" target="_blank" rel="noreferrer" className="text-aurora-cyan hover:underline font-semibold">Meproind</a> project.
                </>}
                {t('about.tag') === '// sobre mim' && <>
                  Sou Jorge, 20 anos, de <strong className="text-text-primary font-semibold">Cajamarca, Peru</strong>.
                  Estudo Engenharia de Software na UPC e trabalho como{' '}
                  <strong className="text-text-primary font-semibold">Fullstack Developer</strong> na{' '}
                  <a href="https://arkabia.com" target="_blank" rel="noreferrer" className="text-aurora-cyan hover:underline font-semibold">Arkabia</a>,
                  onde também lidero tecnicamente o projeto <a href="https://app.meproind.com" target="_blank" rel="noreferrer" className="text-aurora-cyan hover:underline font-semibold">Meproind</a>.
                </>}
              </p>
              <p className="text-text-muted leading-relaxed text-[1.05rem]">
                {t('about.tag') === '// sobre mí' && <>
                  Trabajo con React, Angular, Java, TypeScript, C# y Python. Diseño y modelo bases de datos relacionales y no relacionales,
                  defino arquitecturas y coordino equipos bajo <strong className="text-text-primary font-semibold">Scrum</strong>.
                  Además automatizo procesos con <strong className="text-text-primary font-semibold">N8N</strong> e IA para clientes reales en producción.
                </>}
                {t('about.tag') === '// about me' && <>
                  I work with React, Angular, Java, TypeScript, C# and Python. I design and model relational and non-relational databases,
                  define architectures and coordinate teams under <strong className="text-text-primary font-semibold">Scrum</strong>.
                  I also automate processes with <strong className="text-text-primary font-semibold">N8N</strong> and AI for real production clients.
                </>}
                {t('about.tag') === '// sobre mim' && <>
                  Trabalho com React, Angular, Java, TypeScript, C# e Python. Projeto e modelo bancos de dados relacionais e não relacionais,
                  defino arquiteturas e coordeno equipes com <strong className="text-text-primary font-semibold">Scrum</strong>.
                  Também automatizo processos com <strong className="text-text-primary font-semibold">N8N</strong> e IA para clientes reais em produção.
                </>}
              </p>
              <p className="text-text-muted leading-relaxed text-[1.05rem]">{t('about.p3')}</p>

              <div className="mt-2 p-4 rounded-xl border border-border bg-bg-card/40 font-mono text-sm">
                <span className="text-text-subtle">{t('about.motto_label')}</span>
                <p className="text-aurora-cyan mt-1">{t('about.motto')}</p>
                <span className="text-text-subtle text-xs">{t('about.motto_by')}</span>
              </div>

              <div className="flex flex-col gap-1.5 mt-2">
                <a href={cvHref} download={`CV-Jorge-Luis-Diaz-${cvLang.toUpperCase()}.pdf`}
                   title={t('about.cv_hint')}
                   className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold
                  border border-aurora-cyan/30 text-aurora-cyan hover:bg-aurora-cyan/8
                  transition-all duration-200 group self-start">
                  <Download size={15} className="group-hover:translate-y-0.5 transition-transform" />
                  {t('about.download_cv')}
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-aurora-cyan/10 border border-aurora-cyan/20">{cvLang.toUpperCase()}</span>
                </a>
                <span className="inline-flex items-center gap-1.5 text-text-subtle text-[11px]">
                  <Globe size={11} className="text-aurora-cyan/70" />
                  {t('about.cv_available')} <span className="font-mono ml-0.5">ES · EN · PT</span>
                </span>
              </div>
            </FadeIn>

            <FadeIn delay={0.2} className="flex flex-col gap-3">
              {HIGHLIGHTS.map(h => (
                  <div key={h.titleKey}
                       className={`flex items-start gap-4 p-4 rounded-xl border transition-all duration-200 card-glow ${h.color}`}>
                    <div className="mt-0.5 flex-shrink-0">{h.icon}</div>
                    <div>
                      <p className="font-semibold text-sm text-text-primary mb-0.5">{t(h.titleKey)}</p>
                      <p className="text-xs text-text-muted leading-relaxed">{t(h.descKey)}</p>
                    </div>
                  </div>
              ))}
            </FadeIn>
          </div>
        </div>
      </section>
  )
}