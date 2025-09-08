import { Edit } from 'lucide-react'
import { createSortableColumn, createActionColumn } from '@/components/dashboard/data-table'
import type { DisciplinaSimplificada } from '@/types/disciplina'
import type { TurmaSimplificada } from '@/types/turma'

// Colunas para Disciplinas
export const disciplinasColumns = [
  {
    id: 'index',
    header: '#',
    cell: ({ row }: { row: any }) => (
      <span className="text-muted-foreground font-mono text-sm">
        {row.index + 1}
      </span>
    ),
    enableSorting: false,
  },
  createSortableColumn<DisciplinaSimplificada>('nome', 'Disciplina'),
  {
    accessorKey: 'cargaHoraria',
    header: 'Carga Horária',
    cell: ({ row }: { row: any }) => (
      <span className="text-muted-foreground">{row.getValue('cargaHoraria')}h</span>
    ),
  },
  createActionColumn<DisciplinaSimplificada>([
    {
      label: 'Editar',
      icon: Edit,
      onClick: (disciplina) => {
        console.log('Editar disciplina:', disciplina);
      },
      variant: 'outline',
    },
  ]),
]

// Colunas para Turmas
export const turmasColumns = [
  {
    id: 'index',
    header: '#',
    cell: ({ row }: { row: any }) => (
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