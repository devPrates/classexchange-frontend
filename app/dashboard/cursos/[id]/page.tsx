
'use client'

import { ArrowLeft, BookOpen, Edit, GraduationCap, Plus, Users, MapPin, Clock, Calendar, Timer, CheckCircle, Zap, UserCheck, Home, Trash2 } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { useCursoByIdQuery } from '@/hooks/use-curso'
import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/dashboard/data-table'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { Badge } from '@/components/ui/badge'
import { disciplinasColumns, turmasColumns } from './columns'
import type { DisciplinaSimplificada } from '@/types/disciplina'
import type { TurmaSimplificada } from '@/types/turma'

export default function CursoDetailPage() {
  const params = useParams()
  const router = useRouter()
  const cursoId = params.id as string

  const { data: curso, isLoading, error } = useCursoByIdQuery(cursoId)

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-300 rounded w-1/3"></div>
            <div className="h-96 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !curso) {
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
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </Button>

          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/dashboard"><Home className="h-4 w-4" /></BreadcrumbLink>
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
      <div className="p-6 space-y-6">

        {/* Header Principal - Estilo Cabeçalho de Documento */}
        <div className="pb-6 border-b border-border/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 p-4 rounded-xl border border-primary/20">
                <GraduationCap className="h-8 w-8 text-primary" />
              </div>
              <div className="space-y-1">
                <h2 className="text-2xl font-bold tracking-tight text-foreground">
                  {curso.nome.toUpperCase()}
                </h2>
                <div className="flex items-center gap-2">
                  <div className="h-1 w-8 bg-primary rounded-full"></div>
                  <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                    IFMS - Campus {curso.campusNome}
                  </p>
                </div>
                <p className="text-md text-muted-foreground font-medium">
                  Staus: <Badge className="">Ativo</Badge>
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="border-yellow-200 text-yellow-600 hover:bg-yellow-50 hover:border-yellow-300 dark:border-yellow-800 dark:text-yellow-400 dark:hover:bg-yellow-950 dark:hover:border-yellow-700"
              >
                <Edit className="h-4 w-4 mr-1" />
                Editar
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-950 dark:hover:border-red-700"
              >
                <Trash2 className="h-4 w-4 mr-1" />
                Excluir
              </Button>
            </div>
          </div>
        </div>

        {/* Conteúdo Organizado - Layout Simples */}
        <div className="">
          <div className="space-y-4">

            {/* Modalidade e Duração */}
            <div className="grid grid-cols-2 gap-8">
              <div className="flex items-center gap-3">
                <GraduationCap className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm font-medium text-foreground">Modalidade:</p>
                <p className="text-sm text-muted-foreground">Presencial</p>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm font-medium text-foreground">Duração:</p>
                <p className="text-sm text-muted-foreground">8 Semestres</p>
              </div>
            </div>

            {/* Linha separadora */}
            <div className="border-t border-border/30"></div>

            {/* Carga Horária e Turno */}
            <div className="grid grid-cols-2 gap-8">
              <div className="flex items-center gap-3">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm font-medium text-foreground">Carga Horária:</p>
                <p className="text-sm text-muted-foreground">3.200 horas</p>
              </div>
              <div className="flex items-center gap-3">
                <Timer className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm font-medium text-foreground">Turno:</p>
                <p className="text-sm text-muted-foreground">Integral</p>
              </div>
            </div>

            {/* Linha separadora */}
            <div className="border-t border-border/30"></div>

            {/* Vagas e Status */}
            <div className="grid grid-cols-2 gap-8">
              <div className="flex items-center gap-3">
                <Users className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm font-medium text-foreground">Vagas/Semestre:</p>
                <p className="text-sm text-muted-foreground">40 vagas</p>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm font-medium text-foreground">Status:</p>
                <p className="text-sm text-muted-foreground">Ativo</p>
              </div>
            </div>
          </div>
        </div>

        {/* Separador */}
        <div className="border-t border-border/30 my-8"></div>

        {/* Seção do Coordenador */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <UserCheck className="h-5 w-5 text-muted-foreground" />
              <h2 className="text-lg font-semibold text-foreground">COORDENADOR DO CURSO</h2>
            </div>
            <Button variant="outline" size="sm" className="text-xs">
              <Edit className="h-3 w-3 mr-1" />
              Editar
            </Button>
          </div>

          {/* Conteúdo Organizado - Layout Simples */}
          <div className="">
            <div className="space-y-4">
              {/* Informações do Coordenador */}
              <div className="grid grid-cols-2 gap-8">
                <div className="flex items-center gap-3">
                  <UserCheck className="h-4 w-4 text-muted-foreground" />
                  <p className="text-sm font-medium text-foreground">Nome:</p>
                  <p className="text-sm text-muted-foreground">Dr. Ana Costa</p>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <p className="text-sm font-medium text-foreground">Desde:</p>
                  <p className="text-sm text-muted-foreground">2020</p>
                </div>
              </div>

              {/* Linha separadora */}
              <div className="border-t border-border/30"></div>

              {/* Responsabilidade */}
              <div className="flex items-center gap-3">
                <GraduationCap className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm font-medium text-foreground">Responsabilidade:</p>
                <p className="text-sm text-muted-foreground">Coordenação acadêmica</p>
              </div>
            </div>
          </div>
        </div>

        {/* Separador */}
        <div className="border-t border-border/30 my-8"></div>

        {/* Seção de Disciplinas */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-muted-foreground" />
              <h2 className="text-lg font-semibold text-foreground">DISCIPLINAS</h2>
            </div>
            <Button className="bg-green-600 hover:bg-green-700 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Nova Disciplina
            </Button>
          </div>

          <DataTable<DisciplinaSimplificada, any>
            data={curso.disciplinas || []}
            columns={disciplinasColumns}
            searchPlaceholder="Buscar disciplinas..."
            emptyMessage="Nenhuma disciplina cadastrada"
            showColumnVisibility={false}
            showPagination={false}
          />
        </div>

        {/* Seção Turmas */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-muted-foreground" />
              <h2 className="text-lg font-semibold text-foreground">TURMAS</h2>
            </div>
            <Button className="bg-green-600 hover:bg-green-700 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Nova Turma
            </Button>
          </div>

          <DataTable<TurmaSimplificada, any>
            data={curso.turmas || []}
            columns={turmasColumns}
            searchPlaceholder="Buscar turmas..."
            emptyMessage="Nenhuma turma cadastrada"
            showColumnVisibility={false}
            showPagination={false}
          />
        </div>
      </div>
    </div>
  );
}