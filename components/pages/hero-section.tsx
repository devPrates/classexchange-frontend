'use client'

import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import { BlueprintCard } from '../elements/blueprint-card'

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="section-divider bottom-0" />
      <div className="container mx-auto px-4 py-12 md:py-20 relative z-10">
        <div className={`max-w-5xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Technical label at top */}
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px flex-1 bg-linear-to-r from-transparent via-primary/40 to-primary/40" />
            <span className="tech-label">v1.0 — Sistema ClassExchange</span>
            <div className="h-px flex-1 bg-linear-to-l from-transparent via-primary/40 to-primary/40" />
          </div>
          
          <BlueprintCard className="bg-hero p-8 md:p-12 mb-8">
            <div className="text-center">
              <div className="inline-block mb-6 relative">
                <div className="absolute -inset-4 border border-dashed border-primary/20" />
                <h1 className="text-5xl md:text-7xl font-bold text-balance relative z-10 font-mono leading-tight">
                  Troca e Substituição<br />
                  <span className="text-primary">de Aulas</span>
                </h1>
              </div>
              
              <div className="max-w-2xl mx-auto mb-10 relative">
                <div className="absolute -left-8 top-1/2 -translate-y-1/2 w-6 h-px bg-primary/40 hidden md:block" />
                <div className="absolute -right-8 top-1/2 -translate-y-1/2 w-6 h-px bg-primary/40 hidden md:block" />
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                  Plataforma técnica para professores organizarem trocas de horários, encontrarem substitutos e manterem a educação em dia.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button size="lg" variant="outline" className="font-mono text-sm px-8 relative">
                  <span className="relative z-10">Ver Demonstração</span>
                  <div className="absolute top-0 left-0 w-2 h-2 border-l border-t border-primary/40" />
                  <div className="absolute top-0 right-0 w-2 h-2 border-r border-t border-primary/40" />
                  <div className="absolute bottom-0 left-0 w-2 h-2 border-l border-b border-primary/40" />
                  <div className="absolute bottom-0 right-0 w-2 h-2 border-r border-b border-primary/40" />
                </Button>
              </div>
            </div>
          </BlueprintCard>

          {/* Technical specs grid */}
          <div className="grid grid-cols-3 gap-px bg-primary/20 border border-primary/30">
            {[
              { label: 'Usuários', value: '10K+' },
              { label: 'Trocas', value: '50K+' },
              { label: 'Uptime', value: '99.9%' }
            ].map((stat, i) => (
              <div key={i} className="bg-hero bg-background/90 backdrop-blur-sm p-4 text-center relative">
                <div className="absolute top-0 left-0 w-1.5 h-1.5 border-l border-t border-primary/40" />
                <div className="absolute top-0 right-0 w-1.5 h-1.5 border-r border-t border-primary/40" />
                <div className="font-mono text-xs text-muted-foreground mb-1 uppercase tracking-wider">{stat.label}</div>
                <div className="font-mono text-lg md:text-2xl font-bold text-primary">{stat.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Technical corner markers */}
      <div className="absolute top-24 left-8 w-12 h-12 border-l-2 border-t-2 border-primary/20" />
      <div className="absolute top-24 right-8 w-12 h-12 border-r-2 border-t-2 border-primary/20" />
      <div className="absolute bottom-8 left-8 w-12 h-12 border-l-2 border-b-2 border-primary/20" />
      <div className="absolute bottom-8 right-8 w-12 h-12 border-r-2 border-b-2 border-primary/20" />
    </section>
  )
}
