
"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { z } from "zod"

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

export default function NovaInstituicao() {
  const router = useRouter()
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
      router.push("/dashboard/instituicao")
    } catch (error) {
      toast.error("Erro ao criar campus. Tente novamente.")
      console.error("Erro ao criar campus:", error)
    }
  }

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Nova Instituição</h1>
        <p className="text-muted-foreground">
          Preencha os dados para cadastrar um novo campus.
        </p>
      </div>

      <div className="max-w-2xl">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="nome"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do Campus</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Ex: Instituto Federal de Mato Grosso do Sul - Campus Campo Grande" 
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
                      placeholder="Ex: IFMS-CG" 
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

            <div className="flex gap-4">
              <Button 
                type="submit" 
                disabled={createCampusMutation.isPending}
              >
                {createCampusMutation.isPending ? "Criando..." : "Criar Campus"}
              </Button>
              
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => router.push("/dashboard/instituicao")}
              >
                Cancelar
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}