'use client'

import { Menu, Search, Bell, SettingsIcon } from 'lucide-react'
import { BiLogOut } from 'react-icons/bi'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { ThemeToggle } from '@/components/theme-toggle'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Badge } from '@/components/ui/badge'
import { signOut } from 'next-auth/react'

interface TopbarProps {
  onToggleSidebar: () => void
}

export function Topbar({ onToggleSidebar }: TopbarProps) {
  return (
    <div className="h-[68px] border-b border-border bg-card flex items-center justify-between px-4 gap-4">
      {/* Left Side */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleSidebar}
          className="border border-primary/30 hover:border-primary/50 relative"
        >
          <Menu className="h-5 w-5" />
          <div className="absolute top-0 left-0 w-1.5 h-1.5 border-l border-t border-primary/40" />
          <div className="absolute top-0 right-0 w-1.5 h-1.5 border-r border-t border-primary/40" />
          <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-l border-b border-primary/40" />
          <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-r border-b border-primary/40" />
        </Button>

        {/* Search */}
        <div className="relative hidden md:block w-96">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar..."
            className="pl-9 pr-16 border-primary/30 focus:border-primary/50 relative"
          />
          <kbd className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-primary/30 bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
            <span className="text-xs">⌘</span>K
          </kbd>
          <div className="absolute top-0 left-0 w-2 h-2 border-l border-t border-primary/40 pointer-events-none" />
          <div className="absolute top-0 right-0 w-2 h-2 border-r border-t border-primary/40 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-2 h-2 border-l border-b border-primary/40 pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-2 h-2 border-r border-b border-primary/40 pointer-events-none" />
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-2">
        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button id="notifications-trigger" variant="ghost" size="icon" className="relative border border-primary/30 hover:border-primary/50">
              <Bell className="h-5 w-5" />
              <Badge
                variant="destructive"
                className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
              >
                3
              </Badge>
              <div className="absolute top-0 left-0 w-1.5 h-1.5 border-l border-t border-primary/40" />
              <div className="absolute top-0 right-0 w-1.5 h-1.5 border-r border-t border-primary/40" />
              <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-l border-b border-primary/40" />
              <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-r border-b border-primary/40" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel className="tech-label">Notificações</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex flex-col items-start py-3">
              <p className="font-medium">Nova solicitação de troca</p>
              <p className="text-xs text-muted-foreground">Professor José solicitou troca de aula</p>
              <p className="text-xs text-muted-foreground mt-1">Há 5 minutos</p>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex flex-col items-start py-3">
              <p className="font-medium">Substituição confirmada</p>
              <p className="text-xs text-muted-foreground">Sua substituição foi confirmada</p>
              <p className="text-xs text-muted-foreground mt-1">Há 1 hora</p>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Settings */}
        <Button variant="ghost" size="icon" className="border border-primary/30 hover:border-primary/50 relative">
          <SettingsIcon className="h-5 w-5" />
          <div className="absolute top-0 left-0 w-1.5 h-1.5 border-l border-t border-primary/40" />
          <div className="absolute top-0 right-0 w-1.5 h-1.5 border-r border-t border-primary/40" />
          <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-l border-b border-primary/40" />
          <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-r border-b border-primary/40" />
        </Button>

        {/* Theme Toggle */}
        <ThemeToggle />

        <Button
          variant="ghost"
          size="icon"
          className="border border-primary/30 hover:border-primary/50 relative"
          onClick={() => signOut({ callbackUrl: '/login' })}
          aria-label="Sair"
        >
          <BiLogOut className="h-5 w-5" />
          <div className="absolute top-0 left-0 w-1.5 h-1.5 border-l border-t border-primary/40" />
          <div className="absolute top-0 right-0 w-1.5 h-1.5 border-r border-t border-primary/40" />
          <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-l border-b border-primary/40" />
          <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-r border-b border-primary/40" />
        </Button>

        
      </div>
    </div>
  )
}
