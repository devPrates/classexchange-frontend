"use client"

import { ColumnDef } from "@tanstack/react-table"
import { DisciplinaSimplificada } from "@/types/disciplina"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowUpDown, Edit, Trash2 } from "lucide-react"

export const disciplinasColumns: ColumnDef<DisciplinaSimplificada>[] = [
  {
    id: "index",
    header: "#",
    cell: ({ row }) => {
      return <div className="font-medium">{row.index + 1}</div>
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "nome",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-auto p-0 font-medium hover:bg-transparent"
        >
          Nome da Disciplina
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      return (
        <div className="font-medium text-gray-900 dark:text-gray-100">
          {row.getValue("nome")}
        </div>
      )
    },
    enableSorting: true,
  },
  {
    accessorKey: "cargaHoraria",
    header: "Carga Horária",
    cell: ({ row }) => {
      const cargaHoraria = row.getValue("cargaHoraria") as number
      return (
        <div className="text-center">
          {cargaHoraria}h
        </div>
      )
    },
  },
  {
    id: "actions",
    header: "Ações",
    cell: ({ row }) => {
      const disciplina = row.original
      
      return (
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="h-8 w-8 p-0 border-yellow-200 text-yellow-600 hover:bg-yellow-50 hover:border-yellow-300 dark:border-yellow-800 dark:text-yellow-400 dark:hover:bg-yellow-950 dark:hover:border-yellow-700"
            onClick={() => {
              // TODO: Implementar navegação para edição
              console.log('Editar disciplina:', disciplina.id)
            }}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-8 w-8 p-0 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-950 dark:hover:border-red-700"
            onClick={() => {
              // TODO: Implementar confirmação de exclusão
              console.log('Excluir disciplina:', disciplina.id)
            }}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      )
    },
    enableSorting: false,
    enableHiding: false,
  },
]