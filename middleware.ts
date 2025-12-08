import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
  const path = req.nextUrl.pathname
  const safePaths = ["/dashboard/forbidden"]
  if (safePaths.some((p) => path.startsWith(p))) {
    return NextResponse.next()
  }
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.nextUrl))
  }
  const roles: string[] = ((token as any).roles ?? []) as string[]
  const adminPrefixes = [
    "/dashboard/instituicao",
    "/dashboard/cursos",
    "/dashboard/estudantes",
    "/dashboard/professores",
  ]
  const menuPrefixes = [
    "/dashboard/professor",
    "/dashboard/calendario",
    "/dashboard/notificacoes",
    "/dashboard/solicitacoes",
    "/dashboard/troca",
    "/dashboard/substituicao",
  ]
  const isAdminRoot = path === "/dashboard"
  const hasAdminAccess = roles.includes("ADMINISTRADOR") || roles.includes("COORDENACAO") || roles.includes("DIRETORENSINO") || roles.includes("COORDENADORCURSO")
  if (isAdminRoot || adminPrefixes.some((p) => path.startsWith(p))) {
    if (!hasAdminAccess) {
      return NextResponse.redirect(new URL("/dashboard/forbidden", req.nextUrl))
    }
  }
  if (menuPrefixes.some((p) => path.startsWith(p))) {
    const hasMenuAccess = roles.includes("PROFESSOR") || hasAdminAccess
    if (!hasMenuAccess) {
      return NextResponse.redirect(new URL("/dashboard/forbidden", req.nextUrl))
    }
  }
  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*"],
}
