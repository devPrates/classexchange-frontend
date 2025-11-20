"use client"

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useEffect } from 'react'
import { useMutation } from '@tanstack/react-query'
import { SoftToast } from '@/components/elements/soft-toast'
import type { Estudante, CreateEstudante, UpdateEstudante } from '@/types/estudantes'
import { createEstudante, updateEstudanteById } from '@/services/estudante-actions'

const schemaCreate = z.object({
  nome: z.string().min(2, { message: 'Informe o nome' }),
  email: z.string().email({ message: 'Email inválido' }),
})

const schemaEdit = z.object({
  nome: z.string().min(2, { message: 'Informe o nome' }),
  email: z.string().email({ message: 'Email inválido' }),
})

type Props = {
  defaultValues?: Partial<CreateEstudante & { id?: string }>
  onSuccess?: (updated: Estudante) => void
  mode?: 'create' | 'edit'
  id?: string
}

export function EstudanteForm({ defaultValues, onSuccess, mode = 'create', id }: Props) {
  const form = useForm<any>({
    resolver: zodResolver(mode === 'create' ? schemaCreate : schemaEdit),
    defaultValues: {
      nome: defaultValues?.nome ?? '',
      email: defaultValues?.email ?? '',
    },
  })

  useEffect(() => {
    if (defaultValues) {
      form.reset({
        nome: defaultValues?.nome ?? '',
        email: defaultValues?.email ?? '',
      })
    }
  }, [defaultValues])

  const mutation = useMutation<Estudante, Error, any>({
    mutationFn: async (values) => {
      if (mode === 'edit' && id) {
        const payload: UpdateEstudante = {
          nome: values.nome,
          email: values.email,
        }
        return await updateEstudanteById(id, payload)
      }
      const payload: CreateEstudante = {
        nome: values.nome,
        email: values.email,
      }
      return await createEstudante(payload)
    },
    onSuccess: (updated) => {
      SoftToast.success(mode === 'edit' ? 'Estudante atualizado com sucesso' : 'Estudante criado com sucesso')
      onSuccess?.(updated)
    },
    onError: (err) => {
      SoftToast.error('Falha ao salvar estudante', { description: err.message })
    },
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit((values) => mutation.mutate(values))} className="space-y-4">
        <FormField
          control={form.control}
          name="nome"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input placeholder="Nome do estudante" className="border-primary/30" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="email@exemplo.com" className="border-primary/30" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-2">
          <Button type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? 'Salvando...' : mode === 'edit' ? 'Salvar alterações' : 'Criar estudante'}
          </Button>
        </div>
      </form>
    </Form>
  )
}