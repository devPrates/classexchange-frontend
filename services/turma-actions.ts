"use server"

import api from '@/services/api'
import type { TurmaDetalhe, Turma, CreateTurma } from '@/types/turmas'

export async function getTurmaBySlug(slug: string): Promise<TurmaDetalhe> {
  const { data } = await api.get(`/turmas/slug/${slug}`)
  return data as TurmaDetalhe
}

export async function getTurmaById(id: string): Promise<Turma> {
  const { data } = await api.get(`/turmas/${id}`)
  return data as Turma
}

export async function createTurma(payload: CreateTurma): Promise<Turma> {
  const { data } = await api.post('/turmas', payload)
  return data as Turma
}

export async function listTurmasByCursoId(cursoId: string): Promise<Turma[]> {
  const { data } = await api.get(`/turmas/curso/${cursoId}`)
  return data as Turma[]
}

export async function listTurmasByCursoSlug(slug: string): Promise<Turma[]> {
  const { data } = await api.get(`/turmas/curso/slug/${slug}`)
  return data as Turma[]
}

export async function listTurmasByCursoIdClient(cursoId: string, token?: string): Promise<Turma[]> {
  const headers = token ? { Authorization: `Bearer ${token}` } : undefined
  const { data } = await api.get(`/turmas/curso/${cursoId}`, { headers })
  return data as Turma[]
}

export async function listTurmasByCursoSlugClient(slug: string, token?: string): Promise<Turma[]> {
  const headers = token ? { Authorization: `Bearer ${token}` } : undefined
  const { data } = await api.get(`/turmas/curso/slug/${slug}`, { headers })
  return data as Turma[]
}
