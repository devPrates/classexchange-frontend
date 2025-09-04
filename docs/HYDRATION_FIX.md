# Correção do Erro de Hidratação - Next.js + next-themes

## Problema
Erro de hidratação do React ocorrendo devido a diferenças entre o HTML renderizado no servidor e o gerado no cliente:

```
A tree hydrated but some attributes of the server rendered HTML didn't match the client properties.
```

## Causa
O erro estava sendo causado pelo componente `ThemeToggleButton` que usa `next-themes`. Durante a renderização no servidor, o tema ainda não está disponível, causando diferenças na renderização entre servidor e cliente.

## Solução Implementada

### 1. Configuração do ThemeProvider
Adicionada a propriedade `disableTransitionOnChange` no `ThemeProvider` em `app/layout.tsx`:

```tsx
<ThemeProvider
  attribute="class"
  defaultTheme="system"
  enableSystem
  disableTransitionOnChange  // ← Adicionado
>
```

### 2. Estado de Montagem no ThemeToggleButton
Implementado padrão de "mounted state" no `ThemeToggleButton`:

```tsx
const [mounted, setMounted] = React.useState(false)

React.useEffect(() => {
  setMounted(true)
}, [])

if (!mounted) {
  return (
    <Button variant="ghost" size="icon" className="w-9 p-0 h-9 relative group" disabled>
      <SunIcon className="size-[1.2rem]" />
      <span className="sr-only">Theme Toggle</span>
    </Button>
  )
}
```

## Como Funciona
1. **Servidor**: Renderiza o placeholder (botão desabilitado com ícone do sol)
2. **Cliente**: Após a hidratação, `mounted` se torna `true` e o componente completo é renderizado
3. **Resultado**: Não há diferenças entre servidor e cliente durante a hidratação

## Arquivos Modificados
- `app/layout.tsx` - Adicionado `disableTransitionOnChange`
- `components/theme/theme-toggle-button.tsx` - Implementado mounted state

## Referências
- [Next.js Hydration Errors](https://nextjs.org/docs/messages/react-hydration-error)
- [next-themes Documentation](https://github.com/pacocoursey/next-themes#avoid-hydration-mismatch)