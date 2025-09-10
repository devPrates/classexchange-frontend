# DataTable Reutilizável

Componente de tabela reutilizável baseado no TanStack Table e shadcn/ui, projetado para ser usado em todas as operações CRUD do sistema ClassExchange.

## 📋 Características

- ✅ **Totalmente reutilizável** - Use em qualquer CRUD do sistema
- ✅ **Botões dinâmicos** - Criar, editar e excluir configuráveis via props
- ✅ **Busca integrada** - Campo de busca com filtro em tempo real
- ✅ **Ordenação** - Clique nos cabeçalhos para ordenar
- ✅ **Paginação** - Navegação entre páginas automática
- ✅ **Seleção de colunas** - Mostrar/ocultar colunas dinamicamente
- ✅ **Estados de loading** - Skeleton loading integrado
- ✅ **Dialogs customizados** - Suporte a formulários personalizados
- ✅ **Ações customizadas** - Adicione botões extras por linha
- ✅ **Confirmação de exclusão** - Dialog de confirmação automático
- ✅ **Responsivo** - Funciona em desktop e mobile
- ✅ **Acessível** - Seguindo padrões WAI-ARIA

## 🚀 Uso Básico

```tsx
import { DataTable } from "@/components/dashboard/data-table"
import { ColumnDef } from "@tanstack/react-table"

// 1. Defina o tipo dos dados
interface Usuario {
  id: string
  nome: string
  email: string
  status: "ativo" | "inativo"
}

// 2. Configure as colunas
const columns: ColumnDef<Usuario>[] = [
  {
    accessorKey: "nome",
    header: "Nome",
  },
  {
    accessorKey: "email", 
    header: "Email",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge variant={row.original.status === "ativo" ? "default" : "secondary"}>
        {row.original.status}
      </Badge>
    ),
  },
]

// 3. Use o componente
function UsuariosPage() {
  const { data, isLoading } = useUsuarios()

  return (
    <DataTable
      columns={columns}
      data={data || []}
      isLoading={isLoading}
      searchKey="nome"
      searchPlaceholder="Buscar usuários..."
      onAdd={() => router.push('/usuarios/novo')}
      onEdit={(usuario) => router.push(`/usuarios/editar/${usuario.id}`)}
      onDelete={handleDelete}
      addButtonLabel="Novo Usuário"
    />
  )
}
```

## 📚 Props Disponíveis

### Props Obrigatórias

| Prop | Tipo | Descrição |
|------|------|----------|
| `columns` | `ColumnDef<TData>[]` | Definição das colunas da tabela |
| `data` | `TData[]` | Array de dados para exibir |

### Props de Busca e Filtros

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|----------|
| `searchKey` | `string` | - | Campo usado para busca (opcional) |
| `searchPlaceholder` | `string` | `"Buscar..."` | Placeholder do campo de busca |

### Props de Interface

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|----------|
| `showColumnVisibility` | `boolean` | `true` | Mostrar seletor de colunas |
| `showPagination` | `boolean` | `true` | Mostrar controles de paginação |
| `pageSize` | `number` | `10` | Número de itens por página |
| `isLoading` | `boolean` | `false` | Estado de carregamento |

### Props de Ações CRUD

| Prop | Tipo | Descrição |
|------|------|----------|
| `onAdd` | `() => void` | Callback para criar novo item |
| `onEdit` | `(item: TData) => void` | Callback para editar item |
| `onDelete` | `(item: TData) => void` | Callback para excluir item |

### Props de Customização

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|----------|
| `addButtonLabel` | `string` | `"Adicionar"` | Texto do botão adicionar |
| `editButtonLabel` | `string` | `"Editar"` | Texto do botão editar |
| `deleteButtonLabel` | `string` | `"Excluir"` | Texto do botão excluir |
| `customActions` | `(item: TData) => ReactNode` | - | Ações customizadas por linha |

### Props de Dialogs

| Prop | Tipo | Descrição |
|------|------|----------|
| `addDialog` | `ReactNode` | Dialog customizado para adicionar |
| `editDialog` | `ReactNode` | Dialog customizado para editar |

## 🔧 Exemplos Avançados

### Com Ordenação

```tsx
const columns: ColumnDef<Usuario>[] = [
  {
    accessorKey: "nome",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Nome
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
]
```

### Com Ações Customizadas

```tsx
const customActions = (usuario: Usuario) => (
  <>
    <Button
      variant="ghost"
      size="sm"
      onClick={() => handleViewProfile(usuario)}
    >
      <Eye className="h-4 w-4" />
    </Button>
    <Button
      variant="ghost"
      size="sm"
      onClick={() => handleSendEmail(usuario)}
    >
      <Mail className="h-4 w-4" />
    </Button>
  </>
)

<DataTable
  // outras props...
  customActions={customActions}
/>
```

### Com Dialogs Customizados

```tsx
const [showAddDialog, setShowAddDialog] = useState(false)

const addDialog = (
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Novo Usuário</DialogTitle>
    </DialogHeader>
    <UsuarioForm onSuccess={() => setShowAddDialog(false)} />
  </DialogContent>
)

<DataTable
  // outras props...
  addDialog={addDialog}
  onAdd={() => setShowAddDialog(true)}
/>
```

### Integração com React Query

```tsx
function UsuariosPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['usuarios'],
    queryFn: fetchUsuarios,
  })

  const deleteMutation = useMutation({
    mutationFn: deleteUsuario,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['usuarios'] })
      toast.success('Usuário excluído com sucesso!')
    },
  })

  return (
    <DataTable
      columns={columns}
      data={data || []}
      isLoading={isLoading}
      onDelete={(usuario) => deleteMutation.mutate(usuario.id)}
      // outras props...
    />
  )
}
```

## 🎨 Customização de Estilos

O componente usa classes do Tailwind CSS e pode ser customizado:

```tsx
// Exemplo: botão de adicionar com cor customizada
<DataTable
  // outras props...
  onAdd={handleAdd}
  // O botão já tem classes: "bg-green-600 hover:bg-green-700"
/>
```

## 🔍 Detecção Automática de Nomes

O componente tenta automaticamente detectar o nome do item para o dialog de exclusão:

```tsx
// Busca por estas propriedades em ordem:
// 1. item.nome
// 2. item.name  
// 3. item.title
// 4. Fallback: "item"
```

## 📱 Responsividade

O componente é totalmente responsivo:

- **Desktop**: Tabela completa com todas as funcionalidades
- **Tablet**: Colunas podem ser ocultadas via seletor
- **Mobile**: Layout adaptado com scroll horizontal quando necessário

## ♿ Acessibilidade

- Navegação por teclado completa
- Screen readers suportados
- Contraste adequado em modo claro e escuro
- Labels descritivos em todos os botões
- Estados de foco visíveis

## 🚨 Notas Importantes

1. **TanStack Table**: Certifique-se de que `@tanstack/react-table` está instalado
2. **Tipos TypeScript**: Use tipos específicos para melhor IntelliSense
3. **Performance**: Para grandes datasets, considere paginação server-side
4. **Memória**: Use `React.memo` se necessário para otimizar re-renders

## 📁 Arquivos Relacionados

- `data-table.tsx` - Componente principal
- `delete-confirmation-dialog.tsx` - Dialog de confirmação
- `data-table-example.tsx` - Exemplo de uso completo
- `README.md` - Esta documentação

## 🤝 Contribuição

Para adicionar novas funcionalidades:

1. Mantenha a compatibilidade com a API atual
2. Adicione props opcionais para não quebrar código existente
3. Documente as mudanças neste README
4. Teste em diferentes cenários de uso