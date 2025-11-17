'use client'

import { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Mail, Phone, MapPin } from 'lucide-react'
import { BlueprintCard } from '../elements/blueprint-card'

export function ContactSection() {
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

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'contato@trocaaulas.com.br',
      link: 'mailto:contato@trocaaulas.com.br',
      code: 'EML'
    },
    {
      icon: Phone,
      title: 'Telefone',
      value: '+55 (11) 9999-9999',
      link: 'tel:+5511999999999',
      code: 'TEL'
    },
    {
      icon: MapPin,
      title: 'Endereço',
      value: 'São Paulo, SP - Brasil',
      link: '#',
      code: 'LOC'
    },
  ]

  return (
    <section id="contact" ref={sectionRef} className="py-20 md:py-32 relative">
      <div className="absolute top-0 left-0 right-0 blueprint-divider" />
      
      <div className="container mx-auto px-4">
        <div className={`max-w-6xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-6">
              <span className="tech-label">Seção 04 — Contato</span>
              <div className="h-px flex-1 bg-linear-to-r from-primary/40 to-transparent" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold font-mono mb-6">
              Entre em{' '}
              <span className="text-primary">Contato</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed">
              Sistema de suporte técnico disponível para auxiliar você.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className={`space-y-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <BlueprintCard
                    key={index}
                    className="p-6 hover:border-primary/50 transition-all group cursor-pointer"
                  >
                    <a href={info.link} className="flex items-start gap-4">
                      <div className="relative shrink-0 w-12 h-12 border border-primary/40 bg-primary/5 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                        <info.icon className="w-5 h-5 text-primary relative z-10" />
                        <div className="absolute top-0 left-0 w-2 h-2 border-l border-t border-primary/60" />
                        <div className="absolute bottom-0 right-0 w-2 h-2 border-r border-b border-primary/60" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-mono font-semibold text-sm">{info.title}</span>
                          <span className="tech-label">{info.code}</span>
                        </div>
                        <div className="text-sm text-muted-foreground">{info.value}</div>
                      </div>
                    </a>
                  </BlueprintCard>
                ))}
              </div>

              <BlueprintCard className="p-6 bg-primary/5">
                <span className="tech-label mb-3 block">Horário de Suporte</span>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between font-mono">
                    <span className="text-muted-foreground">Seg - Sex:</span>
                    <span className="text-foreground">08:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between font-mono">
                    <span className="text-muted-foreground">Sábados:</span>
                    <span className="text-foreground">09:00 - 13:00</span>
                  </div>
                  <div className="flex justify-between font-mono">
                    <span className="text-muted-foreground">Dom / Fer:</span>
                    <span className="text-destructive">Fechado</span>
                  </div>
                </div>
              </BlueprintCard>
            </div>

            <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              <BlueprintCard className="p-8">
                <span className="tech-label mb-6 block">Formulário de Contato</span>
                <form className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2">
                      Nome Completo
                    </label>
                    <Input
                      id="name"
                      placeholder="Seu nome"
                      className="font-mono text-sm border-primary/30 focus:border-primary"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2">
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      className="font-mono text-sm border-primary/30 focus:border-primary"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2">
                      Telefone
                    </label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="(11) 99999-9999"
                      className="font-mono text-sm border-primary/30 focus:border-primary"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2">
                      Mensagem
                    </label>
                    <Textarea
                      id="message"
                      placeholder="Como podemos ajudar você?"
                      className="font-mono text-sm min-h-32 border-primary/30 focus:border-primary"
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full font-mono text-sm relative group">
                    <span className="relative z-10">Enviar Mensagem</span>
                    <div className="absolute inset-0 border border-primary-foreground/20 group-hover:border-primary-foreground/40 transition-colors" />
                  </Button>
                </form>
              </BlueprintCard>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
