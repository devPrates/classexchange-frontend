'use client'

import { useState } from 'react'
import { CornerAccent } from '@/components/elements/corner-accent'
import { CourseCard } from '@/components/elements/course-card'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Search, Plus, BookOpen } from 'lucide-react'
import { CursoForm } from '@/components/forms/curso-form'
import { useCursos } from '@/hooks/use-cursos'
import { Skeleton } from '@/components/ui/skeleton'

export default function CursosPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { data, isLoading, isError, refetch } = useCursos(searchQuery)
  const filteredCursos = data ?? []

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
            <CursoForm onSuccess={() => setIsDialogOpen(false)} />
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
      {isLoading ? (
        <div className="grid gap-4 lg:grid-cols-2">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="relative border-primary/30">
              <CornerAccent />
              <CardContent className="p-6">
                <Skeleton className="h-5 w-40" />
                <Skeleton className="h-4 w-24 mt-2" />
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <Skeleton className="h-8 w-full" />
                  <Skeleton className="h-8 w-full" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : isError ? (
        <Card className="relative border-primary/30">
          <CornerAccent />
          <CardContent className="py-6 flex items-center justify-between">
            <p className="text-muted-foreground">Não foi possível carregar os cursos</p>
            <Button variant="outline" onClick={() => refetch()}>Tentar novamente</Button>
          </CardContent>
        </Card>
      ) : filteredCursos.length === 0 ? (
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
