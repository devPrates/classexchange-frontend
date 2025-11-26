'use client'

import { useEffect, useState } from 'react'
import { CrowdCanvas } from '../ui/skiper-ui/skiper39'


export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section id="home" className="relative min-h-screen overflow-hidden pt-24">
      <div className="container mx-auto px-4 py-0 md:py-0 relative z-10">
        <div className={`max-w-5xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px flex-1 bg-linear-to-r from-transparent via-primary/40 to-primary/40" />
            <span className="tech-label">v1.0 — Sistema ClassExchange</span>
            <div className="h-px flex-1 bg-linear-to-l from-transparent via-primary/40 to-primary/40" />
          </div>

          <div className="mb-6">
            <h1 className="text-5xl md:text-7xl font-bold font-mono leading-tight text-center">
              Troca e Substituição<br />
              <span className="text-primary">de Aulas</span>
            </h1>
          </div>

          <div className="max-w-2xl mx-auto">
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed text-center">
              Plataforma técnica para professores organizarem trocas de horários, encontrarem substitutos e manterem a educação em dia.
            </p>
          </div>
        </div>
      </div>

      <CrowdCanvas src="/all-peeps.png" rows={15} cols={7} />
      <div className="section-divider bottom-0 z-20" />
    </section>
  )
}
