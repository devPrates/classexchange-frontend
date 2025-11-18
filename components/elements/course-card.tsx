import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CornerAccent } from '@/components/elements/corner-accent'
import { GraduationCap, Users, Calendar, BookOpen, Edit, Loader2 } from 'lucide-react'
import type { Curso } from '@/types/cursos'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export function CourseCard({ curso }: { curso: Curso }) {
  const router = useRouter()
  const [isNavigating, setIsNavigating] = useState(false)

  return (
    <Card className="relative border-primary/30 hover:border-primary/50 transition-colors">
      <CornerAccent />
      <CardContent className="p-6">
        <div className="flex items-start gap-4 mb-6">
          <div className="shrink-0 w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20">
            <GraduationCap className="h-7 w-7 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-lg mb-1 text-balance">{curso.nome}</h3>
            <span className="inline-block px-2 py-0.5 rounded text-xs font-mono font-semibold bg-primary text-primary-foreground">
              {curso.sigla}
            </span>
            <p className="text-sm text-muted-foreground mt-2">Campus: {curso.campusNome}</p>
          </div>
          <Button
            size="sm"
            className="btn-edit gap-1.5 relative"
            disabled={isNavigating}
            onClick={() => {
              setIsNavigating(true)
              router.push(`/dashboard/cursos/${curso.slug}`)
            }}
          >
            {isNavigating ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Edit className="h-3.5 w-3.5" />
            )}
            {isNavigating ? 'Abrindo...' : 'Editar'}
            <div className="absolute top-0 left-0 w-1 h-1 border-l border-t border-yellow-500/40" />
            <div className="absolute top-0 right-0 w-1 h-1 border-r border-t border-yellow-500/40" />
            <div className="absolute bottom-0 left-0 w-1 h-1 border-l border-b border-yellow-500/40" />
            <div className="absolute bottom-0 right-0 w-1 h-1 border-r border-b border-yellow-500/40" />
          </Button>
        </div>

        <div className="blueprint-divider my-4" />

        <div className="flex items-start gap-2 mb-4">
          <Users className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
          <div className="flex flex-1 gap-2">
            <span className="text-sm text-muted-foreground">Coordenador:</span>
            <p className="text-sm font-medium">-</p>
          </div>
        </div>
      
        <div className="blueprint-divider my-4" />

        <div className="grid grid-cols-2 gap-4 items-stretch auto-rows-fr">
          <div className="flex items-center justify-center gap-2 h-full w-full">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-muted-foreground">Turmas:</span>
              <span className="inline-block px-2 py-0.5 rounded-md text-sm font-semibold bg-primary/10 text-primary border border-primary/20 w-fit">
                {curso.turmas.length}
              </span>
            </div>
          </div>
          <div className="flex items-center justify-center gap-2 h-full w-full">
            <BookOpen className="h-4 w-4 text-muted-foreground" />
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-muted-foreground">Disciplinas:</span>
              <span className="inline-block px-2 py-0.5 rounded-md text-sm font-semibold bg-primary/10 text-primary border border-primary/20 w-fit">
                {curso.disciplinas.length}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}