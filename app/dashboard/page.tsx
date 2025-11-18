
import { CornerAccent } from '@/components/elements/corner-accent'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Calendar } from 'lucide-react'
import { RiExchangeBoxLine, RiExchange2Line, RiBookMarkedLine } from 'react-icons/ri'

export default function DashboardPage() {
  const stats = [
    {
      title: 'Total de Cursos',
      value: '24',
      description: 'Cursos ativos',
      icon: RiBookMarkedLine,
    },
    {
      title: 'Trocas Pendentes',
      value: '8',
      description: 'Aguardando aprovação',
      icon: RiExchangeBoxLine,
    },
    {
      title: 'Substituições',
      value: '15',
      description: 'Neste mês',
      icon: RiExchange2Line,
    },
    {
      title: 'Aulas Hoje',
      value: '6',
      description: 'Programadas',
      icon: Calendar,
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Visão geral do sistema de trocas e substituições</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title} className="relative border-primary/30">
              <CornerAccent />
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium tech-label">{stat.title}</CardTitle>
                <Icon className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.description}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="relative border-primary/30">
          <CornerAccent />
          <CardHeader>
            <CardTitle>Próximas Aulas</CardTitle>
            <CardDescription>Aulas programadas para hoje</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-4 p-3 border border-border rounded-sm relative">
                <div className="absolute top-0 left-0 w-2 h-2 border-l border-t border-primary/40" />
                <div className="absolute top-0 right-0 w-2 h-2 border-r border-t border-primary/40" />
                <div className="absolute bottom-0 left-0 w-2 h-2 border-l border-b border-primary/40" />
                <div className="absolute bottom-0 right-0 w-2 h-2 border-r border-b border-primary/40" />
                <div className="flex-1">
                  <p className="font-medium">Disciplina {i}</p>
                  <p className="text-sm text-muted-foreground">Turma A - 10:00 às 12:00</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="relative border-primary/30">
          <CornerAccent />
          <CardHeader>
            <CardTitle>Atividade Recente</CardTitle>
            <CardDescription>Últimas ações no sistema</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              'Troca aprovada para Matemática I',
              'Nova solicitação de substituição',
              'Campus Norte atualizado',
            ].map((activity, i) => (
              <div key={i} className="flex items-center gap-4 p-3 border border-border rounded-sm relative">
                <div className="absolute top-0 left-0 w-2 h-2 border-l border-t border-primary/40" />
                <div className="absolute top-0 right-0 w-2 h-2 border-r border-t border-primary/40" />
                <div className="absolute bottom-0 left-0 w-2 h-2 border-l border-b border-primary/40" />
                <div className="absolute bottom-0 right-0 w-2 h-2 border-r border-b border-primary/40" />
                <div className="flex-1">
                  <p className="text-sm">{activity}</p>
                  <p className="text-xs text-muted-foreground">Há {i + 1} hora{i > 0 ? 's' : ''}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
