'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Building2, Calendar, Bell, Users, ChevronDown, ChevronsUpDown, ClipboardList } from 'lucide-react'
import { RiBookMarkedLine } from 'react-icons/ri'
import { FaRegAddressBook } from 'react-icons/fa'
import { RiExchangeBoxLine, RiExchange2Line } from 'react-icons/ri'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { useSession } from 'next-auth/react'

interface SidebarProps {
  collapsed: boolean
}

const menuItems = [
  {
    group: 'Usuários',
    items: [
      { icon: FaRegAddressBook, label: 'Servidores', href: '/dashboard/servidores' },
    ],
  },
  {
    group: 'Administração',
    items: [
      { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
      { icon: Building2, label: 'Instituição', href: '/dashboard/instituicao' },
      { icon: RiBookMarkedLine, label: 'Cursos', href: '/dashboard/cursos' },
      { icon: Users, label: 'Estudantes', href: '/dashboard/estudantes' },
      { icon: Users, label: 'Professores', href: '/dashboard/professores' },
      { icon: Calendar, label: 'Calendário Acadêmico', href: '/dashboard/calendario-academico' },
    ],
  },
  {
    group: 'Menu',
    items: [
      { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard/professor' },
      { icon: Calendar, label: 'Calendário', href: '/dashboard/calendario' },
      { icon: Bell, label: 'Notificações', href: '/dashboard/notificacoes' },
      { icon: ClipboardList, label: 'Solicitações', href: '/dashboard/solicitacoes' },
      { icon: RiExchangeBoxLine, label: 'Troca', href: '/dashboard/troca' },
      { icon: RiExchange2Line, label: 'Substituição', href: '/dashboard/substituicao' },
    ],
  },
]

export function Sidebar({ collapsed }: SidebarProps) {
  const pathname = usePathname()
  const [selectedTeam, setSelectedTeam] = useState('Equipe Principal')
  const { data: session } = useSession()
  const userEmail = session?.user?.email || 'usuario@exemplo.com'
  const userName = session?.user?.name || userEmail.split('@')[0]
  const userInitials = (userName || '').split(' ').map((p) => p[0]).join('').substring(0,2).toUpperCase()

  useEffect(() => {
    const safe = { user: session?.user, expires: (session as any)?.expires }
    console.log('useSession data:', safe)
  }, [session])
  const roles: string[] = ((session?.user as any)?.roles ?? []) as string[]
  const canAdmin = roles.includes('ADMINISTRADOR') || roles.includes('COORDENACAO') || roles.includes('DIRETORENSINO') || roles.includes('COORDENADORCURSO')
  const canMenu = roles.includes('PROFESSOR') || canAdmin
  const filteredSections = menuItems.filter((s) => {
    if (s.group === 'Usuários') return roles.includes('ADMINISTRADOR')
    if (s.group === 'Administração') return canAdmin
    if (s.group === 'Menu') return canMenu
    return true
  })
  const allItems = filteredSections.flatMap((s) => s.items)
  const activeItem = allItems.reduce<typeof allItems[number] | null>((best, item) => {
    const href = item.href
    const exact = pathname === href
    const child = pathname.startsWith(href + '/')
    if (!(exact || child)) return best
    if (!best) return item
    return href.length > best.href.length ? item : best
  }, null)

  return (
    <div className="flex flex-col h-full bg-card border-r border-border">
      {/* Header - Team Switcher */}
      <div className="p-4 border-b border-border">
        {!collapsed ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-between border-primary/30 hover:border-primary/50 relative"
              >
                <span className="truncate">{selectedTeam}</span>
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                <div className="absolute top-0 left-0 w-2 h-2 border-l border-t border-primary/40" />
                <div className="absolute top-0 right-0 w-2 h-2 border-r border-t border-primary/40" />
                <div className="absolute bottom-0 left-0 w-2 h-2 border-l border-b border-primary/40" />
                <div className="absolute bottom-0 right-0 w-2 h-2 border-r border-b border-primary/40" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[200px]">
              <DropdownMenuLabel className="tech-label">Equipes</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setSelectedTeam('Equipe Principal')}>
                Equipe Principal
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedTeam('Equipe Secundária')}>
                Equipe Secundária
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className="flex items-center justify-center">
            <Building2 className="h-6 w-6 text-primary" />
          </div>
        )}
      </div>

      {/* Menu Items */}
      <div className="flex-1 overflow-y-auto py-4">
        {filteredSections.map((section) => (
          <div key={section.group} className="mb-6">
            {!collapsed && (
              <div className="px-4 mb-2">
                <span className="tech-label text-muted-foreground">{section.group}</span>
              </div>
            )}
            <div className="space-y-1 px-2">
              {section.items.map((item) => {
                const Icon = item.icon
                const isActive = activeItem ? item.href === activeItem.href : pathname === item.href
                return (
                  <Button
                    key={item.href}
                    asChild
                    variant={isActive ? 'secondary' : 'ghost'}
                    className={cn(
                      'w-full justify-start relative border border-transparent hover:border-primary/30 transition-colors',
                      isActive && 'border-primary/50 bg-secondary/50',
                      collapsed && 'justify-center px-2'
                    )}
                  >
                    <Link href={item.href}>
                      <Icon className={cn('h-5 w-5', !collapsed && 'mr-2')} />
                      {!collapsed && <span>{item.label}</span>}
                      {isActive && (
                        <>
                          <div className="absolute top-0 left-0 w-1.5 h-1.5 border-l border-t border-primary/60" />
                          <div className="absolute top-0 right-0 w-1.5 h-1.5 border-r border-t border-primary/60" />
                          <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-l border-b border-primary/60" />
                          <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-r border-b border-primary/60" />
                        </>
                      )}
                    </Link>
                  </Button>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Footer - User */}
      <div className="p-4 border-t border-border">
        {!collapsed ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-full justify-start p-2 h-auto hover:bg-secondary/50">
                <Avatar className="h-8 w-8 border border-primary/30">
                  <AvatarImage src="/placeholder.svg" alt="User" />
                  <AvatarFallback>{userInitials}</AvatarFallback>
                </Avatar>
                <div className="ml-2 flex-1 text-left overflow-hidden">
                  <p className="text-sm font-medium">{userName}</p>
                  <p className="text-xs text-muted-foreground truncate">{userEmail}</p>
                </div>
                <ChevronDown className="ml-auto h-4 w-4 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[200px]" align="end">
              <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Perfil</DropdownMenuItem>
              <DropdownMenuItem>Configurações</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Sair</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className="flex items-center justify-center">
            <Avatar className="h-8 w-8 border border-primary/30">
              <AvatarImage src="/placeholder.svg" alt="User" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
        )}
      </div>
    </div>
  )
}
