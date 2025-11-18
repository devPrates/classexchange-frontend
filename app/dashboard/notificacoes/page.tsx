'use client'

import { CornerAccent } from '@/components/elements/corner-accent'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Bell, CheckCheck } from 'lucide-react'
import { NotificationCard } from '@/components/elements/notification-card'
import { notificacoes as notificacoesMock } from '@/services/mock-data'

export default function NotificacoesPage() {
  const notificacoes = notificacoesMock

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Notificações</h1>
          <p className="text-muted-foreground mt-1">Gerencie suas notificações e alertas</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="border-primary/30 hover:border-primary/50">
            <CheckCheck className="mr-2 h-4 w-4" />
            Marcar todas como lidas
          </Button>
        </div>
      </div>

      {/* Notificações */}
      {notificacoes.length === 0 ? (
        <Card className="relative border-primary/30">
          <CornerAccent />
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Bell className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Nenhuma notificação</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {notificacoes.map((notificacao) => (
            <NotificationCard key={notificacao.id} notificacao={notificacao} />
          ))}
        </div>
      )}
    </div>
  )
}
