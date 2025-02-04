import {
    BellRing,
    BookType,
    FileText,
    Frame,
    LayoutDashboard,
    LifeBuoy,
    Map,
    PieChart,
    Replace,
    ReplaceAll,
    School,
    Settings,
    UserCog,
    WalletCards,
} from "lucide-react"

export const data = {
    user: {
        name: "Administrador",
        email: "admin@example.com",
        avatar: "",
    },
    navMain: [
        {
            title: "Dashboard",
            url: "/dashboard",
            icon: LayoutDashboard,
        },
        {
            title: "Usuários",
            url: "/dashboard/usuarios",
            icon: UserCog,
        },
        {
            title: "Câmpus",
            url: "/dashboard/campus",
            icon: School,
        },
        {
            title: "Cursos",
            url: "/dashboard/cursos",
            icon: WalletCards,
        },
        {
            title: "Turmas",
            url: "/dashboard/turmas",
            icon: BookType,
        },
        {
            title: "Substituição",
            url: "/dashboard/substituicao",
            icon: Replace,
        },
        {
            title: "Troca de Aula",
            url: "/dashboard/trocaula",
            icon: ReplaceAll,
        },
        {
            title: "Relatórios",
            url: "/dashboard/relatorios",
            icon: FileText,
        },
        {
            title: "Notificações",
            url: "/dashboard/notificacoes",
            icon: BellRing,
        },
    ],
    navSecondary: [
        {
            title: "Suporte",
            url: "",
            icon: LifeBuoy,
        },
        {
            title: "Configurações",
            url: "",
            icon: Settings,
        },
    ],
    projects: [
        {
            name: "Design Engineering",
            url: "#",
            icon: Frame,
        },
        {
            name: "Sales & Marketing",
            url: "#",
            icon: PieChart,
        },
        {
            name: "Travel",
            url: "#",
            icon: Map,
        },
    ],
}