'use client'

import { CornerAccent } from '@/components/elements/corner-accent'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Calendar, Clock, Users, BookOpen, TrendingUp, AlertCircle, type LucideIcon } from 'lucide-react'
import { StatCard } from '@/components/elements/stat-card'
import { professorStats, proximasAulas, solicitacoesPendentes } from '@/services/mock-data'

export default function ProfessorDashboardPage() {
  const iconMap: Record<string, { Icon: LucideIcon; color: string }> = {
    'Aulas Hoje': { Icon: Clock, color: 'text-blue-500' },
    'Turmas Ativas': { Icon: Users, color: 'text-green-500' },
    'Disciplinas': { Icon: BookOpen, color: 'text-purple-500' },
    'Solicitações Aprovadas': { Icon: TrendingUp, color: 'text-orange-500' },
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard do Professor</h1>
        <p className="text-muted-foreground mt-1">Visão geral das suas atividades</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {professorStats.map((stat) => {
          const mapped = iconMap[stat.label] || { Icon: Clock, color: 'text-primary' }
          return (
            <StatCard key={stat.label} label={stat.label} value={stat.value} Icon={mapped.Icon} color={mapped.color} />
          )
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Próximas Aulas */}
        <Card className="relative border-primary/30">
          <CornerAccent />
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Próximas Aulas
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {proximasAulas.map((aula) => (
              <div
                key={aula.id}
                className="p-4 rounded-lg border border-primary/20 bg-card/50 hover:bg-primary/5 transition-colors relative"
              >
                <div className="absolute top-0 left-0 w-1.5 h-1.5 border-l border-t border-primary/40" />
                <div className="absolute top-0 right-0 w-1.5 h-1.5 border-r border-t border-primary/40" />
                <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-l border-b border-primary/40" />
                <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-r border-b border-primary/40" />
                
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-semibold text-sm mb-1">{aula.disciplina}</h4>
                    <p className="text-xs text-muted-foreground">{aula.turma}</p>
                  </div>
                  <span className="px-2 py-1 rounded-md text-xs font-mono font-semibold bg-primary/10 text-primary border border-primary/20">
                    {aula.sala}
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground font-mono">{aula.horario}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Solicitações Pendentes */}
        <Card className="relative border-primary/30">
          <CornerAccent />
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-orange-500" />
              Solicitações Pendentes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {solicitacoesPendentes.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-sm text-muted-foreground">Nenhuma solicitação pendente</p>
              </div>
            ) : (
              solicitacoesPendentes.map((solicitacao) => (
                <div
                  key={solicitacao.id}
                  className="p-4 rounded-lg border border-primary/20 bg-card/50 hover:bg-primary/5 transition-colors relative"
                >
                  <div className="absolute top-0 left-0 w-1.5 h-1.5 border-l border-t border-primary/40" />
                  <div className="absolute top-0 right-0 w-1.5 h-1.5 border-r border-t border-primary/40" />
                  <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-l border-b border-primary/40" />
                  <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-r border-b border-primary/40" />
                  
                  <div className="flex items-start justify-between mb-2">
                    <span className="px-2 py-1 rounded-md text-xs font-mono font-semibold bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20">
                      {solicitacao.tipo}
                    </span>
                    <span className="text-xs tech-label text-muted-foreground">{solicitacao.data}</span>
                  </div>
                  <h4 className="font-semibold text-sm mb-1">{solicitacao.disciplina}</h4>
                  <p className="text-xs text-muted-foreground mb-3">{solicitacao.professor}</p>
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1 h-8 text-xs">Aceitar</Button>
                    <Button size="sm" variant="outline" className="flex-1 h-8 text-xs btn-delete">
                      Recusar
                    </Button>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
