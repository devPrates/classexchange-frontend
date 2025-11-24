"use server"

import type { Curso, CreateCurso, UpdateCurso, ProfessorCurso, PeriodoCurso } from '@/types/cursos'
import api from '@/services/api'

export async function listCursos(): Promise<Curso[]> {
  const { data } = await api.get('/cursos')
  return data as Curso[]
}

export async function getCursoBySlug(slug: string): Promise<Curso> {
  const { data } = await api.get(`/cursos/slug/${slug}`)
  return data as Curso
}

export async function getCursoById(id: string): Promise<Curso> {
  const { data } = await api.get(`/cursos/${id}`)
  return data as Curso
}

export async function createCurso(payload: CreateCurso): Promise<Curso> {
  const { data } = await api.post('/cursos', payload)
  return data as Curso
}

export async function updateCursoById(id: string, payload: UpdateCurso): Promise<Curso> {
  const { data } = await api.put(`/cursos/${id}`, payload)
  return data as Curso
}

export async function deleteCursoById(id: string): Promise<void> {
  await api.delete(`/cursos/${id}`)
}

export async function setCoordenadorCurso(cursoId: string, payload: { usuarioId: string; inicio?: string; fim?: string }): Promise<Curso> {
  const { data } = await api.put(`/cursos/${cursoId}/coordenador`, payload)
  return data as Curso
}

export async function listProfessoresByCursoId(id: string): Promise<ProfessorCurso[]> {
  const { data } = await api.get(`/cursos/${id}/professores`)
  return data as ProfessorCurso[]
}

export async function listPeriodosByCursoId(id: string): Promise<PeriodoCurso[]> {
  const { data } = await api.get(`/cursos/${id}/periodos`)
  return data as PeriodoCurso[]
}
