"use client"

import { ColumnDef } from "@tanstack/react-table"
import { DisciplinaSimplificada } from "@/types/disciplina"
import { Badge } from "@/components/ui/badge"

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
    header: "Nome da Disciplina",
    cell: ({ row }) => {
      return (
        <div className="font-medium text-gray-900 dark:text-gray-100">
          {row.getValue("nome")}
        </div>
      )
    },
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
]