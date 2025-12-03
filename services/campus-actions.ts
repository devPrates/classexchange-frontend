"use server"

import type { Campus, CreateCampus, UpdateCampus } from '@/types/campus'
import { apiServer } from '@/services/api'

export async function listCampi(): Promise<Campus[]> {
  const api = await apiServer()
  const { data } = await api.get('/campus')
  return data as Campus[]
}

export async function getCampusBySlug(slug: string): Promise<Campus> {
  const api = await apiServer()
  const { data } = await api.get(`/campus/slug/${slug}`)
  return data as Campus
}

export async function getCampusById(id: string): Promise<Campus> {
  const api = await apiServer()
  const { data } = await api.get(`/campus/${id}`)
  return data as Campus
}

export async function createCampus(payload: CreateCampus): Promise<Campus> {
  const api = await apiServer()
  const { data } = await api.post('/campus', payload)
  return data as Campus
}

export async function updateCampusById(id: string, payload: UpdateCampus): Promise<Campus> {
  const api = await apiServer()
  const { data } = await api.put(`/campus/${id}`, payload)
  return data as Campus
}

export async function deleteCampusById(id: string): Promise<void> {
  const api = await apiServer()
  await api.delete(`/campus/${id}`)
}

export async function setDiretorEnsino(campusId: string, payload: { usuarioId: string }): Promise<Campus> {
  const api = await apiServer()
  const { data } = await api.put(`/campus/${campusId}/diretor-ensino`, payload)
  return data as Campus
}
