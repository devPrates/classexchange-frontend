"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Loader2, AlertTriangle } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useDeleteCurso } from "@/hooks/use-curso";
import type { curso } from "@/types/cursos";

interface DeleteCursoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  curso: curso;
  onSuccess?: () => void;
}

export function DeleteCursoDialog({ 
  open, 
  onOpenChange, 
  curso, 
  onSuccess 
}: DeleteCursoDialogProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const deleteCursoMutation = useDeleteCurso();

  const handleDelete = async () => {
    setIsDeleting(true);
    
    try {
      await deleteCursoMutation.mutateAsync(curso.id);
      
      toast.success(`Curso "${curso.nome}" excluído com sucesso!`);
      onOpenChange(false);
      
      // Chama callback de sucesso se fornecido (para redirecionar, etc.)
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('Erro ao excluir curso:', error);
      toast.error("Erro ao excluir curso. Tente novamente.");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCancel = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/20">
              <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <DialogTitle className="text-left">Excluir Curso</DialogTitle>
              <DialogDescription className="text-left">
                Esta ação não pode ser desfeita.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        
        <div className="py-4">
          <p className="text-sm text-muted-foreground">
            Tem certeza que deseja excluir o curso{" "}
            <span className="font-semibold text-foreground">"{curso.nome}"</span>?
          </p>
          
          {(curso.disciplinas?.length > 0 || curso.turmas?.length > 0) && (
            <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-md">
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                <strong>Atenção:</strong> Este curso possui{" "}
                {curso.disciplinas?.length > 0 && (
                  <span>{curso.disciplinas.length} disciplina(s)</span>
                )}
                {curso.disciplinas?.length > 0 && curso.turmas?.length > 0 && " e "}
                {curso.turmas?.length > 0 && (
                  <span>{curso.turmas.length} turma(s)</span>
                )}
                {" "}cadastrada(s). Todos os dados relacionados serão perdidos.
              </p>
            </div>
          )}
        </div>
        
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
            disabled={isDeleting}
          >
            Cancelar
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Excluir Curso
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}