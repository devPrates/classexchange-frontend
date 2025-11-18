"use client"

import { ColumnDef } from "@tanstack/react-table"
import { TurmaResumo } from "@/types/cursos"

export const turmasColumns: ColumnDef<TurmaResumo>[] = [
  {
    accessorKey: "nome",
    header: "Nome",
  },
]