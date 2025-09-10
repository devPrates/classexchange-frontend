import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { 
  fetchDisciplinasServer, 
  fetchDisciplinasByCursoIdServer,
  fetchDisciplinaByIdServer, 
  createDisciplinaServer, 
  updateDisciplinaServer, 
  deleteDisciplinaServer 
} from "@/services/disciplina-service";
import type { disciplina, DisciplinaCreate, DisciplinaUpdate } from "@/types/disciplina";



// Hook para buscar disciplinas por curso ID
export const useDisciplinasByCursoIdQuery = (cursoId: string) => {
  return useQuery({
    queryKey: ["disciplinas", "curso", cursoId],
    queryFn: () => fetchDisciplinasByCursoIdServer(cursoId),
    enabled: !!cursoId,
    staleTime: 1000 * 60 * 5,
  });
};

// Hook para buscar uma disciplina específica por ID
export const useDisciplinaByIdQuery = (id: string) => {
  return useQuery({
    queryKey: ["disciplinas", id],
    queryFn: () => fetchDisciplinaByIdServer(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
};



// Hook para criar disciplina
export const useCreateDisciplina = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createDisciplinaServer,
    onSuccess: (newDisciplina) => {
      // Invalida todas as queries de disciplinas
      queryClient.invalidateQueries({ queryKey: ["disciplinas"] });
      // Invalida especificamente as disciplinas do curso
      if (newDisciplina.cursoId) {
        queryClient.invalidateQueries({ queryKey: ["disciplinas", "curso", newDisciplina.cursoId] });
        // Invalida os dados do curso para atualizar a tabela
        queryClient.invalidateQueries({ queryKey: ["cursos", newDisciplina.cursoId] });
      }
    },
    onError: (error) => {
      console.error("[ERROR] Erro no hook de criação de disciplina:", error);
    },
  });
};

// Hook para atualizar disciplina
export const useUpdateDisciplina = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: DisciplinaUpdate }) => 
      updateDisciplinaServer(id, data),
    onSuccess: (updatedDisciplina) => {
      queryClient.invalidateQueries({ queryKey: ["disciplinas"] });
      if (updatedDisciplina.cursoId) {
        queryClient.invalidateQueries({ queryKey: ["disciplinas", "curso", updatedDisciplina.cursoId] });
        // Invalida os dados do curso para atualizar a tabela
        queryClient.invalidateQueries({ queryKey: ["cursos", updatedDisciplina.cursoId] });
      }
    },
  });
};

// Hook para deletar disciplina
export const useDeleteDisciplina = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: deleteDisciplinaServer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["disciplinas"] });
      // Invalida todos os dados de cursos para atualizar as tabelas
      queryClient.invalidateQueries({ queryKey: ["cursos"] });
    },
  });
};