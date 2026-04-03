export type SkillCategory =
  | 'frontend'
  | 'backend'
  | 'mobile'
  | 'database'
  | 'automation'
  | 'tools'
  | 'languages';

export type SkillLevel = 'expert' | 'advanced' | 'intermediate' | 'learning';

export interface Skill {
  readonly id: string;
  readonly name: string;
  readonly category: SkillCategory;
  readonly level: SkillLevel;
  readonly iconUrl?: string;
  readonly color: string;
  readonly years?: number;
}

export interface SkillGroup {
  readonly category: SkillCategory;
  readonly label: string;
  readonly skills: Skill[];
}
