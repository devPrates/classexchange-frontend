import { Card, CardContent } from '@/components/ui/card'
import { CornerAccent } from '@/components/elements/corner-accent'
import { Bell, CheckCheck, Trash2, Calendar, RefreshCw, AlertCircle, Info } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { formatDate } from '@/lib/utils'

export type Notificacao = {
  id: string
  tipo: 'troca' | 'substituicao' | 'aviso' | 'lembrete'
  titulo: string
  mensagem: string
  data: string
  lida: boolean
}

type NotificationCardProps = {
  notificacao: Notificacao
}

const getIconByType = (tipo: string) => {
  switch (tipo) {
    case 'troca':
      return RefreshCw
    case 'substituicao':
      return Calendar
    case 'aviso':
      return AlertCircle
    case 'lembrete':
      return Bell
    default:
      return Info
  }
}

const getColorByType = (tipo: string) => {
  switch (tipo) {
    case 'troca':
      return 'text-blue-500 bg-blue-500/10 border-blue-500/20'
    case 'substituicao':
      return 'text-purple-500 bg-purple-500/10 border-purple-500/20'
    case 'aviso':
      return 'text-orange-500 bg-orange-500/10 border-orange-500/20'
    case 'lembrete':
      return 'text-green-500 bg-green-500/10 border-green-500/20'
    default:
      return 'text-gray-500 bg-gray-500/10 border-gray-500/20'
  }
}

export function NotificationCard({ notificacao }: NotificationCardProps) {
  const Icon = getIconByType(notificacao.tipo)
  const colorClass = getColorByType(notificacao.tipo)

  return (
    <Card
      className={`relative border-primary/30 hover:border-primary/50 transition-colors ${
        !notificacao.lida ? 'bg-primary/5' : ''
      }`}
    >
      <CornerAccent />
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <div className={`shrink-0 w-10 h-10 rounded-lg flex items-center justify-center border ${colorClass}`}>
            <Icon className="h-5 w-5" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-1">
              <h3 className="font-semibold text-sm">{notificacao.titulo}</h3>
              {!notificacao.lida && <div className="shrink-0 w-2 h-2 rounded-full bg-primary" />}
            </div>
            <p className="text-sm text-muted-foreground mb-2">{notificacao.mensagem}</p>
            <div className="flex items-center justify-between">
              <span className="text-xs tech-label text-muted-foreground">{formatDate(notificacao.data)}</span>
              <div className="flex gap-2">
                {!notificacao.lida && (
                  <Button size="sm" variant="ghost" className="h-7 text-xs">
                    Marcar como lida
                  </Button>
                )}
                <Button size="sm" variant="ghost" className="h-7 text-xs btn-delete">
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}