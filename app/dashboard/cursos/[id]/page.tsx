'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { CornerAccent } from '@/components/elements/corner-accent'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { ArrowLeft, BookOpen, Edit, Trash2, Plus, Users } from 'lucide-react'

export default function CursoDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const cursoId = params.id as string

  // Mock data
  const curso = {
    id: cursoId,
    nome: 'Ciência da Computação',
    sigla: 'CC',
    campus: 'Campus Norte',
    disciplinas: 45,
    turmas: 12,
  }

  const disciplinas = [
    { id: '1', nome: 'Algoritmos e Programação', codigo: 'CC101', cargaHoraria: 80, periodo: 1 },
    { id: '2', nome: 'Estrutura de Dados', codigo: 'CC201', cargaHoraria: 60, periodo: 2 },
    { id: '3', nome: 'Banco de Dados', codigo: 'CC301', cargaHoraria: 60, periodo: 3 },
  ]

  const turmas = [
    { id: '1', nome: 'CC-2024-A', periodo: '2024.1', alunos: 35, disciplina: 'Algoritmos' },
    { id: '2', nome: 'CC-2024-B', periodo: '2024.1', alunos: 32, disciplina: 'Estrutura de Dados' },
    { id: '3', nome: 'CC-2024-C', periodo: '2024.2', alunos: 28, disciplina: 'Banco de Dados' },
  ]

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
        <span className="text-foreground">{curso.nome}</span>
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
            <h1 className="text-3xl font-bold tracking-tight">{curso.nome}</h1>
            <p className="text-muted-foreground mt-1">
              {curso.sigla} • {curso.campus}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="border-primary/30 hover:border-primary/50">
            <Edit className="mr-2 h-4 w-4" />
            Editar
          </Button>
          <Button variant="outline" className="text-destructive hover:text-destructive border-destructive/30">
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
            <CardTitle className="text-sm font-medium tech-label">Total de Disciplinas</CardTitle>
            <BookOpen className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{curso.disciplinas}</div>
          </CardContent>
        </Card>
        <Card className="relative border-primary/30">
          <CornerAccent />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium tech-label">Total de Turmas</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{curso.turmas}</div>
          </CardContent>
        </Card>
        <Card className="relative border-primary/30">
          <CornerAccent />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium tech-label">Alunos Matriculados</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">95</div>
          </CardContent>
        </Card>
      </div>

      {/* Disciplinas */}
      <Card className="relative border-primary/30">
        <CornerAccent />
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Disciplinas</CardTitle>
              <CardDescription>Lista de disciplinas do curso</CardDescription>
            </div>
            <Button className="relative border border-primary/30 hover:border-primary/50">
              <Plus className="mr-2 h-4 w-4" />
              Nova Disciplina
              <div className="absolute top-0 left-0 w-1.5 h-1.5 border-l border-t border-primary/40" />
              <div className="absolute top-0 right-0 w-1.5 h-1.5 border-r border-t border-primary/40" />
              <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-l border-b border-primary/40" />
              <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-r border-b border-primary/40" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Código</TableHead>
                <TableHead>Carga Horária</TableHead>
                <TableHead>Período</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {disciplinas.map((disciplina) => (
                <TableRow key={disciplina.id}>
                  <TableCell className="font-medium">{disciplina.nome}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="tech-label">
                      {disciplina.codigo}
                    </Badge>
                  </TableCell>
                  <TableCell>{disciplina.cargaHoraria}h</TableCell>
                  <TableCell>{disciplina.periodo}º</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Turmas */}
      <Card className="relative border-primary/30">
        <CornerAccent />
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Turmas</CardTitle>
              <CardDescription>Lista de turmas do curso</CardDescription>
            </div>
            <Button className="relative border border-primary/30 hover:border-primary/50">
              <Plus className="mr-2 h-4 w-4" />
              Nova Turma
              <div className="absolute top-0 left-0 w-1.5 h-1.5 border-l border-t border-primary/40" />
              <div className="absolute top-0 right-0 w-1.5 h-1.5 border-r border-t border-primary/40" />
              <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-l border-b border-primary/40" />
              <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-r border-b border-primary/40" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Período</TableHead>
                <TableHead>Disciplina</TableHead>
                <TableHead>Alunos</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {turmas.map((turma) => (
                <TableRow key={turma.id}>
                  <TableCell className="font-medium">{turma.nome}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="tech-label">
                      {turma.periodo}
                    </Badge>
                  </TableCell>
                  <TableCell>{turma.disciplina}</TableCell>
                  <TableCell>{turma.alunos}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
