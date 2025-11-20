import { useQuery } from '@tanstack/react-query'
import { listEstudantes, getEstudanteById } from '@/services/estudante-actions'
import type { Estudante } from '@/types/estudantes'

export function useEstudantes(searchQuery?: string) {
  return useQuery<Estudante[]>({
    queryKey: ['estudantes', searchQuery ?? ''],
    queryFn: async () => {
      return await listEstudantes()
    },
    select: (data) => {
      if (!searchQuery) return data
      const q = searchQuery.toLowerCase()
      return data.filter((e) => [e.nome, e.email].some((f) => String(f).toLowerCase().includes(q)))
    },
    staleTime: 60_000,
  })
}

export function useEstudante(id?: string) {
  return useQuery<Estudante>({
    queryKey: ['estudante', id],
    queryFn: async () => {
      if (!id) throw new Error('no-id')
      return await getEstudanteById(id)
    },
    enabled: !!id,
  })
}