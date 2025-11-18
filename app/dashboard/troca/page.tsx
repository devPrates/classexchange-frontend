'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { CornerAccent } from '@/components/elements/corner-accent'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ArrowLeft, RefreshCw, Calendar, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { SkeletonCard, SkeletonTable } from '@/components/elements/skeleton-loader'

type Professor = {
  id: string
  nome: string
  area: string
  curso: string
  disponibilidade: string
}

type DiaReposicao = {
  id: string
  data: string
  horario: string
  disponivel: boolean
}

export default function TrocaPage() {
  const router = useRouter()
  const [turma, setTurma] = useState('')
  const [aula, setAula] = useState('')
  const [data, setData] = useState('')
  const [loading, setLoading] = useState(false)
  const [professores, setProfessores] = useState<Professor[]>([])
  const [diasReposicao, setDiasReposicao] = useState<DiaReposicao[]>([])
  const [professorSelecionado, setProfessorSelecionado] = useState<string | null>(null)
  const [diasSelecionados, setDiasSelecionados] = useState<string[]>([])

  const handleBuscar = () => {
    setLoading(true)
    setProfessores([])
    setDiasReposicao([])
    setProfessorSelecionado(null)
    setDiasSelecionados([])

    // Simula carregamento
    setTimeout(() => {
      setProfessores([
        {
          id: '1',
          nome: 'Prof. João Silva',
          area: 'Desenvolvimento Web',
          curso: 'Ciência da Computação',
          disponibilidade: 'Disponível no horário solicitado',
        },
        {
          id: '2',
          nome: 'Profa. Ana Costa',
          area: 'Banco de Dados',
          curso: 'Sistemas de Informação',
          disponibilidade: 'Disponível no horário solicitado',
        },
      ])

      setDiasReposicao([
        { id: '1', data: '28/11/2025', horario: '08:00 - 10:00', disponivel: true },
        { id: '2', data: '29/11/2025', horario: '10:00 - 12:00', disponivel: true },
        { id: '3', data: '02/12/2025', horario: '14:00 - 16:00', disponivel: true },
        { id: '4', data: '03/12/2025', horario: '08:00 - 10:00', disponivel: false },
      ])
      setLoading(false)
    }, 1500)
  }

  const handleToggleDia = (diaId: string) => {
    setDiasSelecionados((prev) =>
      prev.includes(diaId) ? prev.filter((id) => id !== diaId) : [...prev, diaId]
    )
  }

  const handleRealizarSolicitacao = () => {
    router.push('/dashboard/professor/solicitacoes')
  }

  const isFormComplete = turma && aula && data
  const canSubmit = professorSelecionado !== null && diasSelecionados.length > 0

  return (
    <div className="space-y-6">
      {/* Header with Breadcrumb */}
      <div className="space-y-4">
        <Link href="/dashboard/professor">
          <Button variant="ghost" className="pl-0 hover:bg-transparent">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
          </Button>
        </Link>
        
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className="tech-label">Professor</span>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground font-medium">Troca de Aula</span>
        </div>

        <div>
          <h1 className="text-3xl font-bold tracking-tight">Troca de Aula</h1>
          <p className="text-muted-foreground mt-1">
            Solicite a troca de uma aula com outro professor
          </p>
        </div>
      </div>

      {/* Selection Form */}
      <Card className="relative border-primary/30">
        <CornerAccent />
        <CardContent className="p-6 space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="turma-troca">Selecionar Turma</Label>
              <Select value={turma} onValueChange={setTurma}>
                <SelectTrigger id="turma-troca" className="border-primary/30">
                  <SelectValue placeholder="Escolha uma turma" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cc-3">CC - 3º Semestre</SelectItem>
                  <SelectItem value="es-5">ES - 5º Semestre</SelectItem>
                  <SelectItem value="cc-4">CC - 4º Semestre</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="aula-troca">Selecionar Aula</Label>
              <Select value={aula} onValueChange={setAula} disabled={!turma}>
                <SelectTrigger id="aula-troca" className="border-primary/30">
                  <SelectValue placeholder="Escolha a disciplina/horário" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="prog-web">Programação Web - 08:00-10:00</SelectItem>
                  <SelectItem value="bd">Banco de Dados - 10:00-12:00</SelectItem>
                  <SelectItem value="eng-soft">Eng. Software - 14:00-16:00</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="data-troca">Data da Troca</Label>
              <input
                id="data-troca"
                type="date"
                value={data}
                onChange={(e) => setData(e.target.value)}
                disabled={!aula}
                className="flex h-10 w-full rounded-md border border-primary/30 bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
          </div>

          <Button 
            onClick={handleBuscar} 
            disabled={!isFormComplete || loading}
            className="w-full sm:w-auto"
          >
            Buscar Professores e Datas
          </Button>
        </CardContent>
      </Card>

      {/* Loading State */}
      {loading && (
        <div className="space-y-6">
          <div className="space-y-3">
            <h2 className="text-xl font-semibold">Carregando professores disponíveis...</h2>
            <SkeletonCard />
            <SkeletonCard />
          </div>
          <div className="space-y-3">
            <h2 className="text-xl font-semibold">Carregando dias de reposição...</h2>
            <SkeletonTable />
          </div>
        </div>
      )}

      {/* Results */}
      {!loading && professores.length > 0 && (
        <div className="space-y-6">
          {/* Professores Disponíveis */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Professores Disponíveis para Troca</h2>
            <div className="space-y-3">
              {professores.map((professor) => (
                <Card
                  key={professor.id}
                  className={`relative border-primary/30 hover:border-primary/50 transition-colors cursor-pointer ${
                    professorSelecionado === professor.id ? 'border-primary bg-primary/5' : ''
                  }`}
                  onClick={() => setProfessorSelecionado(professor.id)}
                >
                  <CornerAccent />
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20">
                          <RefreshCw className="h-5 w-5 text-primary" />
                        </div>

                        <div className="flex-1">
                          <h3 className="font-semibold text-sm mb-1">{professor.nome}</h3>
                          <p className="text-xs text-muted-foreground mb-1">{professor.area}</p>
                          <p className="text-xs text-muted-foreground mb-2">{professor.curso}</p>
                          <div className="inline-flex items-center px-2 py-1 rounded-md text-xs font-semibold bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20">
                            {professor.disponibilidade}
                          </div>
                        </div>
                      </div>

                      <Button
                        size="sm"
                        variant={professorSelecionado === professor.id ? 'default' : 'outline'}
                        onClick={(e) => {
                          e.stopPropagation()
                          setProfessorSelecionado(professor.id)
                        }}
                      >
                        {professorSelecionado === professor.id ? 'Selecionado' : 'Selecionar'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Dias Possíveis de Reposição */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Dias Possíveis de Reposição</h2>
            <Card className="relative border-primary/30">
              <CornerAccent />
              <CardContent className="p-6">
                <div className="space-y-2">
                  {diasReposicao.map((dia) => (
                    <div
                      key={dia.id}
                      className={`flex items-center justify-between p-3 rounded-lg border transition-colors ${
                        dia.disponivel
                          ? diasSelecionados.includes(dia.id)
                            ? 'border-primary bg-primary/5'
                            : 'border-primary/30 hover:border-primary/50 cursor-pointer'
                          : 'border-muted bg-muted/20 opacity-50 cursor-not-allowed'
                      }`}
                      onClick={() => dia.disponivel && handleToggleDia(dia.id)}
                    >
                      <div className="flex items-center gap-3">
                        <Calendar className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">{dia.data}</p>
                          <p className="text-xs text-muted-foreground">{dia.horario}</p>
                        </div>
                      </div>
                      {dia.disponivel ? (
                        <Button
                          size="sm"
                          variant={diasSelecionados.includes(dia.id) ? 'default' : 'outline'}
                          onClick={(e) => {
                            e.stopPropagation()
                            handleToggleDia(dia.id)
                          }}
                        >
                          {diasSelecionados.includes(dia.id) ? 'Selecionado' : 'Selecionar'}
                        </Button>
                      ) : (
                        <span className="text-xs text-muted-foreground">Indisponível</span>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Button
            onClick={handleRealizarSolicitacao}
            disabled={!canSubmit}
            size="lg"
            className="w-full sm:w-auto"
          >
            Realizar Solicitação
          </Button>
        </div>
      )}
    </div>
  )
}
