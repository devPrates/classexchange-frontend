import { CursoTableContextProvider } from "@/context/curso-context";


export default function CursoLayout({ children }: { children: React.ReactNode }) {
    return(
        <CursoTableContextProvider>
            {children}
        </CursoTableContextProvider>
    )
}