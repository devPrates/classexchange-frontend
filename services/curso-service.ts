"use server";

import axios from "axios";
import type { curso, CreateCurso, UpdateCurso } from "@/types/cursos";

const serverApi = axios.create({
  baseURL: process.env.API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

export async function fetchCursosServer(): Promise<curso[]> {
  try {
    const { data } = await serverApi.get<curso[]>("/cursos");
    return data;
  } catch (error) {
    console.error("Erro ao buscar cursos:", error);
    throw new Error("Falha ao carregar dados dos cursos");
  }
}

// Função para buscar um curso específico por ID
export async function fetchCursoByIdServer(id: string): Promise<curso> {
  try {
    const { data } = await serverApi.get<curso>(`/cursos/${id}`);
    return data;
  } catch (error) {
    console.error("Erro ao buscar curso por ID:", error);
    throw new Error("Falha ao carregar dados do curso");
  }
}

// Função para buscar um curso específico por slug
export async function fetchCursoBySlugServer(slug: string): Promise<curso> {
  try {
    const { data } = await serverApi.get<curso>(`/cursos/slug/${slug}`);
    return data;
  } catch (error) {
    console.error("Erro ao buscar curso por slug:", error);
    throw new Error("Falha ao carregar dados do curso");
  }
}

// Função para criar um novo curso
export async function createCursoServer(curso: CreateCurso): Promise<curso> {
  try {
    const { data } = await serverApi.post<curso>("/cursos", curso);
    return data;
  } catch (error) {
    console.error("Erro ao criar curso:", error);
    throw new Error("Falha ao criar curso");
  }
}

// Função para atualizar um curso
export async function updateCursoServer(id: string, curso: UpdateCurso): Promise<curso> {
  try {
    const { data } = await serverApi.put<curso>(`/cursos/${id}`, curso);
    return data;
  } catch (error) {
    console.error("Erro ao atualizar curso:", error);
    throw new Error("Falha ao atualizar curso");
  }
}

// Função para deletar um curso
export async function deleteCursoServer(id: string): Promise<void> {
  try {
    await serverApi.delete(`/cursos/${id}`);
  } catch (error) {
    console.error("Erro ao deletar curso:", error);
    throw new Error("Falha ao deletar curso");
  }
}