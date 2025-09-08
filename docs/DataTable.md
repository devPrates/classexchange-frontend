# DataTable - Componente de Tabela Genérica

Este diretório contém o componente `DataTable` genérico baseado no shadcn/ui e TanStack Table, projetado para ser reutilizado em todo o projeto ClassExchange.

## Arquivos

- `data-table.tsx` - Componente principal DataTable
- `data-table-example.tsx` - Exemplos de uso e implementações
- `README.md` - Esta documentação

## Características

✅ **Totalmente tipado** com TypeScript  
✅ **Colunas dinâmicas** configuráveis  
✅ **Busca integrada** com campo de pesquisa  
✅ **Ordenação** por colunas  
✅ **Paginação** customizável  
✅ **Visibilidade de colunas** configurável  
✅ **Ações personalizadas** por linha  
✅ **Responsivo** e acessível  
✅ **Tema dark/light** compatível  

## Uso Básico

```tsx
import { DataTable } from "@/components/dashboard/data-table"
import { ColumnDef } from "@tanstack/react-table"

// 1. Defina o tipo dos seus dados
interface Usuario {
  id: string
  nome: string
  email: string
  ativo: boolean
}

// 2. Configure as colunas
const columns: ColumnDef<Usuario>[] = [
  {
    accessorKey: "nome",
    header: "Nome",
  },
  {
    accessorKey: "email",
    header: "E-mail",
  },
  {
    accessorKey: "ativo",
    header: "Status",
    cell: ({ row }) => {
      const ativo = row.getValue("ativo") as boolean
      return ativo ? "Ativo" : "Inativo"
    },
  },
]

// 3. Use o componente
export function UsuariosPage() {
  const usuarios: Usuario[] = []
  
  return (
    <DataTable
      columns={columns}
      data={usuarios}
      searchKey="nome"
      searchPlaceholder="Buscar usuário..."
    />
  )
}
```

## Props do DataTable

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `columns` | `ColumnDef<TData, TValue>[]` | - | **Obrigatório.** Definição das colunas |
| `data` | `TData[]` | - | **Obrigatório.** Array de dados |
| `searchKey` | `string` | - | Chave para busca (nome da coluna) |
| `searchPlaceholder` | `string` | `"Buscar..."` | Placeholder do campo de busca |
| `showColumnVisibility` | `boolean` | `true` | Mostrar controle de visibilidade |
| `showPagination` | `boolean` | `true` | Mostrar controles de paginação |
| `pageSize` | `number` | `10` | Número de itens por página |

## Helpers Inclusos

### createSortableColumn

Cria uma coluna com ordenação automática:

```tsx
import { createSortableColumn } from "@/components/dashboard/data-table"

const columns = [
  createSortableColumn("nome", "Nome do Usuário"),
  createSortableColumn("createdAt", "Data de Criação"),
]
```

### createActionColumn

Cria uma coluna de ações com botões:

```tsx
import { createActionColumn } from "@/components/dashboard/data-table"
import { Edit, Trash2, Eye } from "lucide-react"

const columns = [
  // ... outras colunas
  createActionColumn<Usuario>([
    {
      label: "Visualizar",
      icon: Eye,
      variant: "outline",
      onClick: (usuario) => {
        // Navegar para detalhes
      },
    },
    {
      label: "Editar",
      icon: Edit,
      variant: "default",
      onClick: (usuario) => {
        // Navegar para edição
      },
    },
    {
      label: "Excluir",
      icon: Trash2,
      variant: "destructive",
      onClick: (usuario) => {
        // Confirmar exclusão
      },
    },
  ]),
]
```

## Exemplos Avançados

### Coluna com Badge

```tsx
import { Badge } from "@/components/ui/badge"

const statusColumn: ColumnDef<Usuario> = {
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
}
```

### Coluna com Formatação

```tsx
const dataColumn: ColumnDef<Usuario> = {
  accessorKey: "createdAt",
  header: "Data de Criação",
  cell: ({ row }) => {
    const data = row.getValue("createdAt") as string
    return new Date(data).toLocaleDateString('pt-BR')
  },
}
```

### Tabela Simples (sem paginação/busca)

```tsx
<DataTable
  columns={columns}
  data={data}
  showColumnVisibility={false}
  showPagination={false}
/>
```

## Integração com TanStack Query

```tsx
import { useQuery } from "@tanstack/react-query"
import { DataTable } from "@/components/dashboard/data-table"

export function UsuariosPage() {
  const { data: usuarios = [], isLoading } = useQuery({
    queryKey: ['usuarios'],
    queryFn: fetchUsuarios,
  })

  if (isLoading) {
    return <div>Carregando...</div>
  }

  return (
    <DataTable
      columns={columns}
      data={usuarios}
      searchKey="nome"
    />
  )
}
```

## Personalização de Estilos

O componente usa classes Tailwind CSS e pode ser personalizado:

```tsx
// Exemplo: tabela compacta
<div className="text-sm">
  <DataTable
    columns={columns}
    data={data}
    pageSize={20}
  />
</div>
```

## Acessibilidade

- ✅ Navegação por teclado
- ✅ Screen readers compatível
- ✅ ARIA labels apropriados
- ✅ Contraste adequado
- ✅ Foco visível

## Dependências

- `@tanstack/react-table` - Lógica da tabela
- `lucide-react` - Ícones
- `@/components/ui/*` - Componentes base do shadcn/ui

## Troubleshooting

### Erro: "Cannot read property of undefined"

**Causa:** Dados não carregados ou estrutura incorreta  
**Solução:** Verifique se `data` não é undefined e tem a estrutura esperada

```tsx
// ❌ Incorreto
<DataTable columns={columns} data={undefined} />

// ✅ Correto
<DataTable columns={columns} data={data || []} />
```

### Busca não funciona

**Causa:** `searchKey` não corresponde a uma coluna existente  
**Solução:** Verifique se o `searchKey` corresponde ao `accessorKey` de uma coluna

```tsx
// ❌ Incorreto
<DataTable searchKey="nomeCompleto" /> // coluna não existe

// ✅ Correto
<DataTable searchKey="nome" /> // coluna existe
```

### Performance lenta com muitos dados

**Solução:** Use paginação menor e considere virtualização para +1000 itens

```tsx
<DataTable
  pageSize={5} // reduzir itens por página
  data={data}
/>
```

## Roadmap

- [ ] Filtros avançados por coluna
- [ ] Exportação para CSV/Excel
- [ ] Seleção múltipla com ações em lote
- [ ] Virtualização para grandes datasets
- [ ] Drag & drop para reordenar colunas