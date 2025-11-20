'use client'

import { CornerAccent } from '@/components/elements/corner-accent'
import { Card, CardContent } from '@/components/ui/card'

export default function ProfessoresPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Professores</h1>
        <p className="text-muted-foreground mt-1">Gerencie os professores da instituição</p>
      </div>

      <Card className="relative border-primary/30">
        <CornerAccent />
        <CardContent className="p-8">
          <p className="text-muted-foreground">Em breve: listagem e gestão de professores</p>
        </CardContent>
      </Card>
    </div>
  )
}