"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import { X, Save, BookOpen, Loader2 } from "lucide-react"
import { useEffect } from "react"

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
import { useUpdateDisciplina, useDisciplinaByIdQuery } from "@/hooks/use-disciplina"
import type { DisciplinaUpdate } from "@/types/disciplina"

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

interface EditDisciplinaFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  disciplinaId: string
}

export function EditDisciplinaForm({ open, onOpenChange, disciplinaId }: EditDisciplinaFormProps) {
  const updateDisciplinaMutation = useUpdateDisciplina()
  const { data: disciplina, isLoading: isLoadingDisciplina } = useDisciplinaByIdQuery(disciplinaId)

  // Configuração do formulário
  const form = useForm<DisciplinaFormData>({
    resolver: zodResolver(disciplinaSchema),
    defaultValues: {
      nome: "",
      cargaHoraria: 0,
      ementa: "",
    },
  })

  // Preenche o formulário quando os dados da disciplina são carregados
  useEffect(() => {
    if (disciplina) {
      form.reset({
        nome: disciplina.nome,
        cargaHoraria: disciplina.cargaHoraria,
        ementa: disciplina.ementa,
      })
    }
  }, [disciplina, form])

  // Função para submeter o formulário
  async function onSubmit(data: DisciplinaFormData) {
    if (!disciplina) return

    try {
      const disciplinaUpdate: DisciplinaUpdate = {
        nome: data.nome,
        cargaHoraria: data.cargaHoraria,
        ementa: data.ementa,
        cursoId: disciplina.cursoId, // Mantém o curso original
      }

      await updateDisciplinaMutation.mutateAsync({
        id: disciplinaId,
        data: disciplinaUpdate,
      })

      toast.success("Disciplina atualizada com sucesso!")
      onOpenChange(false)
      form.reset()
    } catch (error) {
      toast.error("Erro ao atualizar disciplina. Tente novamente.")
      console.error("Erro ao atualizar disciplina:", error)
    }
  }

  // Função para fechar o modal
  const handleClose = () => {
    onOpenChange(false)
    form.reset()
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Editar Disciplina
          </DialogTitle>
          <DialogDescription>
            Atualize as informações da disciplina. Todos os campos são obrigatórios.
          </DialogDescription>
        </DialogHeader>

        {isLoadingDisciplina ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span className="ml-2">Carregando dados da disciplina...</span>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Campo Nome */}
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
                        disabled={updateDisciplinaMutation.isPending}
                      />
                    </FormControl>
                    <FormDescription>
                      Nome completo da disciplina (2-100 caracteres)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Campo Carga Horária */}
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
                        disabled={updateDisciplinaMutation.isPending}
                      />
                    </FormControl>
                    <FormDescription>
                      Carga horária total da disciplina (1-1000 horas)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Campo Ementa */}
              <FormField
                control={form.control}
                name="ementa"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ementa</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Descreva o conteúdo programático da disciplina..."
                        className="min-h-[120px] resize-none"
                        {...field}
                        disabled={updateDisciplinaMutation.isPending}
                      />
                    </FormControl>
                    <FormDescription>
                      Conteúdo programático da disciplina (10-1000 caracteres)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Botões de Ação */}
              <div className="flex items-center justify-end gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleClose}
                  disabled={updateDisciplinaMutation.isPending}
                  className="flex items-center gap-2"
                >
                  <X className="h-4 w-4" />
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  disabled={updateDisciplinaMutation.isPending}
                  className="flex items-center gap-2"
                >
                  {updateDisciplinaMutation.isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Save className="h-4 w-4" />
                  )}
                  {updateDisciplinaMutation.isPending ? "Salvando..." : "Salvar Alterações"}
                </Button>
              </div>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  )
}