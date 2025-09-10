import { ColumnDef } from "@tanstack/react-table"
import { ReactNode } from "react"

/**
 * Props principais do componente DataTable
 */
export interface DataTableProps<TData, TValue = unknown> {
  /** Definição das colunas da tabela */
  columns: ColumnDef<TData, TValue>[]
  /** Array de dados para exibir na tabela */
  data: TData[]
  
  // Props de busca e filtros
  /** Campo usado para busca (deve corresponder a uma chave do objeto TData) */
  searchKey?: keyof TData | string
  /** Placeholder do campo de busca */
  searchPlaceholder?: string
  
  // Props de interface
  /** Mostrar seletor de visibilidade de colunas */
  showColumnVisibility?: boolean
  /** Mostrar controles de paginação */
  showPagination?: boolean
  /** Número de itens por página */
  pageSize?: number
  /** Estado de carregamento */
  isLoading?: boolean
  
  // Props de ações CRUD
  /** Callback executado ao clicar no botão adicionar */
  onAdd?: () => void
  /** Callback executado ao clicar no botão editar */
  onEdit?: (item: TData) => void
  /** Callback executado ao confirmar exclusão */
  onDelete?: (item: TData) => void
  
  // Props de dialogs
  /** Conteúdo do dialog de adicionar (DialogContent) */
  addDialog?: ReactNode
  /** Conteúdo do dialog de editar (DialogContent) */
  editDialog?: ReactNode
  
  // Props de customização de labels
  /** Texto do botão adicionar */
  addButtonLabel?: string
  /** Texto do botão editar */
  editButtonLabel?: string
  /** Texto do botão excluir */
  deleteButtonLabel?: string
  
  // Props de ações customizadas
  /** Função que retorna ações customizadas para cada linha */
  customActions?: (item: TData) => ReactNode
  
  // Props de configuração avançada
  /** Função para extrair o nome do item (usado no dialog de exclusão) */
  getItemName?: (item: TData) => string
  /** Função para extrair o tipo do item (usado no dialog de exclusão) */
  getItemType?: (item: TData) => string
  /** Classe CSS customizada para o container principal */
  className?: string
  /** Desabilitar todas as ações (útil durante operações assíncronas) */
  disabled?: boolean
}

/**
 * Props para o dialog de confirmação de exclusão
 */
export interface DeleteDialogState {
  /** Nome do item a ser excluído */
  name: string
  /** Tipo do item a ser excluído */
  type: string
}

/**
 * Configuração de uma coluna com ações
 */
export interface ActionColumnConfig<TData> {
  /** Mostrar botão de editar */
  showEdit?: boolean
  /** Mostrar botão de excluir */
  showDelete?: boolean
  /** Ações customizadas adicionais */
  customActions?: (item: TData) => ReactNode
  /** Largura da coluna de ações */
  width?: number | string
}

/**
 * Configuração de busca avançada
 */
export interface SearchConfig<TData> {
  /** Campo principal de busca */
  key: keyof TData | string
  /** Placeholder do campo de busca */
  placeholder?: string
  /** Função customizada de filtro */
  filterFn?: (item: TData, searchValue: string) => boolean
}

/**
 * Configuração de paginação
 */
export interface PaginationConfig {
  /** Mostrar controles de paginação */
  show?: boolean
  /** Tamanho da página */
  pageSize?: number
  /** Opções de tamanho de página */
  pageSizeOptions?: number[]
  /** Mostrar informações de paginação */
  showInfo?: boolean
}

/**
 * Estados internos do DataTable
 */
export interface DataTableState {
  /** Estado de ordenação */
  sorting: any[]
  /** Estado de filtros de coluna */
  columnFilters: any[]
  /** Estado de visibilidade de colunas */
  columnVisibility: Record<string, boolean>
  /** Estado de seleção de linhas */
  rowSelection: Record<string, boolean>
  /** Dialog de adicionar está aberto */
  showAddDialog: boolean
  /** Dialog de editar está aberto */
  showEditDialog: boolean
  /** Dialog de excluir está aberto */
  showDeleteDialog: boolean
  /** Item selecionado para edição/exclusão */
  selectedItem: any | null
  /** Informações do item para exclusão */
  itemToDelete: DeleteDialogState | null
}

/**
 * Utilitários de tipo para extrair informações dos dados
 */
export type DataTableItemName<T> = T extends { nome: string }
  ? T['nome']
  : T extends { name: string }
  ? T['name']
  : T extends { title: string }
  ? T['title']
  : string

/**
 * Hook personalizado para gerenciar estado do DataTable
 */
export interface UseDataTableOptions<TData> {
  /** Dados da tabela */
  data: TData[]
  /** Configuração de paginação */
  pagination?: PaginationConfig
  /** Callbacks de ações */
  onAdd?: () => void
  onEdit?: (item: TData) => void
  onDelete?: (item: TData) => void
}

/**
 * Resultado do hook useDataTable
 */
export interface UseDataTableResult<TData> {
  /** Estado atual da tabela */
  state: DataTableState
  /** Funções para atualizar o estado */
  actions: {
    handleAdd: () => void
    handleEdit: (item: TData) => void
    handleDelete: (item: TData) => void
    confirmDelete: () => void
    setShowAddDialog: (show: boolean) => void
    setShowEditDialog: (show: boolean) => void
    setShowDeleteDialog: (show: boolean) => void
  }
}

/**
 * Configuração completa do DataTable para casos de uso específicos
 */
export interface DataTableConfig<TData> {
  /** Configuração de busca */
  search?: SearchConfig<TData>
  /** Configuração de paginação */
  pagination?: PaginationConfig
  /** Configuração de ações */
  actions?: ActionColumnConfig<TData>
  /** Labels customizados */
  labels?: {
    add?: string
    edit?: string
    delete?: string
    search?: string
    noResults?: string
    loading?: string
  }
}