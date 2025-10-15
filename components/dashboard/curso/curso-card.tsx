"use client";

import { useRouter } from "next/navigation";
import { GraduationCap, Users, BookOpen, Calendar, User, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { curso } from "@/types/cursos";
import Link from "next/link";

interface CursoCardProps {
  curso: curso;
}

export function CursoCard({ curso }: CursoCardProps) {
  const router = useRouter();

  return (
    <Card className="hover:shadow-lg transition-all duration-300 border-t-4 border-t-green-500 bg-white dark:bg-gray-900">
      {/* Header Principal - Estilo Horizontal */}
      <CardHeader className="pb-6 border-b border-border/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-green-500/10 p-4 rounded-xl border border-green-500/20">
              <GraduationCap className="h-8 w-8 text-green-600" />
            </div>
            <div className="space-y-1">
              <h2 className="text-xl font-bold tracking-tight text-foreground">
                {curso.nome}
              </h2>
              <div className="flex items-center gap-2">
                <div className="h-1 w-8 bg-green-500 rounded-full"></div>
                <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                  {curso.sigla}
                </p>
              </div>
              <p className="text-sm text-muted-foreground font-medium">
                Campus: {curso.campusNome}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button asChild size="sm" variant="default" className="gap-1.5">
              <Link href={`/dashboard/cursos/${curso.slug}`}>
                <Eye className="h-4 w-4" />
                Ver
              </Link>
            </Button>
          </div>
        </div>
      </CardHeader>

      {/* Conteúdo Organizado - Layout Simples */}
      <CardContent className="pt-4">
        <div className="space-y-4">
          {/* Coordenador */}
          <div className="flex items-center gap-3">
            <User className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            <p className="text-sm font-medium text-foreground">Coordenador:</p>
            <p className="text-sm text-muted-foreground">
              Prof. Dr. Maria Santos
            </p>
          </div>

          {/* Linha separadora */}
          <div className="border-t border-border/30"></div>

          {/* Estatísticas */}
          <div className="space-y-4">
            {/* Primeira linha - Alunos e Turmas */}
            <div className="grid grid-cols-2 gap-8">
              <div className="flex items-center gap-3">
                <Users className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm font-medium text-foreground">Alunos:</p>
                <div className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-semibold">
                  180
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm font-medium text-foreground">Turmas:</p>
                <div className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-semibold">
                  6
                </div>
              </div>
            </div>

            {/* Linha separadora */}
            <div className="border-t border-border/30"></div>

            {/* Segunda linha - Disciplinas e Semestres */}
            <div className="grid grid-cols-2 gap-8">
              <div className="flex items-center gap-3">
                <BookOpen className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm font-medium text-foreground">Disciplinas:</p>
                <div className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-semibold">
                  24
                </div>
              </div>
              <div className="flex items-center gap-3">
                <GraduationCap className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm font-medium text-foreground">Semestres:</p>
                <div className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-semibold">
                  8
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}