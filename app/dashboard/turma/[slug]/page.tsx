"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { CornerAccent } from "@/components/elements/corner-accent"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowLeft, BookOpen, Edit, Trash2, Plus, Calendar, ChevronDown, ChevronRight } from "lucide-react"
import { useTurmaBySlugOrId } from '@/hooks/use-turmas'

export default function TurmaDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const turmaSlug = params.slug as string

  const [expandedPeriods, setExpandedPeriods] = useState<Set<string>>(new Set())

  const { data: turmaData, isLoading, isError } = useTurmaBySlugOrId(turmaSlug)

  const togglePeriod = (periodoId: string) => {
    const newExpanded = new Set(expandedPeriods)
    if (newExpanded.has(periodoId)) {
      newExpanded.delete(periodoId)
    } else {
      newExpanded.add(periodoId)
    }
    setExpandedPeriods(newExpanded)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" })
  }

  const getTipoPeriodoLabel = (tipo: string) => {
    const tipos: Record<string, string> = {
      ANUAL: "Anual",
      SEMESTRAL: "Semestral",
      TRIMESTRAL: "Trimestral",
    }
    return tipos[tipo] || tipo
  }

  // Calcular totais
  const totalDisciplinas = turmaData?.periodos.reduce((acc, periodo) => acc + periodo.disciplinas.length, 0) ?? 0
  const totalPeriodos = turmaData?.periodos.length ?? 0

  if (isLoading) {
    return (
      <Card className="relative border-primary/30">
        <CornerAccent />
        <CardContent className="p-8">
          <p className="text-muted-foreground">Carregando turma...</p>
        </CardContent>
      </Card>
    )
  }

  if (isError || !turmaData) {
    return (
      <Card className="relative border-primary/30">
        <CornerAccent />
        <CardContent className="p-8">
          <p className="text-muted-foreground">Turma não encontrada</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/dashboard" className="hover:text-foreground">
          Dashboard
        </Link>
        <span>/</span>
        <Link href="/dashboard/cursos" className="hover:text-foreground">
          Cursos
        </Link>
        <span>/</span>
        <Link href={`/dashboard/cursos/${turmaData.cursoId}`} className="hover:text-foreground">
          {turmaData.cursoNome}
        </Link>
        <span>/</span>
        <span className="text-foreground">{turmaData.nome}</span>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => router.back()}
            className="border-primary/30 hover:border-primary/50 relative"
          >
            <ArrowLeft className="h-4 w-4" />
            <div className="absolute top-0 left-0 w-1.5 h-1.5 border-l border-t border-primary/40" />
            <div className="absolute top-0 right-0 w-1.5 h-1.5 border-r border-t border-primary/40" />
            <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-l border-b border-primary/40" />
            <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-r border-b border-primary/40" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{turmaData.nome}</h1>
            <p className="text-muted-foreground mt-1">Curso: {turmaData.cursoNome}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="border-primary/30 hover:border-primary/50 bg-transparent">
            <Edit className="mr-2 h-4 w-4" />
            Editar
          </Button>
          <Button
            variant="outline"
            className="text-destructive hover:text-destructive border-destructive/30 bg-transparent"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Excluir
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="relative border-primary/30">
          <CornerAccent />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium tech-label">Total de Períodos</CardTitle>
            <Calendar className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalPeriodos}</div>
          </CardContent>
        </Card>
        <Card className="relative border-primary/30">
          <CornerAccent />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium tech-label">Total de Disciplinas</CardTitle>
            <BookOpen className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalDisciplinas}</div>
          </CardContent>
        </Card>
        <Card className="relative border-primary/30">
          <CornerAccent />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium tech-label">Número da Turma</CardTitle>
            <BookOpen className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">#{turmaData.numero}</div>
          </CardContent>
        </Card>
      </div>

      {/* Períodos e Disciplinas */}
      <Card className="relative border-primary/30">
        <CornerAccent />
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Períodos e Disciplinas</CardTitle>
              <CardDescription>Organização curricular da turma por períodos</CardDescription>
            </div>
            <Button className="relative border border-primary/30 hover:border-primary/50">
              <Plus className="mr-2 h-4 w-4" />
              Novo Período
              <div className="absolute top-0 left-0 w-1.5 h-1.5 border-l border-t border-primary/40" />
              <div className="absolute top-0 right-0 w-1.5 h-1.5 border-r border-t border-primary/40" />
              <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-l border-b border-primary/40" />
              <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-r border-b border-primary/40" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {turmaData.periodos.map((periodo) => (
            <div key={periodo.id} className="border border-primary/20 rounded-lg overflow-hidden">
              {/* Period Header */}
              <div className="flex items-center justify-between p-4 bg-muted/50 border-b border-dashed border-primary/20">
                <div className="flex items-center gap-3">
                  <Button variant="ghost" size="sm" onClick={() => togglePeriod(periodo.id)} className="h-8 w-8 p-0">
                    {expandedPeriods.has(periodo.id) ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </Button>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-lg">{periodo.nome}</h3>
                      <Badge variant="outline" className="tech-label text-xs">
                        {getTipoPeriodoLabel(periodo.tipoPeriodo)}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground tech-label mt-1">
                      {formatDate(periodo.inicio)} - {formatDate(periodo.fim)} • {periodo.disciplinas.length}{" "}
                      disciplina(s)
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="relative border-primary/30 hover:border-primary/50 bg-transparent"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Adicionar Disciplina
                    <div className="absolute top-0 left-0 w-1 h-1 border-l border-t border-primary/40" />
                    <div className="absolute top-0 right-0 w-1 h-1 border-r border-t border-primary/40" />
                    <div className="absolute bottom-0 left-0 w-1 h-1 border-l border-b border-primary/40" />
                    <div className="absolute bottom-0 right-0 w-1 h-1 border-r border-b border-primary/40" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-yellow-600 dark:text-yellow-500 hover:bg-yellow-500/10"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost" className="text-destructive hover:bg-destructive/10">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Disciplines Table */}
              {expandedPeriods.has(periodo.id) && (
                <div className="p-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nome da Disciplina</TableHead>
                        <TableHead>Slug</TableHead>
                        <TableHead className="text-right">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {periodo.disciplinas.map((disciplina) => (
                        <TableRow key={disciplina.id}>
                          <TableCell className="font-medium">{disciplina.nome}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="tech-label">
                              {disciplina.slug}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-yellow-600 dark:text-yellow-500 hover:bg-yellow-500/10"
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="text-destructive hover:bg-destructive/10">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
