import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CornerAccent } from '@/components/elements/corner-accent'
import { Building2, MapPin, Phone, User, Edit } from 'lucide-react'
import type { Campus } from '@/services/mock-data'
import Link from 'next/link'

export function CampusCard({ campus }: { campus: Campus }) {
  return (
    <Card className="relative border-primary/30 hover:border-primary/50 transition-colors">
      <CornerAccent />
      <CardContent className="p-6">
        <div className="flex items-start gap-4 mb-6">
          <div className="shrink-0 w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20">
            <Building2 className="h-7 w-7 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-lg mb-1 text-balance">{campus.nome}</h3>
            <p className="text-sm text-muted-foreground flex items-center gap-1.5 mt-2">
              <MapPin className="h-3.5 w-3.5" />
              {campus.cidade}
            </p>
          </div>
          <Button asChild size="sm" className="btn-edit gap-1.5">
            <Link href={`/dashboard/instituicao/${campus.slug}`}>
              <Edit className="h-3.5 w-3.5" />
              Editar
            </Link>
          </Button>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-foreground" />
            <span className="text-sm font-semibold">Endereço:</span>
            <span className="text-sm text-muted-foreground">{campus.endereco}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-foreground" />
            <span className="text-sm font-semibold">Telefone:</span>
            <span className="text-sm text-muted-foreground">{campus.telefone}</span>
          </div>
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-foreground" />
            <span className="text-sm font-semibold">Coordenador:</span>
            <span className="text-sm text-muted-foreground">{campus.coordenador}</span>
          </div>
        </div>

        <div className="blueprint-divider my-6" />

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="flex flex-col items-center justify-center gap-1 h-full">
            <p className="text-sm text-muted-foreground">Cursos</p>
            <span className="inline-block px-2 py-0.5 rounded-md text-sm font-semibold bg-primary/10 text-primary border border-primary/20">
              {campus.cursos}
            </span>
          </div>
          <div className="flex flex-col items-center justify-center gap-1 h-full">
            <p className="text-sm text-muted-foreground">Alunos</p>
            <span className="inline-block px-2 py-0.5 rounded-md text-sm font-semibold bg-primary/10 text-primary border border-primary/20">
              {campus.alunos}
            </span>
          </div>
          <div className="flex flex-col items-center justify-center gap-1 h-full">
            <p className="text-sm text-muted-foreground">Professores</p>
            <span className="inline-block px-2 py-0.5 rounded-md text-sm font-semibold bg-primary/10 text-primary border border-primary/20">
              {campus.professores}
            </span>
          </div>
        </div>

        
      </CardContent>
    </Card>
  )
}