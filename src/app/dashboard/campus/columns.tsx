"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type campus = {
  campusId: number
  name: string
  sigla: string
  endereco: string
}

export const columns: ColumnDef<campus>[] = [
  {
    accessorKey: "campusId",	
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Status",
  },
  {
    accessorKey: "sigla",
    header: "Sigla",
  },
  {
    accessorKey: "endereco",
    header: "Endereço",
  },
]
