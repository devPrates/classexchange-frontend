"use client";

import { useState } from "react";
import { GraduationCap, Users, BookOpen, Calendar, Trash2, Edit, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { curso } from "@/types/cursos";

interface CursoCardProps {
  curso: curso;
  onEdit?: (curso: curso) => void;
  onDelete?: (curso: curso) => void;
}

export function CursoCard({ curso, onEdit, onDelete }: CursoCardProps) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleDeleteConfirm = () => {
    if (onDelete) {
      onDelete(curso);
    }
    setIsDeleteDialogOpen(false);
  };

  return (
    <Card className="group relative overflow-hidden bg-gradient-to-br from-white via-blue-50/30 to-blue-100/50 dark:from-gray-900 dark:via-blue-950/30 dark:to-blue-900/20 border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      {/* Borda decorativa */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700"></div>
      
      {/* Header */}
      <CardHeader className="pb-4 relative">
        <div className="flex items-start justify-between gap-4">
          {/* Informações principais */}
          <div className="flex items-start gap-4 flex-1 min-w-0">
            {/* Ícone */}
            <div className="relative">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <GraduationCap className="w-7 h-7 text-white" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-900"></div>
            </div>
            
            {/* Textos */}
            <div className="flex-1 min-w-0 space-y-2">
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {curso.nome}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300">
                    {curso.sigla}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">•</span>
                  <span className="text-sm text-gray-600 dark:text-gray-300 truncate">
                    {curso.campusNome}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Botões de ação - sempre no canto superior direito */}
          <div className="flex gap-2 flex-shrink-0">
            {onEdit && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEdit(curso)}
                className="h-8 w-8 p-0 text-amber-600 hover:text-amber-700 hover:bg-amber-50 dark:text-amber-400 dark:hover:text-amber-300 dark:hover:bg-amber-950/50 transition-all duration-200"
              >
                <Edit className="h-4 w-4" />
              </Button>
            )}
            {onDelete && (
              <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <DialogTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-950/50 transition-all duration-200"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Confirmar Exclusão</DialogTitle>
                    <DialogDescription>
                      Tem certeza que deseja excluir o curso <strong>{curso.nome}</strong>?
                      Esta ação não pode ser desfeita.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setIsDeleteDialogOpen(false)}
                    >
                      Cancelar
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={handleDeleteConfirm}
                    >
                      Excluir
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
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