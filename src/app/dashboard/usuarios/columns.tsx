"use client"

import RemoveButton from "@/components/admin/remove-button"
import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { SquarePen, ArrowUpDown } from "lucide-react"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type users = {
  name: string
  email: string
  password: string
  siape: string
  celular: string
}

export const columns: ColumnDef<users>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nome
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "siape",
    header: "Siape",
  },
  {
    accessorKey: "acions",
    header: "Ações",
    cell: ({ row }) => {
      const id = 1
      return (
        <div className="flex space-x-2">
          <Button variant={'outline'} size={'icon'}><SquarePen className="stroke-yellow-500"/></Button>
          <RemoveButton id={id}/>
        </div>
      )
    }
  },
]
