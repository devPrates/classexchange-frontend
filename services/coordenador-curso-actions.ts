"use server"

import { apiServer } from '@/services/api'
import type { CoordenadorCurso, CreateCoordenadorCurso, UpdateCoordenadorCurso } from '@/types/coordenador-curso'

export async function getCoordenadorCursoAtivoByCursoId(cursoId: string): Promise<CoordenadorCurso | null> {
  const api = await apiServer()
  try {
    const { data } = await api.get(`/coordenadorCurso/curso/${cursoId}`)
    return data as CoordenadorCurso
  } catch (err: any) {
    if (err?.response?.status === 404) return null
    throw err
  }
}

export async function createCoordenadorCurso(payload: CreateCoordenadorCurso): Promise<CoordenadorCurso> {
  const api = await apiServer()
  const { data } = await api.post('/coordenadorCurso', payload)
  return data as CoordenadorCurso
}

export async function updateCoordenadorCurso(id: string, payload: UpdateCoordenadorCurso): Promise<CoordenadorCurso> {
  const api = await apiServer()
  const { data } = await api.put(`/coordenadorCurso/${id}`, payload)
  return data as CoordenadorCurso
}
