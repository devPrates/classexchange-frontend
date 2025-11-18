"use server"

import type { Disciplina, CreateDisciplina, UpdateDisciplina } from '@/types/disciplinas'
import api from '@/services/api'

export async function createDisciplina(payload: CreateDisciplina): Promise<Disciplina> {
  const { data } = await api.post('/disciplinas', payload)
  return data as Disciplina
}

export async function updateDisciplinaById(id: string, payload: UpdateDisciplina): Promise<Disciplina> {
  const { data } = await api.put(`/disciplinas/${id}`, payload)
  return data as Disciplina
}

export async function deleteDisciplinaById(id: string): Promise<void> {
  await api.delete(`/disciplinas/${id}`)
}

export async function getDisciplinaById(id: string): Promise<Disciplina> {
  const { data } = await api.get(`/disciplinas/${id}`)
  return data as Disciplina
}