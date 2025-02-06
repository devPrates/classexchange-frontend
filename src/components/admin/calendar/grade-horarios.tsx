import { Fragment } from "react"

interface GradeHorariosProps {
  periodo: { horaInicio: string; horaFim: string }
  aulas: Array<{
    id: string
    disciplina: string
    cor: string
    sala: string
    dia: number
    horario: number
  }>
}

const diasDaSemana = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta"]

export default function GradeHorarios({ periodo, aulas }: GradeHorariosProps) {
  const horarios = gerarHorarios(periodo.horaInicio, periodo.horaFim)

  return (
    <div className="grid grid-cols-[80px_repeat(5,1fr)] h-full">
      {/* Header com dias da semana */}
      <div className="sticky top-0 z-10">
        <div className="h-14 border-b bg-white" />
      </div>
      {diasDaSemana.map((dia, index) => (
        <div key={dia} className="sticky top-0 z-10 border-l border-b bg-white">
          <div className="flex flex-col items-center justify-center h-14 px-2">
            <div className="font-medium">{dia}</div>
          </div>
        </div>
      ))}

      {/* Grid de horários e aulas */}
      {horarios.map((horario, index) => (
        <Fragment key={horario}>
          <div className="flex items-center justify-end pr-4 relative h-20 -mt-2.5 text-sm text-muted-foreground">
            {horario}
          </div>
          {[0, 1, 2, 3, 4].map((dia) => (
            <div key={`${dia}-${index}`} className="border-l relative h-20">
              <div className="absolute inset-0 border-b" />
              {aulas
                .filter((aula) => aula.dia === dia && aula.horario === index)
                .map((aula) => (
                  <div
                    key={aula.id}
                    className={`absolute inset-x-1 top-1 bottom-1 ${aula.cor} rounded-lg border p-2 cursor-pointer transition-colors`}
                  >
                    <div className="font-medium text-sm">{aula.disciplina}</div>
                    <div className="text-xs text-muted-foreground">{aula.sala}</div>
                  </div>
                ))}
            </div>
          ))}
        </Fragment>
      ))}
    </div>
  )
}

function gerarHorarios(horaInicio: string, horaFim: string): string[] {
  const horarios = []
  const horaAtual = new Date(`2000-01-01T${horaInicio}:00`)
  const fim = new Date(`2000-01-01T${horaFim}:00`)

  while (horaAtual <= fim) {
    horarios.push(
      horaAtual.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    )
    horaAtual.setMinutes(horaAtual.getMinutes() + 45)

    if (horarios.length === 2) {
      horaAtual.setMinutes(horaAtual.getMinutes() + 10)
    }
  }

  return horarios
}

