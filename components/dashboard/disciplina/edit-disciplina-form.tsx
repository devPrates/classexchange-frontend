"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import { X, Save, BookOpen } from "lucide-react"
import { useUpdateDisciplina } from "@/hooks/use-disciplina"
import { useCursoQuery } from "@/hooks/use-curso"

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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import type { disciplina } from "@/types/disciplina"

// Schema de validação usando Zod
const disciplinaSchema = z.object({
  nome: z.string().min(2, {
    message: "Nome deve ter pelo menos 2 caracteres.",
  }).max(100, {
    message: "Nome deve ter no máximo 100 caracteres.",
  }),
  cargahoraria: z.number().min(1, {
    message: "Carga horária deve ser um número maior que 0.",
  }),
  ementa: z.string().min(10, {
    message: "Ementa deve ter pelo menos 10 caracteres.",
  }).max(1000, {
    message: "Ementa deve ter no máximo 1000 caracteres.",
  }),
  cursoId: z.string().min(1, {
    message: "Selecione um curso.",
  }),
})

interface DisciplinaFormData {
  nome: string
  cargahoraria: number
  ementa: string
  cursoId: string
}

interface EditDisciplinaFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  disciplina: disciplina
}

export function EditDisciplinaForm({ open, onOpenChange, disciplina }: EditDisciplinaFormProps) {
  const updateDisciplina = useUpdateDisciplina()
  const { data: cursos = [] } = useCursoQuery()

  // Configuração do formulário
  const form = useForm<DisciplinaFormData>({
    resolver: zodResolver(disciplinaSchema),
    defaultValues: {
      nome: disciplina.nome,
      cargahoraria: disciplina.cargahoraria,
      ementa: disciplina.ementa,
      cursoId: disciplina.cursoId,
    },
  })

  // Função para submeter o formulário
  async function onSubmit(values: DisciplinaFormData) {
    try {
      console.log("[EDIT DISCIPLINA] JSON enviado para API:", JSON.stringify({
        id: disciplina.id,
        data: values
      }, null, 2))

      // Converter cargahoraria de string para number antes de enviar para API
      const dataToSend = {
        ...values,
        cargahoraria: Number(values.cargahoraria)
      };

      await updateDisciplina.mutateAsync({
        id: disciplina.id,
        data: dataToSend
      })

      toast.success("Disciplina atualizada com sucesso!")
      onOpenChange(false)
    } catch (error) {
      toast.error("Erro ao atualizar disciplina. Tente novamente.")
      console.error("Erro ao atualizar disciplina:", error)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Editar Disciplina
          </DialogTitle>
          <DialogDescription>
            Atualize os dados da disciplina.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="cursoId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Curso</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um curso" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {cursos.map((curso) => (
                        <SelectItem key={curso.id} value={curso.id}>
                          {curso.nome} - {curso.campusNome}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Curso ao qual a disciplina pertence.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="nome"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome da Disciplina</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ex: Matemática Aplicada"
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
              name="cargahoraria"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Carga Horária</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Ex: 60"
                      value={field.value ?? ""}
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
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
                disabled={updateDisciplina.isPending}
              >
                <Save className="mr-2 h-4 w-4" />
                {updateDisciplina.isPending ? "Salvando..." : "Salvar Alterações"}
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="flex-1"
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