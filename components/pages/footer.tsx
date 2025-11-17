import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    produto: [
      { label: 'Funcionalidades', href: '#features' },
      { label: 'Preços', href: '#pricing' },
      { label: 'Segurança', href: '#security' },
      { label: 'Atualizações', href: '#updates' },
    ],
    empresa: [
      { label: 'Sobre Nós', href: '#about' },
      { label: 'Carreiras', href: '#careers' },
      { label: 'Blog', href: '#blog' },
      { label: 'Imprensa', href: '#press' },
    ],
    recursos: [
      { label: 'Central de Ajuda', href: '#help' },
      { label: 'Documentação', href: '#docs' },
      { label: 'Tutoriais', href: '#tutorials' },
      { label: 'API', href: '#api' },
    ],
    legal: [
      { label: 'Privacidade', href: '#privacy' },
      { label: 'Termos de Uso', href: '#terms' },
      { label: 'Cookies', href: '#cookies' },
      { label: 'Licenças', href: '#licenses' },
    ],
  }

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
  ]

  return (
    <footer className="bg-background border-t border-primary/30 relative">
      <div className="absolute top-0 left-0 right-0 blueprint-divider" />
      
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-8 h-8 border border-primary/40 bg-primary/5">
                <div className="absolute inset-0.5 bg-primary/20" />
                <div className="absolute top-0 left-0 w-1.5 h-1.5 border-l border-t border-primary/60" />
                <div className="absolute top-0 right-0 w-1.5 h-1.5 border-r border-t border-primary/60" />
                <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-l border-b border-primary/60" />
                <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-r border-b border-primary/60" />
              </div>
              <span className="text-xl font-mono font-bold">TrocaAulas</span>
            </div>
            <p className="text-muted-foreground text-xs mb-6 leading-relaxed font-mono">
              Sistema técnico para gestão educacional.
            </p>
            <div className="flex gap-2">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="relative w-10 h-10 border border-primary/30 hover:border-primary/50 hover:bg-primary/5 flex items-center justify-center transition-all group"
                >
                  <social.icon className="w-4 h-4 relative z-10" />
                  <div className="absolute top-0 left-0 w-1.5 h-1.5 border-l border-t border-primary/40 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-r border-b border-primary/40 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-mono font-semibold mb-4 uppercase text-sm tracking-wider">{category}</h3>
              <ul className="space-y-3">
                {links.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors text-xs font-mono inline-flex items-center gap-2 group"
                    >
                      <span className="w-1 h-1 bg-primary/40 group-hover:bg-primary transition-colors" />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-dashed border-primary/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-muted-foreground font-mono text-center md:text-left">
              © {currentYear} TrocaAulas v1.0 — Todos os direitos reservados
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-xs text-muted-foreground font-mono">
              <a href="#privacy" className="hover:text-primary transition-colors inline-flex items-center gap-2">
                <span className="w-1 h-1 bg-primary/40" />
                Privacidade
              </a>
              <a href="#terms" className="hover:text-primary transition-colors inline-flex items-center gap-2">
                <span className="w-1 h-1 bg-primary/40" />
                Termos
              </a>
              <a href="#cookies" className="hover:text-primary transition-colors inline-flex items-center gap-2">
                <span className="w-1 h-1 bg-primary/40" />
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Corner markers */}
      <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-primary/20" />
      <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-primary/20" />
    </footer>
  )
}
