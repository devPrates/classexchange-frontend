'use client'

import { CursoType } from "@/app/api/curso/route";
import { frontendApi } from "@/lib/api";
import { createContext, useEffect, useState } from "react";

type CursoTableContextType = {
    curso: CursoType[];
    refreshTable: () => void;
}


async function getCurso(): Promise<CursoType[]> {

    var data: CursoType[] = [];

    try {
        const result = await frontendApi.get("/curso");

        const curso  = result.data as CursoType[];

        if (curso) {
            data = curso;
        }

    } catch (e) {
        data = [];
    }

    return data;

}

async function getData() {
    const curso = await getCurso();

    return curso;
}

export const CursoTableContext = createContext({} as CursoTableContextType);


export function CursoTableContextProvider({ children }: { children: React.ReactNode }) {

    const [curso, setCurso] = useState<CursoType[]>([]);  

    function refreshTable() {
        getData().then((response) => {
            setCurso(response);
        });
    }

    useEffect(() => {
        refreshTable();
    }, []);

    return (
        <CursoTableContext.Provider value={{ curso, refreshTable }}>
            {children}
        </CursoTableContext.Provider>
    )
}