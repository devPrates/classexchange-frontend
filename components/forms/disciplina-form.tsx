"use client"

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { useEffect } from 'react'
import { useMutation } from '@tanstack/react-query'
import { SoftToast } from '@/components/elements/soft-toast'
import type { Disciplina, CreateDisciplina, UpdateDisciplina } from '@/types/disciplinas'
import { createDisciplina, updateDisciplinaById } from '@/services/disciplina-actions'


const schema = z.object({
  nome: z.string().min(2, { message: 'Informe o nome' }),
  cargaHoraria: z.number().min(1, { message: 'Informe a carga horária' }),
  ementa: z.string().min(2, { message: 'Informe a ementa' }),
})

type Props = {
  cursoId: string
  defaultValues?: Partial<CreateDisciplina & { id?: string }>
  onSuccess?: (updated: Disciplina) => void
  mode?: 'create' | 'edit'
  id?: string
}

export function DisciplinaForm({ cursoId, defaultValues, onSuccess, mode = 'create', id }: Props) {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      nome: defaultValues?.nome ?? '',
      cargaHoraria: defaultValues?.cargaHoraria ?? 60,
      ementa: defaultValues?.ementa ?? '',
    },
  })

  useEffect(() => {
    form.reset({
      nome: defaultValues?.nome ?? '',
      cargaHoraria: defaultValues?.cargaHoraria ?? 60,
      ementa: defaultValues?.ementa ?? '',
    })
  }, [defaultValues])

  const mutation = useMutation<Disciplina, Error, z.infer<typeof schema>>({
    mutationFn: async (values) => {
      if (mode === 'edit' && id) {
        const payload: UpdateDisciplina = {
          nome: values.nome,
          cargaHoraria: values.cargaHoraria,
          ementa: values.ementa,
          cursoId,
        }
        return await updateDisciplinaById(id, payload)
      }
      const payload: CreateDisciplina = {
        nome: values.nome,
        cargaHoraria: values.cargaHoraria,
        ementa: values.ementa,
        cursoId,
      }
      return await createDisciplina(payload)
    },
    onSuccess: (updated) => {
      SoftToast.success(mode === 'edit' ? 'Disciplina atualizada com sucesso' : 'Disciplina criada com sucesso')
      onSuccess?.(updated)
    },
    onError: (err) => {
      SoftToast.error('Falha ao salvar disciplina', { description: err.message })
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
              <FormLabel>Nome da Disciplina</FormLabel>
              <FormControl>
                <Input placeholder="Algoritmos" className="border-primary/30" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="cargaHoraria"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Carga Horária</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min={1}
                  placeholder="60"
                  className="border-primary/30"
                  value={field.value}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
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
                <Textarea placeholder="Conteúdos programáticos" className="border-primary/30" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-2">
          <Button type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? 'Salvando...' : mode === 'edit' ? 'Salvar alterações' : 'Criar disciplina'}
          </Button>
        </div>
      </form>
    </Form>
  )
}