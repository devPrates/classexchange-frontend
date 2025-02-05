'use client'

import { CampusType, listCampus } from "@/app/api/campus/route";
import { frontendApi } from "@/lib/api";
import { createContext, useEffect, useState } from "react";

type CampusTableContextType = {
    campus: CampusType[];
    refreshTable: () => void;
}


async function getCampus(): Promise<CampusType[]> {

    var data: CampusType[] = [];

    try {
        const result = await frontendApi.get("/campus");

        const campus  = result.data as CampusType[];

        if (campus) {
            data = campus;
        }

    } catch (e) {
        data = [];
    }

    return data;

}

async function getData() {
    const campus = await getCampus();

    return campus;
}

export const CampusTableContext = createContext({} as CampusTableContextType);


export function CampusTableContextProvider({ children }: { children: React.ReactNode }) {

    const [campus, setCampus] = useState<CampusType[]>([]);  

    function refreshTable() {
        getData().then((response) => {
            setCampus(response);
        });
    }

    useEffect(() => {
        refreshTable();
    }, []);

    return (
        <CampusTableContext.Provider value={{ campus, refreshTable }}>
            {children}
        </CampusTableContext.Provider>
    )
}