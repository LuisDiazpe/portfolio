import { HomePage } from '@/presentation/pages/HomePage'
import { InMemoryProjectRepository } from '@/infrastructure/repositories/InMemoryProjectRepository'
import { ApiContactRepository } from '@/infrastructure/repositories/ApiContactRepository'
import { GetProjectsByCategoryUseCase, GetFeaturedProjectsUseCase } from '@/application/project/GetProjectsUseCase'
import { SendContactMessageUseCase } from '@/application/contact/SendContactMessageUseCase'

// Dependency injection wiring
const projectRepo  = new InMemoryProjectRepository()
const contactRepo  = new ApiContactRepository()

export const getProjectsByCategory = new GetProjectsByCategoryUseCase(projectRepo)
export const getFeaturedProjects   = new GetFeaturedProjectsUseCase(projectRepo)
export const sendContactMessage    = new SendContactMessageUseCase(contactRepo)

export default function App() {
  return <HomePage />
}
