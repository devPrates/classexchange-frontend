"use client"

import { useState } from "react"
import { ColumnDef, flexRender, getCoreRowModel, getPaginationRowModel, getFilteredRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Edit, Trash2, Search, Upload, Download } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"

interface DataTableProps<TData> {
  columns: ColumnDef<TData, any>[]
  data: TData[]
  onEdit?: (item: TData) => void
  onDelete?: (item: TData) => void
  searchable?: boolean
}

export function DataTable<TData>({ columns, data, onEdit, onDelete, searchable = true }: DataTableProps<TData>) {
  const [query, setQuery] = useState("")
  const idColumn: ColumnDef<TData> = {
    id: "rowIndex",
    header: "ID",
    cell: ({ row }) => row.index + 1,
    size: 60,
  }

  const actionsColumn: ColumnDef<TData> = {
    id: "actions",
    header: "Ações",
    cell: ({ row }) => (
      <div className="flex justify-end gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="hover:bg-yellow-300"
          onClick={() => onEdit?.(row.original)}
          aria-label="Editar"
        >
          <Edit className="h-4 w-4 text-yellow-600" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="hover:bg-red-300"
          onClick={() => onDelete?.(row.original)}
          aria-label="Excluir"
        >
          <Trash2 className="h-4 w-4 text-red-600" />
        </Button>
      </div>
    ),
  }

  const displayData = data

  const table = useReactTable({
    data: displayData,
    columns: [idColumn, ...columns, actionsColumn],
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  return (
    <div className="overflow-hidden rounded-md border" style={{ borderRadius: 6 }}>
      <div className="flex items-center justify-between px-2 py-2 border-b">
        {searchable ? (
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-9 border-primary/30"
            />
          </div>
        ) : (
          <div />
        )}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="bg-blue-500/10 text-blue-700 hover:bg-blue-500/20 hover:text-blue-700 border border-blue-500/30 rounded-md"
            style={{ borderRadius: 6 }}
          >
            <Upload className="h-4 w-4" />
            Importar
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="bg-green-500/10 text-green-700 hover:bg-green-500/20 hover:text-green-700 border border-green-500/30 rounded-md"
            style={{ borderRadius: 6 }}
          >
            <Download className="h-4 w-4" />
            Exportar
          </Button>
        </div>
      </div>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  className={header.column.id === "actions" ? "text-right" : undefined}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className={cell.column.id === "actions" ? "text-right" : undefined}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length + 2} className="h-24 text-center">
                Nenhum resultado.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex items-center justify-between px-2 py-2 border-t">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Linhas por página</span>
          <Select value={String(table.getState().pagination.pageSize)} onValueChange={(v) => table.setPageSize(Number(v))}>
            <SelectTrigger className="h-8 w-[80px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="30">30</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-sm">
            Página {table.getState().pagination.pageIndex + 1} de {table.getPageCount() || 1}
          </div>
          <div className="flex items-center gap-1">
            <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
              Anterior
            </Button>
            <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
              Próxima
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
