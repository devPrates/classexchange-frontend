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
                    variant="ghost"
                    size="icon"
                    className="hover:bg-yellow-300"
                    onClick={() => onEdit?.(d)}
                    aria-label="Editar"
                  >
                    <Edit className="h-4 w-4 text-yellow-600" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="hover:bg-red-300"
                    onClick={() => onDelete?.(d)}
                    aria-label="Excluir"
                  >
                    <Trash2 className="h-4 w-4 text-red-600" />
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
