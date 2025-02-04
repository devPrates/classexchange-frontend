"use client"

import { frontendApi } from "@/lib/api"
import { campus, columns } from "./columns"
import { DataTable } from "./data-table"
import FormCampus from "./form-campus"
import { useEffect, useState } from "react"

type CampusType = {
  campusId: number
  name: string
  sigla: string
  endereco: string
}


async function getData(): Promise<CampusType[]> {
  var data: CampusType[] = [];

  try {
    const result = await frontendApi.get("/campus");
    
    const campus = result.data as CampusType[];
    
    if (campus) {
      data = campus;
    }

  } catch (e) {
    data = [];
  }

  return data;
}



export default function Campus() {
  const [data, setData] = useState<CampusType[]>([]);

  useEffect(() => {
    getData().then((response) => {
      setData(response);
    })
  }, [])

  return (
    <div className="container mx-auto py-10">
      <FormCampus />
      <DataTable columns={columns} data={data} />
    </div>
  )
}