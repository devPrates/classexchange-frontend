"use client"

import { useState } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { CornerAccent } from '@/components/elements/corner-accent'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Edit, Trash2, Plus, Users, GraduationCap, UserCheck, AlertTriangle, Eye } from 'lucide-react'
import { createTurma, getTurmaById } from '@/services/turma-actions'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger, DialogFooter } from '@/components/ui/dialog'
import { CursoForm } from '@/components/forms/curso-form'
import { useCursoBySlugOrId, useProfessoresDoCurso, useCoordenadorCursoAtivo, useTurmasDoCurso } from '@/hooks/use-cursos'
import { SoftToast } from '@/components/elements/soft-toast'
import { deleteCursoById } from '@/services/curso-actions'
import { createCoordenadorCurso, updateCoordenadorCurso } from '@/services/coordenador-curso-actions'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { StatCard } from '@/components/elements/stat-card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { SquareBadge } from '@/components/elements/square-badge'
 

export default function CursoDetailsPage() {
  const params = useParams<{ slug: string }>()
  const router = useRouter()
  const slug = params.slug
  const queryClient = useQueryClient()
  const { data: item, isLoading, isError, refetch } = useCursoBySlugOrId(slug)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isCoordDialogOpen, setIsCoordDialogOpen] = useState(false)
  const [coordUsuarioId, setCoordUsuarioId] = useState('')
  const [coordInicio, setCoordInicio] = useState('')
  const [coordFim, setCoordFim] = useState('')
  const { data: professoresCurso = [] } = useProfessoresDoCurso(item?.id)
  const { data: coordAtivo, refetch: refetchCoord } = useCoordenadorCursoAtivo(item?.id)
  // Usa o slug diretamente para garantir estabilidade da chave de cache e evitar transição de slug->id
  const { data: turmas = [], refetch: refetchTurmas } = useTurmasDoCurso(slug)
  const [isTurmaDialogOpen, setIsTurmaDialogOpen] = useState(false)
  const turmaSchema = z.object({
    nome: z.string().min(1, 'Nome é obrigatório'),
    numero: z.number().int().nonnegative('Número deve ser >= 0'),
  })
  type TurmaForm = z.infer<typeof turmaSchema>
  const turmaForm = useForm<TurmaForm>({ resolver: zodResolver(turmaSchema), defaultValues: { nome: '', numero: 0 } })
 

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
        <StatCard label="Total de Turmas" value={turmas?.length ?? item.turmas?.length ?? 0} Icon={Users} />
        <StatCard label="Alunos Matriculados" value={item.studentsCount ?? 0} Icon={GraduationCap} />
        <StatCard label="Professores" value={item.professoresCount ?? 0} Icon={UserCheck} />
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
              setCoordUsuarioId(coordAtivo?.usuarioId ?? item.coordenadorCurso?.usuarioId ?? '')
              const today = new Date().toISOString().slice(0, 10)
              setCoordInicio((coordAtivo?.inicio as any) ?? item.coordenadorCurso?.inicio ?? today)
              setCoordFim((coordAtivo?.fim as any) ?? item.coordenadorCurso?.fim ?? '')
              setIsCoordDialogOpen(true)
            }}
          >
            {item.coordenadorCurso ? 'Alterar' : 'Inserir'}
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="coordNome">Nome</Label>
              <Input id="coordNome" value={coordAtivo?.usuarioNome ?? item.coordenadorCurso?.usuarioNome ?? '-'} className="border-primary/30" disabled />
            </div>
            <div className="space-y-2">
              <Label htmlFor="coordInicio">Início</Label>
              <Input id="coordInicio" value={(coordAtivo?.inicio as any) ?? item.coordenadorCurso?.inicio ?? '-'} className="border-primary/30" disabled />
            </div>
            <div className="space-y-2">
              <Label htmlFor="coordFim">Fim</Label>
              <Input id="coordFim" value={(coordAtivo?.fim as any) ?? item.coordenadorCurso?.fim ?? '-'} className="border-primary/30" disabled />
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isCoordDialogOpen} onOpenChange={setIsCoordDialogOpen}>
        <DialogContent className="border-primary/30">
          <DialogHeader>
            <DialogTitle>{item.coordenadorCurso ? 'Alterar Coordenador do Curso' : 'Inserir Coordenador do Curso'}</DialogTitle>
            <DialogDescription>Selecione o professor e informe as datas</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="coordUsuarioId">Professor</Label>
              <Select value={coordUsuarioId} onValueChange={setCoordUsuarioId}>
                <SelectTrigger className="border-primary/30">
                  <SelectValue placeholder="Selecione o professor" />
                </SelectTrigger>
                <SelectContent>
                  {professoresCurso.map((p) => (
                    <SelectItem key={p.usuarioId} value={p.usuarioId}>{p.usuarioNome} • {p.usuarioEmail}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="coordInicio">Início</Label>
                <Input id="coordInicio" type="date" className="border-primary/30" value={coordInicio} onChange={(e) => setCoordInicio(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="coordFim">Fim</Label>
                <Input id="coordFim" type="date" className="border-primary/30" value={coordFim} onChange={(e) => setCoordFim(e.target.value)} />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" className="border-primary/30" onClick={() => setIsCoordDialogOpen(false)}>Cancelar</Button>
            <Button
              onClick={async () => {
                try {
                  if (!coordUsuarioId || !coordInicio) return
                  const payload: any = { usuarioId: coordUsuarioId, cursoId: item.id, inicio: coordInicio }
                  if (coordFim) payload.fim = coordFim
                  if (item.coordenadorCurso?.id) {
                    await updateCoordenadorCurso(item.coordenadorCurso.id, payload)
                  } else {
                    await createCoordenadorCurso(payload)
                  }
                  SoftToast.success('Coordenador do Curso atualizado com sucesso')
                  setIsCoordDialogOpen(false)
                  refetch()
                  refetchCoord()
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

    

      {/* Turmas */}
      <Card className="relative border-primary/30">
        <CornerAccent />
        <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Turmas</CardTitle>
                <CardDescription>Lista de turmas do curso</CardDescription>
              </div>
            <Dialog open={isTurmaDialogOpen} onOpenChange={setIsTurmaDialogOpen}>
              <DialogTrigger asChild>
                <Button className="relative border border-primary/30 hover:border-primary/50">
                  <Plus className="h-4 w-4" />
                  Nova Turma
                  <div className="absolute top-0 left-0 w-1.5 h-1.5 border-l border-t border-primary/40" />
                  <div className="absolute top-0 right-0 w-1.5 h-1.5 border-r border-t border-primary/40" />
                  <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-l border-b border-primary/40" />
                  <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-r border-b border-primary/40" />
                </Button>
              </DialogTrigger>
              <DialogContent className="border-primary/30">
                <DialogHeader>
                  <DialogTitle>Nova Turma</DialogTitle>
                  <DialogDescription>Crie uma nova turma para este curso</DialogDescription>
                </DialogHeader>
                <form
                  onSubmit={turmaForm.handleSubmit(async (values) => {
                    try {
                      console.log('[DEBUG] Tentando criar turma. Payload:', { nome: values.nome, numero: values.numero, cursoId: item.id })
                      const created = await createTurma({ nome: values.nome, numero: values.numero, cursoId: item.id })
                      console.log('[DEBUG] Turma criada com sucesso. Resposta API:', created)
                      
                      // Invalida as queries para forçar o recarregamento dos dados reais do backend
                      console.log('[DEBUG] Invalidando queries...')
                      await queryClient.invalidateQueries({ queryKey: ['curso', slug] })
                      await queryClient.invalidateQueries({ queryKey: ['curso', slug, 'turmas'] })
                      
                      SoftToast.success('Turma criada com sucesso')
                      setIsTurmaDialogOpen(false)
                      turmaForm.reset({ nome: '', numero: 0 })
                      
                      console.log('[DEBUG] Refetching manual...')
                      await refetch()
                      await refetchTurmas()
                      console.log('[DEBUG] Processo finalizado.')
                    } catch (err: any) {
                      console.error('[DEBUG] Erro ao criar turma:', err)
                      SoftToast.error('Falha ao criar turma', { description: err.message ?? 'Tente novamente' })
                    }
                  })}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="turmaNome">Nome</Label>
                      <Input id="turmaNome" className="border-primary/30" placeholder="Ex.: 1º Semestre - A" {...turmaForm.register('nome')} />
                      {turmaForm.formState.errors.nome?.message && (
                        <p className="text-sm text-red-600">{turmaForm.formState.errors.nome.message}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="turmaNumero">Número</Label>
                      <Input id="turmaNumero" type="number" className="border-primary/30" placeholder="Ex.: 1" {...turmaForm.register('numero', { valueAsNumber: true })} />
                      {turmaForm.formState.errors.numero?.message && (
                        <p className="text-sm text-red-600">{turmaForm.formState.errors.numero.message}</p>
                      )}
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="button" variant="outline" className="border-primary/30" onClick={() => setIsTurmaDialogOpen(false)}>Cancelar</Button>
                    <Button type="submit">Salvar</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
            </div>
          </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Número</TableHead>
                <TableHead>Qtd. Disciplinas</TableHead>
                <TableHead>Alunos</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {(Array.isArray(turmas) ? turmas : []).map((turma, idx) => (
                <TableRow key={turma.id ?? `${turma.nome}-${idx}`}>
                  <TableCell className="font-medium">{turma.nome}</TableCell>
                  <TableCell>
                    <SquareBadge text={String(turma.numero)} className="text-xs" />
                  </TableCell>
                  <TableCell>
                    <SquareBadge text={"0"} className="text-xs" />
                  </TableCell>
                  <TableCell className="text-muted-foreground">0</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="icon" asChild aria-label="Ver turma">
                        <Link href={`/dashboard/turma/${turma.slug}`}>
                          <Eye className="h-4 w-4" />
                        </Link>
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
        </CardContent>
      </Card>

      <Card className="relative border-primary/30">
        <CornerAccent />
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Professores</CardTitle>
              <CardDescription>Professores vinculados ao curso</CardDescription>
            </div>
            <Button className="relative border border-primary/30 hover:border-primary/50">
              <Plus className="mr-2 h-4 w-4" />
              Adicionar Professor
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
                <TableHead>Email</TableHead>
                <TableHead>SIAPE</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {professoresCurso.map((prof) => (
                <TableRow key={prof.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <UserCheck className="h-4 w-4 text-primary" />
                      {prof.usuarioNome}
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{prof.usuarioEmail}</TableCell>
                  <TableCell>
                    <SquareBadge text={prof.usuarioSiape} className="text-xs" />
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-yellow-600 dark:text-yellow-500 hover:bg-yellow-500/10"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-destructive hover:bg-destructive/10"
                      >
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

      {/* Zona de Perigo */}
      <Card className="relative border-primary/30">
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
                  className="border-primary/30 text-red-700"
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
                    className="text-red-700"
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
