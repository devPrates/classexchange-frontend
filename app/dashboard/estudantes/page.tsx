'use client'

import { CornerAccent } from '@/components/elements/corner-accent'
import { Card, CardContent } from '@/components/ui/card'

export default function EstudantesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Estudantes</h1>
        <p className="text-muted-foreground mt-1">Gerencie os estudantes da instituição</p>
      </div>

      <Card className="relative border-primary/30">
        <CornerAccent />
        <CardContent className="p-8">
          <p className="text-muted-foreground">Em breve: listagem e gestão de estudantes</p>
        </CardContent>
      </Card>
    </div>
  )
}