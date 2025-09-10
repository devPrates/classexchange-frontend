"use client"

import { ColumnDef } from "@tanstack/react-table"
import { DisciplinaSimplificada } from "@/types/disciplina"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"

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
]