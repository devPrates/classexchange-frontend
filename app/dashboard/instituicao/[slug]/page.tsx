'use client'

import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import Link from 'next/link'
import { useCampusBySlug } from '@/hooks/use-campi'
import type { Campus } from '@/types/campus'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CornerAccent } from '@/components/elements/corner-accent'
import { MapPin, ArrowLeft, Users, BookOpen, Edit, Trash2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger, DialogFooter } from '@/components/ui/dialog'
import { CampusForm } from '@/components/forms/campus-form'
import { SoftToast } from '@/components/elements/soft-toast'
import { deleteCampusById, setDiretorEnsino } from '@/services/campus-actions'

export default function InstituicaoDetailPage() {
  const params = useParams<{ slug: string }>()
  const router = useRouter()
  const slug = params.slug
  const { data: item, isLoading, isError, refetch } = useCampusBySlug(slug)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isDiretorDialogOpen, setIsDiretorDialogOpen] = useState(false)
  const [diretorUsuarioId, setDiretorUsuarioId] = useState('')

  if (isLoading) {
    return (
      <Card className="relative border-primary/30">
        <CornerAccent />
        <CardContent className="p-8">
          <p className="text-muted-foreground">Carregando campus...</p>
        </CardContent>
      </Card>
    )
  }

  if (isError || !item) {
    return (
      <Card className="relative border-primary/30">
        <CornerAccent />
        <CardContent className="p-8 flex items-center justify-between">
          <p className="text-muted-foreground">Campus não encontrado</p>
          <Button variant="outline" onClick={() => refetch()}>Tentar novamente</Button>
        </CardContent>
      </Card>
    )
  }

  // Local form state (pronto para editar futuramente)
  const form = {
    nome: item.nome,
    cidade: 'Mato Grosso do Sul',
    endereco: item.endereco ?? '',
    telefone: item.telefone ?? '',
    coordenador: item.diretorEnsino?.usuarioNome ?? '-',
  }

  const campusCursos: Campus['cursos'] = Array.isArray(item.cursos) ? item.cursos : []

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
              {'Mato Grosso do Sul'}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="border-primary/30 hover:border-primary/50">
                <Edit className="h-4 w-4" />
                Editar
              </Button>
            </DialogTrigger>
            <DialogContent className="border-primary/30">
              <DialogHeader>
                <DialogTitle>Editar Campus</DialogTitle>
                <DialogDescription>Atualize os detalhes do campus</DialogDescription>
              </DialogHeader>
              <CampusForm
                mode="edit"
                slug={slug}
                id={item.id}
                defaultValues={{
                  nome: item.nome,
                  sigla: item.sigla,
                  email: item.email,
                  telefone: item.telefone,
                  endereco: item.endereco,
                }}
                onSuccess={(updated) => {
                  setIsDialogOpen(false)
                  if (updated.slug && updated.slug !== slug) {
                    router.replace(`/dashboard/instituicao/${updated.slug}`)
                  } else {
                    refetch()
                  }
                }}
              />
            </DialogContent>
          </Dialog>
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
            <div className="text-2xl font-bold">{campusCursos.length}</div>
          </CardContent>
        </Card>
        <Card className="relative border-primary/30">
          <CornerAccent />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium tech-label">Alunos</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{'-'}</div>
          </CardContent>
        </Card>
        <Card className="relative border-primary/30">
          <CornerAccent />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium tech-label">Servidores</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{item.usuariosCount}</div>
          </CardContent>
        </Card>
      </div>

      {/* Diretor de Ensino */}
      <Card className="relative border-primary/30">
        <CornerAccent />
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle className="text-sm font-medium tech-label">Diretor de Ensino</CardTitle>
            <CardDescription>Gerencie o responsável acadêmico do campus</CardDescription>
          </div>
          <Button
            variant="outline"
            className="border-primary/30"
            onClick={() => {
              setDiretorUsuarioId(item.diretorEnsino?.usuarioId ?? '')
              setIsDiretorDialogOpen(true)
            }}
          >
            {item.diretorEnsino ? 'Alterar' : 'Inserir'}
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="diretorNome">Nome</Label>
              <Input id="diretorNome" value={item.diretorEnsino?.usuarioNome ?? '-'} className="border-primary/30" disabled />
            </div>
            <div className="space-y-2">
              <Label htmlFor="diretorEmail">Email</Label>
              <Input id="diretorEmail" value={item.diretorEnsino?.usuarioEmail ?? '-'} className="border-primary/30" disabled />
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isDiretorDialogOpen} onOpenChange={setIsDiretorDialogOpen}>
        <DialogContent className="border-primary/30">
          <DialogHeader>
            <DialogTitle>{item.diretorEnsino ? 'Alterar Diretor de Ensino' : 'Inserir Diretor de Ensino'}</DialogTitle>
            <DialogDescription>Informe o ID do usuário que será definido como Diretor de Ensino</DialogDescription>
          </DialogHeader>
          <div className="space-y-2">
            <Label htmlFor="diretorUsuarioId">Usuário ID</Label>
            <Input
              id="diretorUsuarioId"
              placeholder="UUID do usuário"
              className="border-primary/30"
              value={diretorUsuarioId}
              onChange={(e) => setDiretorUsuarioId(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" className="border-primary/30" onClick={() => setIsDiretorDialogOpen(false)}>Cancelar</Button>
            <Button
              onClick={async () => {
                try {
                  if (!diretorUsuarioId) return
                  await setDiretorEnsino(item.id, { usuarioId: diretorUsuarioId })
                  SoftToast.success('Diretor de Ensino atualizado com sucesso')
                  setIsDiretorDialogOpen(false)
                  refetch()
                } catch (err: any) {
                  SoftToast.error('Falha ao atualizar Diretor de Ensino', { description: err.message ?? 'Tente novamente' })
                }
              }}
            >
              Salvar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

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
              <Input id="nome" value={form.nome} className="border-primary/30" disabled />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cidade">Cidade</Label>
              <Input id="cidade" value={form.cidade} className="border-primary/30" disabled />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="endereco">Endereço</Label>
              <Input id="endereco" value={form.endereco} className="border-primary/30" disabled />
            </div>
            <div className="space-y-2">
              <Label htmlFor="telefone">Telefone</Label>
              <Input id="telefone" value={form.telefone} className="border-primary/30" disabled />
            </div>
            <div className="space-y-2">
              {/* Campo removido: Diretor de Ensino será um card separado abaixo */}
            </div>
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
                <TableHead>Email</TableHead>
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
                  <TableCell className="font-medium">{c.coordenador?.usuarioNome ?? '-'}</TableCell>
                  <TableCell className="text-muted-foreground">{c.coordenador?.usuarioEmail ?? '-'}</TableCell>
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

      {/* Zona de Perigo */}
      <Card className="relative border-red-300 bg-white">
        <CornerAccent />
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-red-700">Zona de Perigo</CardTitle>
              <CardDescription className="text-red-600">Excluir este campus permanentemente</CardDescription>
            </div>
            <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="border-red-300 text-red-700 hover:bg-red-50 hover:text-red-800 hover:border-red-400"
                >
                  <Trash2 className="h-4 w-4" />
                  Excluir Campus
                </Button>
              </DialogTrigger>
              <DialogContent className="border-red-300">
                <DialogHeader>
                  <DialogTitle className="text-red-700">Confirmar exclusão</DialogTitle>
                  <DialogDescription className="text-red-600">
                    Esta ação é irreversível. Tem certeza que deseja excluir o campus "{item.nome}"?
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setIsDeleteOpen(false)}
                    className="border-primary/30"
                    disabled={isDeleting}
                  >
                    Cancelar
                  </Button>
                  <Button
                    onClick={async () => {
                      try {
                        setIsDeleting(true)
                        await deleteCampusById(item.id)
                        SoftToast.success('Campus excluído com sucesso')
                        router.replace('/dashboard/instituicao')
                        setIsDeleteOpen(false)
                      } catch (err) {
                        SoftToast.error('Falha ao excluir o campus', {
                          description: 'Tente novamente em instantes',
                        })
                      } finally {
                        setIsDeleting(false)
                      }
                    }}
                    className="bg-red-600 hover:bg-red-700 text-white"
                    disabled={isDeleting}
                  >
                    {isDeleting ? 'Excluindo...' : 'Confirmar exclusão'}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-red-700">
            Ao excluir, todos os dados relacionados a este campus poderão ser removidos ou tornar-se inacessíveis.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}