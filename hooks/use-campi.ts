import { useQuery } from '@tanstack/react-query'
import { listCampi, getCampusBySlug } from '@/services/campus-actions'
import { Campus } from '@/types/campus'

export function useCampi(searchQuery?: string) {
  return useQuery<Campus[]>({
    queryKey: ['campi'],
    queryFn: async () => {
      return await listCampi()
    },
    select: (data) => {
      if (!searchQuery) return data
      const q = searchQuery.toLowerCase()
      return data.filter((c) => c.nome.toLowerCase().includes(q))
    },
  })
}

export function useCampusBySlug(slug: string) {
  return useQuery<Campus>({
    queryKey: ['campus', slug],
    queryFn: async () => {
      return await getCampusBySlug(slug)
    },
    enabled: !!slug,
  })
}