'use client'

import { useState } from 'react'
import { CornerAccent } from '@/components/elements/corner-accent'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { ChevronLeft, ChevronRight, CalendarIcon, Clock, Sun, Sunset, Moon } from 'lucide-react'

export default function CalendarioPage() {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 10, 18))
  const [selectedDay, setSelectedDay] = useState<number | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const diasSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']
  const meses = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ]

  const aulasPorDia: Record<string, Array<{ horario: string; disciplina: string; turma: string; sala: string; turno: 'matutino' | 'vespertino' | 'noturno' }>> = {
    '18': [
      { horario: '08:00 - 10:00', disciplina: 'Programação Web', turma: 'CC - 3º Sem', sala: 'Lab 204', turno: 'matutino' },
      { horario: '10:00 - 12:00', disciplina: 'Banco de Dados', turma: 'CC - 4º Sem', sala: 'Sala 305', turno: 'matutino' },
    ],
    '20': [
      { horario: '14:00 - 16:00', disciplina: 'Engenharia de Software', turma: 'ES - 5º Sem', sala: 'Sala 401', turno: 'vespertino' },
      { horario: '19:00 - 21:00', disciplina: 'Algoritmos Avançados', turma: 'CC - 5º Sem', sala: 'Lab 305', turno: 'noturno' },
    ],
    '22': [
      { horario: '08:00 - 10:00', disciplina: 'Programação Web', turma: 'CC - 3º Sem', sala: 'Lab 204', turno: 'matutino' },
      { horario: '14:00 - 18:00', disciplina: 'Projeto Integrador', turma: 'CC - 6º Sem', sala: 'Lab 101', turno: 'vespertino' },
      { horario: '19:00 - 22:00', disciplina: 'Redes de Computadores', turma: 'CC - 4º Sem', sala: 'Sala 201', turno: 'noturno' },
    ],
    '25': [
      { horario: '08:00 - 10:00', disciplina: 'Programação Web', turma: 'CC - 3º Sem', sala: 'Lab 204', turno: 'matutino' },
      { horario: '10:00 - 12:00', disciplina: 'Banco de Dados', turma: 'CC - 4º Sem', sala: 'Sala 305', turno: 'matutino' },
    ],
  }

  const handleDayClick = (day: number | null) => {
    if (day) {
      setSelectedDay(day)
      setIsDialogOpen(true)
    }
  }

  const getAulasPorTurno = (turno: 'matutino' | 'vespertino' | 'noturno') => {
    if (!selectedDay) return []
    const aulas = aulasPorDia[selectedDay.toString()] || []
    return aulas.filter(aula => aula.turno === turno)
  }

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1).getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    
    const days = []
    for (let i = 0; i < firstDay; i++) {
      days.push(null)
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i)
    }
    return days
  }

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
  }

  const days = getDaysInMonth(currentDate)
  const today = new Date()
  const isToday = (day: number | null) => {
    if (!day) return false
    return day === today.getDate() && 
           currentDate.getMonth() === today.getMonth() && 
           currentDate.getFullYear() === today.getFullYear()
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Calendário</h1>
        <p className="text-muted-foreground mt-1">Visualize suas aulas e compromissos</p>
      </div>

      <Card className="relative border-primary/30">
        <CornerAccent />
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5 text-primary" />
              {meses[currentDate.getMonth()]} {currentDate.getFullYear()}
            </CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" onClick={previousMonth} className="border-primary/30 hover:border-primary/50">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={nextMonth} className="border-primary/30 hover:border-primary/50">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Dias da Semana */}
          <div className="grid grid-cols-7 gap-2 mb-2">
            {diasSemana.map((dia) => (
              <div key={dia} className="text-center py-2 tech-label text-muted-foreground text-xs">
                {dia}
              </div>
            ))}
          </div>

          {/* Calendário */}
          <div className="grid grid-cols-7 gap-2">
            {days.map((day, index) => {
              const hasAulas = day && aulasPorDia[day.toString()]
              return (
                <div
                  key={index}
                  onClick={() => handleDayClick(day)}
                  className={`
                    relative min-h-[80px] p-2 rounded-lg border transition-colors
                    ${day ? 'border-primary/20 hover:border-primary/40 cursor-pointer' : 'border-transparent'}
                    ${isToday(day) ? 'bg-primary/10 border-primary/50' : 'bg-card/50'}
                    ${hasAulas ? 'bg-green-500/5 border-green-500/30' : ''}
                  `}
                >
                  {day && (
                    <>
                      <div className="absolute top-0 left-0 w-1 h-1 border-l border-t border-primary/30" />
                      <div className="absolute top-0 right-0 w-1 h-1 border-r border-t border-primary/30" />
                      <div className="absolute bottom-0 left-0 w-1 h-1 border-l border-b border-primary/30" />
                      <div className="absolute bottom-0 right-0 w-1 h-1 border-r border-b border-primary/30" />
                      
                      <div className="text-sm font-semibold mb-1">{day}</div>
                      {hasAulas && (
                        <div className="space-y-1">
                          {aulasPorDia[day.toString()].slice(0, 2).map((aula, i) => (
                            <div key={i} className="text-xs px-1 py-0.5 rounded bg-primary/10 text-primary border border-primary/20 truncate">
                              {aula.disciplina}
                            </div>
                          ))}
                          {aulasPorDia[day.toString()].length > 2 && (
                            <div className="text-xs text-muted-foreground">+{aulasPorDia[day.toString()].length - 2}</div>
                          )}
                        </div>
                      )}
                    </>
                  )}
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Legenda */}
      <div className="flex flex-wrap gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-primary/10 border border-primary/50" />
          <span className="text-muted-foreground">Hoje</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-green-500/5 border border-green-500/30" />
          <span className="text-muted-foreground">Com aulas</span>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5 text-primary" />
              Atividades do dia {selectedDay} de {meses[currentDate.getMonth()]}
            </DialogTitle>
            <DialogDescription>
              Visualize todas as suas atividades organizadas por turno
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 mt-4">
            {/* Matutino */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 pb-2 border-b border-dashed border-primary/20">
                <Sun className="h-5 w-5 text-amber-500" />
                <h3 className="font-semibold tech-label">MATUTINO</h3>
                <span className="text-xs text-muted-foreground">(06:00 - 12:00)</span>
              </div>
              {getAulasPorTurno('matutino').length > 0 ? (
                <div className="space-y-2">
                  {getAulasPorTurno('matutino').map((aula, index) => (
                    <Card key={index} className="relative border-primary/20">
                      <div className="absolute top-0 left-0 w-2 h-2 border-l border-t border-primary/30" />
                      <div className="absolute top-0 right-0 w-2 h-2 border-r border-t border-primary/30" />
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 space-y-1">
                            <div className="font-semibold text-primary">{aula.disciplina}</div>
                            <div className="text-sm text-muted-foreground">{aula.turma}</div>
                          </div>
                          <div className="text-right space-y-1">
                            <div className="flex items-center gap-1 text-sm">
                              <Clock className="h-3 w-3" />
                              {aula.horario}
                            </div>
                            <div className="text-sm text-muted-foreground">{aula.sala}</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground text-sm">
                  Nenhuma atividade registrada
                </div>
              )}
            </div>

            {/* Vespertino */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 pb-2 border-b border-dashed border-primary/20">
                <Sunset className="h-5 w-5 text-orange-500" />
                <h3 className="font-semibold tech-label">VESPERTINO</h3>
                <span className="text-xs text-muted-foreground">(12:00 - 18:00)</span>
              </div>
              {getAulasPorTurno('vespertino').length > 0 ? (
                <div className="space-y-2">
                  {getAulasPorTurno('vespertino').map((aula, index) => (
                    <Card key={index} className="relative border-primary/20">
                      <div className="absolute top-0 left-0 w-2 h-2 border-l border-t border-primary/30" />
                      <div className="absolute top-0 right-0 w-2 h-2 border-r border-t border-primary/30" />
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 space-y-1">
                            <div className="font-semibold text-primary">{aula.disciplina}</div>
                            <div className="text-sm text-muted-foreground">{aula.turma}</div>
                          </div>
                          <div className="text-right space-y-1">
                            <div className="flex items-center gap-1 text-sm">
                              <Clock className="h-3 w-3" />
                              {aula.horario}
                            </div>
                            <div className="text-sm text-muted-foreground">{aula.sala}</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground text-sm">
                  Nenhuma atividade registrada
                </div>
              )}
            </div>

            {/* Noturno */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 pb-2 border-b border-dashed border-primary/20">
                <Moon className="h-5 w-5 text-blue-500" />
                <h3 className="font-semibold tech-label">NOTURNO</h3>
                <span className="text-xs text-muted-foreground">(18:00 - 23:00)</span>
              </div>
              {getAulasPorTurno('noturno').length > 0 ? (
                <div className="space-y-2">
                  {getAulasPorTurno('noturno').map((aula, index) => (
                    <Card key={index} className="relative border-primary/20">
                      <div className="absolute top-0 left-0 w-2 h-2 border-l border-t border-primary/30" />
                      <div className="absolute top-0 right-0 w-2 h-2 border-r border-t border-primary/30" />
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 space-y-1">
                            <div className="font-semibold text-primary">{aula.disciplina}</div>
                            <div className="text-sm text-muted-foreground">{aula.turma}</div>
                          </div>
                          <div className="text-right space-y-1">
                            <div className="flex items-center gap-1 text-sm">
                              <Clock className="h-3 w-3" />
                              {aula.horario}
                            </div>
                            <div className="text-sm text-muted-foreground">{aula.sala}</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground text-sm">
                  Nenhuma atividade registrada
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
