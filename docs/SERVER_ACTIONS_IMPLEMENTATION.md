# Implementação de Server Actions para Variáveis de Ambiente

## Problema Identificado

O projeto estava tentando acessar a variável de ambiente `API_BASE_URL` no lado do cliente através de `process.env.API_BASE_URL`, mas no Next.js, variáveis de ambiente sem o prefixo `NEXT_PUBLIC_` só estão disponíveis no lado do servidor.

## Solução Implementada

### 1. Server Actions

Criamos o arquivo `services/server-api.ts` com funções que executam exclusivamente no servidor:

```typescript
"use server";

import axios from "axios";
import type { Campus } from "@/types/Campus";

const serverApi = axios.create({
  baseURL: process.env.API_BASE_URL, // Acessível apenas no servidor
  headers: { "Content-Type": "application/json" },
});

export async function fetchCampusServer(): Promise<Campus[]> {
  // Implementação da função
}
```

### 2. Hooks Atualizados

Modificamos `hooks/use-campus.ts` para usar as Server Actions:

```typescript
import { fetchCampusServer, createCampusServer, updateCampusServer, deleteCampusServer } from "@/services/server-api";

export const useCampusQuery = () => {
  return useQuery({
    queryKey: ["campus"],
    queryFn: fetchCampusServer, // Agora usa Server Action
    staleTime: 1000 * 60 * 5,
  });
};
```

## Vantagens da Solução

1. **Segurança**: Variáveis de ambiente sensíveis ficam apenas no servidor
2. **Performance**: Reduz o bundle do cliente
3. **Flexibilidade**: Permite lógica complexa no servidor
4. **Compatibilidade**: Funciona perfeitamente com TanStack Query

## Arquivos Modificados

- ✅ `services/server-api.ts` - Criado com Server Actions
- ✅ `hooks/use-campus.ts` - Atualizado para usar Server Actions
- ✅ `.env.example` - Documentação das variáveis necessárias

## Configuração Necessária

Certifique-se de que o arquivo `.env.local` contém:

```env
API_BASE_URL=http://localhost:8080/api
```

## Padrão para Futuras Implementações

Para outras entidades, siga o mesmo padrão:

1. Crie funções server-side em `services/server-api.ts`
2. Use a diretiva `"use server"` no topo do arquivo
3. Configure axios com `process.env.API_BASE_URL`
4. Atualize os hooks para usar as Server Actions
5. Mantenha a compatibilidade com TanStack Query

## Troubleshooting

### Erro: "process.env.API_BASE_URL is undefined"
- Verifique se a variável está definida em `.env.local`
- Reinicie o servidor de desenvolvimento após alterar variáveis de ambiente

### Erro: "useQuery is not a function"
- Certifique-se de que o QueryClient está configurado corretamente em `lib/providers.tsx`

### Erro de CORS
- Configure o backend para aceitar requisições do frontend
- Verifique se a `API_BASE_URL` está correta

---

**Data de criação:** Janeiro 2025  
**Última atualização:** Janeiro 2025  
**Responsável:** Implementação de Server Actions para ClassExchange