'use client'

import { Suspense, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { setAuthToken } from '@/services/api'

function CallbackInner() {
  const router = useRouter()
  const params = useSearchParams()

  useEffect(() => {
    const token = params.get('token')
    if (!token) {
      router.replace('/login?error=missing_token')
      return
    }
    ;(async () => {
      const res = await signIn('credentials', { token, redirect: false })
      if (res && res.ok) {
        setAuthToken(token)
        router.replace('/dashboard')
      } else {
        router.replace('/login?error=signin_failed')
      }
    })()
  }, [params, router])

  return null
}

export default function LoginCallbackPage() {
  return <Suspense fallback={null}><CallbackInner /></Suspense>
}
