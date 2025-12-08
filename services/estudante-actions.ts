"use server"

import { apiServer } from '@/services/api'
import type { Estudante, CreateEstudante, UpdateEstudante } from '@/types/estudantes'

export async function listEstudantes(): Promise<Estudante[]> {
  const api = await apiServer()
  const { data } = await api.get('/estudantes')
  return data as Estudante[]
}

export async function getEstudanteById(id: string): Promise<Estudante> {
  const api = await apiServer()
  const { data } = await api.get(`/estudantes/${id}`)
  return data as Estudante
}

export async function createEstudante(payload: CreateEstudante): Promise<Estudante> {
  try {
    const api = await apiServer()
    const { data } = await api.post('/estudantes', payload)
    return data as Estudante
  } catch (err: any) {
    const raw = err?.response?.data
    const msg = raw?.message || raw?.error || raw?.detail || err?.message
    throw new Error(msg || 'Falha ao criar estudante')
  }
}

export async function updateEstudanteById(id: string, payload: UpdateEstudante): Promise<Estudante> {
  const api = await apiServer()
  const { data } = await api.put(`/estudantes/${id}`, payload)
  return data as Estudante
}

export async function deleteEstudanteById(id: string): Promise<void> {
  try {
    const api = await apiServer()
    await api.delete(`/estudantes/${id}`)
  } catch (err: any) {
    const raw = err?.response?.data
    const msg = raw?.message || raw?.error || raw?.detail || err?.message
    const hasIntegrity = typeof msg === 'string' && msg.toLowerCase().includes('referential integrity')
    const friendly = hasIntegrity
      ? 'Estudante possui vínculos. Remova os vínculos antes de excluir.'
      : msg
    throw new Error(friendly || 'Falha ao excluir estudante')
  }
}
