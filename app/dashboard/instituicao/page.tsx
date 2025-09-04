"use client";

import { useCampusListStore } from "@/store/campus-store";
import { useCampusQuery } from "@/hooks/use-campus";
import { CampusCard } from "@/components/dashboard/campus-card";
import { CampusCardSkeleton } from "@/components/loadings/campus-card-skeleton";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { Campus } from "@/types/Campus";

export default function InstituicaoPage() {
  const search = useCampusListStore((s) => s.search);
  const setSearch = useCampusListStore((s) => s.setSearch);

  const { data, isLoading, isError, refetch } = useCampusQuery();

  if (isLoading) {
    return (
      <section className="space-y-6">
        {/* Header com busca - mantém estático */}
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
            <Button>
              Novo Campus
            </Button>
          </div>
        </div>

        {/* Skeletons de loading */}
        <div className="space-y-4">
          <CampusCardSkeleton />
          <CampusCardSkeleton />
          <CampusCardSkeleton />
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <p className="text-lg text-red-600 dark:text-red-400">Falha ao carregar os campus.</p>
        <Button onClick={() => refetch()} variant="outline">
          Tentar novamente
        </Button>
      </div>
    );
  }

  const filteredCampus = (data ?? []).filter((campus) =>
    campus.nome.toLowerCase().includes(search.toLowerCase())
  );

  const handleEditCampus = (campus: Campus) => {
    // TODO: Implementar navegação para página de edição
    console.log('Editar campus:', campus);
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
          <Button>
            Novo Campus
          </Button>
        </div>
      </div>

      {/* Lista de cards */}
      {filteredCampus.length > 0 ? (
        <div className="space-y-4">
          {filteredCampus.map((campus) => (
            <CampusCard
              key={campus.id}
              campus={campus}
              onEdit={handleEditCampus}
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
    </section>
  );
}
