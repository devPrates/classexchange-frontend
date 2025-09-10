"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Edit } from "lucide-react"
import { EditDisciplinaForm } from "./edit-disciplina-form"
import { DisciplinaSimplificada } from "@/types/disciplina"

interface EditDisciplinaDialogProps {
  disciplina: DisciplinaSimplificada
  children?: React.ReactNode
}

export function EditDisciplinaDialog({ disciplina, children }: EditDisciplinaDialogProps) {
  const [open, setOpen] = useState(false)

  return (
    <>
      {children ? (
        <div onClick={() => setOpen(true)}>
          {children}
        </div>
      ) : (
        <Button
          variant="outline"
          size="sm"
          className="h-8 w-8 p-0 border-yellow-200 text-yellow-600 hover:bg-yellow-50 hover:border-yellow-300 dark:border-yellow-800 dark:text-yellow-400 dark:hover:bg-yellow-950 dark:hover:border-yellow-700"
          onClick={() => setOpen(true)}
        >
          <Edit className="h-4 w-4" />
        </Button>
      )}
      
      <EditDisciplinaForm
        open={open}
        onOpenChange={setOpen}
        disciplinaId={disciplina.id}
      />
    </>
  )
}