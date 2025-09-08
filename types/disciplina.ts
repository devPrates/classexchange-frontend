
export type disciplina = {
    id: string
    nome: string
    cargahoraria: number
    ementa: string
    cursoId: string
    cursoNome: string
    createdAt: string
    updatedAt: string
}

export type DisciplinaCreate = {
    nome: string
    cargahoraria: number
    ementa: string
    cursoId: string
}

export type DisciplinaUpdate = {
    nome: string
    cargahoraria: number
    ementa: string
    cursoId: string
}

export type DisciplinaSimplificada = {
    id: string;
    nome: string;
    cargahoraria: number;
}

