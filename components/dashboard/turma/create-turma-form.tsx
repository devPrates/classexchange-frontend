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
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useCreateTurma } from "@/hooks/use-turma"
import { toast } from "sonner"

interface CreateTurmaFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  cursoId: string
}

export function CreateTurmaForm({ open, onOpenChange, cursoId }: CreateTurmaFormProps) {
  const [nome, setNome] = useState("")
  const [numero, setNumero] = useState("")
  const createTurma = useCreateTurma()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      await createTurma.mutateAsync({
        nome,
        numero: parseInt(numero),
        cursoId
      })
      
      toast.success("Turma criada com sucesso!")
      
      // Reset form
      setNome("")
      setNumero("")
      onOpenChange(false)
    } catch (error) {
      console.error('Erro ao criar turma:', error)
      toast.error("Erro ao criar turma. Tente novamente.")
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Criar Nova Turma</DialogTitle>
          <DialogDescription>
            Preencha os dados da nova turma.
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
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={createTurma.isPending}>
              {createTurma.isPending ? "Criando..." : "Criar Turma"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}