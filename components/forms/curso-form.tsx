"use client"

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { SoftToast } from '@/components/elements/soft-toast'
import type { CreateCurso, UpdateCurso, Curso } from '@/types/cursos'
import { createCurso, updateCursoById, getCursoById } from '@/services/curso-actions'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useCampi } from '@/hooks/use-campi'

const schema = z.object({
  nome: z.string().min(2, { message: 'Informe o nome' }),
  sigla: z.string().min(1, { message: 'Informe a sigla' }).max(10),
  campusId: z.string().min(1, { message: 'Selecione o campus' }),
})

type Props = {
  defaultValues?: Partial<CreateCurso & { id?: string }>
  onSuccess?: (updated: Curso) => void
  mode?: 'create' | 'edit'
  slug?: string
  id?: string
}

export function CursoForm({ defaultValues, onSuccess, mode = 'create', slug, id }: Props) {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      nome: defaultValues?.nome ?? '',
      sigla: defaultValues?.sigla ?? '',
      campusId: defaultValues?.campusId ?? '',
    },
  })

  const queryClient = useQueryClient()
  const { data: campi } = useCampi()

  const mutation = useMutation<Curso, Error, z.infer<typeof schema>>({
    mutationFn: async (values) => {
      if (mode === 'edit' && id) {
        const payload: UpdateCurso = {
          nome: values.nome,
          sigla: values.sigla,
          campusId: values.campusId,
        }
        return await updateCursoById(id, payload)
      }
      const payload: CreateCurso = {
        nome: values.nome,
        sigla: values.sigla,
        campusId: values.campusId,
      }
      return await createCurso(payload)
    },
    onSuccess: async (updated) => {
      SoftToast.success(mode === 'edit' ? 'Curso atualizado com sucesso' : 'Curso criado com sucesso')
      await queryClient.invalidateQueries({ queryKey: ['cursos'] })
      if (mode === 'edit') {
        if (!updated.slug && id) {
          const fetched = await getCursoById(id)
          onSuccess?.(fetched)
          return
        }
      }
      onSuccess?.(updated)
    },
    onError: (err) => {
      SoftToast.error('Falha ao salvar curso', { description: err.message })
    },
  })

  const onSubmit = (values: z.infer<typeof schema>) => mutation.mutate(values)

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="nome"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome do Curso</FormLabel>
              <FormControl>
                <Input placeholder="Ciência da Computação" className="border-primary/30" {...field} />
              </FormControl>
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
                <Input placeholder="CC" className="border-primary/30" {...field} />
              </FormControl>
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
              <Select value={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger className="border-primary/30">
                    <SelectValue placeholder="Selecione o campus" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {(campi ?? []).map((c) => (
                    <SelectItem key={c.id} value={c.id}>{c.nome}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-2">
          <Button type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? 'Salvando...' : mode === 'edit' ? 'Salvar alterações' : 'Criar curso'}
          </Button>
        </div>
      </form>
    </Form>
  )
}