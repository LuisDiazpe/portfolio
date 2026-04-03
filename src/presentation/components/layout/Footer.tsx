import { Github } from 'lucide-react'

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-border/40 py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="font-display font-extrabold gradient-text text-sm">JLDF</span>
        <p className="text-text-subtle text-xs font-mono text-center">
          Diseñado & construido por Jorge Luis Díaz Fiestas · Cajamarca, Perú 🏔️
        </p>
        <a
          href="https://github.com/LuisDiazpe"
          target="_blank"
          rel="noreferrer"
          className="text-text-subtle hover:text-aurora-cyan transition-colors"
        >
          <Github size={16} />
        </a>
      </div>
    </footer>
  )
}
