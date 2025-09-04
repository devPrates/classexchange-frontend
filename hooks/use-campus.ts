import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchCampusServer, createCampusServer, updateCampusServer, deleteCampusServer } from "@/services/campus-service";
import type { Campus } from "@/types/Campus";

export const useCampusQuery = () => {
  return useQuery({
    queryKey: ["campus"],
    queryFn: fetchCampusServer,
    staleTime: 1000 * 60 * 5,
  });
};

// Hook para criar campus
export const useCreateCampus = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createCampusServer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["campus"] });
    },
  });
};

// Hook para atualizar campus
export const useUpdateCampus = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Campus> }) => 
      updateCampusServer(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["campus"] });
    },
  });
};

// Hook para deletar campus
export const useDeleteCampus = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: deleteCampusServer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["campus"] });
    },
  });
};
