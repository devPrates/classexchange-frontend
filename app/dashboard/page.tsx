
import { CornerAccent } from '@/components/elements/corner-accent'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Calendar } from 'lucide-react'
import { RiExchangeBoxLine, RiExchange2Line, RiBookMarkedLine } from 'react-icons/ri'
import LineChart1 from '@/components/elements/line-chart-1'

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

      <LineChart1 />
    </div>
  )
}
