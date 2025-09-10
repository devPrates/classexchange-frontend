import { Skeleton } from '@/components/ui/skeleton'
import { GraduationCap, Edit, Trash2, Calendar, Clock, Timer, Users, CheckCircle, UserCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function CursoHeaderSkeleton() {
  return (
    <div className="pb-6 border-b border-border/50">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="bg-primary/10 p-4 rounded-xl border border-primary/20">
            <GraduationCap className="h-8 w-8 text-primary" />
          </div>
          <div className="space-y-1">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              <Skeleton className="h-8 w-64" />
            </h2>
            <div className="flex items-center gap-2">
              <div className="h-1 w-8 bg-primary rounded-full"></div>
              <div className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                <Skeleton className="h-4 w-48" />
              </div>
            </div>
            <div className="text-md text-muted-foreground font-medium flex items-center gap-2">
              <span>Status:</span>
              <Skeleton className="h-5 w-16" />
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="border-yellow-200 text-yellow-600 hover:bg-yellow-50 hover:border-yellow-300 dark:border-yellow-800 dark:text-yellow-400 dark:hover:bg-yellow-950 dark:hover:border-yellow-700"
          >
            <Edit className="h-4 w-4 mr-1" />
            Editar
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-950 dark:hover:border-red-700"
          >
            <Trash2 className="h-4 w-4 mr-1" />
            Excluir
          </Button>
        </div>
      </div>
    </div>
  )
}

export function CursoInfoSkeleton() {
  return (
    <div className="space-y-4">
      {/* Modalidade e Duração */}
      <div className="grid grid-cols-2 gap-8">
        <div className="flex items-center gap-3">
          <GraduationCap className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium text-foreground">Modalidade:</span>
          <Skeleton className="h-4 w-20" />
        </div>
        <div className="flex items-center gap-3">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium text-foreground">Duração:</span>
          <Skeleton className="h-4 w-24" />
        </div>
      </div>

      {/* Linha separadora */}
      <div className="border-t border-border/30"></div>

      {/* Carga Horária e Turno */}
      <div className="grid grid-cols-2 gap-8">
        <div className="flex items-center gap-3">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium text-foreground">Carga Horária:</span>
          <Skeleton className="h-4 w-20" />
        </div>
        <div className="flex items-center gap-3">
          <Timer className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium text-foreground">Turno:</span>
          <Skeleton className="h-4 w-16" />
        </div>
      </div>

      {/* Linha separadora */}
      <div className="border-t border-border/30"></div>

      {/* Vagas e Status */}
      <div className="grid grid-cols-2 gap-8">
        <div className="flex items-center gap-3">
          <Users className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium text-foreground">Vagas/Semestre:</span>
          <Skeleton className="h-4 w-16" />
        </div>
        <div className="flex items-center gap-3">
          <CheckCircle className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium text-foreground">Status:</span>
          <Skeleton className="h-4 w-12" />
        </div>
      </div>
    </div>
  )
}

export function CursoCoordenadorSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <UserCheck className="h-5 w-5 text-muted-foreground" />
          <h2 className="text-lg font-semibold text-foreground">COORDENADOR DO CURSO</h2>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          className="border-yellow-200 text-yellow-600 hover:bg-yellow-50 hover:border-yellow-300 dark:border-yellow-800 dark:text-yellow-400 dark:hover:bg-yellow-950 dark:hover:border-yellow-700"
        >
          <Edit className="h-4 w-4 mr-1" />
          Editar
        </Button>
      </div>

      {/* Conteúdo Organizado - Layout Simples */}
      <div className="space-y-4">
        {/* Informações do Coordenador */}
        <div className="grid grid-cols-2 gap-8">
          <div className="flex items-center gap-3">
            <UserCheck className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">Nome:</span>
            <Skeleton className="h-4 w-28" />
          </div>
          <div className="flex items-center gap-3">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">Desde:</span>
            <Skeleton className="h-4 w-12" />
          </div>
        </div>

        {/* Linha separadora */}
        <div className="border-t border-border/30"></div>

        {/* Responsabilidade */}
        <div className="flex items-center gap-3">
          <GraduationCap className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium text-foreground">Responsabilidade:</span>
          <Skeleton className="h-4 w-36" />
        </div>
      </div>
    </div>
  )
}

export function CursoDetailSkeleton() {
  return (
    <div className="p-6 space-y-6">
      {/* Header Principal */}
      <CursoHeaderSkeleton />

      {/* Conteúdo Organizado - Layout Simples */}
      <CursoInfoSkeleton />

      {/* Separador */}
      <div className="border-t border-border/30 my-8"></div>

      {/* Seção do Coordenador */}
      <CursoCoordenadorSkeleton />

      {/* Separador */}
      <div className="border-t border-border/30 my-8"></div>

      {/* Placeholder para Disciplinas e Turmas */}
      <div className="space-y-8">
        <div className="space-y-4">
          <div className="h-8 w-48 bg-muted animate-pulse rounded"></div>
          <div className="h-64 bg-muted animate-pulse rounded"></div>
        </div>
        
        <div className="border-t border-border/30 my-8"></div>
        
        <div className="space-y-4">
          <div className="h-8 w-32 bg-muted animate-pulse rounded"></div>
          <div className="h-64 bg-muted animate-pulse rounded"></div>
        </div>
      </div>
    </div>
  )
}