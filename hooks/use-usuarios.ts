import { useQuery } from '@tanstack/react-query'
import { listUsuarios, getUsuarioById } from '@/services/usuario-actions'
import type { Usuario } from '@/types/usuarios'
import api from '@/services/api'

export function useUsuarios(searchQuery?: string) {
  return useQuery<Usuario[]>({
    queryKey: ['usuarios', searchQuery ?? ''],
    queryFn: async () => {
      return await listUsuarios()
    },
    select: (data) => {
      if (!searchQuery) return data
      const q = searchQuery.toLowerCase()
      return data.filter((u) => [u.nome, u.email, u.celular, u.campusNome, u.role].some((f) => String(f).toLowerCase().includes(q)))
    },
    staleTime: 60_000,
    refetchOnWindowFocus: false,
    enabled: typeof window !== 'undefined' && !!api.defaults.headers.common['Authorization'],
  })
}

export function useUsuario(id?: string) {
  return useQuery<Usuario>({
    queryKey: ['usuario', id],
    queryFn: async () => {
      if (!id) throw new Error('no-id')
      return await getUsuarioById(id)
    },
    enabled: !!id,
  })
}
