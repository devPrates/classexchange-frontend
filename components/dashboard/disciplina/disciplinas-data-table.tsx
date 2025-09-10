"use client"

import { DisciplinaSimplificada } from "@/types/disciplina"
import { DataTable } from "@/components/dashboard/data/data-table"
import { disciplinasColumns } from "./disciplinas-columns"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen } from "lucide-react"

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
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-blue-600" />
          <div>
            <CardTitle className="text-lg">
              Disciplinas {cursoNome && `do Curso ${cursoNome}`}
            </CardTitle>
            <CardDescription>
              {disciplinas.length} disciplina{disciplinas.length !== 1 ? 's' : ''} • 
              Carga horária total: {totalCargaHoraria}h
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <DataTable
          columns={disciplinasColumns}
          data={disciplinas}
          searchKey="nome"
          searchPlaceholder="Buscar disciplinas..."
          showColumnVisibility={true}
          showPagination={disciplinas.length > 10}
          pageSize={10}
          isLoading={isLoading}
        />
      </CardContent>
    </Card>
  )
}