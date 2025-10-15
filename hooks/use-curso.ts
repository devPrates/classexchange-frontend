import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchCursosServer, fetchCursoByIdServer, fetchCursoBySlugServer, createCursoServer, updateCursoServer, deleteCursoServer } from "@/services/curso-service";
import type { curso, CreateCurso, UpdateCurso } from "@/types/cursos";

export const useCursoQuery = () => {
  return useQuery({
    queryKey: ["cursos"],
    queryFn: fetchCursosServer,
    staleTime: 1000 * 60 * 5,
  });
};

// Hook para buscar um curso específico por ID
export const useCursoByIdQuery = (id: string) => {
  return useQuery({
    queryKey: ["cursos", id],
    queryFn: () => fetchCursoByIdServer(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
};

// Hook para buscar um curso específico por slug
export const useCursoBySlugQuery = (slug: string) => {
  return useQuery({
    queryKey: ["cursos", "slug", slug],
    queryFn: () => fetchCursoBySlugServer(slug),
    enabled: !!slug,
    staleTime: 1000 * 60 * 5,
  });
};

// Hook para criar curso
export const useCreateCurso = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createCursoServer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cursos"] });
    },
  });
};

// Hook para atualizar curso
export const useUpdateCurso = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateCurso }) => 
      updateCursoServer(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cursos"] });
    },
  });
};

// Hook para deletar curso
export const useDeleteCurso = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: deleteCursoServer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cursos"] });
    },
  });
};