"use server"

import type { DiretorEnsino, CreateDiretorEnsino, UpdateDiretorEnsino } from '@/types/diretor-ensino'
import { apiServer } from '@/services/api'

export async function listDiretoresEnsino(): Promise<DiretorEnsino[]> {
  const api = await apiServer()
  const { data } = await api.get('/diretorEnsino')
  return data as DiretorEnsino[]
}

export async function getDiretorEnsinoById(id: string): Promise<DiretorEnsino> {
  const api = await apiServer()
  const { data } = await api.get(`/diretorEnsino/${id}`)
  return data as DiretorEnsino
}

export async function getDiretorEnsinoAtivoPorCampus(campusId: string): Promise<DiretorEnsino | null> {
  const api = await apiServer()
  try {
    const { data } = await api.get(`/diretorEnsino/campus/${campusId}`)
    return data as DiretorEnsino
  } catch (err: any) {
    if (err?.response?.status === 404) return null
    throw err
  }
}

export async function createDiretorEnsino(payload: CreateDiretorEnsino): Promise<DiretorEnsino> {
  const api = await apiServer()
  const { data } = await api.post('/diretorEnsino', payload)
  return data as DiretorEnsino
}

export async function updateDiretorEnsinoById(id: string, payload: UpdateDiretorEnsino): Promise<DiretorEnsino> {
  const api = await apiServer()
  const { data } = await api.put(`/diretorEnsino/${id}`, payload)
  return data as DiretorEnsino
}

export async function deleteDiretorEnsinoById(id: string): Promise<void> {
  const api = await apiServer()
  await api.delete(`/diretorEnsino/${id}`)
}

