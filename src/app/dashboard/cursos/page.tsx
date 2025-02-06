"use client"

import { useContext } from "react"
import { columns } from "./columns"
import { DataTable } from "./data-table"
import { SkeletonTable } from "@/components/admin/SkeletonCard"
import { Toaster } from "@/components/ui/toaster"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { CursoTableContext } from "@/context/curso-context"



export default function Cursos() {

  const cursoTableContext = useContext(CursoTableContext)
  const curso = cursoTableContext.curso

  return (
    <div className="container mx-auto py-10">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink>Cursos</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h1 className="text-3xl font-bold my-3">Gestão de Cursos</h1>
      {/* Se os dados ainda não foram carregados, mostra um Skeleton */}
      {curso.length === 0 ? (
        <SkeletonTable />
      ) : (
        <DataTable columns={columns} data={curso} />
      )}
      <Toaster />
    </div>
  )
}