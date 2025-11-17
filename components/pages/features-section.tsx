'use client'

import { useEffect, useRef, useState } from 'react'
import { Calendar, MessageSquare, Bell, CheckCircle2, Search, BarChart3 } from 'lucide-react'
import { BlueprintCard } from '../elements/blueprint-card'

export function FeaturesSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const features = [
    {
      icon: Calendar,
      title: 'Calendário Integrado',
      description: 'Visualize horários em um único lugar. Arraste e solte para reorganizar.',
      code: 'CAL'
    },
    {
      icon: Search,
      title: 'Busca Inteligente',
      description: 'Encontre substitutos por matéria, horário e localização.',
      code: 'SRC'
    },
    {
      icon: MessageSquare,
      title: 'Chat em Tempo Real',
      description: 'Comunique-se diretamente para coordenar trocas rapidamente.',
      code: 'MSG'
    },
    {
      icon: Bell,
      title: 'Notificações Automáticas',
      description: 'Alertas sobre solicitações, confirmações e lembretes.',
      code: 'NTF'
    },
    {
      icon: CheckCircle2,
      title: 'Aprovação Rápida',
      description: 'Sistema simplificado que notifica e mantém registro completo.',
      code: 'APR'
    },
    {
      icon: BarChart3,
      title: 'Relatórios Detalhados',
      description: 'Estatísticas de trocas e relatórios para administração.',
      code: 'RPT'
    },
  ]

  return (
    <section id="features" ref={sectionRef} className="py-20 md:py-32 relative">
      <div className="absolute top-0 left-0 right-0 blueprint-divider" />
      
      <div className="container mx-auto px-4">
        <div className={`max-w-6xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px flex-1 bg-linear-to-r from-transparent via-primary/40 to-primary/40" />
              <span className="tech-label">Seção 03 — Funcionalidades</span>
              <div className="h-px flex-1 bg-linear-to-l from-transparent via-primary/40 to-primary/40" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold font-mono mb-6">
              Funcionalidades{' '}
              <span className="text-primary">Poderosas</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed">
              Sistema completo para gerenciar trocas e substituições de forma eficiente e profissional.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {features.map((feature, index) => (
              <BlueprintCard
                key={index}
                className={`p-6 transition-all duration-500 hover:shadow-lg hover:border-primary/50 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                data-delay={`${index * 150}`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="relative w-12 h-12 border border-primary/40 bg-primary/5 flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-primary relative z-10" />
                    <div className="absolute top-0 left-0 w-2 h-2 border-l border-t border-primary/60" />
                    <div className="absolute bottom-0 right-0 w-2 h-2 border-r border-b border-primary/60" />
                  </div>
                  <span className="tech-label">{feature.code}</span>
                </div>
                <h3 className="text-lg font-bold font-mono mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </BlueprintCard>
            ))}
          </div>

          <BlueprintCard className="p-8 md:p-12 text-center bg-primary/5">
            <span className="tech-label mb-6 block">CTA — Call to Action</span>
            <h3 className="text-3xl md:text-4xl font-bold font-mono mb-4">
              Pronto para Simplificar sua Rotina?
            </h3>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              Milhares de professores já economizam tempo e reduzem estresse com nossa plataforma técnica.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="relative bg-primary text-primary-foreground px-8 py-4 font-mono text-sm font-semibold transition-all hover:shadow-lg group">
                <span className="relative z-10">Comece Grátis por 30 Dias</span>
                <div className="absolute inset-0 border border-primary-foreground/20 group-hover:border-primary-foreground/40 transition-colors" />
              </button>
              <button className="relative border border-primary/40 bg-background px-8 py-4 font-mono text-sm font-semibold hover:border-primary/60 transition-colors">
                <span className="relative z-10">Falar com Vendas</span>
                <div className="absolute top-0 left-0 w-2 h-2 border-l border-t border-primary/40" />
                <div className="absolute top-0 right-0 w-2 h-2 border-r border-t border-primary/40" />
                <div className="absolute bottom-0 left-0 w-2 h-2 border-l border-b border-primary/40" />
                <div className="absolute bottom-0 right-0 w-2 h-2 border-r border-b border-primary/40" />
              </button>
            </div>
          </BlueprintCard>
        </div>
      </div>
    </section>
  )
}
