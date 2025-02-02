import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Painel Administrativo",
    description: "Sistema de troca e substituição de aulas",
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <main>
            {children}
        </main>
    )
}