'use client'

import { useEffect, useRef, useState } from 'react'
import { Calendar, MessageSquare, Bell, CheckCircle2, Search, BarChart3, Monitor, Smartphone, TabletSmartphone } from 'lucide-react'
import { BlueprintCard } from '../elements/blueprint-card'
import { Safari } from '@/components/ui/safari'
import { Iphone } from '@/components/ui/iphone'
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
    <section id="features" ref={sectionRef} className="min-h-screen py-20 md:py-32 relative flex items-center">
      <div className="section-divider bottom-0" />

      <div className="container mx-auto px-4">
        <div className={`max-w-6xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="mb-16 text-center">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px flex-1 bg-linear-to-r from-transparent via-primary/40 to-primary/40" />
              <span className="tech-label">Seção 03 — Funcionalidades</span>
              <div className="h-px flex-1 bg-linear-to-l from-transparent via-primary/40 to-primary/40" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold font-mono mb-6">
              Funcionalidades{' '}
              <span className="text-primary">Poderosas</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed mx-auto text-center">
              Sistema completo para gerenciar trocas e substituições de forma eficiente e profissional.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {features.map((feature, index) => (
              <BlueprintCard
                key={index}
                className={`p-6 transition-all duration-500 hover:shadow-lg hover:border-primary/50 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                data-delay={`${index * 150}`}
                overlayImageSrc={`/people-${String(index + 1).padStart(2, '0')}.svg`}
                overlayClassName="absolute bottom-0 right-0 w-1/3 opacity-90 pointer-events-none select-none"
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

          <BlueprintCard className="p-8 md:p-12 relative overflow-hidden">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px flex-1 bg-linear-to-r from-transparent via-primary/40 to-primary/40" />
              <span className="tech-label">Multiplataforma — Sistema</span>
              <div className="h-px flex-1 bg-linear-to-l from-transparent via-primary/40 to-primary/40" />
            </div>
            <div className="mt-4 mb-10 grid grid-cols-3 gap-4 max-w-md mx-auto">
              {[
                { icon: Monitor, label: 'Desktop', desc: 'Windows, Mac, Linux' },
                { icon: TabletSmartphone, label: 'Tablet', desc: 'iPad, Android' },
                { icon: Smartphone, label: 'Mobile', desc: 'iOS, Android' },
              ].map((platform, i) => (
                <div
                  key={i}
                  className={`text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                  style={{ transitionDelay: `${(i + 2) * 150}ms` }}
                >
                  <div className="w-12 h-12 mx-auto mb-2 border border-primary/30 bg-primary/5 flex items-center justify-center relative">
                    <platform.icon className="w-6 h-6 text-primary" />
                    <div className="absolute top-0 left-0 w-1.5 h-1.5 border-l border-t border-primary/50" />
                    <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-r border-b border-primary/50" />
                  </div>
                  <div className="font-mono text-sm font-bold mb-1">{platform.label}</div>
                  <div className="tech-label text-xs">{platform.desc}</div>
                </div>
              ))}
            </div>

            <div className={`flex flex-col md:flex-row items-center justify-center gap-10 md:gap-12 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'} transition-all duration-700`}>
              <div className="max-w-[640px] mx-auto md:flex-1">
                <Safari url="magicui.design" videoSrc="https://videos.pexels.com/video-files/27180348/12091515_2560_1440_50fps.mp4" />
              </div>
              <div className="max-w-[200px] mx-auto md:flex-1">
                <Iphone videoSrc="https://videos.pexels.com/video-files/8946986/8946986-uhd_1440_2732_25fps.mp4" />
              </div>
            </div>
          </BlueprintCard>

        </div>
      </div>
    </section>
  )
}
