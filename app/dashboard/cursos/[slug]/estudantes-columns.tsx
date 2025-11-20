"use client"

import { ColumnDef } from "@tanstack/react-table"
import { EstudanteCurso } from "@/types/cursos"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff } from "lucide-react"

export function createEstudantesColumns(
  showMatricula: boolean,
  onToggle: () => void,
): ColumnDef<EstudanteCurso>[] {
  return [
    {
      accessorKey: "nome",
      header: "Nome",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "matricula",
      header: () => (
        <div className="flex items-center gap-2">
          <span>Matrícula</span>
          <Button
            variant="outline"
            size="icon"
            className="h-7 w-7 rounded-full border-primary/20 bg-primary/10 hover:bg-primary/15 hover:border-primary/30"
            aria-label={showMatricula ? "Ocultar matrícula" : "Exibir matrícula"}
            onClick={onToggle}
          >
            {showMatricula ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
          </Button>
        </div>
      ),
      cell: ({ getValue }) => {
        const value = String(getValue())
        return showMatricula ? value : "••••••••"
      },
    },
    {
      accessorKey: "situacao",
      header: "Situação",
    },
    {
      accessorKey: "vinculoCurso",
      header: "Vínculo",
    },
  ]
}