"use server";

import axios from "axios";
import type { disciplina, DisciplinaCreate, DisciplinaUpdate } from "@/types/disciplina";

const serverApi = axios.create({
  baseURL: process.env.API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

export async function fetchDisciplinasServer(): Promise<disciplina[]> {
  try {
    const { data } = await serverApi.get<disciplina[]>("/disciplinas");
    return data;
  } catch (error) {
    console.error("Erro ao buscar disciplinas:", error);
    throw new Error("Falha ao carregar dados das disciplinas");
  }
}

// Função para buscar disciplinas por curso ID
export async function fetchDisciplinasByCursoIdServer(cursoId: string): Promise<disciplina[]> {
  try {
    const { data } = await serverApi.get<disciplina[]>(`/cursos/${cursoId}/disciplinas`);
    return data;
  } catch (error) {
    console.error("Erro ao buscar disciplinas por curso:", error);
    throw new Error("Falha ao carregar disciplinas do curso");
  }
}

// Função para buscar uma disciplina específica por ID
export async function fetchDisciplinaByIdServer(id: string): Promise<disciplina> {
  try {
    const { data } = await serverApi.get<disciplina>(`/disciplinas/${id}`);
    return data;
  } catch (error) {
    console.error("Erro ao buscar disciplina por ID:", error);
    throw new Error("Falha ao carregar dados da disciplina");
  }
}

// Função para criar uma nova disciplina
export async function createDisciplinaServer(disciplina: DisciplinaCreate): Promise<disciplina> {
  try {
    console.log("[DEBUG] Criando disciplina:", disciplina);
    console.log("[DEBUG] URL da API:", process.env.API_BASE_URL);
    
    const { data } = await serverApi.post<disciplina>("/disciplinas", disciplina);
    
    console.log("[DEBUG] Disciplina criada com sucesso:", data);
    return data;
  } catch (error) {
    console.error("[ERROR] Erro detalhado ao criar disciplina:", {
      error,
      message: error instanceof Error ? error.message : 'Erro desconhecido',
      response: error instanceof Error && 'response' in error ? error.response : null,
      disciplina
    });
    throw new Error("Falha ao criar disciplina");
  }
}

// Função para atualizar uma disciplina
export async function updateDisciplinaServer(id: string, disciplina: DisciplinaUpdate): Promise<disciplina> {
  try {
    const { data } = await serverApi.put<disciplina>(`/disciplinas/${id}`, disciplina);
    return data;
  } catch (error) {
    console.error("Erro ao atualizar disciplina:", error);
    throw new Error("Falha ao atualizar disciplina");
  }
}

// Função para deletar uma disciplina
export async function deleteDisciplinaServer(id: string): Promise<void> {
  try {
    await serverApi.delete(`/disciplinas/${id}`);
  } catch (error) {
    console.error("Erro ao deletar disciplina:", error);
    throw new Error("Falha ao deletar disciplina");
  }
}