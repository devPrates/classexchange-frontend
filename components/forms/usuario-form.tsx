"use client"

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useMutation } from '@tanstack/react-query'
import { SoftToast } from '@/components/elements/soft-toast'
import type { Usuario, CreateUsuario, UpdateUsuario } from '@/types/usuarios'
import { RoleUsuario } from '@/types/usuarios'
import { createUsuario, updateUsuarioById } from '@/services/usuario-actions'
import { useEffect } from 'react'
import { useCampi } from '@/hooks/use-campi'

const schemaCreate = z.object({
  nome: z.string().min(2, { message: 'Informe o nome' }),
  email: z.string().email({ message: 'Email inválido' }),
  senha: z.string().min(6, { message: 'Informe a senha' }),
  celular: z.string().min(10, { message: 'Informe o celular válido' }),
  role: z.nativeEnum(RoleUsuario),
  campusId: z.string().min(1, { message: 'Informe o campus' }),
})

const schemaEdit = z.object({
  nome: z.string().min(2, { message: 'Informe o nome' }),
  email: z.string().email({ message: 'Email inválido' }),
  senha: z.string().optional(),
  celular: z.string().min(10, { message: 'Informe o celular válido' }),
  role: z.nativeEnum(RoleUsuario),
  campusId: z.string().min(1, { message: 'Informe o campus' }),
})

type Props = {
  mode?: 'create' | 'edit'
  id?: string
  defaultValues?: Partial<CreateUsuario>
  onSuccess?: (updated: Usuario) => void
}

export function UsuarioForm({ mode = 'create', id, defaultValues, onSuccess }: Props) {
  const form = useForm<any>({
    resolver: zodResolver(mode === 'create' ? schemaCreate : schemaEdit),
    defaultValues: {
      nome: defaultValues?.nome ?? '',
      email: defaultValues?.email ?? '',
      senha: defaultValues?.senha ?? '',
      celular: defaultValues?.celular ?? '',
      role: defaultValues?.role ?? RoleUsuario.PROFESSOR,
      campusId: defaultValues?.campusId ?? '',
    },
  })

  useEffect(() => {
    if (defaultValues) {
      form.reset({
        nome: defaultValues?.nome ?? '',
        email: defaultValues?.email ?? '',
        senha: defaultValues?.senha ?? '',
        celular: defaultValues?.celular ?? '',
        role: defaultValues?.role ?? RoleUsuario.PROFESSOR,
        campusId: defaultValues?.campusId ?? '',
      })
    }
  }, [defaultValues])

  const mutation = useMutation<Usuario, Error, any>({
    mutationFn: async (values) => {
      const celularDigits = String(values.celular).replace(/\D/g, '')
      const normalizado = { ...values, celular: celularDigits }
      if (mode === 'edit' && id) {
        const payload: UpdateUsuario = {
          nome: normalizado.nome,
          email: normalizado.email,
          senha: normalizado.senha || undefined,
          celular: normalizado.celular,
          role: normalizado.role,
          campusId: normalizado.campusId,
        }
        return await updateUsuarioById(id, payload)
      }
      const payload: CreateUsuario = {
        nome: normalizado.nome,
        email: normalizado.email,
        senha: normalizado.senha,
        celular: normalizado.celular,
        role: normalizado.role,
        campusId: normalizado.campusId,
      }
      return await createUsuario(payload)
    },
    onSuccess: (updated) => {
      SoftToast.success(mode === 'edit' ? 'Usuário atualizado com sucesso' : 'Usuário criado com sucesso')
      onSuccess?.(updated)
    },
    onError: (err) => {
      try {
        const axiosErr = err as any
        const backendMsg = axiosErr?.response?.data?.message || axiosErr?.response?.data?.error || axiosErr?.response?.data?.detail
        if (backendMsg) {
          SoftToast.error('Falha ao salvar usuário', { description: String(backendMsg) })
          return
        }
      } catch {}
      SoftToast.error('Falha ao salvar usuário', { description: err.message })
    },
  })

  const onSubmit = (values: any) => mutation.mutate(values)
  const { data: campi } = useCampi()

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField control={form.control} name="nome" render={({ field }) => (
          <FormItem>
            <FormLabel>Nome</FormLabel>
            <FormControl>
              <Input placeholder="Nome completo" className="border-primary/30" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={form.control} name="email" render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input type="email" placeholder="email@instituicao.edu.br" className="border-primary/30" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={form.control} name="senha" render={({ field }) => (
          <FormItem>
            <FormLabel>Senha</FormLabel>
            <FormControl>
              <Input type="password" placeholder="mínimo de 6 caracteres" className="border-primary/30" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={form.control} name="celular" render={({ field }) => (
          <FormItem>
            <FormLabel>Celular</FormLabel>
            <FormControl>
              <Input placeholder="(67) 99999-9999" className="border-primary/30" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={form.control} name="role" render={({ field }) => (
          <FormItem>
            <FormLabel>Perfil</FormLabel>
            <FormControl>
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="border-primary/30">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={RoleUsuario.PROFESSOR}>Professor</SelectItem>
                  <SelectItem value={RoleUsuario.COORDENACAO}>Coordenação</SelectItem>
                  <SelectItem value={RoleUsuario.DIRETORENSINO}>Diretor de Ensino</SelectItem>
                  <SelectItem value={RoleUsuario.COORDENADORCURSO}>Coordenador de Curso</SelectItem>
                  <SelectItem value={RoleUsuario.ADMINISTRADOR}>Administrador</SelectItem>
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={form.control} name="campusId" render={({ field }) => (
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
        )} />

        <div className="flex justify-end gap-2">
          <Button type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? 'Salvando...' : mode === 'edit' ? 'Salvar alterações' : 'Criar usuário'}
          </Button>
        </div>
      </form>
    </Form>
  )
}
