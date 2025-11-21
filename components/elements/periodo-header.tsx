"use client"

import { Button } from '@/components/ui/button'
import { Plus, Edit, Trash2, ChevronDown, ChevronRight } from 'lucide-react'

type Props = {
  title: string
  disciplineCount: number
  expanded: boolean
  onToggle: () => void
  onAdd?: () => void
  onEdit?: () => void
  onDelete?: () => void
}

export function PeriodoHeader({ title, disciplineCount, expanded, onToggle, onAdd, onEdit, onDelete }: Props) {
  return (
    <div className="flex items-center justify-between p-4 bg-muted/50 border-b border-dashed border-primary/20">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" onClick={onToggle} className="h-8 w-8 p-0">
          {expanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </Button>
        <div>
          <h3 className="font-semibold text-lg">{title}</h3>
          <p className="text-sm text-muted-foreground tech-label">{disciplineCount} disciplina(s)</p>
        </div>
      </div>
      <div className="flex gap-2">
        <Button
          size="sm"
          variant="outline"
          className="relative border-primary/30 hover:border-primary/50 bg-transparent"
          onClick={onAdd}
        >
          <Plus className="mr-2 h-4 w-4" />
          Adicionar Disciplina
          <div className="absolute top-0 left-0 w-1 h-1 border-l border-t border-primary/40" />
          <div className="absolute top-0 right-0 w-1 h-1 border-r border-t border-primary/40" />
          <div className="absolute bottom-0 left-0 w-1 h-1 border-l border-b border-primary/40" />
          <div className="absolute bottom-0 right-0 w-1 h-1 border-r border-b border-primary/40" />
        </Button>
        <Button
          size="sm"
          variant="ghost"
          className="text-yellow-600 dark:text-yellow-500 hover:bg-yellow-500/10"
          onClick={onEdit}
        >
          <Edit className="h-4 w-4" />
        </Button>
        <Button size="sm" variant="ghost" className="text-destructive hover:bg-destructive/10" onClick={onDelete}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}