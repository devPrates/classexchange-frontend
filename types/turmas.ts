
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
