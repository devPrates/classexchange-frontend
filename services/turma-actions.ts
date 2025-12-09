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
