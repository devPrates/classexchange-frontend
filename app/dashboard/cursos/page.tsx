'use client'

import { useState } from 'react'
import Link from 'next/link'
import { CornerAccent } from '@/components/elements/corner-accent'
import { cursos } from '@/services/mock-data'
import { CourseCard } from '@/components/elements/course-card'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Search, Plus, BookOpen, Eye, Edit, Trash2, GraduationCap, Users, Calendar, Layers } from 'lucide-react'

type Curso = {
  id: string
  nome: string
  sigla: string
  campus: string
  coordenador: string
  alunos: number
  turmas: number
  disciplinas: number
  semestres: number
}

export default function CursosPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  

  const filteredCursos = cursos.filter(
    (curso) =>
      curso.nome.toLowerCase().includes(searchQuery.toLowerCase()) ||
      curso.sigla.toLowerCase().includes(searchQuery.toLowerCase()) ||
      curso.campus.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Cursos</h1>
          <p className="text-muted-foreground mt-1">Gerencie os cursos da instituição</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="relative border border-primary/30 hover:border-primary/50">
              <Plus className="h-4 w-4" />
              Novo Curso
              <div className="absolute top-0 left-0 w-1.5 h-1.5 border-l border-t border-primary/40" />
              <div className="absolute top-0 right-0 w-1.5 h-1.5 border-r border-t border-primary/40" />
              <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-l border-b border-primary/40" />
              <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-r border-b border-primary/40" />
            </Button>
          </DialogTrigger>
          <DialogContent className="border-primary/30">
            <DialogHeader>
              <DialogTitle>Novo Curso</DialogTitle>
              <DialogDescription>Adicione um novo curso à instituição</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="nome-curso">Nome do Curso</Label>
                <Input id="nome-curso" placeholder="Ciência da Computação" className="border-primary/30" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sigla">Sigla</Label>
                <Input id="sigla" placeholder="CC" className="border-primary/30" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="campus-select">Campus</Label>
                <Select>
                  <SelectTrigger id="campus-select" className="border-primary/30">
                    <SelectValue placeholder="Selecione o campus" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="norte">Campus Norte</SelectItem>
                    <SelectItem value="sul">Campus Sul</SelectItem>
                    <SelectItem value="leste">Campus Leste</SelectItem>
                  </SelectContent>
                </Select>
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
          placeholder="Buscar por nome, sigla ou campus..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9 border-primary/30 focus:border-primary/50 relative"
        />
        <div className="absolute top-0 left-0 w-2 h-2 border-l border-t border-primary/40 pointer-events-none" />
        <div className="absolute top-0 right-0 w-2 h-2 border-r border-t border-primary/40 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-2 h-2 border-l border-b border-primary/40 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-2 h-2 border-r border-b border-primary/40 pointer-events-none" />
      </div>

      {/* Courses Grid */}
      {filteredCursos.length === 0 ? (
        <Card className="relative border-primary/30">
          <CornerAccent />
          <CardContent className="flex flex-col items-center justify-center py-12">
            <BookOpen className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Nenhum curso encontrado</p>
            {searchQuery && (
              <Button variant="link" onClick={() => setSearchQuery('')} className="mt-2">
                Limpar busca
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 lg:grid-cols-2">
          {filteredCursos.map((curso) => (
            <CourseCard key={curso.id} curso={curso} />
          ))}
        </div>
      )}
    </div>
  )
}
