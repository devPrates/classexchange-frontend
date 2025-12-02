import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { ReactQueryProvider } from '@/components/providers/react-query-provider'
import { AuthProvider } from '@/components/providers/auth-provider'
import { Toaster } from "@/components/ui/sonner"
import { Geist, Geist_Mono } from 'next/font/google'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });


export const metadata: Metadata = {
  title: 'ClassExchange',
  description: 'Sistema técnico para troca e substituição de aulas. Plataforma profissional para professores organizarem horários e encontrarem substitutos.',
  generator: 'Gabriel Prates',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`font-sans antialiased`}>
        <AuthProvider>
          <ReactQueryProvider>
            {children}
            <Analytics />
            <Toaster />
          </ReactQueryProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
