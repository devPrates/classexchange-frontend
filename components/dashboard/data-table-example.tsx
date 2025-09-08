"use client"

// Exemplo de uso do componente DataTable genérico
// Este arquivo demonstra como usar o DataTable com diferentes tipos de dados

import { ColumnDef } from "@tanstack/react-table"
import { Edit, Trash2, Eye } from "lucide-react"
import { DataTable, createActionColumn, createSortableColumn } from "./data-table"
import { Badge } from "@/components/ui/badge"

// Exemplo 1: Tabela de Cursos
interface Curso {
  id: string
  nome: string
  coordenador: string
  status: "ativo" | "inativo"
  totalDisciplinas: number
  totalTurmas: number
  createdAt: string
}

// Definição das colunas para cursos
const cursosColumns: ColumnDef<Curso>[] = [
  createSortableColumn("nome", "Nome do Curso"),
  createSortableColumn("coordenador", "Coordenador"),
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      return (
        <Badge variant={status === "ativo" ? "default" : "secondary"}>
          {status === "ativo" ? "Ativo" : "Inativo"}
        </Badge>
      )
    },
  },
  {
    accessorKey: "totalDisciplinas",
    header: "Disciplinas",
    cell: ({ row }) => {
      const total = row.getValue("totalDisciplinas") as number
      return <span className="font-medium">{total}</span>
    },
  },
  {
    accessorKey: "totalTurmas",
    header: "Turmas",
    cell: ({ row }) => {
      const total = row.getValue("totalTurmas") as number
      return <span className="font-medium">{total}</span>
    },
  },
  createSortableColumn("createdAt", "Data de Criação"),
  createActionColumn<Curso>([
    {
      label: "Visualizar",
      icon: Eye,
      variant: "outline",
      onClick: (curso) => {
        console.log("Visualizar curso:", curso)
        // Navegar para página de detalhes
      },
    },
    {
      label: "Editar",
      icon: Edit,
      variant: "default",
      onClick: (curso) => {
        console.log("Editar curso:", curso)
        // Navegar para página de edição
      },
    },
    {
      label: "Excluir",
      icon: Trash2,
      variant: "destructive",
      onClick: (curso) => {
        console.log("Excluir curso:", curso)
        // Abrir modal de confirmação
      },
    },
  ]),
]

// Exemplo 2: Tabela de Usuários
interface Usuario {
  id: string
  nome: string
  email: string
  tipo: "coordenador" | "professor" | "admin"
  ativo: boolean
  ultimoLogin: string
}

const usuariosColumns: ColumnDef<Usuario>[] = [
  createSortableColumn("nome", "Nome"),
  createSortableColumn("email", "E-mail"),
  {
    accessorKey: "tipo",
    header: "Tipo",
    cell: ({ row }) => {
      const tipo = row.getValue("tipo") as string
      const variants = {
        admin: "destructive",
        coordenador: "default",
        professor: "secondary",
      } as const
      
      return (
        <Badge variant={variants[tipo as keyof typeof variants]}>
          {tipo.charAt(0).toUpperCase() + tipo.slice(1)}
        </Badge>
      )
    },
  },
  {
    accessorKey: "ativo",
    header: "Status",
    cell: ({ row }) => {
      const ativo = row.getValue("ativo") as boolean
      return (
        <Badge variant={ativo ? "default" : "secondary"}>
          {ativo ? "Ativo" : "Inativo"}
        </Badge>
      )
    },
  },
  createSortableColumn("ultimoLogin", "Último Login"),
  createActionColumn<Usuario>([
    {
      label: "Editar",
      icon: Edit,
      onClick: (usuario) => {
        console.log("Editar usuário:", usuario)
      },
    },
    {
      label: "Excluir",
      icon: Trash2,
      variant: "destructive",
      onClick: (usuario) => {
        console.log("Excluir usuário:", usuario)
      },
    },
  ]),
]

// Componentes de exemplo
export function CursosDataTable({ data }: { data: Curso[] }) {
  return (
    <DataTable
      columns={cursosColumns}
      data={data}
      searchKey="nome"
      searchPlaceholder="Buscar por nome do curso..."
      showColumnVisibility={true}
      showPagination={true}
      pageSize={10}
    />
  )
}

export function UsuariosDataTable({ data }: { data: Usuario[] }) {
  return (
    <DataTable
      columns={usuariosColumns}
      data={data}
      searchKey="nome"
      searchPlaceholder="Buscar por nome ou e-mail..."
      showColumnVisibility={true}
      showPagination={true}
      pageSize={15}
    />
  )
}

// Exemplo 3: Tabela simples sem ações
interface DisciplinaSimples {
  id: string
  nome: string
  codigo: string
  cargahoraria: number
}

const disciplinasColumns: ColumnDef<DisciplinaSimples>[] = [
  createSortableColumn("codigo", "Código"),
  createSortableColumn("nome", "Nome da Disciplina"),
  {
    accessorKey: "cargahoraria",
    header: "Carga Horária",
    cell: ({ row }) => {
      const carga = row.getValue("cargahoraria") as number
      return <span>{carga}h</span>
    },
  },
]

export function DisciplinasDataTable({ data }: { data: DisciplinaSimples[] }) {
  return (
    <DataTable
      columns={disciplinasColumns}
      data={data}
      searchKey="nome"
      searchPlaceholder="Buscar disciplina..."
      showColumnVisibility={false}
      showPagination={false}
    />
  )
}

// Exemplo de uso em uma página
export function ExemploUsoDataTable() {
  // Dados mockados para exemplo
  const cursosMock: Curso[] = [
    {
      id: "1",
      nome: "Análise e Desenvolvimento de Sistemas",
      coordenador: "Prof. João Silva",
      status: "ativo",
      totalDisciplinas: 12,
      totalTurmas: 3,
      createdAt: "2024-01-15",
    },
    {
      id: "2",
      nome: "Redes de Computadores",
      coordenador: "Prof. Maria Santos",
      status: "ativo",
      totalDisciplinas: 10,
      totalTurmas: 2,
      createdAt: "2024-02-20",
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Cursos</h2>
        <CursosDataTable data={cursosMock} />
      </div>
    </div>
  )
}