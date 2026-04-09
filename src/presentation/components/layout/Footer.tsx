import { Github, Gitlab } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export function Footer() {
  const { t } = useTranslation()
  return (
      <footer className="relative z-10 border-t border-border/40 py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-display font-extrabold gradient-text text-sm">JLDF</span>
          <p className="text-text-subtle text-xs font-mono text-center">{t('footer.built')}</p>
          <div className="flex items-center gap-3">
            <a href="https://github.com/LuisDiazpe" target="_blank" rel="noreferrer" aria-label="GitHub"
               className="text-text-subtle hover:text-aurora-cyan transition-colors">
              <Github size={16} />
            </a>
            <a href="https://gitlab.com/LuisDiazpe" target="_blank" rel="noreferrer" aria-label="GitLab"
               className="text-text-subtle hover:text-orange-400 transition-colors">
              <Gitlab size={16} />
            </a>
          </div>
        </div>
      </footer>
  )
}