import CalendarioProfessor from "@/components/admin/calendar/calendario-professor";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"

export default function Horarios() {
  return (
    <main className="min-h-screen p-4">
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
      <h1 className="text-3xl font-bold my-3">Quadro de Horários</h1>
      <div className="h-[800px] rounded-lg border shadow-sm">
        <CalendarioProfessor />
      </div>
    </main>
  )
}