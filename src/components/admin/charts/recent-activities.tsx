import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const activities = [
  { id: 1, user: "Maria Silva", action: "Cadastrou nova turma", time: "Há 5 min", avatar: "MS" },
  { id: 2, user: "João Oliveira", action: "Atualizou horário de aula", time: "Há 15 min", avatar: "JO" },
  { id: 3, user: "Ana Santos", action: "Registrou substituição de professor", time: "Há 1 hora", avatar: "AS" },
  { id: 4, user: "Maria batista", action: "Registrou troca de professor", time: "Há 2 hora", avatar: "AS" },
  { id: 4, user: "Vitoria Duarte", action: "Registrou troca de professor", time: "Há 2 hora", avatar: "AS" },
]

export function RecentActivities() {
  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage alt={activity.user} />
            <AvatarFallback>{activity.avatar}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{activity.user}</p>
            <p className="text-sm text-muted-foreground">{activity.action}</p>
          </div>
          <div className="ml-auto font-medium text-sm text-muted-foreground">{activity.time}</div>
        </div>
      ))}
    </div>
  )
}

