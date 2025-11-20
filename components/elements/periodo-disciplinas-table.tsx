"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Edit, Trash2 } from 'lucide-react'
import type { DisciplinaPeriodoResumo } from '@/types/cursos'

type Props = {
  disciplinas: DisciplinaPeriodoResumo[]
  onEdit?: (disciplina: DisciplinaPeriodoResumo) => void
  onDelete?: (disciplina: DisciplinaPeriodoResumo) => void
}

export function PeriodoDisciplinasTable({ disciplinas, onEdit, onDelete }: Props) {
  return (
    <div className="overflow-hidden rounded-md border border-primary/30" style={{ borderRadius: 6 }}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Disciplina</TableHead>
            <TableHead>Slug</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {disciplinas.map((d) => (
            <TableRow key={d.id}>
              <TableCell className="font-medium">{d.nome}</TableCell>
              <TableCell className="text-muted-foreground">{d.slug}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-yellow-500/10 text-yellow-700 hover:bg-yellow-500/20 hover:text-yellow-700 border border-yellow-500/30 rounded-md"
                    style={{ borderRadius: 6 }}
                    onClick={() => onEdit?.(d)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-red-500/10 text-red-700 hover:bg-red-500/20 hover:text-red-700 border border-red-500/30 rounded-md"
                    style={{ borderRadius: 6 }}
                    onClick={() => onDelete?.(d)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}