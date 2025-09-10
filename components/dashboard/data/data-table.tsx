"use client"

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ChevronDown, Plus, Search, Edit, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { DeleteConfirmationDialog } from "@/components/dashboard/delete-confirmation-dialog"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  searchKey?: string
  searchPlaceholder?: string
  showColumnVisibility?: boolean
  showPagination?: boolean
  pageSize?: number
  // Sorting
  defaultSorting?: SortingState
  // CRUD Actions
  onAdd?: () => void
  onEdit?: (item: TData) => void
  onDelete?: (item: TData) => void
  // Dialog Components
  addDialog?: React.ReactNode
  editDialog?: React.ReactNode
  // Labels
  addButtonLabel?: string
  editButtonLabel?: string
  deleteButtonLabel?: string
  // Loading states
  isLoading?: boolean
  // Custom row actions
  customActions?: (item: TData) => React.ReactNode
}

export function DataTable<TData, TValue>({
  columns,
  data,
  searchKey,
  searchPlaceholder = "Buscar...",
  showColumnVisibility = true,
  showPagination = true,
  pageSize = 10,
  defaultSorting = [],
  onAdd,
  onEdit,
  onDelete,
  addDialog,
  editDialog,
  addButtonLabel = "Adicionar",
  editButtonLabel = "Editar",
  deleteButtonLabel = "Excluir",
  isLoading = false,
  customActions,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>(defaultSorting)
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const [showAddDialog, setShowAddDialog] = React.useState(false)
  const [showEditDialog, setShowEditDialog] = React.useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = React.useState(false)
  const [selectedItem, setSelectedItem] = React.useState<TData | null>(null)
  const [itemToDelete, setItemToDelete] = React.useState<{ name: string; type: string } | null>(null)

  // Adiciona coluna de ações se houver onEdit ou onDelete
  const columnsWithActions = React.useMemo(() => {
    if (!onEdit && !onDelete && !customActions) {
      return columns
    }

    const actionsColumn: ColumnDef<TData, TValue> = {
      id: "actions",
      header: "Ações",
      cell: ({ row }) => {
        const item = row.original

        return (
          <div className="flex items-center gap-2">
            {customActions && customActions(item)}
            {onEdit && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleEdit(item)}
                className="h-8 w-8 p-0"
              >
                <Edit className="h-4 w-4" />
                <span className="sr-only">{editButtonLabel}</span>
              </Button>
            )}
            {onDelete && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleDelete(item)}
                className="h-8 w-8 p-0 text-destructive hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">{deleteButtonLabel}</span>
              </Button>
            )}
          </div>
        )
      },
    }

    return [...columns, actionsColumn]
  }, [columns, onEdit, onDelete, customActions, editButtonLabel, deleteButtonLabel])

  const table = useReactTable({
    data,
    columns: columnsWithActions,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    initialState: {
      pagination: {
        pageSize,
      },
    },
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  const handleAdd = () => {
    if (onAdd) {
      onAdd()
    } else {
      setShowAddDialog(true)
    }
  }

  const handleEdit = (item: TData) => {
    setSelectedItem(item)
    if (onEdit) {
      onEdit(item)
    } else {
      setShowEditDialog(true)
    }
  }

  const handleDelete = (item: TData) => {
    setSelectedItem(item)
    // Tenta extrair um nome do item para exibir no diálogo
    const itemName = (item as any)?.nome || (item as any)?.name || (item as any)?.title || 'item'
    const itemType = 'registro'
    setItemToDelete({ name: itemName, type: itemType })
    setShowDeleteDialog(true)
  }

  const confirmDelete = () => {
    if (selectedItem && onDelete) {
      onDelete(selectedItem)
    }
    setShowDeleteDialog(false)
    setSelectedItem(null)
    setItemToDelete(null)
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="h-10 w-[250px] bg-muted animate-pulse rounded-md" />
          <div className="h-10 w-[100px] bg-muted animate-pulse rounded-md" />
        </div>
        <div className="rounded-md border">
          <div className="h-[400px] bg-muted animate-pulse" />
        </div>
      </div>
    )
  }

  return (
    <div className="w-full space-y-4">
      {/* Toolbar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {searchKey && (
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={searchPlaceholder}
                value={(table.getColumn(searchKey)?.getFilterValue() as string) ?? ""}
                onChange={(event) =>
                  table.getColumn(searchKey)?.setFilterValue(event.target.value)
                }
                className="pl-8 max-w-sm"
              />
            </div>
          )}
        </div>
        <div className="flex items-center space-x-2">
          {showColumnVisibility && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="ml-auto">
                  Colunas <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) =>
                          column.toggleVisibility(!!value)
                        }
                      >
                        {column.id}
                      </DropdownMenuCheckboxItem>
                    )
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          {onAdd && (
            <Button onClick={handleAdd} className="bg-green-600 hover:bg-green-700">
              <Plus className="mr-2 h-4 w-4" />
              {addButtonLabel}
            </Button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columnsWithActions.length}
                  className="h-24 text-center"
                >
                  Nenhum resultado encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {showPagination && (
        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="flex-1 text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} de{" "}
            {table.getFilteredRowModel().rows.length} linha(s) selecionada(s).
          </div>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Anterior
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Próximo
            </Button>
          </div>
        </div>
      )}

      {/* Add Dialog */}
      {addDialog && (
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          {addDialog}
        </Dialog>
      )}

      {/* Edit Dialog */}
      {editDialog && selectedItem && (
        <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
          {editDialog}
        </Dialog>
      )}

      {/* Delete Confirmation Dialog */}
      {itemToDelete && (
        <DeleteConfirmationDialog
          isOpen={showDeleteDialog}
          onOpenChange={setShowDeleteDialog}
          onConfirm={confirmDelete}
          itemName={itemToDelete.name}
          itemType={itemToDelete.type}
        />
      )}
    </div>
  )
}