## 1. Objetivo do Projeto
O **ClassExchange** é um sistema frontend em **Next.js 15 + TypeScript** para gerenciar troca e substituição de aulas no IFMS.  
Ele consumirá uma API backend utilizando **TanStack Query** para busca e cache de dados, com formulários validados via **react-hook-form** e **zod**.

## 2. Tecnologias e Bibliotecas
- **Next.js 15 (App Router)**
- **TypeScript**
- **Tailwind CSS** + **shadcn/ui**
- **lucide-react** (ícones)
- **class-variance-authority** + **tailwind-variants** (estilização tipada)
- **next-themes** (tema dark/light)
- **axios** (requisições HTTP)
- **TanStack Query** (cache e gerenciamento de dados)
- **react-hook-form** + **zod** + **@hookform/resolvers** (validação de formulários)
- **zustand** (estado global)
- **toast/shadcn** (notificações)
- **postcss** + **autoprefixer** (necessários para Tailwind)

## 3. Pastas Principais
- **`app/`** → Páginas e layouts, separando rotas públicas (landing/login) e privadas (dashboard e CRUDs).
- **`components/`** → Componentes reutilizáveis, incluindo os do shadcn e componentes compartilhados.
- **`hooks/`** → Hooks customizados.
- **`services/`** → Comunicação com a API e arquivo `database.ts` para dados mockados.
- **`store/`** → Estado global usando zustand.
- **`lib/`** → Funções auxiliares e utilitários.
- **`types/`** → Tipos TypeScript globais.

## 4. Padrões de Código
- **Linguagem:** TypeScript com strict mode ativado.
- **Case:** `kebab-case` para arquivos e pastas, `camelCase` para funções e variáveis.
- **Estilo:** Tailwind CSS com `class-variance-authority` e `tailwind-variants` para variantes.
- **Importações:** Absolutas a partir de `src/` usando `@/` como alias.
- **Formulários:** Sempre `react-hook-form` + `zod` para validação.
- **Data Fetching:** Exclusivamente via TanStack Query.
- **Estado Global:** Apenas para dados que precisam ser compartilhados entre múltiplos componentes, usando **zustand**.

## 5. Regras de UI
- **Layout:** Dashboard com sidebar fixa + navbar superior.
- **Tema:** Alternância dark/light (`next-themes`).
- **Responsividade:** Mobile-first, adaptando para desktop.
- **Acessibilidade:** Seguir padrões WAI-ARIA.
- **Feedbacks:** Sempre mostrar `toast` em operações CRUD.

## 6. Fluxo de Consumo de API
1. Criar instância do **axios** com base na variável de ambiente da API (`API_BASE_URL`).
2. Cada endpoint terá um hook específico usando **TanStack Query**.
3. Mutations devem invalidar queries relevantes.
4. Dados compartilhados globalmente vão para **zustand**.

## 7. Funcionalidades
- **Landing Page:** one-page scroll com navbar, hero, brand carousel, sobre, funcionalidades, CTA e footer.  
- **Login:** email/senha; nota informando que senha é criada pela coordenação.  
- **Dashboard:** estatísticas, notificações, perfil e CRUDs para todas as entidades.
- **CRUD Pages:** cada entidade com listagem paginada + filtros + busca + formulários de criação/edição.

## 8. Regras de CRUD
- **Rota de criação:** `/entidade/novo`
- **Rota de edição:** `/entidade/editar/:id`
- **Formulários:** sempre validados com zod e `react-hook-form`.
- **Paginação/Filtros:** controlados pelo TanStack Query.
- **Feedback:** toast para sucesso e erro.

## 9. Mock de Dados
- Criar `src/services/database.ts` com arrays e objetos simulando os dados vindos da API.
- Esses mocks serão usados até que a API esteja disponível.

## 10. Variáveis de Ambiente
- **Nomear todas as variáveis em UPPER_CASE** no `.env.local`.
- Alterações em variáveis de ambiente devem ser aprovadas previamente.
- Exemplo mínimo: API_BASE_URL=http://localhost:3000

## 11. Documentação
- **Pasta `docs/`**: Centraliza toda a documentação técnica do frontend.
- **README.md principal**: Visão geral do projeto, setup e informações essenciais.
- **docs/README.md**: Índice da documentação com links para todos os guias.
- **Guias obrigatórios**:
  - `development-guide.md`: Setup, workflow e troubleshooting
  - `coding-standards.md`: Padrões de código e convenções
  - `architecture.md`: Arquitetura do sistema e fluxos
  - `components-guide.md`: Criação e organização de componentes
  - `api-integration.md`: Integração com APIs e TanStack Query
  - `state-management.md`: Gerenciamento de estado com Zustand
- **Manutenção**: Documentação deve ser atualizada junto com mudanças no código.
- **Formato**: Todos os arquivos em Markdown com estrutura consistente.
- **Correções**: Documentar soluções de bugs em arquivos específicos (ex: `HYDRATION_FIX.md`).

## 12. Diretivas de Verificação Prévia
- **Antes de criar um novo componente**:
  1. Verificar se o componente já existe em `src/components/ui`.
  2. Caso já exista, reutilizar o componente existente em vez de criar um novo.
- **Antes de instalar uma nova biblioteca**:
  1. Verificar no `package.json` se a dependência já está instalada.
  2. Caso já exista, não instalar novamente.
  3. Se for atualizar, verificar compatibilidade e impactos no projeto antes.

## 13. Regras de Organização de Arquivos
- **Arquivos index.ts**: NÃO utilizar arquivos `index.ts` para exportar componentes.
- **Importações diretas**: Sempre importar componentes diretamente do arquivo onde estão definidos.
- **Exemplo**: Use `import { Component } from './component'` em vez de `import { Component } from './index'`.
- **Justificativa**: Melhora a clareza do código e facilita a navegação entre arquivos no editor.