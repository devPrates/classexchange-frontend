"use client"

import { ColumnDef } from "@tanstack/react-table"
import type { Estudante } from "@/types/estudantes"

export const estudantesColumns: ColumnDef<Estudante>[] = [
  { accessorKey: 'nome', header: 'Nome' },
  { accessorKey: 'email', header: 'Email' },
  { accessorKey: 'createdAt', header: 'Criado em' },
]