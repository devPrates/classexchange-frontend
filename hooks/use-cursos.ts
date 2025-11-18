import { useQuery } from '@tanstack/react-query'
import { listCursos, getCursoBySlug, getCursoById } from '@/services/curso-actions'
import type { Curso } from '@/types/cursos'

export function useCursos(searchQuery?: string) {
  return useQuery<Curso[]>({
    queryKey: ['cursos'],
    queryFn: async () => {
      return await listCursos()
    },
    select: (data) => {
      if (!searchQuery) return data
      const q = searchQuery.toLowerCase()
      return data.filter((c) => c.nome.toLowerCase().includes(q) || c.sigla.toLowerCase().includes(q))
    },
  })
}

export function useCursoBySlugOrId(param: string) {
  return useQuery<Curso>({
    queryKey: ['curso', param],
    queryFn: async () => {
      try {
        return await getCursoBySlug(param)
      } catch {
        return await getCursoById(param)
      }
    },
    enabled: !!param,
  })
}