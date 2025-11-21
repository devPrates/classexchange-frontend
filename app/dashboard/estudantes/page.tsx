"use client"

import { useState } from "react"
import { CornerAccent } from "@/components/elements/corner-accent"
import { StatCard } from "@/components/elements/stat-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { GraduationCap, BookOpen, Users, Plus, Search, ChevronDown, ChevronRight, Edit, Trash2 } from "lucide-react"

export default function EstudantesPage() {
  const [expandedCourses, setExpandedCourses] = useState<Set<string>>(new Set(["1", "2"]))
  const [searchTerm, setSearchTerm] = useState("")

  const cursos = [
    {
      id: "1",
      nome: "Ciência da Computação",
      sigla: "CC",
      estudantes: [
        { id: "1", nome: "João Silva", matricula: "2024001", periodo: "3º", email: "joao@email.com" },
        { id: "2", nome: "Maria Santos", matricula: "2024002", periodo: "3º", email: "maria@email.com" },
        { id: "3", nome: "Pedro Oliveira", matricula: "2024003", periodo: "5º", email: "pedro@email.com" },
      ],
    },
    {
      id: "2",
      nome: "Engenharia Civil",
      sigla: "EC",
      estudantes: [
        { id: "4", nome: "Ana Costa", matricula: "2024004", periodo: "2º", email: "ana@email.com" },
        { id: "5", nome: "Carlos Souza", matricula: "2024005", periodo: "4º", email: "carlos@email.com" },
      ],
    },
    {
      id: "3",
      nome: "Administração",
      sigla: "ADM",
      estudantes: [
        { id: "6", nome: "Julia Lima", matricula: "2024006", periodo: "1º", email: "julia@email.com" },
        { id: "7", nome: "Roberto Alves", matricula: "2024007", periodo: "6º", email: "roberto@email.com" },
        { id: "8", nome: "Fernanda Rocha", matricula: "2024008", periodo: "2º", email: "fernanda@email.com" },
      ],
    },
  ]

  const totalEstudantes = cursos.reduce((acc, curso) => acc + curso.estudantes.length, 0)
  const totalCursos = cursos.length
  const totalTurmas = 18

  const toggleCourse = (cursoId: string) => {
    const newExpanded = new Set(expandedCourses)
    if (newExpanded.has(cursoId)) {
      newExpanded.delete(cursoId)
    } else {
      newExpanded.add(cursoId)
    }
    setExpandedCourses(newExpanded)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Estudantes</h1>
        <p className="text-muted-foreground mt-1">Gerenciamento de estudantes por curso</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <StatCard label="Total de Cursos" value={totalCursos} Icon={BookOpen} />
        <StatCard label="Total de Estudantes" value={totalEstudantes} Icon={GraduationCap} />
        <StatCard label="Total de Turmas" value={totalTurmas} Icon={Users} />
      </div>

      {/* Main Content */}
      <Card className="relative border-primary/30">
        <CornerAccent />
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <CardTitle>Estudantes por Curso</CardTitle>
              <CardDescription>Lista de estudantes organizados por curso</CardDescription>
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:flex-initial">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar estudante..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 border-primary/30 w-full sm:w-[250px]"
                />
              </div>
              <Button className="relative border border-primary/30 hover:border-primary/50">
                <Plus className="mr-2 h-4 w-4" />
                Novo Estudante
                <div className="absolute top-0 left-0 w-1.5 h-1.5 border-l border-t border-primary/40" />
                <div className="absolute top-0 right-0 w-1.5 h-1.5 border-r border-t border-primary/40" />
                <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-l border-b border-primary/40" />
                <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-r border-b border-primary/40" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {cursos.map((curso) => (
            <div key={curso.id} className="border border-primary/20 rounded-lg overflow-hidden">
              {/* Course Header */}
              <div className="flex items-center justify-between p-4 bg-muted/50 border-b border-dashed border-primary/20">
                <div className="flex items-center gap-3">
                  <Button variant="ghost" size="sm" onClick={() => toggleCourse(curso.id)} className="h-8 w-8 p-0">
                    {expandedCourses.has(curso.id) ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </Button>
                  <div>
                    <h3 className="font-semibold text-lg">{curso.nome}</h3>
                    <p className="text-sm text-muted-foreground tech-label">{curso.estudantes.length} estudante(s)</p>
                  </div>
                </div>
                <Badge variant="outline" className="tech-label bg-primary/10">
                  {curso.sigla}
                </Badge>
              </div>

              {/* Students Table */}
              {expandedCourses.has(curso.id) && (
                <div className="p-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nome</TableHead>
                        <TableHead>Matrícula</TableHead>
                        <TableHead>Período</TableHead>
                        <TableHead>E-mail</TableHead>
                        <TableHead className="text-right">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {curso.estudantes.map((estudante) => (
                        <TableRow key={estudante.id}>
                          <TableCell className="font-medium">{estudante.nome}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="tech-label">
                              {estudante.matricula}
                            </Badge>
                          </TableCell>
                          <TableCell>{estudante.periodo}</TableCell>
                          <TableCell className="text-muted-foreground text-sm">{estudante.email}</TableCell>
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
