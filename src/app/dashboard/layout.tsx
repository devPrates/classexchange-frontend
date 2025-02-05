import { Metadata } from "next";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import Link from "next/link";
import { BellRing, PowerOff, Search, Settings } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import AppSidebar from "@/components/admin/app-sidebar";
import { Button } from "@/components/ui/button";


export const metadata: Metadata = {
    title: "Painel Administrativo",
    description: "Sistema de troca e substituição de aulas",
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-16 min-w-full shrink-0 border-b-[1px] items-center gap-2">
                    <div className="min-w-full flex items-center justify-between gap-2 px-4">
                        <div className="flex items-center gap-2">
                            <SidebarTrigger className="-ml-1" />
                            <Separator orientation="vertical" className="mr-2 h-4" />
                        </div>
                        <div className="hidden sm:flex justify-end gap-2 items-center">
                            <div className="relative">
                                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                <input
                                    type="text"
                                    placeholder="Pesquisar..."
                                    className="w-full rounded-md border border-input bg-background pl-8 pr-4 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                                />
                            </div>

                            <Link href='/'>
                                <Button variant={'outline'} size={'icon'} >
                                    <BellRing className="stroke-yellow-500" />
                                </Button>
                            </Link>
                            <Link href='/'>
                                <Button variant={'outline'} size={'icon'} >
                                    <PowerOff className="stroke-red-500" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </header>
                <main className="mx-10 h-full">
                    {children}
                </main>
            </SidebarInset>
        </SidebarProvider>
    )
}