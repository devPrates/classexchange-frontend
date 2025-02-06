'use client'

import { UsersType } from "@/app/api/usuarios/route";
import { frontendApi } from "@/lib/api";
import { createContext, useEffect, useState } from "react";

type UsersTableContextType = {
    users: UsersType[];
    refreshTable: () => void;
}


async function getUsers(): Promise<UsersType[]> {

    var data: UsersType[] = [];

    try {
        const result = await frontendApi.get("/usuarios");

        const users  = result.data as UsersType[];

        if (users) {
            data = users;
        }

    } catch (e) {
        data = [];
    }

    return data;

}

async function getData() {
    const users = await getUsers();

    return users;
}

export const UsersTableContext = createContext({} as UsersTableContextType);


export function UsersTableContextProvider({ children }: { children: React.ReactNode }) {

    const [users, setUsers] = useState<UsersType[]>([]);  

    function refreshTable() {
        getData().then((response) => {
            setUsers(response);
        });
    }

    useEffect(() => {
        refreshTable();
    }, []);

    return (
        <UsersTableContext.Provider value={{ users, refreshTable }}>
            {children}
        </UsersTableContext.Provider>
    )
}