import type { Project, ProjectCategory } from './Project';

export interface ProjectRepository {
  getAll(): Promise<Project[]>;
  getFeatured(): Promise<Project[]>;
  getByCategory(category: ProjectCategory): Promise<Project[]>;
  getById(id: string): Promise<Project | null>;
}
