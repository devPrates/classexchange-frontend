"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCampusListStore } from "@/store/campus-store";
import { useCampusQuery, useDeleteCampus } from "@/hooks/use-campus";
import { CampusCard } from "@/components/dashboard/campus/campus-card";
import { CampusCardSkeleton } from "@/components/loadings/campus-card-skeleton";
import { CreateCampusDialog } from "@/components/dashboard/campus/create-campus-dialog";
import { EditCampusDialog } from "@/components/dashboard/campus/edit-campus-dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { Campus } from "@/types/Campus";
import { toast } from "sonner";

export default function InstituicaoPage() {
  const router = useRouter();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedCampusId, setSelectedCampusId] = useState<string | null>(null);
  const search = useCampusListStore((s) => s.search);
  const setSearch = useCampusListStore((s) => s.setSearch);

  const { data, isLoading, isError, refetch } = useCampusQuery();
  const deleteCampusMutation = useDeleteCampus();

  const filteredCampus = (data ?? []).filter((campus) =>
    campus.nome.toLowerCase().includes(search.toLowerCase())
  );

  const handleEditCampus = (campus: Campus) => {
    setSelectedCampusId(campus.id);
    setIsEditDialogOpen(true);
  };

  const handleDeleteCampus = async (campus: Campus) => {
    try {
      await deleteCampusMutation.mutateAsync(campus.id);
      toast.success(`Campus "${campus.nome}" excluído com sucesso!`);
    } catch (error) {
      console.error('Erro ao excluir campus:', error);
      toast.error('Erro ao excluir campus. Tente novamente.');
    }
  };

  return (
    <section className="space-y-6">
      {/* Header com busca */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Campus</h1>
          <p className="text-gray-600 dark:text-gray-400">Gerencie os campus da instituição</p>
        </div>
        <div className="flex gap-2">
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar campus por nome..."
            className="w-full sm:w-80"
          />
          <Button onClick={() => setIsCreateDialogOpen(true)}>
            Novo Campus
          </Button>
        </div>
      </div>

      {/* Lista de cards */}
      {isLoading ? (
        <div className="space-y-4">
          {/* Mostra 3 skeletons durante o carregamento */}
          {Array.from({ length: 3 }).map((_, index) => (
            <CampusCardSkeleton key={index} />
          ))}
        </div>
      ) : isError ? (
        <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
          <p className="text-lg text-red-600 dark:text-red-400">Falha ao carregar os campus.</p>
          <Button onClick={() => refetch()} variant="outline">
            Tentar novamente
          </Button>
        </div>
      ) : filteredCampus.length > 0 ? (
        <div className="space-y-4">
          {filteredCampus.map((campus) => (
            <CampusCard
              key={campus.id}
              campus={campus}
              onEdit={handleEditCampus}
              onDelete={handleDeleteCampus}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-[300px] space-y-4">
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {search ? 'Nenhum campus encontrado com esse nome.' : 'Nenhum campus cadastrado.'}
          </p>
          {search && (
            <Button variant="outline" onClick={() => setSearch('')}>
              Limpar busca
            </Button>
          )}
        </div>
      )}

      {/* Dialog para criar novo campus */}
      <CreateCampusDialog 
        open={isCreateDialogOpen} 
        onOpenChange={setIsCreateDialogOpen} 
      />

      {/* Dialog para editar campus */}
      <EditCampusDialog 
        open={isEditDialogOpen} 
        onOpenChange={setIsEditDialogOpen}
        campusId={selectedCampusId}
      />
    </section>
  );
}
