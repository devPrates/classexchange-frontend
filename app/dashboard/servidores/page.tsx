'use client'

import { useState } from 'react'
import { servidores as servidoresMock, type Servidor } from '@/services/mock-data'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CornerAccent } from '@/components/elements/corner-accent'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Search, Plus } from 'lucide-react'

export default function ServidoresPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [servidores, setServidores] = useState<Servidor[]>(servidoresMock)

  const filtered = servidores.filter((s) =>
    [s.nome, s.email, s.cargo, s.setor].some((field) => field.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Servidores</h1>
          <p className="text-muted-foreground mt-1">Cadastro e gerenciamento de usuários</p>
        </div>
        <Button className="relative border border-primary/30 hover:border-primary/50" onClick={() => setIsDialogOpen(true)}>
          <Plus className="h-4 w-4" />
          Novo Servidor
          <div className="absolute top-0 left-0 w-1.5 h-1.5 border-l border-t border-primary/40" />
          <div className="absolute top-0 right-0 w-1.5 h-1.5 border-r border-t border-primary/40" />
          <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-l border-b border-primary/40" />
          <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-r border-b border-primary/40" />
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Buscar por nome, email, cargo ou setor..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9 border-primary/30 focus:border-primary/50 relative"
        />
        <div className="absolute top-0 left-0 w-2 h-2 border-l border-t border-primary/40 pointer-events-none" />
        <div className="absolute top-0 right-0 w-2 h-2 border-r border-t border-primary/40 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-2 h-2 border-l border-b border-primary/40 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-2 h-2 border-r border-b border-primary/40 pointer-events-none" />
      </div>

      {/* Table */}
      <Card className="relative border-primary/30">
        <CornerAccent />
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Lista de Servidores</CardTitle>
              <CardDescription>Usuários cadastrados no sistema</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Cargo</TableHead>
                <TableHead>Setor</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((s) => (
                <TableRow key={s.id}>
                  <TableCell className="font-medium">{s.nome}</TableCell>
                  <TableCell>{s.email}</TableCell>
                  <TableCell>{s.cargo}</TableCell>
                  <TableCell>{s.setor}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="tech-label">
                      {s.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Simple inline create for futuro backend integration */}
          {isDialogOpen && (
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nome">Nome</Label>
                <Input id="nome" placeholder="Nome completo" className="border-primary/30" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" placeholder="email@instituicao.edu.br" className="border-primary/30" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cargo">Cargo</Label>
                <Input id="cargo" placeholder="Professor, Coordenador..." className="border-primary/30" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="setor">Setor</Label>
                <Input id="setor" placeholder="Computação, Engenharia..." className="border-primary/30" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Input id="status" placeholder="ativo/inativo" className="border-primary/30" />
              </div>
              <div className="md:col-span-2 flex gap-2">
                <Button className="relative border border-primary/30 hover:border-primary/50" onClick={() => setIsDialogOpen(false)}>
                  Salvar (mock)
                  <div className="absolute top-0 left-0 w-1.5 h-1.5 border-l border-t border-primary/40" />
                  <div className="absolute top-0 right-0 w-1.5 h-1.5 border-r border-t border-primary/40" />
                  <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-l border-b border-primary/40" />
                  <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-r border-b border-primary/40" />
                </Button>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancelar</Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}