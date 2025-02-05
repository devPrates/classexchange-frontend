"use client"

import { useContext } from "react"
import { columns } from "./columns"
import { DataTable } from "./data-table"
import FormCampus from "./form-campus"
import { CampusTableContext } from "@/context/campus-context"


export default function Campus() {

  const campusTableContext = useContext(CampusTableContext)
  const campus = campusTableContext.campus

  return (
      <div className="container mx-auto py-10">
        <FormCampus />
        <DataTable columns={columns} data={campus} />
      </div>
  )
}