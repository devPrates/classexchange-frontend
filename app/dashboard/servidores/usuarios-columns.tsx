"use client"

import { ColumnDef } from "@tanstack/react-table"
import type { Usuario } from "@/types/usuarios"
import { Button } from "@/components/ui/button"
import { FaSortAlphaUp, FaSortAlphaDown } from "react-icons/fa"

export const usuariosColumns: ColumnDef<Usuario>[] = [
  {
    accessorKey: 'nome',
    header: ({ column }) => (
      <div className="flex items-center gap-2">
        <span>Nome</span>
        <Button
          variant="outline"
          size="icon"
          className="h-7 w-7 rounded-full border-primary/20 bg-primary/10 hover:bg-primary/15 hover:border-primary/30"
          aria-label="Ordenar por nome"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          {column.getIsSorted() === 'desc' ? (
            <FaSortAlphaDown className="h-3.5 w-3.5" />
          ) : (
            <FaSortAlphaUp className="h-3.5 w-3.5" />
          )}
        </Button>
      </div>
    ),
    enableSorting: true,
  },
  {
    accessorKey: 'email',
    header: ({ column }) => (
      <div className="flex items-center gap-2">
        <span>Email</span>
        <Button
          variant="outline"
          size="icon"
          className="h-7 w-7 rounded-full border-primary/20 bg-primary/10 hover:bg-primary/15 hover:border-primary/30"
          aria-label="Ordenar por email"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          {column.getIsSorted() === 'desc' ? (
            <FaSortAlphaDown className="h-3.5 w-3.5" />
          ) : (
            <FaSortAlphaUp className="h-3.5 w-3.5" />
          )}
        </Button>
      </div>
    ),
    enableSorting: true,
  },
  { accessorKey: 'celular', header: 'Celular' },
  { accessorKey: 'role', header: 'Perfil' },
  { accessorKey: 'campusNome', header: 'Campus' },
]