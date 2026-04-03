import type { ProjectRepository } from '@/domain/project/ProjectRepository';
import type { Project, ProjectCategory } from '@/domain/project/Project';
import { PROJECTS_DATA } from './projectsData';

export class InMemoryProjectRepository implements ProjectRepository {
  private readonly projects: Project[] = PROJECTS_DATA;

  async getAll(): Promise<Project[]> {
    return [...this.projects].sort((a, b) => b.year - a.year);
  }

  async getFeatured(): Promise<Project[]> {
    return this.projects.filter((p) => p.featured).sort((a, b) => b.year - a.year);
  }

  async getByCategory(category: ProjectCategory): Promise<Project[]> {
    return this.projects
      .filter((p) => p.category === category)
      .sort((a, b) => b.year - a.year);
  }

  async getById(id: string): Promise<Project | null> {
    return this.projects.find((p) => p.id === id) ?? null;
  }
}
