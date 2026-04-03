import type { ProjectRepository } from '@/domain/project/ProjectRepository';
import type { Project, ProjectCategory } from '@/domain/project/Project';

export class GetAllProjectsUseCase {
  constructor(private readonly repository: ProjectRepository) {}

  async execute(): Promise<Project[]> {
    return this.repository.getAll();
  }
}

export class GetProjectsByCategoryUseCase {
  constructor(private readonly repository: ProjectRepository) {}

  async execute(category: ProjectCategory | 'all'): Promise<Project[]> {
    if (category === 'all') return this.repository.getAll();
    return this.repository.getByCategory(category);
  }
}

export class GetFeaturedProjectsUseCase {
  constructor(private readonly repository: ProjectRepository) {}

  async execute(): Promise<Project[]> {
    return this.repository.getFeatured();
  }
}
