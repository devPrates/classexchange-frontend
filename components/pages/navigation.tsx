'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'
import { ThemeToggle } from '../theme-toggle'

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { label: 'Início', href: '#home' },
    { label: 'Sobre', href: '#about' },
    { label: 'Funcionalidades', href: '#features' },
    { label: 'Contato', href: '#contact' },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/95 backdrop-blur-md border-b border-primary/30'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20 relative">
          {/* Corner accents for nav */}
          <div className="absolute top-0 left-0 w-2 h-2 border-l border-t border-primary/40" />
          <div className="absolute top-0 right-0 w-2 h-2 border-r border-t border-primary/40" />
          
          <div className="flex items-center gap-3">
            <div className="relative w-8 h-8 border border-primary/40 bg-primary/5">
              <div className="absolute inset-0.5 bg-primary/20" />
              <div className="absolute top-0 left-0 w-1.5 h-1.5 border-l border-t border-primary/60" />
              <div className="absolute top-0 right-0 w-1.5 h-1.5 border-r border-t border-primary/60" />
              <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-l border-b border-primary/60" />
              <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-r border-b border-primary/60" />
            </div>
            <span className="text-xl font-mono font-bold tracking-tight">ClassExchange</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="text-foreground/80 hover:text-primary transition-colors font-mono text-sm tracking-wide uppercase"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Button variant="ghost" className="font-mono text-sm">Entrar</Button>
            <ThemeToggle />
          </div>

          <button
            className="md:hidden p-2 relative border border-primary/30 hover:border-primary/50 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-md border-t border-b border-primary/30">
          <div className="container mx-auto px-4 py-6 space-y-4">
            {navLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="block py-2 text-foreground/80 hover:text-primary transition-colors font-mono text-sm tracking-wide uppercase border-l-2 border-transparent hover:border-primary pl-3"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="pt-4 space-y-3 border-t border-dashed border-primary/20">
              <Button variant="ghost" className="w-full font-mono text-sm">
                Entrar
              </Button>
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
