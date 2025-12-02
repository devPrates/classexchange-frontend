import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"

const apiBase = (process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL || "").replace(/\/$/, "")

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
          const res = await fetch(`${apiBase}/api/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: credentials?.email, senha: credentials?.password }),
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
      return token
    },
    async session({ session, token }) {
      ;(session as any).accessToken = (token as any).accessToken
      return session
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET || "dev-secret",
})

export { handler as GET, handler as POST }
