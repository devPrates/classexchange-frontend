"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
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
import { useCreateCampus } from "@/hooks/use-campus"
import type { CreateCampus } from "@/types/Campus"

// Schema de validação usando Zod
const campusSchema = z.object({
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
  email: z.string().email({
    message: "Digite um email válido.",
  }),
})

interface CreateCampusDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CreateCampusDialog({ open, onOpenChange }: CreateCampusDialogProps) {
  const createCampusMutation = useCreateCampus()

  // Configuração do formulário
  const form = useForm<z.infer<typeof campusSchema>>({
    resolver: zodResolver(campusSchema),
    defaultValues: {
      nome: "",
      sigla: "",
      email: "",
    },
  })

  // Função para submeter o formulário
  async function onSubmit(values: z.infer<typeof campusSchema>) {
    try {
      const campusData: CreateCampus = {
        nome: values.nome,
        sigla: values.sigla,
        email: values.email,
      }

      await createCampusMutation.mutateAsync(campusData)
      
      toast.success("Campus criado com sucesso!")
      form.reset()
      onOpenChange(false)
    } catch (error) {
      toast.error("Erro ao criar campus. Tente novamente.")
      console.error("Erro ao criar campus:", error)
    }
  }

  const handleCancel = () => {
    form.reset()
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Nova Instituição</DialogTitle>
          <DialogDescription>
            Preencha os dados para cadastrar um novo campus.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="nome"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do Campus</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Ex: Campo Grande" 
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    Nome completo da instituição de ensino.
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
                      placeholder="Ex: CPG" 
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    Sigla ou abreviação do campus.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Institucional</FormLabel>
                  <FormControl>
                    <Input 
                      type="email"
                      placeholder="contato@ifms.edu.br" 
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    Email oficial do campus para contato.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button 
                type="button" 
                variant="outline" 
                onClick={handleCancel}
                disabled={createCampusMutation.isPending}
              >
                Cancelar
              </Button>
              <Button 
                type="submit" 
                disabled={createCampusMutation.isPending}
              >
                {createCampusMutation.isPending ? "Criando..." : "Criar Campus"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}