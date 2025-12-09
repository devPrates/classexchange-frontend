
export type DiretorEnsino = {
    id: string
    inicio: string
    fim: string
    usuarioId: string
    usuarioNome: string
    campusId: string
    campusNome: string
    createdAt: string
    updatedAt: string
}

export type CreateDiretorEnsino = {
    inicio: string
    fim: string
    usuarioId: string
    campusId: string
}

export type UpdateDiretorEnsino = {
    inicio?: string
    fim?: string
    usuarioId?: string
    campusId?: string
}