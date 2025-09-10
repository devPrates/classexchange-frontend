"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Turma } from "@/types/turma"
import { Button } from "@/components/ui/button"
import { ListOrdered } from "lucide-react"
import { DeleteTurmaDialog } from "./delete-turma-dialog"
import { EditTurmaDialog } from "./edit-turma-dialog"

export const turmasColumns: ColumnDef<Turma>[] = [
  {
    id: "index",
    header: () => <div className="text-center">#</div>,
    cell: ({ row }) => {
      return <div className="font-medium text-center">{row.index + 1}</div>
    },
    enableSorting: false,
    enableHiding: false,
    size: 60,
  },
  {
    accessorKey: "nome",
    header: ({ column }) => {
      return (
        <div className="-ml-4">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="h-auto p-0 font-medium hover:bg-transparent"
          >
            Nome da Turma
            <ListOrdered />
          </Button>
        </div>
      )
    },
    cell: ({ row }) => {
      return (
        <div className="font-medium text-gray-900 dark:text-gray-100 text-left">
          {row.getValue("nome")}
        </div>
      )
    },
    enableSorting: true,
  },
  {
    accessorKey: "numero",
    header: "Número",
    cell: ({ row }) => {
      return (
        <div className="text-left">
          {row.getValue("numero")}
        </div>
      )
    },
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => {
      return (
        <div className="-ml-4">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="h-auto p-0 font-medium hover:bg-transparent"
          >
            Última Alteração
            <ListOrdered />
          </Button>
        </div>
      )
    },
    cell: ({ row }) => {
      const updatedAt = row.getValue("updatedAt") as string
      const date = new Date(updatedAt)
      const today = new Date()

      // Verifica se é o mesmo dia
      const isToday = date.toDateString() === today.toDateString()

      if (isToday) {
        // Mostra apenas o horário
        return (
          <div className="text-left text-sm text-gray-600 dark:text-gray-400">
            {date.toLocaleTimeString('pt-BR', {
              hour: '2-digit',
              minute: '2-digit'
            })}
          </div>
        )
      } else {
        // Mostra apenas a data
        return (
          <div className="text-left text-sm text-gray-600 dark:text-gray-400">
            {date.toLocaleDateString('pt-BR')}
          </div>
        )
      }
    },
    enableSorting: true,
  },
  {
    id: "actions",
    header: "Ações",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2">
          <EditTurmaDialog turma={row.original} />
          <DeleteTurmaDialog turmaId={row.original.id} turmaNome={row.original.nome} />
        </div>
      )
    },
    enableSorting: false,
    enableHiding: false,
  },
]