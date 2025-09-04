"use server";

import axios from "axios";
import type { Campus } from "@/types/Campus";

const serverApi = axios.create({
  baseURL: process.env.API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

export async function fetchCampusServer(): Promise<Campus[]> {
  try {
    const { data } = await serverApi.get<Campus[]>("/campus");
    return data;
  } catch (error) {
    console.error("Erro ao buscar campus:", error);
    throw new Error("Falha ao carregar dados dos campus");
  }
}

// Função para criar um novo campus
export async function createCampusServer(campus: Omit<Campus, "id" | "createdAt" | "updatedAt">): Promise<Campus> {
  try {
    const { data } = await serverApi.post<Campus>("/campus", campus);
    return data;
  } catch (error) {
    console.error("Erro ao criar campus:", error);
    throw new Error("Falha ao criar campus");
  }
}

// Função para atualizar um campus
export async function updateCampusServer(id: string, campus: Partial<Campus>): Promise<Campus> {
  try {
    const { data } = await serverApi.put<Campus>(`/campus/${id}`, campus);
    return data;
  } catch (error) {
    console.error("Erro ao atualizar campus:", error);
    throw new Error("Falha ao atualizar campus");
  }
}

// Função para deletar um campus
export async function deleteCampusServer(id: string): Promise<void> {
  try {
    await serverApi.delete(`/campus/${id}`);
  } catch (error) {
    console.error("Erro ao deletar campus:", error);
    throw new Error("Falha ao deletar campus");
  }
}