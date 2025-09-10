"use client"

import { useState } from "react"
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
import { Trash2, Loader2 } from "lucide-react"
import { useDeleteDisciplina } from "@/hooks/use-disciplina"
import { toast } from "sonner"
import { DisciplinaSimplificada } from "@/types/disciplina"

interface DeleteDisciplinaDialogProps {
  disciplina: DisciplinaSimplificada
  children?: React.ReactNode
}

export function DeleteDisciplinaDialog({ disciplina, children }: DeleteDisciplinaDialogProps) {
  const [open, setOpen] = useState(false)
  const deleteDisciplinaMutation = useDeleteDisciplina()

  const handleDelete = async () => {
    try {
      await deleteDisciplinaMutation.mutateAsync(disciplina.id)
      toast.success("Disciplina excluída com sucesso!")
      setOpen(false)
    } catch (error) {
      toast.error("Erro ao excluir disciplina. Tente novamente.")
      console.error("Erro ao excluir disciplina:", error)
    }
  }

  return (
    <>
      <div onClick={() => setOpen(true)}>
        {children || (
          <Button
            variant="outline"
            size="sm"
            className="h-8 w-8 p-0 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-950 dark:hover:border-red-700"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        )}
      </div>

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir a disciplina <strong>"{disciplina.nome}"</strong>?
              <br />
              <span className="text-muted-foreground text-sm mt-2 block">
                Esta ação não pode ser desfeita e todos os dados relacionados à disciplina serão perdidos.
              </span>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleteDisciplinaMutation.isPending}>
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={deleteDisciplinaMutation.isPending}
              className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
            >
              {deleteDisciplinaMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Excluindo...
                </>
              ) : (
                <>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Excluir
                </>
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}