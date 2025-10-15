'use client'

import { ArrowLeft, BookOpen, Edit, GraduationCap, Plus, Users, MapPin, Clock, Calendar, Timer, CheckCircle, Zap, UserCheck, Home, Trash2, Save } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { useCursoBySlugQuery } from '@/hooks/use-curso'
import { Button } from '@/components/ui/button'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { Badge } from '@/components/ui/badge'
import type { DisciplinaSimplificada, disciplina } from '@/types/disciplina'
import { DisciplinasDataTable } from '@/components/dashboard/disciplina/disciplinas-data-table'
import { TurmasDataTable } from '@/components/dashboard/turma/turmas-data-table'
import { CursoDetailSkeleton } from '@/components/loadings/curso-skeletons'
import { Skeleton } from '@/components/ui/skeleton'

export default function CursoDetailPage() {
  const params = useParams()
  const router = useRouter()
  const cursoSlug = params.slug as string


  const { data: curso, isLoading, error } = useCursoBySlugQuery(cursoSlug)

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Curso não encontrado</h2>
            <p className="text-gray-600 mb-6">O curso solicitado não foi encontrado ou não existe.</p>
            <Button onClick={() => router.back()} variant="outline" className="bg-white border-gray-300 text-gray-700 hover:bg-gray-50">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar
            </Button>
          </div>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        {/* Header com Breadcrumb */}
        <div className="bg-background px-6 py-4">
          <div className="flex items-center justify-between gap-4">
            <Button
              onClick={() => router.back()}
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar
            </Button>
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
        </div>
        <CursoDetailSkeleton />
      </div>
    )
  }

  if (!curso) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Curso não encontrado</h2>
            <p className="text-gray-600 mb-6">O curso solicitado não foi encontrado ou não existe.</p>
            <Button onClick={() => router.back()} variant="outline" className="bg-white border-gray-300 text-gray-700 hover:bg-gray-50">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header com Breadcrumb */}
      <div className="bg-background px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          <Button
            onClick={() => router.back()}
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </Button>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/dashboard" className="flex items-center gap-1">
                  <Home className="h-4 w-4" />
                  Dashboard
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/dashboard/cursos">Cursos</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{curso.nome}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* Conteúdo Principal */}
      <div className="px-6 pb-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header do Curso */}
          <div className="bg-card rounded-lg border p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <BookOpen className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-foreground">{curso.nome}</h1>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="secondary" className="text-xs">
                        {curso.sigla}
                      </Badge>
                      <span className="text-sm text-muted-foreground">•</span>
                      <span className="text-sm text-muted-foreground flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {curso.campusNome}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Estatísticas */}
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <BookOpen className="h-4 w-4" />
                    <span>{curso.disciplinas?.length || 0} disciplinas</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>{curso.turmas?.length || 0} turmas</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>Criado em {new Date(curso.createdAt).toLocaleDateString('pt-BR')}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => router.push(`/dashboard/cursos/editar/${curso.slug}`)}
                  className="flex items-center gap-2"
                >
                  <Edit className="h-4 w-4" />
                  Editar
                </Button>
              </div>
            </div>
          </div>

          {/* Grid de Conteúdo */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Disciplinas */}
            <div className="bg-card rounded-lg border">
              <div className="p-6 border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-primary" />
                    <h2 className="text-lg font-semibold">Disciplinas</h2>
                    <Badge variant="secondary" className="ml-2">
                      {curso.disciplinas?.length || 0}
                    </Badge>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => router.push(`/dashboard/disciplinas/novo?cursoId=${curso.id}`)}
                    className="flex items-center gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    Nova Disciplina
                  </Button>
                </div>
              </div>
              <div className="p-6">
                {curso.disciplinas && curso.disciplinas.length > 0 ? (
                  <DisciplinasDataTable 
                    disciplinas={curso.disciplinas} 
                    cursoId={curso.id}
                    cursoNome={curso.nome}
                  />
                ) : (
                  <div className="text-center py-8">
                    <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-foreground mb-2">Nenhuma disciplina encontrada</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Este curso ainda não possui disciplinas cadastradas.
                    </p>
                    <div className="flex justify-center">
                      <Button
                        onClick={() => router.push(`/dashboard/disciplinas/novo?cursoId=${curso.id}`)}
                        className="flex items-center gap-2"
                      >
                        <Plus className="h-4 w-4" />
                        Adicionar Primeira Disciplina
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Turmas */}
            <div className="bg-card rounded-lg border">
              <div className="p-6 border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    <h2 className="text-lg font-semibold">Turmas</h2>
                    <Badge variant="secondary" className="ml-2">
                      {curso.turmas?.length || 0}
                    </Badge>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => router.push(`/dashboard/turmas/novo?cursoId=${curso.id}`)}
                    className="flex items-center gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    Nova Turma
                  </Button>
                </div>
              </div>
              <div className="p-6">
                {curso.turmas && curso.turmas.length > 0 ? (
                  <TurmasDataTable 
                    cursoId={curso.id}
                    cursoNome={curso.nome}
                  />
                ) : (
                  <div className="text-center py-8">
                    <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-foreground mb-2">Nenhuma turma encontrada</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Este curso ainda não possui turmas cadastradas.
                    </p>
                    <div className="flex justify-center">
                      <Button
                        onClick={() => router.push(`/dashboard/turmas/novo?cursoId=${curso.id}`)}
                        className="flex items-center gap-2"
                      >
                        <Plus className="h-4 w-4" />
                        Adicionar Primeira Turma
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Informações Adicionais */}
          <div className="bg-card rounded-lg border p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-primary" />
              Informações do Sistema
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Criado em:</span>
                <span className="font-medium">{new Date(curso.createdAt).toLocaleDateString('pt-BR')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Timer className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Atualizado em:</span>
                <span className="font-medium">{new Date(curso.updatedAt).toLocaleDateString('pt-BR')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">ID do Sistema:</span>
                <span className="font-mono text-xs bg-muted px-2 py-1 rounded">{curso.id}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}