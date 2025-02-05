"use client"

import { useContext } from "react"
import { columns } from "./columns"
import { DataTable } from "./data-table"
import { CampusTableContext } from "@/context/campus-context"
import { SkeletonTable } from "@/components/admin/SkeletonCard"
import { Toaster } from "@/components/ui/toaster"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"



export default function Campus() {

  const campusTableContext = useContext(CampusTableContext)
  const campus = campusTableContext.campus

  return (
    <div className="container mx-auto py-10">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink>Campus</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h1 className="text-3xl font-bold my-3">Gestão de Campus</h1>
      {/* Se os dados ainda não foram carregados, mostra um Skeleton */}
      {campus.length === 0 ? (
        <SkeletonTable />
      ) : (
        <DataTable columns={columns} data={campus} />
      )}
      <Toaster />
    </div>
  )
}