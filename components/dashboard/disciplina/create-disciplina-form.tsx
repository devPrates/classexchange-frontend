"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import { X, Save, BookOpen } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useCreateDisciplina } from "@/hooks/use-disciplina"
import type { DisciplinaCreate } from "@/types/disciplina"

// Schema de validação usando Zod
const disciplinaSchema = z.object({
  nome: z.string().min(2, {
    message: "Nome deve ter pelo menos 2 caracteres.",
  }).max(100, {
    message: "Nome deve ter no máximo 100 caracteres.",
  }),
  cargaHoraria: z.number().min(1, {
    message: "Carga horária deve ser maior que 0.",
  }).max(1000, {
    message: "Carga horária deve ser menor que 1000 horas.",
  }),
  ementa: z.string().min(10, {
    message: "Ementa deve ter pelo menos 10 caracteres.",
  }).max(1000, {
    message: "Ementa deve ter no máximo 1000 caracteres.",
  }),
})

type DisciplinaFormData = z.infer<typeof disciplinaSchema>

interface CreateDisciplinaFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  cursoId: string
}

export function CreateDisciplinaForm({ open, onOpenChange, cursoId }: CreateDisciplinaFormProps) {
  const createDisciplinaMutation = useCreateDisciplina()

  // Configuração do formulário
  const form = useForm<DisciplinaFormData>({
    resolver: zodResolver(disciplinaSchema),
    defaultValues: {
      nome: "",
      cargaHoraria: 0,
      ementa: "",
    },
  })

  // Função para submeter o formulário
  const onSubmit = async (data: DisciplinaFormData) => {
    try {
      const disciplinaData: DisciplinaCreate = {
        ...data,
        cursoId,
      }

      await createDisciplinaMutation.mutateAsync(disciplinaData)
      
      toast.success("Disciplina criada com sucesso!")
      form.reset()
      onOpenChange(false)
    } catch (error) {
      console.error("Erro ao criar disciplina:", error)
      toast.error("Erro ao criar disciplina. Tente novamente.")
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Nova Disciplina
          </DialogTitle>
          <DialogDescription>
            Preencha os dados para cadastrar uma nova disciplina no curso.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="nome"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome da Disciplina</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Ex: Programação Web" 
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    Nome completo da disciplina.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cargaHoraria"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Carga Horária (horas)</FormLabel>
                  <FormControl>
                    <Input 
                      type="number"
                      placeholder="Ex: 60" 
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormDescription>
                    Carga horária total da disciplina em horas.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="ementa"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ementa</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Descreva o conteúdo programático da disciplina..."
                      className="min-h-[100px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    Conteúdo programático e objetivos da disciplina.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-3 pt-4">
              <Button 
                type="submit" 
                className="flex-1"
                disabled={createDisciplinaMutation.isPending}
              >
                <Save className="mr-2 h-4 w-4" />
                {createDisciplinaMutation.isPending ? "Criando..." : "Criar Disciplina"}
              </Button>
              
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => onOpenChange(false)}
                className="flex-1"
                disabled={createDisciplinaMutation.isPending}
              >
                <X className="mr-2 h-4 w-4" />
                Cancelar
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}