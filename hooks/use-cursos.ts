import { useQuery } from '@tanstack/react-query'
import { listCursos, getCursoBySlug, getCursoById, listProfessoresByCursoId, listPeriodosByCursoId } from '@/services/curso-actions'
import type { Curso, ProfessorCurso, PeriodoCurso } from '@/types/cursos'

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

export function useProfessoresDoCurso(cursoId?: string) {
  return useQuery<ProfessorCurso[]>({
    queryKey: ['curso', cursoId, 'professores'],
    queryFn: async () => {
      if (!cursoId) return []
      return await listProfessoresByCursoId(cursoId)
    },
    enabled: !!cursoId,
    staleTime: 60_000,
  })
}

export function usePeriodosDoCurso(cursoId?: string) {
  return useQuery<PeriodoCurso[]>({
    queryKey: ['curso', cursoId, 'periodos'],
    queryFn: async () => {
      if (!cursoId) return []
      return await listPeriodosByCursoId(cursoId)
    },
    enabled: !!cursoId,
    staleTime: 60_000,
  })
}
