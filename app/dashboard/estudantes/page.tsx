'use client'

import { useState } from 'react'
import { CornerAccent } from '@/components/elements/corner-accent'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Search, Plus, Trash2 } from 'lucide-react'
import { DataTable } from '@/components/elements/data-table'
import { estudantesColumns } from './estudantes-columns'
import { useEstudantes, useEstudante } from '@/hooks/use-estudantes'
import { EstudanteForm } from '@/components/forms/estudante-form'
import { SoftToast } from '@/components/elements/soft-toast'
import { deleteEstudanteById } from '@/services/estudante-actions'

export default function EstudantesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const { data, isLoading, isError, refetch } = useEstudantes(searchQuery)
  const estudantes = data ?? []
  const { data: estudanteDetalhe } = useEstudante(selectedId ?? undefined)

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Estudantes</h1>
          <p className="text-muted-foreground mt-1">Cadastro e gerenciamento de estudantes</p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button className="relative border border-primary/30 hover:border-primary/50">
              <Plus className="h-4 w-4" />
              Novo Estudante
              <div className="absolute top-0 left-0 w-1.5 h-1.5 border-l border-t border-primary/40" />
              <div className="absolute top-0 right-0 w-1.5 h-1.5 border-r border-t border-primary/40" />
              <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-l border-b border-primary/40" />
              <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-r border-b border-primary/40" />
            </Button>
          </DialogTrigger>
          <DialogContent className="border-primary/30">
            <DialogHeader>
              <DialogTitle>Novo Estudante</DialogTitle>
              <DialogDescription>Adicione um novo estudante ao sistema</DialogDescription>
            </DialogHeader>
            <EstudanteForm
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
          placeholder="Buscar por nome ou email..."
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
              <CardTitle>Lista de Estudantes</CardTitle>
              <CardDescription>Estudantes cadastrados no sistema</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading || isError ? (
            <div className="text-muted-foreground">Carregando...</div>
          ) : (
            <DataTable
              columns={estudantesColumns}
              data={estudantes}
              onEdit={(e) => {
                setSelectedId((e as any).id)
                setIsEditOpen(true)
              }}
              onDelete={(e) => {
                setSelectedId((e as any).id)
                setIsDeleteOpen(true)
              }}
            />
          )}
        </CardContent>
      </Card>

      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="border-primary/30">
          <DialogHeader>
            <DialogTitle>Editar Estudante</DialogTitle>
            <DialogDescription>Atualize os dados do estudante</DialogDescription>
          </DialogHeader>
          {selectedId && (
            <EstudanteForm
              mode="edit"
              id={selectedId}
              defaultValues={estudanteDetalhe ? {
                nome: estudanteDetalhe.nome,
                email: estudanteDetalhe.email,
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
            <DialogDescription className="text-red-600">Tem certeza que deseja excluir este estudante?</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteOpen(false)} className="border-primary/30">Cancelar</Button>
            <Button
              className="bg-red-600 hover:bg-red-700 text-white"
              onClick={async () => {
                if (!selectedId) return
                try {
                  await deleteEstudanteById(selectedId)
                  SoftToast.success('Estudante excluído com sucesso')
                  setIsDeleteOpen(false)
                  setSelectedId(null)
                  refetch()
                } catch (err: any) {
                  SoftToast.error('Falha ao excluir estudante', { description: err.message ?? 'Tente novamente mais tarde' })
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