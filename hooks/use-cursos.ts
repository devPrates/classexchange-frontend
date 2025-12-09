import { useQuery } from '@tanstack/react-query'
import { listCursos, getCursoBySlug, getCursoById, listProfessoresByCursoId, listPeriodosByCursoId } from '@/services/curso-actions'
import { listTurmasByCursoIdClient, listTurmasByCursoSlugClient } from '@/services/turma-actions'
import { useSession } from 'next-auth/react'
import { getCoordenadorCursoAtivoByCursoId } from '@/services/coordenador-curso-actions'
import type { Curso, ProfessorCurso, PeriodoCurso } from '@/types/cursos'
import type { CoordenadorCurso } from '@/types/coordenador-curso'

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

export function useCoordenadorCursoAtivo(cursoId?: string) {
  return useQuery<CoordenadorCurso | null>({
    queryKey: ['curso', cursoId, 'coordenador-ativo'],
    queryFn: async () => {
      if (!cursoId) return null
      return await getCoordenadorCursoAtivoByCursoId(cursoId)
    },
    enabled: !!cursoId,
    staleTime: 30_000,
    refetchOnWindowFocus: false,
  })
}

export function useTurmasDoCurso(slugOrId?: string) {
  const { data: session, status } = useSession()
  return useQuery<import('@/types/turmas').Turma[]>({
    queryKey: ['curso', slugOrId, 'turmas'],
    queryFn: async () => {
      if (!slugOrId) return []
      const isUuid = /^[0-9a-fA-F-]{36}$/.test(slugOrId)
      const token = (session as any)?.accessToken as string | undefined
      const res = isUuid
        ? await listTurmasByCursoIdClient(slugOrId, token)
        : await listTurmasByCursoSlugClient(slugOrId, token)
      return Array.isArray(res) ? res : []
    },
    enabled: !!slugOrId && status === 'authenticated',
    staleTime: 30_000,
  })
}
