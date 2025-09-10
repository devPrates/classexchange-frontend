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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Edit } from "lucide-react"
import { Turma } from "@/types/turma"
import { useUpdateTurma } from "@/hooks/use-turma"
import { toast } from "sonner"

interface EditTurmaDialogProps {
  turma: Turma
}

export function EditTurmaDialog({ turma }: EditTurmaDialogProps) {
  const [open, setOpen] = useState(false)
  const [nome, setNome] = useState(turma.nome)
  const [numero, setNumero] = useState(turma.numero.toString())
  const updateTurma = useUpdateTurma()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      await updateTurma.mutateAsync({
        id: turma.id,
        data: {
          nome,
          numero: parseInt(numero),
          cursoId: turma.cursoId // Mantém o cursoId original da turma
        }
      })
      
      toast.success("Turma atualizada com sucesso!")
      setOpen(false)
    } catch (error) {
      console.error('Erro ao editar turma:', error)
      toast.error("Erro ao atualizar turma. Tente novamente.")
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">
          <Edit className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar Turma</DialogTitle>
          <DialogDescription>
            Faça alterações na turma aqui. Clique em salvar quando terminar.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="nome" className="text-right">
                Nome
              </Label>
              <Input
                id="nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="col-span-3"
                placeholder="Ex: Turma A"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="numero" className="text-right">
                Número
              </Label>
              <Input
                id="numero"
                type="number"
                value={numero}
                onChange={(e) => setNumero(e.target.value)}
                className="col-span-3"
                placeholder="Ex: 1"
                min="1"
                required
              />
            </div>
          </div>
           <DialogFooter>
            <Button type="submit" disabled={updateTurma.isPending}>
              {updateTurma.isPending ? "Salvando..." : "Salvar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}