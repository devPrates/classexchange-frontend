'use client'

import { useState } from 'react'
import Link from 'next/link'
import { CornerAccent } from '@/components/elements/corner-accent'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Users, RefreshCw, Calendar, ChevronRight } from 'lucide-react'

type Solicitacao = {
  id: string
  tipo: 'Substituição' | 'Troca'
  disciplina: string
  turma: string
  data: string
  horario: string
  professorEnvolvido: string
  status: 'Pendente' | 'Aceita' | 'Recusada'
  dataSolicitacao: string
}

export default function SolicitacoesPage() {
  const solicitacoes: Solicitacao[] = [
    {
      id: '1',
      tipo: 'Substituição',
      disciplina: 'Cálculo I',
      turma: 'ES - 2º Semestre',
      data: '28/11/2025',
      horario: '08:00 - 10:00',
      professorEnvolvido: 'Prof. Ricardo Lima',
      status: 'Aceita',
      dataSolicitacao: '18/11/2025',
    },
    {
      id: '2',
      tipo: 'Troca',
      disciplina: 'Programação Web',
      turma: 'CC - 3º Semestre',
      data: '25/11/2025',
      horario: '08:00 - 10:00',
      professorEnvolvido: 'Prof. João Silva',
      status: 'Pendente',
      dataSolicitacao: '18/11/2025',
    },
    {
      id: '3',
      tipo: 'Substituição',
      disciplina: 'Redes de Computadores',
      turma: 'CC - 5º Semestre',
      data: '22/11/2025',
      horario: '10:00 - 12:00',
      professorEnvolvido: 'Prof. Fernando Costa',
      status: 'Recusada',
      dataSolicitacao: '15/11/2025',
    },
  ]

  const pendentes = solicitacoes.filter((s) => s.status === 'Pendente')
  const aceitas = solicitacoes.filter((s) => s.status === 'Aceita')
  const recusadas = solicitacoes.filter((s) => s.status === 'Recusada')

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pendente':
        return 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20'
      case 'Aceita':
        return 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20'
      case 'Recusada':
        return 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20'
      default:
        return 'bg-muted text-muted-foreground'
    }
  }

  const getIcon = (tipo: string) => {
    return tipo === 'Substituição' ? Users : RefreshCw
  }

  const renderSolicitacao = (solicitacao: Solicitacao) => {
    const Icon = getIcon(solicitacao.tipo)
    const isAceita = solicitacao.status === 'Aceita'

    return (
      <Card
        key={solicitacao.id}
        className="relative border-primary/30 hover:border-primary/50 transition-colors"
      >
        <CornerAccent />
        <CardContent className="p-4">
          <div className="flex items-start gap-4">
            <div className="shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20">
              <Icon className="h-5 w-5 text-primary" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-sm">{solicitacao.disciplina}</h3>
                    <span className="px-2 py-0.5 rounded text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
                      {solicitacao.tipo}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">{solicitacao.turma}</p>
                </div>
                <span
                  className={`px-2 py-1 rounded-md text-xs font-semibold border ${getStatusColor(
                    solicitacao.status
                  )}`}
                >
                  {solicitacao.status}
                </span>
              </div>

              <div className="space-y-1 text-xs mb-3">
                <div className="flex items-center gap-2">
                  <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                  <span className="text-muted-foreground">
                    {solicitacao.data} • {solicitacao.horario}
                  </span>
                </div>
                <div className="text-muted-foreground">
                  Professor: <span className="font-medium">{solicitacao.professorEnvolvido}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs tech-label text-muted-foreground">
                  Solicitado em {solicitacao.dataSolicitacao}
                </span>
                {isAceita && (
                  <Link href={`/dashboard/solicitacoes/${solicitacao.id}`}>
                    <Button size="sm" variant="outline" className="h-7 text-xs">
                      Ver Detalhes
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Solicitações</h1>
        <p className="text-muted-foreground mt-1">
          Acompanhe o status das suas solicitações de troca e substituição
        </p>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="pendentes" className="space-y-4">
        <TabsList className="border-primary/30">
          <TabsTrigger value="pendentes" className="data-[state=active]:border-primary/50">
            Pendentes ({pendentes.length})
          </TabsTrigger>
          <TabsTrigger value="aceitas" className="data-[state=active]:border-primary/50">
            Aceitas ({aceitas.length})
          </TabsTrigger>
          <TabsTrigger value="recusadas" className="data-[state=active]:border-primary/50">
            Recusadas ({recusadas.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pendentes" className="space-y-3">
          {pendentes.length === 0 ? (
            <Card className="relative border-primary/30">
              <CornerAccent />
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Nenhuma solicitação pendente</p>
              </CardContent>
            </Card>
          ) : (
            pendentes.map(renderSolicitacao)
          )}
        </TabsContent>

        <TabsContent value="aceitas" className="space-y-3">
          {aceitas.length === 0 ? (
            <Card className="relative border-primary/30">
              <CornerAccent />
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Nenhuma solicitação aceita</p>
              </CardContent>
            </Card>
          ) : (
            aceitas.map(renderSolicitacao)
          )}
        </TabsContent>

        <TabsContent value="recusadas" className="space-y-3">
          {recusadas.length === 0 ? (
            <Card className="relative border-primary/30">
              <CornerAccent />
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Nenhuma solicitação recusada</p>
              </CardContent>
            </Card>
          ) : (
            recusadas.map(renderSolicitacao)
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
