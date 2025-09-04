"use client";

import { GraduationCap, Users, BookOpen, Calendar, User } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function CursoCardSkeleton() {
  return (
    <Card className="group relative overflow-hidden bg-gradient-to-br from-white via-blue-50/30 to-blue-100/50 dark:from-gray-900 dark:via-blue-950/30 dark:to-blue-900/20 border-0 shadow-lg">
      {/* Borda decorativa */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700"></div>
      
      {/* Header */}
      <CardHeader className="pb-4 relative">
        <div className="flex items-start justify-between gap-4">
          {/* Informações principais */}
          <div className="flex items-start gap-4 flex-1 min-w-0">
            {/* Ícone */}
            <div className="relative">
              <Skeleton className="w-14 h-14 rounded-xl" />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-900"></div>
            </div>
            
            {/* Textos */}
            <div className="flex-1 min-w-0 space-y-2">
              <div>
                <Skeleton className="h-5 w-48 mb-2" />
                <div className="flex items-center gap-2 mt-1">
                  <Skeleton className="h-5 w-16 rounded-full" />
                  <span className="text-sm text-gray-500 dark:text-gray-400">•</span>
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Botões de ação - sempre no canto superior direito */}
          <div className="flex gap-2 flex-shrink-0">
            <Skeleton className="h-8 w-8 rounded" />
            <Skeleton className="h-8 w-8 rounded" />
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