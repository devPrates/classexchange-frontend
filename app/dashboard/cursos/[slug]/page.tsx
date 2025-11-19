"use client"

import { useState } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { CornerAccent } from '@/components/elements/corner-accent'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/elements/data-table'
import { disciplinasColumns } from './disciplinas-columns'
import { turmasColumns } from './turmas-columns'
import { ArrowLeft, Edit, Trash2, Plus, Users } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger, DialogFooter } from '@/components/ui/dialog'
import { CursoForm } from '@/components/forms/curso-form'
import { DisciplinaForm } from '@/components/forms/disciplina-form'
import { useCursoBySlugOrId } from '@/hooks/use-cursos'
import { useQuery } from '@tanstack/react-query'
import { SoftToast } from '@/components/elements/soft-toast'
import { deleteCursoById, setCoordenadorCurso } from '@/services/curso-actions'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { deleteDisciplinaById, getDisciplinaById } from '@/services/disciplina-actions'

export default function CursoDetailsPage() {
  const params = useParams<{ slug: string }>()
  const router = useRouter()
  const slug = params.slug
  const { data: item, isLoading, isError, refetch } = useCursoBySlugOrId(slug)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isCreateDiscOpen, setIsCreateDiscOpen] = useState(false)
  const [isEditDiscOpen, setIsEditDiscOpen] = useState(false)
  const [isDeleteDiscOpen, setIsDeleteDiscOpen] = useState(false)
  const [selectedDisciplinaId, setSelectedDisciplinaId] = useState<string | null>(null)
  const [isCoordDialogOpen, setIsCoordDialogOpen] = useState(false)
  const [coordUsuarioId, setCoordUsuarioId] = useState('')
  const { data: disciplinaDetalhe } = useQuery({
    queryKey: ['disciplina', selectedDisciplinaId],
    queryFn: async () => {
      if (!selectedDisciplinaId) throw new Error('no-id')
      return await getDisciplinaById(selectedDisciplinaId)
    },
    enabled: !!selectedDisciplinaId && isEditDiscOpen,
  })

  if (isLoading) {
    return (
      <Card className="relative border-primary/30">
        <CornerAccent />
        <CardContent className="p-8">
          <p className="text-muted-foreground">Carregando curso...</p>
        </CardContent>
      </Card>
    )
  }

  if (isError || !item) {
    return (
      <Card className="relative border-primary/30">
        <CornerAccent />
        <CardContent className="p-8 flex items-center justify-between">
          <p className="text-muted-foreground">Curso não encontrado</p>
          <Button variant="outline" onClick={() => refetch()}>Tentar novamente</Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {(() => {
        const disciplinas = (item as any).disciplinas ?? []
        return (
          <></>
        )
      })()}
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/dashboard" className="hover:text-foreground">Dashboard</Link>
        <span>/</span>
        <Link href="/dashboard/cursos" className="hover:text-foreground">Cursos</Link>
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
            <p className="text-muted-foreground mt-1">
              {item.sigla} • {item.campusNome}
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
                <DialogTitle>Editar Curso</DialogTitle>
                <DialogDescription>Atualize os detalhes do curso</DialogDescription>
              </DialogHeader>
              <CursoForm
                mode="edit"
                slug={slug}
                id={item.id}
                defaultValues={{
                  nome: item.nome,
                  sigla: item.sigla,
                  campusId: item.campusId,
                }}
                onSuccess={(updated) => {
                  setIsDialogOpen(false)
                  if (updated.slug && updated.slug !== slug) {
                    router.replace(`/dashboard/cursos/${updated.slug}`)
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
          <CardHeader className="flex flex-row items-center justify之间 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium tech-label">Total de Turmas</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{item.turmas.length}</div>
          </CardContent>
        </Card>
        <Card className="relative border-primary/30">
          <CornerAccent />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium tech-label">Alunos Matriculados</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">-</div>
          </CardContent>
        </Card>
      </div>

      {/* Coordenador do Curso */}
      <Card className="relative border-primary/30">
        <CornerAccent />
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle className="text-sm font-medium tech-label">Coordenador do Curso</CardTitle>
            <CardDescription>Gerencie o responsável pelo curso</CardDescription>
          </div>
          <Button
            variant="outline"
            className="border-primary/30"
            onClick={() => {
              setCoordUsuarioId(item.coordenadorCurso?.usuarioId ?? '')
              setIsCoordDialogOpen(true)
            }}
          >
            {item.coordenadorCurso ? 'Alterar' : 'Inserir'}
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="coordNome">Nome</Label>
              <Input id="coordNome" value={item.coordenadorCurso?.usuarioNome ?? '-'} className="border-primary/30" disabled />
            </div>
            <div className="space-y-2">
              <Label htmlFor="coordEmail">Email</Label>
              <Input id="coordEmail" value={(item.coordenadorCurso as any)?.usuarioEmail ?? '-'} className="border-primary/30" disabled />
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isCoordDialogOpen} onOpenChange={setIsCoordDialogOpen}>
        <DialogContent className="border-primary/30">
          <DialogHeader>
            <DialogTitle>{item.coordenadorCurso ? 'Alterar Coordenador do Curso' : 'Inserir Coordenador do Curso'}</DialogTitle>
            <DialogDescription>Informe o ID do usuário que será definido como Coordenador do Curso</DialogDescription>
          </DialogHeader>
          <div className="space-y-2">
            <Label htmlFor="coordUsuarioId">Usuário ID</Label>
            <Input
              id="coordUsuarioId"
              placeholder="UUID do usuário"
              className="border-primary/30"
              value={coordUsuarioId}
              onChange={(e) => setCoordUsuarioId(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" className="border-primary/30" onClick={() => setIsCoordDialogOpen(false)}>Cancelar</Button>
            <Button
              onClick={async () => {
                try {
                  if (!coordUsuarioId) return
                  await setCoordenadorCurso(item.id, { usuarioId: coordUsuarioId })
                  SoftToast.success('Coordenador do Curso atualizado com sucesso')
                  setIsCoordDialogOpen(false)
                  refetch()
                } catch (err: any) {
                  SoftToast.error('Falha ao atualizar Coordenador do Curso', { description: err.message ?? 'Tente novamente' })
                }
              }}
            >
              Salvar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Disciplinas */}
      <Card className="relative border-primary/30">
        <CornerAccent />
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Disciplinas</CardTitle>
              <CardDescription>Lista de disciplinas do curso</CardDescription>
            </div>
            <Dialog open={isCreateDiscOpen} onOpenChange={setIsCreateDiscOpen}>
              <DialogTrigger asChild>
                <Button className="relative border border-primary/30 hover:border-primary/50">
                  <Plus className="h-4 w-4" />
                  Nova Disciplina
                  <div className="absolute top-0 left-0 w-1.5 h-1.5 border-l border-t border-primary/40" />
                  <div className="absolute top-0 right-0 w-1.5 h-1.5 border-r border-t border-primary/40" />
                  <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-l border-b border-primary/40" />
                  <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-r border-b border-primary/40" />
                </Button>
              </DialogTrigger>
              <DialogContent className="border-primary/30">
                <DialogHeader>
                  <DialogTitle>Nova Disciplina</DialogTitle>
                  <DialogDescription>Cadastre uma nova disciplina para o curso</DialogDescription>
                </DialogHeader>
                <DisciplinaForm
                  cursoId={item.id}
                  mode="create"
                  onSuccess={() => {
                    setIsCreateDiscOpen(false)
                    refetch()
                  }}
                />
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={disciplinasColumns}
            data={(item as any).disciplinas ?? []}
            onEdit={(disc: any) => {
              setSelectedDisciplinaId(disc.id)
              setIsEditDiscOpen(true)
            }}
            onDelete={(disc: any) => {
              setSelectedDisciplinaId(disc.id)
              setIsDeleteDiscOpen(true)
            }}
          />
        </CardContent>
      </Card>

      <Dialog open={isEditDiscOpen} onOpenChange={setIsEditDiscOpen}>
        <DialogContent className="border-primary/30">
          <DialogHeader>
            <DialogTitle>Editar Disciplina</DialogTitle>
            <DialogDescription>Atualize os detalhes da disciplina</DialogDescription>
          </DialogHeader>
          {selectedDisciplinaId && (
            <DisciplinaForm
              cursoId={item.id}
              mode="edit"
              id={selectedDisciplinaId}
              defaultValues={{
                nome: disciplinaDetalhe?.nome ?? '',
                cargaHoraria: disciplinaDetalhe?.cargaHoraria ?? 60,
                ementa: disciplinaDetalhe?.ementa ?? '',
              }}
              onSuccess={() => {
                setIsEditDiscOpen(false)
                setSelectedDisciplinaId(null)
                refetch()
              }}
            />
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteDiscOpen} onOpenChange={setIsDeleteDiscOpen}>
        <DialogContent className="border-red-300">
          <DialogHeader>
            <DialogTitle className="text-red-700">Confirmar exclusão</DialogTitle>
            <DialogDescription className="text-red-600">Tem certeza que deseja excluir esta disciplina?</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDiscOpen(false)} className="border-primary/30">Cancelar</Button>
            <Button
              className="bg-red-600 hover:bg-red-700 text-white"
              onClick={async () => {
                if (!selectedDisciplinaId) return
                try {
                  await deleteDisciplinaById(selectedDisciplinaId)
                  SoftToast.success('Disciplina excluída com sucesso')
                  setIsDeleteDiscOpen(false)
                  setSelectedDisciplinaId(null)
                  refetch()
                } catch (err: any) {
                  SoftToast.error('Falha ao excluir a disciplina', { description: err.message ?? 'Tente novamente mais tarde' })
                }
              }}
            >
              Confirmar exclusão
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

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
              <Plus className="h-4 w-4" />
              Nova Turma
              <div className="absolute top-0 left-0 w-1.5 h-1.5 border-l border-t border-primary/40" />
              <div className="absolute top-0 right-0 w-1.5 h-1.5 border-r border-t border-primary/40" />
              <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-l border-b border-primary/40" />
              <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-r border-b border-primary/40" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <DataTable columns={turmasColumns} data={item.turmas} />
        </CardContent>
      </Card>

      {/* Zona de Perigo */}
      <Card className="relative border-red-300 bg-white">
        <CornerAccent />
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-red-700">Zona de Perigo</CardTitle>
              <CardDescription className="text-red-600">Excluir este curso permanentemente</CardDescription>
            </div>
            <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="border-red-300 text-red-700 hover:bg-red-50 hover:text-red-800 hover:border-red-400"
                >
                  <Trash2 className="h-4 w-4" />
                  Excluir Curso
                </Button>
              </DialogTrigger>
              <DialogContent className="border-red-300">
                <DialogHeader>
                  <DialogTitle className="text-red-700">Confirmar exclusão</DialogTitle>
                  <DialogDescription className="text-red-600">
                    Esta ação é irreversível. Tem certeza que deseja excluir o curso "{item.nome}"?
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
                        await deleteCursoById(item.id)
                        SoftToast.success('Curso excluído com sucesso')
                        router.replace('/dashboard/cursos')
                        setIsDeleteOpen(false)
                      } catch (err) {
                        SoftToast.error('Falha ao excluir o curso', {
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
            Ao excluir, todos os dados relacionados a este curso poderão ser removidos ou tornar-se inacessíveis.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
