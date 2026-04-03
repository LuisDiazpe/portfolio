import { MapPin, GraduationCap, Briefcase, Zap, Globe } from 'lucide-react'
import { FadeIn } from '../ui/FadeIn'
import { SectionHeader } from '../ui/SectionHeader'

const HIGHLIGHTS = [
  {
    icon: <Briefcase size={18} />,
    title: 'Frontend Developer en Arkabia',
    desc: 'Plataforma SaaS de comercio exterior. React + TypeScript en producción.',
    color: 'text-aurora-cyan border-aurora-cyan/20 bg-aurora-cyan/6',
  },
  {
    icon: <GraduationCap size={18} />,
    title: 'Ingeniería de Software — UPC',
    desc: '7° semestre. Arquitecturas DDD, clean code y proyectos fullstack reales.',
    color: 'text-aurora-blue border-aurora-blue/20 bg-aurora-blue/6',
  },
  {
    icon: <Zap size={18} />,
    title: 'Automatización con N8N',
    desc: 'Flujos, bots, integraciones multi-plataforma y pipelines de datos.',
    color: 'text-aurora-violet border-[#7c3aed]/20 bg-[#7c3aed]/6',
  },
  {
    icon: <Globe size={18} />,
    title: 'Trilingüe',
    desc: 'Español nativo · English fluent · Português intermediário',
    color: 'text-[#4dffc8] border-[#4dffc8]/20 bg-[#4dffc8]/6',
  },
  {
    icon: <MapPin size={18} />,
    title: 'Cajamarca, Perú 🏔️',
    desc: '19 años. Aspiring Software Engineer at Microsoft.',
    color: 'text-text-muted border-border bg-bg-card/40',
  },
]

export function AboutSection() {
  return (
    <section id="about" className="relative py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          tag="// sobre mí"
          title={<>Ingeniero de software<br /><span className="gradient-text">apasionado por innovar</span></>}
        />

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Text */}
          <FadeIn delay={0.1} className="space-y-5">
            <p className="text-text-muted leading-relaxed text-[1.05rem]">
              Soy Jorge, 19 años, de <strong className="text-text-primary font-semibold">Cajamarca, Perú</strong>.
              Estudio Ingeniería de Software en la UPC y trabajo actualmente como Developer
              en <a href="https://arkabia.com" target="_blank" rel="noreferrer"
                className="text-aurora-cyan hover:underline font-semibold">Arkabia</a>, construyendo
              soluciones reales para el comercio exterior peruano.
            </p>
            <p className="text-text-muted leading-relaxed text-[1.05rem]">
              Me considero <strong className="text-text-primary font-semibold">fullstack de corazón</strong>: disfruto
              tanto diseñar una interfaz que enamora como arquitecturar un backend robusto con DDD.
              Además, automatizo procesos con <strong className="text-text-primary font-semibold">N8N</strong> para
              hacer que los sistemas sean más eficientes y conectados.
            </p>
            <p className="text-text-muted leading-relaxed text-[1.05rem]">
              Autodidacta por naturaleza. Aprendo construyendo cosas reales, contribuyo a open source
              y busco siempre la solución más limpia y mantenible.
            </p>

            {/* Motto */}
            <div className="mt-6 p-4 rounded-xl border border-border bg-bg-card/40 font-mono text-sm">
              <span className="text-text-subtle">// motto</span>
              <p className="text-aurora-cyan mt-1">
                "The best way to predict the future is to invent it."
              </p>
              <span className="text-text-subtle text-xs">— Alan Kay</span>
            </div>
          </FadeIn>

          {/* Highlights */}
          <FadeIn delay={0.2} className="flex flex-col gap-3">
            {HIGHLIGHTS.map(h => (
              <div
                key={h.title}
                className={`flex items-start gap-4 p-4 rounded-xl border transition-all duration-200
                  card-glow ${h.color}`}
              >
                <div className="mt-0.5 flex-shrink-0">{h.icon}</div>
                <div>
                  <p className="font-semibold text-sm text-text-primary mb-0.5">{h.title}</p>
                  <p className="text-xs text-text-muted leading-relaxed">{h.desc}</p>
                </div>
              </div>
            ))}
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
