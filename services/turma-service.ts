"use server";

import axios from "axios";
import type { Turma, TurmaCreate, TurmaUpdate } from "@/types/turma";

const serverApi = axios.create({
  baseURL: process.env.API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// Buscar todas as turmas
export async function fetchTurmasServer(): Promise<Turma[]> {
  try {
    const { data } = await serverApi.get<Turma[]>("/turmas");
    return data;
  } catch (error) {
    console.error("Erro ao buscar turmas:", error);
    throw new Error("Falha ao carregar dados das turmas");
  }
}

// Buscar turmas por curso ID
export async function fetchTurmasByCursoIdServer(cursoId: string): Promise<Turma[]> {
  try {
    const { data } = await serverApi.get<Turma[]>(`/turmas?cursoId=${cursoId}`);
    return data;
  } catch (error) {
    console.error("Erro ao buscar turmas por curso ID:", error);
    throw new Error("Falha ao carregar turmas do curso");
  }
}

// Buscar uma turma específica por ID
export async function fetchTurmaByIdServer(id: string): Promise<Turma> {
  try {
    const { data } = await serverApi.get<Turma>(`/turmas/${id}`);
    return data;
  } catch (error) {
    console.error("Erro ao buscar turma por ID:", error);
    throw new Error("Falha ao carregar dados da turma");
  }
}

// Criar nova turma
export async function createTurmaServer(turmaData: TurmaCreate): Promise<Turma> {
  try {
    const { data } = await serverApi.post<Turma>("/turmas", turmaData);
    return data;
  } catch (error) {
    console.error("Erro ao criar turma:", error);
    throw new Error("Falha ao criar turma");
  }
}

// Atualizar turma existente
export async function updateTurmaServer(id: string, turmaData: TurmaUpdate): Promise<Turma> {
  try {
    console.log("Dados enviados para atualização:", { id, turmaData });
    const { data } = await serverApi.put<Turma>(`/turmas/${id}`, turmaData);
    console.log("Resposta da API:", data);
    return data;
  } catch (error: any) {
    console.error("Erro ao atualizar turma:", error);
    console.error("Dados da resposta de erro:", error.response?.data);
    console.error("Status do erro:", error.response?.status);
    throw new Error("Falha ao atualizar turma");
  }
}

// Deletar turma
export async function deleteTurmaServer(id: string): Promise<void> {
  try {
    await serverApi.delete(`/turmas/${id}`);
  } catch (error) {
    console.error("Erro ao deletar turma:", error);
    throw new Error("Falha ao deletar turma");
  }
}