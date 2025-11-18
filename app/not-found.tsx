'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { CornerAccent } from '@/components/elements/corner-accent'
import { ArrowLeft, Home, BookOpen, Coffee } from 'lucide-react'

export default function NotFound() {
  const router = useRouter()

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      <div className="w-full max-w-3xl">
        {/* Main Card */}
        <div className="relative border border-border bg-card p-8 md:p-12">
          <CornerAccent />
          
          <div className="text-center space-y-8">
            {/* Error Code */}
            <div className="space-y-2">
              <div className="tech-label">ERRO DO SISTEMA</div>
              <h1 className="text-9xl md:text-[12rem] font-bold text-primary/20 leading-none">
                404
              </h1>
            </div>

            {/* Illustration Area */}
            <div className="relative py-8">
              <div className="flex items-center justify-center gap-4 text-6xl">
                <div className="animate-bounce" style={{ animationDelay: '0s' }}>
                  📚
                </div>
                <div className="text-4xl text-muted-foreground">→</div>
                <div className="animate-bounce" style={{ animationDelay: '0.2s' }}>
                  🤔
                </div>
                <div className="text-4xl text-muted-foreground">→</div>
                <div className="animate-bounce" style={{ animationDelay: '0.4s' }}>
                  ❓
                </div>
              </div>
              
              {/* Decorative lines */}
              <div className="absolute left-1/2 top-0 -translate-x-1/2 w-px h-8 bg-linear-to-b from-transparent to-border" />
              <div className="absolute left-1/2 bottom-0 -translate-x-1/2 w-px h-8 bg-linear-to-t from-transparent to-border" />
            </div>

            {/* Message */}
            <div className="space-y-4 max-w-lg mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold">
                Aula Não Encontrada
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Parece que esta página faltou à aula hoje. Até os melhores professores às vezes 
                precisam de uma substituição. Mas não se preocupe, temos outras opções disponíveis!
              </p>
              
              {/* Fun Facts */}
              <div className="relative border border-dashed border-primary/30 bg-primary/5 p-4 mt-6">
                <div className="flex items-start gap-3">
                  <Coffee className="w-5 h-5 text-primary mt-1 shrink-0" />
                  <p className="text-sm text-left">
                    <span className="font-semibold text-primary">Curiosidade:</span>{' '}
                    Enquanto você estava procurando esta página, aproximadamente 
                    42 professores já trocaram suas aulas em algum lugar do mundo.
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
              <Button
                onClick={() => router.back()}
                variant="outline"
                className="relative group hover:border-primary/50 transition-all"
              >
                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar
              </Button>
              
              <Link href="/">
                <Button className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground relative overflow-hidden group">
                  <span className="relative z-10 flex items-center">
                    <Home className="w-4 h-4 mr-2" />
                    Página Inicial
                  </span>
                  <div className="absolute inset-0 bg-accent opacity-0 group-hover:opacity-20 transition-opacity" />
                </Button>
              </Link>

              <Link href="/dashboard">
                <Button
                  variant="outline"
                  className="w-full sm:w-auto relative group hover:border-primary/50 transition-all"
                >
                  <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <BookOpen className="w-4 h-4 mr-2" />
                  Dashboard
                </Button>
              </Link>
            </div>

            {/* Divider */}
            <div className="blueprint-divider my-8" />

            {/* Additional Help */}
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Precisa de ajuda? Entre em contato com o suporte técnico
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-xs font-mono text-muted-foreground/60">
                <span>suporte@sistematroca.edu.br</span>
                <span className="hidden sm:inline">|</span>
                <span>ERR_404_PAGE_NOT_FOUND</span>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Annotations */}
        <div className="mt-4 flex justify-between text-xs font-mono text-muted-foreground/60">
          <span>ERROR_404</span>
          <span>NOT_FOUND</span>
        </div>
      </div>
    </div>
  )
}
