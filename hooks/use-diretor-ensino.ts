import { useQuery } from '@tanstack/react-query'
import { getDiretorEnsinoById, getDiretorEnsinoAtivoPorCampus } from '@/services/diretor-ensino-actions'
import type { DiretorEnsino } from '@/types/diretor-ensino'

export function useDiretorEnsino(id?: string) {
  return useQuery<DiretorEnsino>({
    queryKey: ['diretor-ensino', id],
    queryFn: async () => {
      if (!id) throw new Error('no-id')
      return await getDiretorEnsinoById(id)
    },
    enabled: !!id,
    staleTime: 60_000,
  })
}

export function useDiretorEnsinoPorCampus(campusId?: string) {
  return useQuery<DiretorEnsino>({
    queryKey: ['diretor-ensino-por-campus', campusId],
    queryFn: async () => {
      if (!campusId) throw new Error('no-campus')
      return await getDiretorEnsinoAtivoPorCampus(campusId)
    },
    enabled: !!campusId,
    staleTime: 60_000,
  })
}

