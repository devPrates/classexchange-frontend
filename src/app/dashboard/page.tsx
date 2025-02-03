import StatCard from "@/components/admin/state-card";
import { Building2, GraduationCap, Users, UserSquare2 } from "lucide-react";



export default function Dashboard() {
    return (
        <div className="flex flex-col gap-4 p-8">

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Campus Cadastrados" value={5} icon={<Building2 className="h-6 w-6 text-muted-foreground font-extrabold" />} />
        <StatCard title="Cursos Cadastrados" value={25} icon={<GraduationCap className="h-6 w-6 text-muted-foreground font-extrabold" />} />
        <StatCard title="Turmas Cadastradas" value={50} icon={<Users className="h-6 w-6 text-muted-foreground font-extrabold" />} />
        <StatCard title="Professores Cadastrados" value={100} icon={<UserSquare2 className="h-6 w-6 text-muted-foreground font-extrabold" />} />
      </div>
    </div>
    );
}