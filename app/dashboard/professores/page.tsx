"use client"

import { useState } from "react"
import { CornerAccent } from "@/components/elements/corner-accent"
import { StatCard } from "@/components/elements/stat-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { UserCircle, BookOpen, Users, Plus, Search, ChevronDown, ChevronRight, Edit, Trash2 } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { UsuarioForm } from "@/components/forms/usuario-form"
import { RoleUsuario } from "@/types/usuarios"

export default function ProfessoresPage() {
  const [expandedCourses, setExpandedCourses] = useState<Set<string>>(new Set(["1", "2"]))
  const [searchTerm, setSearchTerm] = useState("")
  const [isProfDialogOpen, setIsProfDialogOpen] = useState(false)

  const nomes = [
    "João Silva",
    "Maria Santos",
    "Pedro Oliveira",
    "Ana Costa",
    "Carlos Souza",
    "Julia Lima",
    "Roberto Alves",
    "Fernanda Rocha",
    "Ricardo Lima",
    "Juliana Alves",
    "Fernando Costa",
    "Mariana Pereira",
    "Bruno Martins",
    "Camila Nunes",
    "André Gonçalves",
    "Paula Fernandes",
    "Lucas Ribeiro",
    "Sofia Almeida",
    "Gustavo Carvalho",
    "Larissa Mendes",
  ]

  const nameToEmail = (nome: string, sigla: string) =>
    `${nome
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z\s]/g, '')
      .trim()
      .replace(/\s+/g, '.')}.${sigla.toLowerCase()}@ifms.edu.br`

  const makeProfessores = (sigla: string) =>
    Array.from({ length: 5 }, (_, i) => {
      const idx = i + 1
      const id = `${sigla}-P-${idx.toString().padStart(2, '0')}`
      const nome = nomes[i % nomes.length]
      const siape = `${sigla}${idx.toString().padStart(6, '0')}`
      const discList = sigla === 'SI' ? ['Algoritmos', 'POO', 'BD'] : ['Marketing', 'Finanças', 'RH']
      const disciplinas = discList.slice(0, 2 + (i % 2)).join(', ')
      const email = nameToEmail(nome, sigla)
      return { id, nome, siape, disciplinas, email }
    })

  const cursos = [
    {
      id: "1",
      nome: "Sistemas de Informação",
      sigla: "SI",
      professores: makeProfessores("SI"),
    },
    {
      id: "2",
      nome: "Administração",
      sigla: "ADM",
      professores: makeProfessores("ADM"),
    },
  ]

  const totalProfessores = cursos.reduce((acc, curso) => acc + curso.professores.length, 0)
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
        <h1 className="text-3xl font-bold tracking-tight">Professores</h1>
        <p className="text-muted-foreground mt-1">Gerenciamento de professores por curso</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <StatCard label="Total de Cursos" value={totalCursos} Icon={BookOpen} />
        <StatCard label="Total de Professores" value={totalProfessores} Icon={UserCircle} />
        <StatCard label="Total de Turmas" value={totalTurmas} Icon={Users} />
      </div>

      {/* Main Content */}
      <Card className="relative border-primary/30">
        <CornerAccent />
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <CardTitle>Professores por Curso</CardTitle>
              <CardDescription>Lista de professores organizados por curso</CardDescription>
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:flex-initial">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar professor..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 border-primary/30 w-full sm:w-[250px]"
                />
              </div>
              <Dialog open={isProfDialogOpen} onOpenChange={setIsProfDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="relative border border-primary/30 hover:border-primary/50">
                    <Plus className="mr-2 h-4 w-4" />
                    Novo Professor
                    <div className="absolute top-0 left-0 w-1.5 h-1.5 border-l border-t border-primary/40" />
                    <div className="absolute top-0 right-0 w-1.5 h-1.5 border-r border-t border-primary/40" />
                    <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-l border-b border-primary/40" />
                    <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-r border-b border-primary/40" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="border-primary/30">
                  <DialogHeader>
                    <DialogTitle>Adicionar Professor</DialogTitle>
                    <DialogDescription>Cadastre um novo professor</DialogDescription>
                  </DialogHeader>
                  <UsuarioForm
                    mode="create"
                    defaultValues={{ role: RoleUsuario.PROFESSOR }}
                    hideRole
                    onSuccess={() => {
                      setIsProfDialogOpen(false)
                    }}
                  />
                </DialogContent>
              </Dialog>
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
                    <p className="text-sm text-muted-foreground tech-label">{curso.professores.length} professor(es)</p>
                  </div>
                </div>
                <Badge variant="outline" className="tech-label bg-primary/10">
                  {curso.sigla}
                </Badge>
              </div>

              {/* Professors Table */}
              {expandedCourses.has(curso.id) && (
                <div className="p-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nome</TableHead>
                        <TableHead>SIAPE</TableHead>
                        <TableHead>Disciplinas</TableHead>
                        <TableHead>E-mail</TableHead>
                        <TableHead className="text-right">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {curso.professores.map((professor) => (
                        <TableRow key={professor.id}>
                          <TableCell className="font-medium">{professor.nome}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="tech-label">
                              {professor.siape}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-sm">{professor.disciplinas}</TableCell>
                          <TableCell className="text-muted-foreground text-sm">{professor.email}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="icon" className="hover:bg-yellow-300" aria-label="Editar">
                                <Edit className="h-4 w-4 text-yellow-600" />
                              </Button>
                              <Button variant="ghost" size="icon" className="hover:bg-red-300" aria-label="Excluir">
                                <Trash2 className="h-4 w-4 text-red-600" />
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
