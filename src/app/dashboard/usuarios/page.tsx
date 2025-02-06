"use client"

import { useContext } from "react"
import { columns } from "./columns"
import { DataTable } from "./data-table"
import { SkeletonTable } from "@/components/admin/SkeletonCard"
import { Toaster } from "@/components/ui/toaster"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { UsersTableContext } from "@/context/users-context"



export default function Users() {

  const usersTableContext = useContext(UsersTableContext)
  const users = usersTableContext.users

  return (
    <div className="container mx-auto py-10">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink>Usuários</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h1 className="text-3xl font-bold my-3">Gestão de Usuários</h1>
      {/* Se os dados ainda não foram carregados, mostra um Skeleton */}
      {users.length === 0 ? (
        <SkeletonTable />
      ) : (
        <DataTable columns={columns} data={users} />
      )}
      <Toaster />
    </div>
  )
}