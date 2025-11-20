export type DisciplinaResumo = {
    id: string;
    nome: string;
    cargaHoraria: number;
};

export type TurmaResumo = {
    id: string;
    nome: string;
};

export type CoordenadorCursoResumo = {
    id: string;
    usuarioId: string;
    usuarioNome: string;
    usuarioEmail?: string;
    inicio: string;
    fim: string;
};

export type Curso = {
    id: string;
    nome: string;
    sigla: string;
    slug: string;
    campusId: string;
    campusNome: string;
    turmas: TurmaResumo[];
    coordenadorCurso: CoordenadorCursoResumo;
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

export type EstudanteCurso = {
    id: string;
    nome: string;
    email: string;
    matricula: string;
    situacao: string;
    vinculoCurso: string;
}