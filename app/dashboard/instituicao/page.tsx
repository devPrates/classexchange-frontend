'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Search, Plus, Edit, Trash2, Building2, MapPin } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import { CornerAccent } from '@/components/elements/corner-accent'

type Campus = {
  id: string
  nome: string
  cidade: string
  endereco: string
  cursos: number
  alunos: number
}

export default function InstituicaoPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const campusList: Campus[] = [
    { id: '1', nome: 'Campus Norte', cidade: 'São Paulo', endereco: 'Rua das Flores, 123', cursos: 12, alunos: 580 },
    { id: '2', nome: 'Campus Sul', cidade: 'São Paulo', endereco: 'Av. Principal, 456', cursos: 8, alunos: 420 },
    { id: '3', nome: 'Campus Leste', cidade: 'Guarulhos', endereco: 'Rua Central, 789', cursos: 10, alunos: 495 },
  ]

  const filteredCampus = campusList.filter((campus) =>
    campus.nome.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Instituição</h1>
          <p className="text-muted-foreground mt-1">Gerencie os campus da instituição</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="relative border border-primary/30 hover:border-primary/50">
              <Plus className="mr-2 h-4 w-4" />
              Novo Campus
              <div className="absolute top-0 left-0 w-1.5 h-1.5 border-l border-t border-primary/40" />
              <div className="absolute top-0 right-0 w-1.5 h-1.5 border-r border-t border-primary/40" />
              <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-l border-b border-primary/40" />
              <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-r border-b border-primary/40" />
            </Button>
          </DialogTrigger>
          <DialogContent className="border-primary/30">
            <DialogHeader>
              <DialogTitle>Novo Campus</DialogTitle>
              <DialogDescription>Adicione um novo campus à instituição</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="nome">Nome do Campus</Label>
                <Input id="nome" placeholder="Campus Norte" className="border-primary/30" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cidade">Cidade</Label>
                <Input id="cidade" placeholder="São Paulo" className="border-primary/30" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endereco">Endereço</Label>
                <Input id="endereco" placeholder="Rua das Flores, 123" className="border-primary/30" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={() => setIsDialogOpen(false)}>Salvar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Buscar por nome..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9 border-primary/30 focus:border-primary/50 relative"
        />
        <div className="absolute top-0 left-0 w-2 h-2 border-l border-t border-primary/40 pointer-events-none" />
        <div className="absolute top-0 right-0 w-2 h-2 border-r border-t border-primary/40 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-2 h-2 border-l border-b border-primary/40 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-2 h-2 border-r border-b border-primary/40 pointer-events-none" />
      </div>

      {/* Campus List */}
      {isLoading ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="relative border-primary/30">
              <CornerAccent />
              <CardContent className="p-6">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-24 mt-2" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : filteredCampus.length === 0 ? (
        <Card className="relative border-primary/30">
          <CornerAccent />
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Building2 className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Nenhum campus encontrado</p>
            {searchQuery && (
              <Button variant="link" onClick={() => setSearchQuery('')} className="mt-2">
                Limpar busca
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredCampus.map((campus) => (
            <Card key={campus.id} className="relative border-primary/30 hover:border-primary/50 transition-colors">
              <CornerAccent />
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  {/* Icon */}
                  <div className="shrink-0 w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20">
                    <Building2 className="h-7 w-7 text-primary" />
                  </div>

                  {/* Title and Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-lg mb-1 text-balance">{campus.nome}</h3>
                    <p className="text-sm text-muted-foreground flex items-center gap-1.5 mt-2">
                      <MapPin className="h-3.5 w-3.5" />
                      {campus.cidade}
                    </p>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mb-4">{campus.endereco}</p>

                {/* Divider */}
                <div className="blueprint-divider my-6" />

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Cursos</p>
                    <span className="inline-block px-2 py-0.5 rounded-md text-sm font-semibold bg-primary/10 text-primary border border-primary/20">
                      {campus.cursos}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Alunos</p>
                    <span className="inline-block px-2 py-0.5 rounded-md text-sm font-semibold bg-primary/10 text-primary border border-primary/20">
                      {campus.alunos}
                    </span>
                  </div>
                </div>

                {/* Divider */}
                <div className="blueprint-divider my-6" />

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    className="btn-edit flex-1 gap-1.5"
                    onClick={(e) => {
                      e.preventDefault()
                      console.log('[v0] Edit campus:', campus.id)
                    }}
                  >
                    <Edit className="h-3.5 w-3.5" />
                    Editar
                  </Button>
                  <Button
                    size="sm"
                    className="btn-delete gap-1.5"
                    onClick={(e) => {
                      e.preventDefault()
                      console.log('[v0] Delete campus:', campus.id)
                    }}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    Excluir
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
