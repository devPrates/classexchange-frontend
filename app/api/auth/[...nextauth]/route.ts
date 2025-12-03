import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"

const apiBase = (process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080").replace(/\/$/, "")

const handler = NextAuth({
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        token: { label: "Token", type: "text" },
      },
      authorize: async (credentials) => {
        try {
          if (credentials?.token) {
            return { id: "token-login", email: "", accessToken: credentials.token as string }
          }
          const email = (credentials?.email as string | undefined)?.trim().toLowerCase()
          const senha = (credentials?.password as string | undefined)?.trim()
          const loginPath = apiBase.endsWith('/api') ? '/auth/login' : '/api/auth/login'
          const res = await fetch(`${apiBase}${loginPath}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, senha }),
          })
          if (!res.ok) return null
          const data = await res.json()
          return { id: credentials?.email || "", email: credentials?.email || "", accessToken: data?.token }
        } catch {
          return null
        }
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user && (user as any).accessToken) {
        token.accessToken = (user as any).accessToken
      }
      const access = (token as any).accessToken as string | undefined
      if (access) {
        try {
          const seg = access.split(".")[1]
          const base64 = seg.replace(/-/g, "+").replace(/_/g, "/")
          const json = Buffer.from(base64, "base64").toString("utf8")
          const claims = JSON.parse(json)
          ;(token as any).sub = claims.sub
          ;(token as any).id = claims.id
          ;(token as any).nome = claims.nome
          ;(token as any).email = claims.email
          ;(token as any).campus_id = claims.campus_id ?? null
          ;(token as any).roles = claims.roles ?? []
        } catch {}
      }
      return token
    },
    async session({ session, token }) {
      ;(session as any).accessToken = (token as any).accessToken
      ;(session as any).user = {
        ...(session as any).user,
        name: (token as any).nome || (session as any).user?.name,
        email: (token as any).email || (session as any).user?.email,
        roles: (token as any).roles || [],
        campusId: (token as any).campus_id ?? null,
        id: (token as any).id || (token as any).sub || undefined,
      }
      return session
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET || "dev-secret",
})

export { handler as GET, handler as POST }
