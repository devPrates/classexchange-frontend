'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
const Sidebar = dynamic(() => import('@/components/dashboard/sidebar').then(m => m.Sidebar), { ssr: false })
import { Topbar } from '@/components/dashboard/topbar'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'
import { setAuthToken } from '@/services/api'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const { data: session } = useSession()

  useEffect(() => {
    const token = (session as any)?.accessToken as string | undefined
    setAuthToken(token ?? null)
  }, [session])

  return (
    <div className="min-h-screen w-full relative">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage:
            `linear-gradient(to right, var(--grid-color) 1px, transparent 1px), linear-gradient(to bottom, var(--grid-color) 1px, transparent 1px)`,
          backgroundSize: '20px 20px',
          backgroundPosition: '0 0, 0 0',
          maskImage:
            `repeating-linear-gradient(to right, white 0px, white 3px, transparent 3px, transparent 8px), repeating-linear-gradient(to bottom, white 0px, white 3px, transparent 3px, transparent 8px), radial-gradient(ellipse 100% 80% at 50% 100%, white 50%, transparent 90%)`,
          WebkitMaskImage:
            `repeating-linear-gradient(to right, white 0px, white 3px, transparent 3px, transparent 8px), repeating-linear-gradient(to bottom, white 0px, white 3px, transparent 3px, transparent 8px), radial-gradient(ellipse 100% 80% at 50% 100%, white 50%, transparent 90%)`,
          maskComposite: 'intersect',
          WebkitMaskComposite: 'source-in',
        }}
      />
      <div className="relative z-10 h-screen flex overflow-hidden">
        <aside
          className={`${
            sidebarCollapsed ? 'w-16' : 'w-64'
          } transition-all duration-300 ease-in-out hidden md:block`}
        >
          <Sidebar collapsed={sidebarCollapsed} />
        </aside>

        <div className="flex-1 flex flex-col overflow-hidden">
          <Topbar onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)} />
          <main className="flex-1 overflow-y-auto p-6">{children}</main>
        </div>
      </div>
    </div>
  )
}
