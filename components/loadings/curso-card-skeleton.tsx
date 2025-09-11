"use client";

import { GraduationCap, Users, BookOpen, Calendar, User } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function CursoCardSkeleton() {
  return (
    <Card className="animate-pulse border-t-4 border-t-gray-300 bg-white dark:bg-gray-800">
      {/* Header Principal - Estilo Horizontal */}
      <CardHeader className="pb-6 border-b border-border/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-4 rounded-xl border">
              <Skeleton className="h-8 w-8" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-6 w-48" />
              <div className="flex items-center gap-2">
                <Skeleton className="h-1 w-8 rounded-full" />
                <Skeleton className="h-4 w-16" />
              </div>
              <Skeleton className="h-4 w-32" />
            </div>
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-8 w-16 rounded" />
          </div>
        </div>
      </CardHeader>

      {/* Conteúdo Organizado - Layout Simples */}
      <CardContent className="pt-4">
        <div className="space-y-4">
          {/* Coordenador */}
          <div className="flex items-center gap-3">
            <User className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-32" />
          </div>
          
          {/* Linha separadora */}
          <div className="border-t border-border/30"></div>

          {/* Estatísticas */}
           <div className="space-y-4">
             {/* Primeira linha - Alunos e Turmas */}
             <div className="grid grid-cols-2 gap-8">
               <div className="flex items-center gap-3">
                 <Users className="h-4 w-4 text-muted-foreground" />
                 <Skeleton className="h-4 w-12" />
                 <Skeleton className="h-6 w-8 rounded" />
               </div>
               <div className="flex items-center gap-3">
                 <Calendar className="h-4 w-4 text-muted-foreground" />
                 <Skeleton className="h-4 w-12" />
                 <Skeleton className="h-6 w-8 rounded" />
               </div>
             </div>
             
             {/* Linha separadora */}
             <div className="border-t border-border/30"></div>
             
             {/* Segunda linha - Disciplinas e Semestres */}
             <div className="grid grid-cols-2 gap-8">
               <div className="flex items-center gap-3">
                 <BookOpen className="h-4 w-4 text-muted-foreground" />
                 <Skeleton className="h-4 w-16" />
                 <Skeleton className="h-6 w-8 rounded" />
               </div>
               <div className="flex items-center gap-3">
                 <GraduationCap className="h-4 w-4 text-muted-foreground" />
                 <Skeleton className="h-4 w-16" />
                 <Skeleton className="h-6 w-8 rounded" />
               </div>
             </div>
           </div>
        </div>
      </CardContent>
    </Card>
  );
}