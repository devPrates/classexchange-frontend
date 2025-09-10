import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { 
  fetchTurmasServer, 
  fetchTurmasByCursoIdServer,
  fetchTurmaByIdServer, 
  createTurmaServer, 
  updateTurmaServer, 
  deleteTurmaServer 
} from "@/services/turma-service";
import type { Turma, TurmaCreate, TurmaUpdate } from "@/types/turma";

// Hook para buscar todas as turmas
export const useTurmasQuery = () => {
  return useQuery({
    queryKey: ["turmas"],
    queryFn: fetchTurmasServer,
    staleTime: 1000 * 60 * 5,
  });
};

// Hook para buscar turmas por curso ID
export const useTurmasByCursoIdQuery = (cursoId: string) => {
  return useQuery({
    queryKey: ["turmas", "curso", cursoId],
    queryFn: () => fetchTurmasByCursoIdServer(cursoId),
    enabled: !!cursoId,
    staleTime: 1000 * 60 * 5,
  });
};

// Hook para buscar uma turma específica por ID
export const useTurmaByIdQuery = (id: string) => {
  return useQuery({
    queryKey: ["turmas", id],
    queryFn: () => fetchTurmaByIdServer(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
};

// Hook para criar turma
export const useCreateTurma = () => {
  const queryClient = useQueryClient();
  
  return useMutation<Turma, Error, TurmaCreate>({
    mutationFn: createTurmaServer,
    onSuccess: (newTurma) => {
      // Invalida todas as queries de turmas
      queryClient.invalidateQueries({ queryKey: ["turmas"] });
      // Invalida especificamente as turmas do curso
      if (newTurma.cursoId) {
        queryClient.invalidateQueries({ queryKey: ["turmas", "curso", newTurma.cursoId] });
        // Invalida os dados do curso para atualizar a tabela
        queryClient.invalidateQueries({ queryKey: ["cursos", newTurma.cursoId] });
      }
    },
    onError: (error) => {
      console.error("[ERROR] Erro no hook de criação de turma:", error);
    },
  });
};

// Hook para atualizar turma
export const useUpdateTurma = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: TurmaUpdate }) => 
      updateTurmaServer(id, data),
    onSuccess: (updatedTurma) => {
      queryClient.invalidateQueries({ queryKey: ["turmas"] });
      if (updatedTurma.cursoId) {
        queryClient.invalidateQueries({ queryKey: ["turmas", "curso", updatedTurma.cursoId] });
        // Invalida os dados do curso para atualizar a tabela
        queryClient.invalidateQueries({ queryKey: ["cursos", updatedTurma.cursoId] });
      }
    },
  });
};

// Hook para deletar turma
export const useDeleteTurma = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: deleteTurmaServer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["turmas"] });
      // Invalida todos os dados de cursos para atualizar as tabelas
      queryClient.invalidateQueries({ queryKey: ["cursos"] });
    },
  });
};