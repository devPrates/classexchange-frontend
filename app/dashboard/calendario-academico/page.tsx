"use client"

import { useState } from "react"
import { CornerAccent } from "@/components/elements/corner-accent"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Plus, Edit, Trash2, CalendarDays } from "lucide-react"

type EventType = "sabado-letivo" | "feriado" | "ponte" | "recesso" | "inicio-ano" | "fim-ano"

type AcademicEvent = {
  id: string
  tipo: EventType
  titulo: string
  dataInicio: string
  dataFim?: string
  descricao?: string
}

const eventTypeLabels: Record<EventType, { label: string; color: string }> = {
  "sabado-letivo": { label: "Sábado Letivo", color: "bg-blue-500/10 text-blue-600 border-blue-500/20" },
  feriado: { label: "Feriado", color: "bg-red-500/10 text-red-600 border-red-500/20" },
  ponte: { label: "Ponte", color: "bg-orange-500/10 text-orange-600 border-orange-500/20" },
  recesso: { label: "Recesso", color: "bg-purple-500/10 text-purple-600 border-purple-500/20" },
  "inicio-ano": { label: "Início do Ano Letivo", color: "bg-green-500/10 text-green-600 border-green-500/20" },
  "fim-ano": { label: "Fim do Ano Letivo", color: "bg-gray-500/10 text-gray-600 border-gray-500/20" },
}

export default function CalendarioAcademicoPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedType, setSelectedType] = useState<EventType | null>(null)

  const events: AcademicEvent[] = [
    {
      id: "1",
      tipo: "inicio-ano",
      titulo: "Início do Ano Letivo 2025",
      dataInicio: "2025-02-01",
    },
    {
      id: "2",
      tipo: "sabado-letivo",
      titulo: "Sábado Letivo - Reposição",
      dataInicio: "2025-03-15",
    },
    {
      id: "3",
      tipo: "feriado",
      titulo: "Carnaval",
      dataInicio: "2025-03-01",
      dataFim: "2025-03-04",
      descricao: "Recesso de Carnaval",
    },
    {
      id: "4",
      tipo: "ponte",
      titulo: "Ponte - Corpus Christi",
      dataInicio: "2025-06-19",
      dataFim: "2025-06-20",
    },
    {
      id: "5",
      tipo: "recesso",
      titulo: "Recesso de Julho",
      dataInicio: "2025-07-15",
      dataFim: "2025-07-31",
    },
    {
      id: "6",
      tipo: "fim-ano",
      titulo: "Fim do Ano Letivo 2025",
      dataInicio: "2025-12-20",
    },
  ]

  const filteredEvents = selectedType ? events.filter((e) => e.tipo === selectedType) : events

  const formatDate = (date: string) => {
    return new Date(date + "T00:00:00").toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Calendário Acadêmico</h1>
          <p className="text-muted-foreground mt-1">Gerencie eventos e datas importantes do ano letivo</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="relative border border-primary/30 hover:border-primary/50">
              <Plus className="mr-2 h-4 w-4" />
              Novo Evento
              <div className="absolute top-0 left-0 w-1.5 h-1.5 border-l border-t border-primary/40" />
              <div className="absolute top-0 right-0 w-1.5 h-1.5 border-r border-t border-primary/40" />
              <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-l border-b border-primary/40" />
              <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-r border-b border-primary/40" />
            </Button>
          </DialogTrigger>
          <DialogContent id="dialog-novo-evento" className="border-primary/30 max-w-lg">
            <DialogHeader>
              <DialogTitle>Novo Evento Acadêmico</DialogTitle>
              <DialogDescription>Adicione um novo evento ao calendário acadêmico</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="tipo">Tipo de Evento</Label>
                <Select>
                  <SelectTrigger className="border-primary/30">
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(eventTypeLabels).map(([key, value]) => (
                      <SelectItem key={key} value={key}>
                        {value.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="titulo">Título</Label>
                <Input id="titulo" placeholder="Nome do evento" className="border-primary/30" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dataInicio">Data Início</Label>
                  <Input id="dataInicio" type="date" className="border-primary/30" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dataFim">Data Fim (opcional)</Label>
                  <Input id="dataFim" type="date" className="border-primary/30" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="descricao">Descrição (opcional)</Label>
                <Input id="descricao" placeholder="Detalhes do evento" className="border-primary/30" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={() => setIsDialogOpen(false)}>Salvar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filter */}
      <Card className="relative border-primary/30">
        <CornerAccent />
        <CardContent className="p-4">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="tech-label text-sm text-muted-foreground">Filtrar por tipo:</span>
            <div className="flex gap-2 flex-wrap">
              <Button
                variant={selectedType === null ? "secondary" : "outline"}
                size="sm"
                onClick={() => setSelectedType(null)}
                className="border-primary/30"
              >
                Todos
              </Button>
              {Object.entries(eventTypeLabels).map(([key, value]) => (
                <Button
                  key={key}
                  variant={selectedType === key ? "secondary" : "outline"}
                  size="sm"
                  onClick={() => setSelectedType(key as EventType)}
                  className="border-primary/30"
                >
                  {value.label}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Events List */}
      {filteredEvents.length === 0 ? (
        <Card className="relative border-primary/30">
          <CornerAccent />
          <CardContent className="flex flex-col items-center justify-center py-12">
            <CalendarDays className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Nenhum evento encontrado</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredEvents.map((event) => {
            const typeInfo = eventTypeLabels[event.tipo]
            return (
              <Card key={event.id} className="relative border-primary/30 hover:border-primary/50 transition-colors">
                <CornerAccent />
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className="flex-shrink-0 w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20">
                      <Calendar className="h-7 w-7 text-primary" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div>
                          <h3 className="font-bold text-lg mb-2 text-balance">{event.titulo}</h3>
                          <span
                            className={`inline-block px-2 py-1 rounded-md text-xs font-semibold border ${typeInfo.color}`}
                          >
                            {typeInfo.label}
                          </span>
                        </div>
                      </div>

                      <div className="mt-4 flex items-center gap-6 text-sm">
                        <div>
                          <span className="tech-label text-xs text-muted-foreground block mb-1">DATA INÍCIO</span>
                          <span className="font-medium">{formatDate(event.dataInicio)}</span>
                        </div>
                        {event.dataFim && (
                          <>
                            <span className="text-muted-foreground">→</span>
                            <div>
                              <span className="tech-label text-xs text-muted-foreground block mb-1">DATA FIM</span>
                              <span className="font-medium">{formatDate(event.dataFim)}</span>
                            </div>
                          </>
                        )}
                      </div>

                      {event.descricao && (
                        <p className="text-sm text-muted-foreground mt-4 italic">{event.descricao}</p>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 flex-shrink-0">
                      <Button size="sm" className="btn-edit gap-1.5">
                        <Edit className="h-3.5 w-3.5" />
                        Editar
                      </Button>
                      <Button size="sm" className="btn-delete gap-1.5">
                        <Trash2 className="h-3.5 w-3.5" />
                        Excluir
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
