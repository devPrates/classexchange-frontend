import { UsersTableContextProvider } from "@/context/users-context";


export default function UserLayout({ children }: { children: React.ReactNode }) {
    return(
        <UsersTableContextProvider>
            {children}
        </UsersTableContextProvider>
    )
}