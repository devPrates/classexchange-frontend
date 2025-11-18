"use client"

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { SoftToast } from '@/components/elements/soft-toast'
import type { CreateCampus, UpdateCampus, Campus } from '@/types/campus'
import { createCampus, updateCampusById, getCampusById } from '@/services/campus-actions'

const schema = z.object({
  nome: z.string().min(2, { message: 'Informe o nome' }),
  sigla: z.string().min(1, { message: 'Informe a sigla' }).max(10),
  email: z.string().email({ message: 'Email inválido' }),
  telefone: z.string().optional(),
  endereco: z.string().optional(),
})

type Props = {
  defaultValues?: Partial<CreateCampus>
  onSuccess?: (updated: Campus) => void
  mode?: 'create' | 'edit'
  slug?: string
  id?: string
}

export function CampusForm({ defaultValues, onSuccess, mode = 'create', slug, id }: Props) {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      nome: defaultValues?.nome ?? '',
      sigla: defaultValues?.sigla ?? '',
      email: defaultValues?.email ?? '',
      telefone: defaultValues?.telefone ?? '',
      endereco: defaultValues?.endereco ?? '',
    },
  })

  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: async (payload: CreateCampus | UpdateCampus) => {
      if (mode === 'edit' && id) {
        return await updateCampusById(id, payload as UpdateCampus)
      }
      return await createCampus(payload as CreateCampus)
    },
    onSuccess: async (data: Campus) => {
      SoftToast.success(mode === 'edit' ? 'Campus atualizado com sucesso' : 'Campus criado com sucesso')
      queryClient.invalidateQueries({ queryKey: ['campi'] })
      if (slug) queryClient.invalidateQueries({ queryKey: ['campus', slug] })
      if (mode === 'edit' && id && (!data || !data.slug)) {
        try {
          const res = await getCampusById(id)
          onSuccess?.(res as Campus)
          return
        } catch {}
      }
      onSuccess?.(data)
    },
    onError: () => {
      SoftToast.error(mode === 'edit' ? 'Falha ao atualizar campus' : 'Falha ao criar campus')
    },
  })

  const onSubmit = (values: z.infer<typeof schema>) => {
    mutation.mutate(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4">
        <FormField
          control={form.control}
          name="nome"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome do Campus</FormLabel>
              <FormControl>
                <Input placeholder="Campus Norte" className="border-primary/30" {...field} />
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
                <Input placeholder="CN" className="border-primary/30" {...field} />
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
                <Input placeholder="campus@ifms.edu.br" className="border-primary/30" {...field} />
              </FormControl>
              <FormDescription>Email institucional</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="telefone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Telefone</FormLabel>
              <FormControl>
                <Input placeholder="(67) 99999-0000" className="border-primary/30" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="endereco"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Endereço</FormLabel>
              <FormControl>
                <Input placeholder="Rua das Palmeiras, 100" className="border-primary/30" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-2">
          <Button type="submit" disabled={mutation.isPending}>{mode === 'edit' ? 'Atualizar' : 'Salvar'}</Button>
        </div>
      </form>
    </Form>
  )
}