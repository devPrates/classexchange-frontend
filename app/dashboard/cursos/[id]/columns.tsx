import { Edit, Trash2 } from 'lucide-react'
import { Row } from '@tanstack/react-table'
import { createSortableColumn, createActionColumn } from '@/components/dashboard/data-table'
import type { DisciplinaSimplificada } from '@/types/disciplina'
import type { TurmaSimplificada } from '@/types/turma'

// Colunas para Disciplinas
export const createDisciplinasColumns = (
  onEdit: (disciplina: DisciplinaSimplificada) => void,
  onDelete: (disciplina: DisciplinaSimplificada) => void
) => [
  {
    id: 'index',
    header: '#',
    cell: ({ row }: { row: Row<DisciplinaSimplificada> }) => (
      <span className="text-muted-foreground font-mono text-sm">
        {row.index + 1}
      </span>
    ),
    enableSorting: false,
  },
  createSortableColumn<DisciplinaSimplificada>('nome', 'Disciplina'),
  {
    accessorKey: 'cargahoraria',
    header: 'Carga Horária',
    cell: ({ row }: { row: Row<DisciplinaSimplificada> }) => (
      <span className="text-muted-foreground">{row.getValue('cargahoraria')}h</span>
    ),
  },
  createActionColumn<DisciplinaSimplificada>([
    {
      label: 'Editar',
      icon: Edit,
      onClick: onEdit,
      variant: 'outline',
    },
    {
      label: 'Excluir',
      icon: Trash2,
      onClick: onDelete,
      variant: 'destructive',
    },
  ]),
]

// Colunas para Turmas
export const turmasColumns = [
  {
    id: 'index',
    header: '#',
    cell: ({ row }: { row: Row<TurmaSimplificada> }) => (
      <span className="text-muted-foreground font-mono text-sm">
        {row.index + 1}
      </span>
    ),
    enableSorting: false,
  },
  createSortableColumn<TurmaSimplificada>('nome', 'Turma'),
  createActionColumn<TurmaSimplificada>([
    {
      label: 'Editar',
      icon: Edit,
      onClick: (turma) => {
        console.log('Editar turma:', turma);
      },
      variant: 'outline',
    },
  ]),
]