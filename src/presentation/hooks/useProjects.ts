import { useState, useEffect, useCallback } from 'react'
import type { Project, ProjectCategory } from '@/domain/project/Project'
import { getProjectsByCategory } from '@/App'

type FilterValue = ProjectCategory | 'all'

export function useProjects() {
  const [projects, setProjects]   = useState<Project[]>([])
  const [filter, setFilter]       = useState<FilterValue>('all')
  const [loading, setLoading]     = useState(true)

  const load = useCallback(async (cat: FilterValue) => {
    setLoading(true)
    const data = await getProjectsByCategory.execute(cat)
    setProjects(data)
    setLoading(false)
  }, [])

  useEffect(() => { void load(filter) }, [filter, load])

  const changeFilter = useCallback((cat: FilterValue) => setFilter(cat), [])

  return { projects, filter, loading, changeFilter }
}
