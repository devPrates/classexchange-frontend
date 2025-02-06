"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import GradeHorarios from "./grade-horarios"

const periodos = [
  { id: "manha", label: "Manhã", horaInicio: "07:00", horaFim: "11:55" },
  { id: "tarde", label: "Tarde", horaInicio: "13:00", horaFim: "17:55" },
  { id: "noite", label: "Noite", horaInicio: "18:50", horaFim: "23:45" },
]

const disciplinas = [
  { id: 1, nome: "Algoritimos", cor: "bg-blue-100 hover:bg-blue-200 border-blue-200" },
  { id: 2, nome: "Desenvolvimento Mobile", cor: "bg-green-100 hover:bg-green-200 border-green-200" },
  { id: 3, nome: "POO (Orientação a Objetos)", cor: "bg-yellow-100 hover:bg-yellow-200 border-yellow-200" },
  { id: 4, nome: "Serviços para Web 1", cor: "bg-purple-100 hover:bg-purple-200 border-purple-200" },
  { id: 5, nome: "Engenharia de Software", cor: "bg-pink-100 hover:bg-pink-200 border-pink-200" },
]

// Dados fixos para cada período
const aulasPorPeriodo = {
  manha: [
    { dia: 0, horario: 0, disciplinaId: 1, sala: "101" },
    { dia: 0, horario: 1, disciplinaId: 2, sala: "102" },
    { dia: 1, horario: 0, disciplinaId: 3, sala: "103" },
    { dia: 1, horario: 2, disciplinaId: 4, sala: "104" },
    { dia: 2, horario: 1, disciplinaId: 5, sala: "105" },
    { dia: 2, horario: 3, disciplinaId: 1, sala: "101" },
    { dia: 3, horario: 2, disciplinaId: 2, sala: "102" },
    { dia: 3, horario: 4, disciplinaId: 3, sala: "103" },
    { dia: 4, horario: 0, disciplinaId: 4, sala: "104" },
    { dia: 4, horario: 3, disciplinaId: 5, sala: "105" },
  ],
  tarde: [
    { dia: 0, horario: 0, disciplinaId: 5, sala: "201" },
    { dia: 0, horario: 2, disciplinaId: 4, sala: "202" },
    { dia: 1, horario: 1, disciplinaId: 3, sala: "203" },
    { dia: 1, horario: 3, disciplinaId: 2, sala: "204" },
    { dia: 2, horario: 0, disciplinaId: 1, sala: "205" },
    { dia: 2, horario: 4, disciplinaId: 5, sala: "201" },
    { dia: 3, horario: 1, disciplinaId: 4, sala: "202" },
    { dia: 3, horario: 3, disciplinaId: 3, sala: "203" },
    { dia: 4, horario: 2, disciplinaId: 2, sala: "204" },
    { dia: 4, horario: 4, disciplinaId: 1, sala: "205" },
  ],
  noite: [
    { dia: 0, horario: 1, disciplinaId: 3, sala: "301" },
    { dia: 0, horario: 3, disciplinaId: 2, sala: "302" },
    { dia: 1, horario: 0, disciplinaId: 1, sala: "303" },
    { dia: 1, horario: 4, disciplinaId: 5, sala: "304" },
    { dia: 2, horario: 2, disciplinaId: 4, sala: "305" },
    { dia: 2, horario: 4, disciplinaId: 3, sala: "301" },
    { dia: 3, horario: 0, disciplinaId: 2, sala: "302" },
    { dia: 3, horario: 3, disciplinaId: 1, sala: "303" },
    { dia: 4, horario: 1, disciplinaId: 5, sala: "304" },
    { dia: 4, horario: 4, disciplinaId: 4, sala: "305" },
  ],
}

export default function CalendarioProfessor() {
  const [periodoAtivo, setPeriodoAtivo] = useState(periodos[0].id)

  const aulas = aulasPorPeriodo[periodoAtivo as keyof typeof aulasPorPeriodo].map((aula) => {
    const disciplina = disciplinas.find((d) => d.id === aula.disciplinaId)!
    return {
      id: `${periodoAtivo}-${aula.dia}-${aula.horario}`,
      disciplina: disciplina.nome,
      cor: disciplina.cor,
      sala: `Sala ${aula.sala}`,
      dia: aula.dia,
      horario: aula.horario,
    }
  })

  return (
    <div className="flex flex-col h-full bg-white">
      <header className="flex items-center justify-between px-4 py-3 border-b">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-semibold">Fevereiro 2025</h2>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <Button variant="outline">Hoje</Button>
        </div>
        <div className="flex items-center gap-4">
          <Select value={periodoAtivo} onValueChange={setPeriodoAtivo}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Selecione o período" />
            </SelectTrigger>
            <SelectContent>
              {periodos.map((periodo) => (
                <SelectItem key={periodo.id} value={periodo.id}>
                  {periodo.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </header>

      <div className="flex-1 overflow-auto">
        <GradeHorarios periodo={periodos.find((p) => p.id === periodoAtivo)!} aulas={aulas} />
      </div>
    </div>
  )
}

