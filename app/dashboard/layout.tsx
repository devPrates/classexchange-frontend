import { AppSidebar } from "@/components/dashboard/sidebar/app-sidebar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { ThemeToggleButton } from "@/components/theme/theme-toggle-button"
import { Bell, Search, Settings } from "lucide-react"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="flex flex-col">
        <header className="sticky top-0 z-50 flex h-16 shrink-0 items-center gap-4 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/95 border-b">
          <div className="flex items-center gap-2 pl-4">
          <SidebarTrigger />
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar..."
                className="pl-8 bg-background/50 border-border/50 focus:bg-background focus:border-border"
              />
              <kbd className="pointer-events-none absolute right-2 top-2 h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100 sm:flex">
                ⌘F
              </kbd>
            </div>
          </div>
          <div className="flex-1" />
          <div className="flex items-center gap-2 px-4">
            <Button variant="ghost" size="icon" className="h-8 w-8 bg-sidebar-accent text-sidebar-accent-foreground">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Notificações</span>
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 bg-sidebar-accent text-sidebar-accent-foreground">
              <Settings className="h-4 w-4" />
              <span className="sr-only">Configurações</span>
            </Button>
            <ThemeToggleButton />
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/avatars/01.png" alt="Totok Michael" />
                <AvatarFallback>TM</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-medium">Totok Michael</span>
                <span className="text-xs text-muted-foreground">tmichael0@gmail.com</span>
              </div>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-auto">
          <div className="flex flex-1 flex-col gap-4 p-4">
            {children}
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
