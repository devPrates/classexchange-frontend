
export type Disciplina = {
    id: string
    nome: string
    slug: string
    cargaHoraria: number
    ementa: string
    cursoId: string
    cursoNome: string
    createdAt: string
    updatedAt: string
}

export type CreateDisciplina = {
    nome: string
    cargaHoraria: number
    ementa: string
    cursoId: string
}   

export type UpdateDisciplina = {
    nome?: string
    cargaHoraria?: number
    ementa?: string
    cursoId?: string
}