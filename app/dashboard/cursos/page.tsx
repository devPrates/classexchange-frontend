
"use client";

import { useRouter } from "next/navigation";
import { useCursoListStore } from "@/store/curso-store";
import { useCursoQuery, useDeleteCurso } from "@/hooks/use-curso";
import { CursoCard } from "@/components/dashboard/curso/curso-card";
import { CursoCardSkeleton } from "@/components/loadings/curso-card-skeleton";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { curso } from "@/types/cursos";
import Link from "next/link";
import { toast } from "sonner";

export default function CursosPage() {
  const router = useRouter();
  const search = useCursoListStore((s) => s.search);
  const setSearch = useCursoListStore((s) => s.setSearch);

  const { data, isLoading, isError, refetch } = useCursoQuery();
  const deleteCursoMutation = useDeleteCurso();

  const filteredCursos = (data ?? []).filter((curso) =>
    curso.nome.toLowerCase().includes(search.toLowerCase()) ||
    curso.sigla.toLowerCase().includes(search.toLowerCase()) ||
    curso.campusNome.toLowerCase().includes(search.toLowerCase())
  );

  const handleEditCurso = (curso: curso) => {
    router.push(`/dashboard/cursos/editar/${curso.id}`);
  };

  const handleDeleteCurso = async (curso: curso) => {
    try {
      await deleteCursoMutation.mutateAsync(curso.id);
      toast.success(`Curso "${curso.nome}" excluído com sucesso!`);
    } catch (error) {
      console.error('Erro ao excluir curso:', error);
      toast.error('Erro ao excluir curso. Tente novamente.');
    }
  };

  return (
    <section className="space-y-6">
      {/* Header com busca */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Cursos</h1>
          <p className="text-gray-600 dark:text-gray-400">Gerencie os cursos da instituição</p>
        </div>
        <div className="flex gap-2">
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar cursos por nome, sigla ou campus..."
            className="w-full sm:w-80"
          />
          <Button asChild>
            <Link href="/dashboard/cursos/novo">
              Novo Curso
            </Link>
          </Button>
        </div>
      </div>

      {/* Lista de cards */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Mostra 6 skeletons durante o carregamento */}
          {Array.from({ length: 6 }).map((_, index) => (
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCursos.map((curso) => (
            <CursoCard
              key={curso.id}
              curso={curso}
              onEdit={handleEditCurso}
              onDelete={handleDeleteCurso}
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
    </section>
  );
}