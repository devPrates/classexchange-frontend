"use client"

import { ColumnDef } from "@tanstack/react-table"
import { DisciplinaResumo } from "@/types/cursos"

export const disciplinasColumns: ColumnDef<DisciplinaResumo>[] = [
  {
    accessorKey: "nome",
    header: "Nome",
  },
  {
    accessorKey: "cargaHoraria",
    header: "Carga Horária",
    cell: ({ row }) => `${row.original.cargaHoraria}h`,
  },
]