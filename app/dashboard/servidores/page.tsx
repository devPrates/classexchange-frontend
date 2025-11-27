"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CornerAccent } from '@/components/elements/corner-accent'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Search, Plus } from 'lucide-react'
import { DataTable } from '@/components/elements/data-table'
import { usuariosColumns } from './usuarios-columns'
import { useUsuarios, useUsuario } from '@/hooks/use-usuarios'
import { UsuarioForm } from '@/components/forms/usuario-form'
import { SoftToast } from '@/components/elements/soft-toast'
import { deleteUsuarioById } from '@/services/usuario-actions'

export default function ServidoresPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const { data, isLoading, isError, refetch } = useUsuarios(searchQuery)
  const usuarios = data ?? []
  const { data: usuarioDetalhe } = useUsuario(selectedId ?? undefined)

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Servidores</h1>
          <p className="text-muted-foreground mt-1">Cadastro e gerenciamento de usuários</p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button className="relative border border-primary/30 hover:border-primary/50">
              <Plus className="h-4 w-4" />
              Novo Usuário
              <div className="absolute top-0 left-0 w-1.5 h-1.5 border-l border-t border-primary/40" />
              <div className="absolute top-0 right-0 w-1.5 h-1.5 border-r border-t border-primary/40" />
              <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-l border-b border-primary/40" />
              <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-r border-b border-primary/40" />
            </Button>
          </DialogTrigger>
          <DialogContent className="border-primary/30">
            <DialogHeader>
              <DialogTitle>Novo Usuário</DialogTitle>
              <DialogDescription>Adicione um novo usuário ao sistema</DialogDescription>
            </DialogHeader>
            <UsuarioForm
              mode="create"
              onSuccess={() => {
                setIsCreateOpen(false)
                refetch()
              }}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Buscar por nome, email, celular, perfil ou campus..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9 border-primary/30 focus:border-primary/50 relative"
        />
        <div className="absolute top-0 left-0 w-2 h-2 border-l border-t border-primary/40 pointer-events-none" />
        <div className="absolute top-0 right-0 w-2 h-2 border-r border-t border-primary/40 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-2 h-2 border-l border-b border-primary/40 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-2 h-2 border-r border-b border-primary/40 pointer-events-none" />
      </div>

      <Card className="relative border-primary/30">
        <CornerAccent />
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Lista de Usuários</CardTitle>
              <CardDescription>Usuários cadastrados no sistema</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading || isError ? (
            <div className="text-muted-foreground">Carregando...</div>
          ) : (
            <DataTable
              columns={usuariosColumns}
              data={usuarios}
              onEdit={(u) => {
                setSelectedId((u as any).id)
                setIsEditOpen(true)
              }}
              onDelete={(u) => {
                setSelectedId((u as any).id)
                setIsDeleteOpen(true)
              }}
            />
          )}
        </CardContent>
      </Card>

      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="border-primary/30">
          <DialogHeader>
            <DialogTitle>Editar Usuário</DialogTitle>
            <DialogDescription>Atualize os dados do usuário</DialogDescription>
          </DialogHeader>
          {selectedId && (
            <UsuarioForm
              mode="edit"
              id={selectedId}
              defaultValues={usuarioDetalhe ? {
                nome: usuarioDetalhe.nome,
                email: usuarioDetalhe.email,
                celular: usuarioDetalhe.celular,
                role: usuarioDetalhe.role,
                campusId: usuarioDetalhe.campusId,
              } : undefined}
              onSuccess={() => {
                setIsEditOpen(false)
                setSelectedId(null)
                refetch()
              }}
            />
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent className="border-red-300">
          <DialogHeader>
            <DialogTitle className="text-red-700">Confirmar exclusão</DialogTitle>
            <DialogDescription className="text-red-600">Tem certeza que deseja excluir este usuário?</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteOpen(false)} className="border-primary/30">Cancelar</Button>
            <Button
              className="bg-red-600 hover:bg-red-700 text-white"
              onClick={async () => {
                if (!selectedId) return
                try {
                  await deleteUsuarioById(selectedId)
                  SoftToast.success('Usuário excluído com sucesso')
                  setIsDeleteOpen(false)
                  setSelectedId(null)
                  refetch()
                } catch (err: any) {
                  SoftToast.error('Falha ao excluir usuário', { description: err.message ?? 'Tente novamente mais tarde' })
                }
              }}
            >
              Confirmar exclusão
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}