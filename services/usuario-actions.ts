"use server"

import api from '@/services/api'
import type { Usuario, CreateUsuario, UpdateUsuario } from '@/types/usuarios'

export async function listUsuarios(): Promise<Usuario[]> {
  const { data } = await api.get('/usuarios')
  return data as Usuario[]
}

export async function getUsuarioById(id: string): Promise<Usuario> {
  const { data } = await api.get(`/usuarios/${id}`)
  return data as Usuario
}

export async function createUsuario(payload: CreateUsuario): Promise<Usuario> {
  try {
    const { data } = await api.post('/usuarios', payload)
    return data as Usuario
  } catch (err: any) {
    const raw = err?.response?.data
    const msg = raw?.message || raw?.error || raw?.detail || err?.message
    throw new Error(msg || 'Falha ao criar usuário')
  }
}

export async function updateUsuarioById(id: string, payload: UpdateUsuario): Promise<Usuario> {
  const { data } = await api.put(`/usuarios/${id}`, payload)
  return data as Usuario
}

export async function deleteUsuarioById(id: string): Promise<void> {
  try {
    await api.delete(`/usuarios/${id}`)
  } catch (err: any) {
    const raw = err?.response?.data
    const msg = raw?.message || raw?.error || raw?.detail || err?.message
    const hasIntegrity = typeof msg === 'string' && msg.toLowerCase().includes('referential integrity')
    const friendly = hasIntegrity
      ? 'Usuário possui vínculos (ex.: professor em curso). Remova os vínculos antes de excluir.'
      : msg
    throw new Error(friendly || 'Falha ao excluir usuário')
  }
}
