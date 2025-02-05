import { CampusDistribution } from "@/components/admin/charts/campus-distribution"
import { ClassScheduleChanges } from "@/components/admin/charts/class-schedule-changes"
import { RecentActivities } from "@/components/admin/charts/recent-activities"
import { TeachersByDepartment } from "@/components/admin/charts/teachers-by-department"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function DashboardPage() {
  return (
    <div className="flex-col md:flex">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold">Dashboard</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Campus</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">2 novos campus este ano</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Turmas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">256</div>
              <p className="text-xs text-muted-foreground">+12 desde o último semestre</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Professores</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">420</div>
              <p className="text-xs text-muted-foreground">+15 contratações este ano</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Substituições de Aulas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">38</div>
              <p className="text-xs text-muted-foreground">Nos últimos 30 dias</p>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Distribuição de Turmas por Campus</CardTitle>
            </CardHeader>
            <CardContent>
              <CampusDistribution />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Professores por Departamento</CardTitle>
            </CardHeader>
            <CardContent>
              <TeachersByDepartment />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Alterações de Horários de Aulas</CardTitle>
            </CardHeader>
            <CardContent>
              <ClassScheduleChanges />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Atividades Recentes</CardTitle>
            </CardHeader>
            <CardContent>
              <RecentActivities />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

