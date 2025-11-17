'use client'

import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { campus, cursos } from '@/services/mock-data'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CornerAccent } from '@/components/elements/corner-accent'
import { Building2, MapPin, Phone, User, ArrowLeft, Users, BookOpen, Edit } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'

export default function InstituicaoDetailPage() {
  const params = useParams<{ slug: string }>()
  const router = useRouter()
  const item = campus.find((c) => c.slug === params.slug)

  if (!item) {
    return (
      <Card className="relative border-primary/30">
        <CornerAccent />
        <CardContent className="p-8">
          <p className="text-muted-foreground">Campus não encontrado</p>
        </CardContent>
      </Card>
    )
  }

  // Local form state (pronto para editar futuramente)
  const form = {
    nome: item.nome,
    cidade: item.cidade,
    endereco: item.endereco,
    telefone: item.telefone,
    coordenador: item.coordenador,
  }

  const campusCursos = cursos.filter((c) => c.campus === item.nome)

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/dashboard" className="hover:text-foreground">Dashboard</Link>
        <span>/</span>
        <Link href="/dashboard/instituicao" className="hover:text-foreground">Instituição</Link>
        <span>/</span>
        <span className="text-foreground">{item.nome}</span>
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
            <h1 className="text-3xl font-bold tracking-tight">{item.nome}</h1>
            <p className="text-muted-foreground mt-1 flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" />
              {item.cidade}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="border-primary/30 hover:border-primary/50">
            <Edit className="mr-2 h-4 w-4" />
            Editar
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="relative border-primary/30">
          <CornerAccent />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium tech-label">Cursos</CardTitle>
            <BookOpen className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{item.cursos}</div>
          </CardContent>
        </Card>
        <Card className="relative border-primary/30">
          <CornerAccent />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium tech-label">Alunos</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{item.alunos}</div>
          </CardContent>
        </Card>
        <Card className="relative border-primary/30">
          <CornerAccent />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium tech-label">Professores</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{item.professores}</div>
          </CardContent>
        </Card>
      </div>

      {/* Informações do Campus */}
      <Card className="relative border-primary/30">
        <CornerAccent />
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Informações do Campus</CardTitle>
              <CardDescription>Edite os detalhes básicos do campus</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nome">Nome</Label>
              <Input id="nome" defaultValue={form.nome} className="border-primary/30" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cidade">Cidade</Label>
              <Input id="cidade" defaultValue={form.cidade} className="border-primary/30" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="endereco">Endereço</Label>
              <Input id="endereco" defaultValue={form.endereco} className="border-primary/30" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="telefone">Telefone</Label>
              <Input id="telefone" defaultValue={form.telefone} className="border-primary/30" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="coordenador">Coordenador</Label>
              <Input id="coordenador" defaultValue={form.coordenador} className="border-primary/30" />
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            <Button className="relative border border-primary/30 hover:border-primary/50" onClick={() => console.log('Salvar alterações do campus')}>
              Salvar alterações
              <div className="absolute top-0 left-0 w-1.5 h-1.5 border-l border-t border-primary/40" />
              <div className="absolute top-0 right-0 w-1.5 h-1.5 border-r border-t border-primary/40" />
              <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-l border-b border-primary/40" />
              <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-r border-b border-primary/40" />
            </Button>
            <Button variant="outline" onClick={() => router.back()}>Cancelar</Button>
          </div>
        </CardContent>
      </Card>

      {/* Cursos do Campus */}
      <Card className="relative border-primary/30">
        <CornerAccent />
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Cursos do Campus</CardTitle>
              <CardDescription>Lista de cursos vinculados a este campus</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Sigla</TableHead>
                <TableHead>Coordenador</TableHead>
                <TableHead>Disciplinas</TableHead>
                <TableHead>Turmas</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {campusCursos.map((c) => (
                <TableRow key={c.id}>
                  <TableCell className="font-medium">{c.nome}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="tech-label">{c.sigla}</Badge>
                  </TableCell>
                  <TableCell>{c.coordenador}</TableCell>
                  <TableCell>{c.disciplinas}</TableCell>
                  <TableCell>{c.turmas}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Link href={`/dashboard/cursos/${c.id}`}>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </Link>
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