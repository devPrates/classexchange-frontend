"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import { X, Save, GraduationCap } from "lucide-react"

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
import { useCampusQuery } from "@/hooks/use-campus"
import { useCreateCurso } from "@/hooks/use-curso"
import type { CreateCurso } from "@/types/cursos"

// Schema de validação usando Zod
const cursoSchema = z.object({
  nome: z.string().min(2, {
    message: "Nome deve ter pelo menos 2 caracteres.",
  }).max(100, {
    message: "Nome deve ter no máximo 100 caracteres.",
  }),
  sigla: z.string().min(2, {
    message: "Sigla deve ter pelo menos 2 caracteres.",
  }).max(10, {
    message: "Sigla deve ter no máximo 10 caracteres.",
  }),
  campusId: z.string().min(1, {
    message: "Selecione um campus.",
  }),
})

type CursoFormData = z.infer<typeof cursoSchema>

interface CreateCursoFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CreateCursoForm({ open, onOpenChange }: CreateCursoFormProps) {
  // Buscar lista de campus
  const { data: campusList, isLoading: isLoadingCampus } = useCampusQuery()
  const createCursoMutation = useCreateCurso()

  // Configuração do formulário
  const form = useForm<CursoFormData>({
    resolver: zodResolver(cursoSchema),
    defaultValues: {
      nome: "",
      sigla: "",
      campusId: "",
    },
  })

  // Função para submeter o formulário
  async function onSubmit(values: CursoFormData) {
    try {
      await createCursoMutation.mutateAsync(values as CreateCurso)
      
      toast.success("Curso criado com sucesso!")
      form.reset()
      onOpenChange(false)
    } catch (error) {
      toast.error("Erro ao criar curso. Tente novamente.")
      console.error("Erro ao criar curso:", error)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5" />
            Novo Curso
          </DialogTitle>
          <DialogDescription>
            Preencha os dados para cadastrar um novo curso na instituição.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="nome"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do Curso</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Ex: Técnico em Informática" 
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    Nome completo do curso.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="sigla"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sigla</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Ex: TINFO" 
                      {...field}
                      onChange={(e) => field.onChange(e.target.value.toUpperCase())}
                    />
                  </FormControl>
                  <FormDescription>
                    Sigla ou abreviação do curso.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="campusId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Campus</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um campus" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {isLoadingCampus ? (
                        <SelectItem value="loading" disabled>
                          Carregando campus...
                        </SelectItem>
                      ) : campusList && campusList.length > 0 ? (
                        campusList.map((campus) => (
                          <SelectItem key={campus.id} value={campus.id}>
                            {campus.nome} - {campus.sigla}
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem value="no-campus" disabled>
                          Nenhum campus encontrado
                        </SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Campus onde o curso será oferecido.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-3 pt-4">
              <Button 
                type="submit" 
                className="flex-1"
                disabled={createCursoMutation.isPending}
              >
                <Save className="mr-2 h-4 w-4" />
                {createCursoMutation.isPending ? "Criando..." : "Criar Curso"}
              </Button>
              
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => onOpenChange(false)}
                className="flex-1"
                disabled={createCursoMutation.isPending}
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