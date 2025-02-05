import { CampusTableContextProvider } from "@/context/campus-context";


export default function CampusLayout({ children }: { children: React.ReactNode }) {
    return(
        <CampusTableContextProvider>
            {children}
        </CampusTableContextProvider>
    )
}