import { useState, useEffect, useCallback } from 'react'
import type { Project, ProjectCategory } from '@/domain/project/Project'
import { getProjectsByCategory, getFeaturedProjects } from '@/App'

type FilterValue = ProjectCategory | 'all' | 'featured'

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [filter, setFilter]     = useState<FilterValue>('featured')
  const [loading, setLoading]   = useState(true)

  const load = useCallback(async (f: FilterValue) => {
    setLoading(true)
    let data: Project[]
    if (f === 'featured') {
      data = await getFeaturedProjects.execute()
    } else {
      data = await getProjectsByCategory.execute(f)
    }
    setProjects(data)
    setLoading(false)
  }, [])

  useEffect(() => { void load(filter) }, [filter, load])

  const changeFilter = useCallback((f: FilterValue) => setFilter(f), [])

  return { projects, filter, loading, changeFilter }
}