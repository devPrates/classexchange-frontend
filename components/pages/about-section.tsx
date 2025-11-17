'use client'

import { useEffect, useRef, useState } from 'react'
import { Users, Clock, Shield } from 'lucide-react'
import { BlueprintCard } from '../elements/blueprint-card'


export function AboutSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const stats = [
    { icon: Users, value: '100+', label: 'Professores Ativos', id: 'USR' },
    { icon: Clock, value: '500+', label: 'Trocas Realizadas', id: 'TRC' },
    { icon: Shield, value: '100%', label: 'Seguro e Confiável', id: 'SEC' },
  ]

  return (
    <section id="about" ref={sectionRef} className="min-h-screen py-20 md:py-32 relative flex items-center">
      <div className="section-divider bottom-0" />
      
      <div className="container mx-auto px-4">
        <div className={`max-w-6xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="mb-16 text-center">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px flex-1 bg-linear-to-r from-transparent via-primary/40 to-primary/40" />
              <span className="tech-label">Seção 02 — Sobre</span>
              <div className="h-px flex-1 bg-linear-to-l from-transparent via-primary/40 to-primary/40" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold font-mono mb-6">
              Facilitando a Vida dos{' '}
              <span className="text-primary">Educadores</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed mx-auto text-center">
              Plataforma técnica que conecta professores, simplifica gestão de horários e garante continuidade educacional.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {stats.map((stat, index) => (
              <BlueprintCard
                key={index}
                className={`p-6 transition-all duration-700 hover:shadow-lg hover:border-primary/50 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                data-delay={`${index * 150}`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="relative w-12 h-12 border border-primary/40 bg-primary/5 flex items-center justify-center">
                    <stat.icon className="w-6 h-6 text-primary relative z-10" />
                    <div className="absolute top-0 left-0 w-2 h-2 border-l border-t border-primary/60" />
                    <div className="absolute bottom-0 right-0 w-2 h-2 border-r border-b border-primary/60" />
                  </div>
                  <span className="tech-label">{stat.id}</span>
                </div>
                <div className="text-3xl font-bold font-mono mb-2 text-primary">{stat.value}</div>
                <div className="text-sm text-muted-foreground uppercase tracking-wide">{stat.label}</div>
              </BlueprintCard>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <BlueprintCard className="p-8">
              <span className="tech-label mb-4 block">Missão — v1.0</span>
              <h3 className="text-2xl font-bold font-mono mb-4">
                Nossa Missão
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Criar uma comunidade colaborativa onde professores possam trocar experiências, organizar horários de forma eficiente e garantir continuidade no aprendizado dos alunos.
              </p>
              <div className="pt-4 border-t border-dashed border-primary/20">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="tech-label block mb-1">Satisfação</span>
                    <span className="font-mono text-2xl text-primary">98%</span>
                  </div>
                  <div>
                    <span className="tech-label block mb-1">Disponibilidade</span>
                    <span className="font-mono text-2xl text-primary">24/7</span>
                  </div>
                </div>
              </div>
            </BlueprintCard>

            <BlueprintCard className="p-8">
              <span className="tech-label mb-4 block">Métricas — Sistema</span>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Tempo de Resposta', value: '5min' },
                  { label: 'Escolas Parceiras', value: '500+' },
                  { label: 'Taxa de Sucesso', value: '99%' },
                  { label: 'Suporte Ativo', value: '24h' }
                ].map((metric, i) => (
                  <div key={i} className="border border-primary/30 p-4 relative bg-background/50">
                    <div className="absolute top-0 left-0 w-1.5 h-1.5 border-l border-t border-primary/50" />
                    <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-r border-b border-primary/50" />
                    <div className="text-2xl font-bold font-mono text-primary mb-1">{metric.value}</div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wide">{metric.label}</div>
                  </div>
                ))}
              </div>
            </BlueprintCard>
          </div>
        </div>
      </div>
    </section>
  )
}
