'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'
import { ThemeToggle } from '../theme-toggle'

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<string>('home')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { label: 'Início', id: 'home' },
    { label: 'Sobre', id: 'about' },
    { label: 'Funcionalidades', id: 'features' },
    { label: 'Contato', id: 'contact' },
  ]

  useEffect(() => {
    const ids = navLinks.map(l => l.id)
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { rootMargin: '-50% 0px -50% 0px' }
    )
    ids.forEach(id => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  const handleNavClick = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    const el = document.getElementById(id)
    if (!el) return
    const navEl = document.querySelector('nav') as HTMLElement | null
    const offset = navEl ? navEl.offsetHeight : 0
    const top = el.getBoundingClientRect().top + window.scrollY - offset
    window.scrollTo({ top, behavior: 'smooth' })
    setActiveSection(id)
    setIsMobileMenuOpen(false)
  }

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
          
          <div className="flex items-center gap-3">
            <div className="relative w-8 h-8 border border-primary/40 bg-primary/5">
              <div className="absolute inset-0.5">
                <Image src="/Icone.svg" alt="ClassExchange" fill style={{ objectFit: 'contain' }} />
              </div>
              <div className="absolute top-0 left-0 w-1.5 h-1.5 border-l border-t border-primary/60" />
              <div className="absolute top-0 right-0 w-1.5 h-1.5 border-r border-t border-primary/60" />
              <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-l border-b border-primary/60" />
              <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-r border-b border-primary/60" />
            </div>
            <Image src="/Titulo.svg" alt="ClassExchange" width={80} height={20} />
          </div>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link, index) => (
              <a
                key={index}
                href="#"
                onClick={handleNavClick(link.id)}
                aria-current={activeSection === link.id ? 'page' : undefined}
                className={`font-mono text-sm tracking-wide uppercase transition-colors ${
                  activeSection === link.id ? 'text-primary' : 'text-foreground/80 hover:text-primary'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Link href="/login">
              <Button variant="outline" className="font-mono text-sm px-8 relative">
                <span className="relative z-10">Entrar</span>
                <div className="absolute top-0 left-0 w-2 h-2 border-l border-t border-primary/40" />
                <div className="absolute top-0 right-0 w-2 h-2 border-r border-t border-primary/40" />
                <div className="absolute bottom-0 left-0 w-2 h-2 border-l border-b border-primary/40" />
                <div className="absolute bottom-0 right-0 w-2 h-2 border-r border-b border-primary/40" />
              </Button>
            </Link>
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
                href="#"
                onClick={handleNavClick(link.id)}
                aria-current={activeSection === link.id ? 'page' : undefined}
                className={`block py-2 font-mono text-sm tracking-wide uppercase transition-colors border-l-2 pl-3 ${
                  activeSection === link.id ? 'text-primary border-primary' : 'text-foreground/80 hover:text-primary border-transparent hover:border-primary'
                }`}
              >
                {link.label}
              </a>
            ))}
            <div className="pt-4 space-y-3 border-t border-dashed border-primary/20">
              <Link href="/login">
                <Button variant="outline" className="w-full font-mono text-sm relative">
                  <span className="relative z-10">Entrar</span>
                  <div className="absolute top-0 left-0 w-2 h-2 border-l border-t border-primary/40" />
                  <div className="absolute top-0 right-0 w-2 h-2 border-r border-t border-primary/40" />
                  <div className="absolute bottom-0 left-0 w-2 h-2 border-l border-b border-primary/40" />
                  <div className="absolute bottom-0 right-0 w-2 h-2 border-r border-b border-primary/40" />
                </Button>
              </Link>
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
