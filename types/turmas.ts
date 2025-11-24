
export type Turma = {
    id: string
    nome: string
    slug: string
    numero: number
    cursoId: string
    cursoNome: string
    createdAt: string
    updatedAt: string
}

import type { Periodo } from '@/types/periodos'

export type TurmaDetalhe = Turma & {
    periodos: Periodo[]
}

export type CreateTurma = {
    nome: string
    numero: number
    cursoId: string
}

export type UpdateTurma = {
    nome?: string
    numero?: number
    cursoId?: string
}
