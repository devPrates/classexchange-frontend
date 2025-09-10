"use client"

import { DisciplinaSimplificada } from "@/types/disciplina"
import { DataTable } from "@/components/dashboard/data/data-table"
import { disciplinasColumns } from "./disciplinas-columns"
import { BookOpen, Save } from "lucide-react"
import { Button } from "@/components/ui/button"

interface DisciplinasDataTableProps {
  disciplinas: DisciplinaSimplificada[]
  cursoNome?: string
  isLoading?: boolean
}

export function DisciplinasDataTable({ 
  disciplinas, 
  cursoNome,
  isLoading = false 
}: DisciplinasDataTableProps) {

  const totalCargaHoraria = disciplinas.reduce((total, disciplina) => {
    return total + disciplina.cargaHoraria
  }, 0)

  return (
    <div className="space-y-4">
      {/* Header da seção */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-muted-foreground" />
          <h2 className="text-lg font-semibold text-foreground">DISCIPLINAS</h2>
        </div>
        <Button variant="default" size="sm" className="flex items-center gap-2">
          <Save className="h-4 w-4" />
          Criar Disciplina
        </Button>
      </div>

      {/* Informações resumidas */}
      <div className="grid grid-cols-2 gap-8">
        <div className="flex items-center gap-3">
          <BookOpen className="h-4 w-4 text-muted-foreground" />
          <p className="text-sm font-medium text-foreground">Total de Disciplinas:</p>
          <p className="text-sm text-muted-foreground">{disciplinas.length} disciplina{disciplinas.length !== 1 ? 's' : ''}</p>
        </div>
        <div className="flex items-center gap-3">
          <BookOpen className="h-4 w-4 text-muted-foreground" />
          <p className="text-sm font-medium text-foreground">Carga Horária Total:</p>
          <p className="text-sm text-muted-foreground">{totalCargaHoraria}h</p>
        </div>
      </div>

      {/* Linha separadora */}
      <div className="border-t border-border/30"></div>

      {/* Tabela de disciplinas */}
      <DataTable
        columns={disciplinasColumns}
        data={disciplinas}
        searchKey="nome"
        searchPlaceholder="Buscar disciplinas..."
        showColumnVisibility={true}
        showPagination={true}
        pageSize={10}
        defaultSorting={[{ id: "nome", desc: false }]}
        isLoading={isLoading}
      />
    </div>
  )
}