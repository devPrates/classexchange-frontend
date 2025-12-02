'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from '@/components/ui/input-otp'
import { Label } from '@/components/ui/label'

import { ArrowLeft } from 'lucide-react'
import { signIn } from 'next-auth/react'
const API_BASE = (process.env.NEXT_PUBLIC_API_BASE_URL || process.env.API_BASE_URL || '').replace(/\/$/, '')
import { CornerAccent } from '@/components/elements/corner-accent'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [step, setStep] = useState<'email' | 'password'>('email')
  const router = useRouter()

  const handleVerifyEmail = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setStep('password')
    }
  }

  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await signIn('credentials', { email, password, redirect: false })
    if (res && res.ok) {
      // Após autenticar, o token ficará disponível na sessão; o axios será configurado no layout do dashboard
      router.push('/dashboard')
    }
  }

  const handleSocialLogin = (provider: string) => {
    if (provider === 'google') {
      const isApiPrefixed = /\/api$/.test(API_BASE)
      const path = isApiPrefixed ? '/auth/oauth2/google' : '/api/auth/oauth2/google'
      window.location.href = `${API_BASE}${path}`
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      {/* Back to home button */}
      <Link
        href="/"
        className="absolute top-8 left-8 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Voltar
      </Link>

      <div className="w-full max-w-md">
        {/* Login Card */}
        <div className="relative border border-border bg-card p-8 md:p-10">
          <CornerAccent />
          
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="tech-label mb-4">AUTENTICAÇÃO</div>
            <h1 className="text-3xl font-bold mb-2">Acessar Sistema</h1>
            <p className="text-muted-foreground text-sm">
              {step === 'email' 
                ? 'Entre com sua conta institucional'
                : 'Digite o código enviado para seu e-mail'
              }
            </p>
          </div>

          {/* Social Login Buttons */}
          <div className="space-y-3 mb-6">
            <Button
              type="button"
              variant="outline"
              className="w-full relative group hover:border-primary/50 transition-all"
              onClick={() => handleSocialLogin('google')}
            >
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <img src="/google.svg" alt="Google" className="w-5 h-5 mr-2" />
              Continuar com Google
            </Button>

            <Button
              type="button"
              variant="outline"
              className="w-full relative group hover:border-primary/50 transition-all"
              onClick={() => handleSocialLogin('github')}
            >
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <img src="/github.svg" alt="GitHub" className="w-5 h-5 mr-2" />
              Continuar com GitHub
            </Button>

            <Button
              type="button"
              variant="outline"
              className="w-full relative group hover:border-primary/50 transition-all"
              onClick={() => handleSocialLogin('govbr')}
            >
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <img src="/gov-br.svg" alt="Gov.br" className="w-5 h-5 mr-2" />
              Continuar com Gov.br
            </Button>
          </div>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-dashed border-border" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-card px-4 text-xs text-muted-foreground font-mono">OU</span>
            </div>
          </div>

          {/* Forms */}
          {step === 'email' ? (
            <form onSubmit={handleVerifyEmail} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-mono uppercase tracking-wider flex justify-center w-full text-center">
                  E-mail Institucional
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu.email@instituicao.edu.br"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="relative border-primary/20 focus:border-primary input-placeholder-center"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground relative overflow-hidden group"
              >
                <span className="relative z-10">Verificar e-mail</span>
                <div className="absolute inset-0 bg-accent opacity-0 group-hover:opacity-20 transition-opacity" />
              </Button>
            </form>
          ) : (
            <form onSubmit={handlePasswordLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-mono uppercase tracking-wider flex justify-center w-full text-center">
                  Senha
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Sua senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="relative border-primary/20 focus:border-primary input-placeholder-center"
                  required
                />
              </div>

              <div className="space-y-2">
                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground relative overflow-hidden group"
                >
                  <span className="relative z-10">Entrar</span>
                  <div className="absolute inset-0 bg-accent opacity-0 group-hover:opacity-20 transition-opacity" />
                </Button>

                <Button
                  type="button"
                  variant="ghost"
                  className="w-full text-sm"
                  onClick={() => setStep('email')}
                >
                  Voltar para e-mail
                </Button>
              </div>
            </form>
          )}

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-dashed border-border">
            <p className="text-center text-xs text-muted-foreground">
              Ao continuar, você concorda com nossos{' '}
              <Link href="/termos" className="text-primary hover:underline">
                Termos de Uso
              </Link>{' '}
              e{' '}
              <Link href="/privacidade" className="text-primary hover:underline">
                Política de Privacidade
              </Link>
            </p>
          </div>
        </div>

        {/* Technical Annotations */}
        <div className="mt-4 flex justify-between text-xs font-mono text-muted-foreground/60">
          <span>v1.0.0</span>
          <span>SEC_AUTH_001</span>
        </div>
      </div>
    </div>
  )
}
