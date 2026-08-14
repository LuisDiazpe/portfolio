// Domain Entity
export type ProjectCategory =
    | 'fullstack'
    | 'frontend'
    | 'backend'
    | 'mobile'
    | 'automation'
    | 'iot'
    | 'ai';

export type ProjectStatus = 'production' | 'academic' | 'personal' | 'open-source';

export interface ProjectTech {
  name: string;
  color: 'cyan' | 'blue' | 'violet' | 'teal' | 'orange' | 'pink' | 'green';
}

export interface Project {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly longDescription: string;
  readonly category: ProjectCategory;
  readonly secondaryCategories?: readonly ProjectCategory[];
  readonly status: ProjectStatus;
  readonly techs: ProjectTech[];
  readonly imageUrl?: string;
  readonly imagePlaceholder: string;
  readonly liveUrl?: string;
  readonly githubUrl?: string;
  readonly featured: boolean;
  readonly year: number;
  readonly highlights: string[];
}

// Value object for category metadata
export interface CategoryMeta {
  readonly id: ProjectCategory;
  readonly label: string;
  readonly description: string;
}

export const PROJECT_CATEGORIES: CategoryMeta[] = [
  { id: 'fullstack',   label: 'Fullstack',     description: 'Frontend + Backend completos' },
  { id: 'frontend',    label: 'Frontend',       description: 'Interfaces y experiencia de usuario' },
  { id: 'backend',     label: 'Backend',        description: 'APIs, servicios y arquitecturas' },
  { id: 'mobile',      label: 'Mobile',         description: 'Apps Android y Flutter' },
  { id: 'automation',  label: 'Automatización', description: 'N8N, bots y flujos automatizados' },
  { id: 'iot',         label: 'IoT',            description: 'Hardware y sistemas embebidos' },
  { id: 'ai',          label: 'AI / Python',    description: 'Inteligencia artificial y scripts' },
];