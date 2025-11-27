"use client"

import { useEffect, useRef, useState } from "react"
import { Monitor, Smartphone, TabletSmartphone } from "lucide-react"
import { BlueprintCard } from "../elements/blueprint-card"


export function MultiplatformSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-20 md:py-32 relative">
      <div className="absolute top-0 left-0 right-0 blueprint-divider" />

      <div className="container mx-auto px-4">
        <div
          className={`max-w-6xl mx-auto transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          {/* Header */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px w-20 bg-linear-to-r from-transparent to-primary/40" />
              <span className="tech-label">Seção 03 — Multiplataforma</span>
              <div className="h-px w-20 bg-linear-to-l from-transparent to-primary/40" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold font-mono mb-6">
              Acesse de <span className="text-primary">Qualquer Lugar</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Design responsivo e otimizado para funcionar perfeitamente em todas as suas dispositivos.
            </p>
          </div>

          {/* Main card with device mockups */}
          <BlueprintCard className="p-8 md:p-12 relative overflow-hidden">
            <div className="relative z-10">
              {/* Desktop and Mobile mockups container */}
              <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12">
                {/* Desktop mockup */}
                <div
                  className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}
                >
                  <div className="relative">
                    {/* Monitor frame */}
                    <div className="relative w-full max-w-[500px] border-2 border-primary/40 bg-background/50 rounded-lg overflow-hidden">
                      {/* Screen header */}
                      <div className="bg-primary/10 border-b border-primary/30 px-4 py-2 flex items-center gap-2">
                        <div className="flex gap-1.5">
                          <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                          <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                        </div>
                        <span className="tech-label text-xs ml-2">DESKTOP v1.0</span>
                      </div>

                      {/* Screen content */}
                      <div className="aspect-video bg-linear-to-br from-primary/5 to-primary/20 p-6">
                        <div className="space-y-3">
                          {/* Mock dashboard header */}
                          <div className="border border-primary/30 bg-background/80 p-3 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 border border-primary/40 bg-primary/10" />
                              <div className="space-y-1">
                                <div className="h-2 w-24 bg-primary/30" />
                                <div className="h-1.5 w-16 bg-primary/20" />
                              </div>
                            </div>
                            <Monitor className="w-4 h-4 text-primary/60" />
                          </div>

                          {/* Mock content grid */}
                          <div className="grid grid-cols-3 gap-2">
                            {[...Array(6)].map((_, i) => (
                              <div key={i} className="aspect-square border border-primary/20 bg-background/60 p-2">
                                <div className="w-full h-2 bg-primary/20 mb-2" />
                                <div className="w-3/4 h-1.5 bg-primary/10" />
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Monitor stand */}
                    <div className="mx-auto w-32 h-4 bg-primary/20 border-x-2 border-primary/30 relative">
                      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-40 h-2 bg-primary/20 border-2 border-primary/30" />
                    </div>
                  </div>
                </div>

                {/* Mobile mockup */}
                <div
                  className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}
                  style={{ transitionDelay: "200ms" }}
                >
                  <div className="relative">
                    {/* Phone frame */}
                    <div className="relative w-[200px] border-[6px] border-primary/40 bg-background/50 rounded-4xl overflow-hidden">
                      {/* Notch */}
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-5 bg-primary/40 rounded-b-2xl z-20" />

                      {/* Screen content */}
                      <div className="aspect-9/19 bg-linear-to-br from-primary/5 to-primary/20 p-4">
                        <div className="pt-6 space-y-3">
                          {/* Mock mobile header */}
                          <div className="border border-primary/30 bg-background/80 p-2 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 border border-primary/40 bg-primary/10" />
                              <div className="space-y-1">
                                <div className="h-1.5 w-16 bg-primary/30" />
                                <div className="h-1 w-10 bg-primary/20" />
                              </div>
                            </div>
                            <Smartphone className="w-3 h-3 text-primary/60" />
                          </div>

                          {/* Mock mobile content */}
                          <div className="space-y-2">
                            {[...Array(4)].map((_, i) => (
                              <div key={i} className="border border-primary/20 bg-background/60 p-2">
                                <div className="flex items-center gap-2 mb-1">
                                  <div className="w-4 h-4 border border-primary/30 bg-primary/10" />
                                  <div className="h-1.5 w-20 bg-primary/20" />
                                </div>
                                <div className="h-1 w-full bg-primary/10" />
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Platform icons */}
              <div className="mt-12 grid grid-cols-3 gap-4 max-w-md mx-auto">
                {[
                  { icon: Monitor, label: "Desktop", desc: "Windows, Mac, Linux" },
                  { icon: TabletSmartphone, label: "Tablet", desc: "iPad, Android" },
                  { icon: Smartphone, label: "Mobile", desc: "iOS, Android" },
                ].map((platform, i) => (
                  <div
                    key={i}
                    className={`text-center transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
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
            </div>

            {/* Background technical elements */}
            <div className="absolute top-4 right-4 w-24 h-24 border border-dashed border-primary/10" />
            <div className="absolute bottom-4 left-4 w-32 h-32 border border-dashed border-primary/10" />
          </BlueprintCard>
        </div>
      </div>
    </section>
  )
}
