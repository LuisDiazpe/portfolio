import type { ProjectRepository } from '@/domain/project/ProjectRepository';
import type { Project, ProjectCategory } from '@/domain/project/Project';
import { PROJECTS_DATA } from './projectsData';

const STATUS_ORDER: Record<Project['status'], number> = {
  production:    0,
  academic:      1,
  'open-source': 2,
  personal:      3,
};

function sortProjects(projects: Project[]): Project[] {
  return [...projects].sort((a, b) => {
    //Production first
    const statusDiff = STATUS_ORDER[a.status] - STATUS_ORDER[b.status];
    if (statusDiff !== 0) return statusDiff;
    //Featured within same status
    if (a.featured !== b.featured) return a.featured ? -1 : 1;
    //Most recent year
    return b.year - a.year;
  });
}

export class InMemoryProjectRepository implements ProjectRepository {
  private readonly projects: Project[] = PROJECTS_DATA;

  async getAll(): Promise<Project[]> {
    return sortProjects(this.projects);
  }

  async getFeatured(): Promise<Project[]> {
    return sortProjects(this.projects.filter(p => p.featured));
  }

  async getByCategory(category: ProjectCategory): Promise<Project[]> {
    return sortProjects(this.projects.filter(p => p.category === category));
  }

  async getById(id: string): Promise<Project | null> {
    return this.projects.find(p => p.id === id) ?? null;
  }
}