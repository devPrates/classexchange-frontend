"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BlueprintCard } from "@/components/elements/blueprint-card"

export default function ForbiddenPage() {
  return (
    <div className="w-full h-full flex items-center justify-center p-6">
      <BlueprintCard className="max-w-xl w-full p-8 text-center">
        <span className="tech-label mb-4 block">Acesso Negado</span>
        <h1 className="text-2xl md:text-3xl font-bold font-mono mb-3">Você não tem permissão</h1>
        <p className="text-muted-foreground mb-6">
          Sua conta não possui privilégios para acessar esta área do painel.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild>
            <Link href="/dashboard">Voltar ao Dashboard</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/">Ir para a Home</Link>
          </Button>
        </div>
      </BlueprintCard>
    </div>
  )
}

