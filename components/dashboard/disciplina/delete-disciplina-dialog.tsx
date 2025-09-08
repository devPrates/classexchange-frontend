"use client"

import { useState } from "react"
import { Trash2, AlertTriangle } from "lucide-react"
import { useDeleteDisciplina } from "@/hooks/use-disciplina"
import { toast } from "sonner"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import type { disciplina } from "@/types/disciplina"

interface DeleteDisciplinaDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  disciplina: disciplina
  onSuccess?: () => void
}

export function DeleteDisciplinaDialog({ 
  open, 
  onOpenChange, 
  disciplina, 
  onSuccess 
}: DeleteDisciplinaDialogProps) {
  const [isDeleting, setIsDeleting] = useState(false)
  const deleteDisciplina = useDeleteDisciplina()

  const handleDelete = async () => {
    try {
      setIsDeleting(true)
      await deleteDisciplina.mutateAsync(disciplina.id)
      
      toast.success("Disciplina excluída com sucesso!")
      onOpenChange(false)
      onSuccess?.()
    } catch (error) {
      toast.error("Erro ao excluir disciplina. Tente novamente.")
      console.error("Erro ao excluir disciplina:", error)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            Confirmar Exclusão
          </AlertDialogTitle>
          <AlertDialogDescription className="space-y-2">
            <p>
              Tem certeza que deseja excluir a disciplina{" "}
              <span className="font-semibold text-foreground">
                {disciplina.nome}
              </span>?
            </p>
            <p className="text-sm text-muted-foreground">
              <strong>Curso:</strong> {disciplina.cursoNome}
            </p>
            <p className="text-sm text-muted-foreground">
              <strong>Carga Horária:</strong> {disciplina.cargahoraria}h
            </p>
            <div className="mt-4 p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-md">
              <p className="text-sm text-red-800 dark:text-red-200">
                <strong>Atenção:</strong> Esta ação não pode ser desfeita. Todos os dados relacionados à disciplina serão permanentemente removidos.
              </p>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              {isDeleting ? "Excluindo..." : "Excluir Disciplina"}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}