
export type Disciplina = {
    id: string
    nome: string
    slug: string
    periodoId: string
    periodoNome: string
    periodoSlug: string
    cargaHoraria: number
    ementa: string
    cursoId: string
    cursoNome: string
    createdAt: string
    updatedAt: string
}

export type CreateDisciplina = {
    nome: string
    periodoId: string
    cargaHoraria: number
    ementa: string
    cursoId: string
}   

export type UpdateDisciplina = {
    nome?: string
    periodoId?: string
    cargaHoraria?: number
    ementa?: string
    cursoId?: string
}