export type DisciplinaResumo = {
    id: string;
    nome: string;
    cargaHoraria: number;
};

export type TurmaResumo = {
    id: string;
    nome: string;
};

export type Curso = {
    id: string;
    nome: string;
    sigla: string;
    slug: string;
    campusId: string;
    campusNome: string;
    disciplinas: DisciplinaResumo[];
    turmas: TurmaResumo[];
    createdAt: string;
    updatedAt: string;
};

export type CreateCurso = {
    nome: string;
    sigla: string;
    campusId: string;
}

export type UpdateCurso = {
    nome: string;
    sigla: string;
    campusId: string;
}