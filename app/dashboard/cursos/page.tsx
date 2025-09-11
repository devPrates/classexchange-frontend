
"use client";

import { useState } from "react";
import { Save, Search } from "lucide-react";
import { useCursoListStore } from "@/store/curso-store";
import { useCursoQuery } from "@/hooks/use-curso";
import { CursoCard } from "@/components/dashboard/curso/curso-card";
import { CursoCardSkeleton } from "@/components/loadings/curso-card-skeleton";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CreateCursoForm } from "@/components/dashboard/curso/create-curso-form";

export default function CursosPage() {
  const search = useCursoListStore((s) => s.search);
  const setSearch = useCursoListStore((s) => s.setSearch);
  const [isCreateCursoOpen, setIsCreateCursoOpen] = useState(false);

  const { data, isLoading, isError, refetch } = useCursoQuery();

  const filteredCursos = (data ?? []).filter((curso) =>
    curso.nome.toLowerCase().includes(search.toLowerCase()) ||
    curso.sigla.toLowerCase().includes(search.toLowerCase()) ||
    curso.campusNome.toLowerCase().includes(search.toLowerCase())
  );



  return (
    <section className="space-y-6">
      {/* Header com busca */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Cursos</h1>
          <p className="text-gray-600 dark:text-gray-400">Gerencie os cursos da instituição</p>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar cursos..."
              className="w-full sm:w-64 pl-10"
            />
          </div>
          <Button onClick={() => setIsCreateCursoOpen(true)}>
            <Save className="h-4 w-4 mr-2" />
            Novo Curso
          </Button>
        </div>
      </div>

      {/* Lista de cards */}
      {isLoading ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Mostra 4 skeletons durante o carregamento */}
          {Array.from({ length: 4 }).map((_, index) => (
            <CursoCardSkeleton key={index} />
          ))}
        </div>
      ) : isError ? (
        <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
          <p className="text-lg text-red-600 dark:text-red-400">Falha ao carregar os cursos.</p>
          <Button onClick={() => refetch()} variant="outline">
            Tentar novamente
          </Button>
        </div>
      ) : filteredCursos.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredCursos.map((curso) => (
            <CursoCard
              key={curso.id}
              curso={curso}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-[300px] space-y-4">
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {search ? 'Nenhum curso encontrado com esse termo.' : 'Nenhum curso cadastrado.'}
          </p>
          {search && (
            <Button variant="outline" onClick={() => setSearch('')}>
              Limpar busca
            </Button>
          )}
        </div>
      )}

      {/* Modal de Criação de Curso */}
      <CreateCursoForm 
        open={isCreateCursoOpen}
        onOpenChange={setIsCreateCursoOpen}
      />
    </section>
  );
}