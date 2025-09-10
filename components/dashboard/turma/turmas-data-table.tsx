"use client"

import { useState } from "react"
import { DataTable } from "@/components/dashboard/data/data-table"
import { turmasColumns } from "./turmas-columns"
import { CreateTurmaForm } from "./create-turma-form"
import { useTurmasByCursoIdQuery } from "@/hooks/use-turma"
import { Users, Save } from "lucide-react"
import { Button } from "@/components/ui/button"

interface TurmasDataTableProps {
  cursoId: string
  cursoNome?: string
}

export function TurmasDataTable({ 
  cursoId,
  cursoNome
}: TurmasDataTableProps) {
  const { data: turmas = [], isLoading } = useTurmasByCursoIdQuery(cursoId)
  const [isCreateTurmaOpen, setIsCreateTurmaOpen] = useState(false)

  return (
    <div className="space-y-4">
      {/* Header da seção */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-muted-foreground" />
          <h2 className="text-lg font-semibold text-foreground">TURMAS</h2>
        </div>
        <Button 
          variant="default" 
          size="sm" 
          className="flex items-center gap-2"
          onClick={() => setIsCreateTurmaOpen(true)}
        >
          <Save className="h-4 w-4" />
          Criar Turma
        </Button>
      </div>

      {/* Informações resumidas */}
      <div className="grid grid-cols-1 gap-8">
        <div className="flex items-center gap-3">
          <Users className="h-4 w-4 text-muted-foreground" />
          <p className="text-sm font-medium text-foreground">Total de Turmas:</p>
          <p className="text-sm text-muted-foreground">{turmas.length} turma{turmas.length !== 1 ? 's' : ''}</p>
        </div>
      </div>

      {/* Linha separadora */}
      <div className="border-t border-border/30"></div>

      {/* Tabela de turmas */}
      <DataTable
        columns={turmasColumns}
        data={turmas}
        searchKey="nome"
        searchPlaceholder="Buscar turmas..."
        showColumnVisibility={true}
        showPagination={true}
        pageSize={10}
        defaultSorting={[{ id: "nome", desc: false }]}
        isLoading={isLoading}
      />

      {/* Modal de Criação de Turma */}
      <CreateTurmaForm 
        open={isCreateTurmaOpen}
        onOpenChange={setIsCreateTurmaOpen}
        cursoId={cursoId}
      />
    </div>
  )
}