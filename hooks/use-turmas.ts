import { useQuery } from '@tanstack/react-query'
import { getTurmaBySlug, getTurmaById } from '@/services/turma-actions'
import type { TurmaDetalhe } from '@/types/turmas'

export function useTurmaBySlugOrId(param: string) {
  return useQuery<TurmaDetalhe>({
    queryKey: ['turma', param],
    queryFn: async () => {
      try {
        return await getTurmaBySlug(param)
      } catch {
        const byId = await getTurmaById(param)
        // When fetching by id, we need slug to fetch full details; fallback to minimal structure
        // Prefer re-fetch by slug if available
        return await getTurmaBySlug(byId.slug)
      }
    },
    enabled: !!param,
  })
}
