import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { listUsuarios, getUsuarioById } from '@/services/usuario-actions'
import type { Usuario } from '@/types/usuarios'
import api, { setAuthToken } from '@/services/api'
import { useSession } from 'next-auth/react'

export function useUsuarios(searchQuery?: string) {
  const { status, data: session } = useSession()
  useEffect(() => {
    const token = (session as any)?.accessToken as string | undefined
    if (token) setAuthToken(token)
  }, [session])

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
    enabled: status === 'authenticated',
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
