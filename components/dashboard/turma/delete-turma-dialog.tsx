"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Trash2 } from "lucide-react"
import { useDeleteTurma } from "@/hooks/use-turma"
import { toast } from "sonner"

interface DeleteTurmaDialogProps {
  turmaId: string
  turmaNome: string
}

export function DeleteTurmaDialog({ turmaId, turmaNome }: DeleteTurmaDialogProps) {
  const [open, setOpen] = useState(false)
  const deleteTurma = useDeleteTurma()

  const handleDelete = async () => {
    try {
      await deleteTurma.mutateAsync(turmaId)
      toast.success("Turma deletada com sucesso!")
      setOpen(false)
    } catch (error) {
      console.error('Erro ao deletar turma:', error)
      toast.error("Erro ao deletar turma. Tente novamente.")
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
          <Trash2 className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Deletar Turma</DialogTitle>
          <DialogDescription>
            Tem certeza que deseja deletar a turma <strong>{turmaNome}</strong>?
            Esta ação não pode ser desfeita.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancelar
          </Button>
          <Button 
            variant="destructive" 
            onClick={handleDelete}
            disabled={deleteTurma.isPending}
          >
            {deleteTurma.isPending ? "Deletando..." : "Deletar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}