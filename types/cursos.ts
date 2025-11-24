export type DisciplinaResumo = {
    id: string;
    nome: string;
    cargaHoraria: number;
};

export type TurmaResumo = {
    id: string;
    nome: string;
    numero: number;
};

export type CoordenadorCursoResumo = {
    id: string;
    usuarioId: string;
    usuarioNome: string;
    inicio: string;
    fim: string;
};

export type ProfessorCurso = {
    id: string;
    usuarioId: string;
    usuarioNome: string;
    usuarioEmail: string;
    usuarioSiape: string;
};

export type Curso = {
    id: string;
    nome: string;
    sigla: string;
    slug: string;
    campusId: string;
    campusNome: string;
    turmas: TurmaResumo[];
    professoresCount: number;
    coordenadorCurso: CoordenadorCursoResumo;
    studentsCount: number;
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

export type EstudanteCurso = never

export type DisciplinaPeriodoResumo = {
    id: string;
    nome: string;
    slug: string;
    codigo?: string;
    cargaHoraria?: number;
};

export type PeriodoCurso = {
    id: string;
    nome: string;
    slug: string;
    tipoPeriodo: 'ANUAL' | 'SEMESTRAL';
    numero: number;
    ano: number;
    inicio: string;
    fim: string;
    disciplinas: DisciplinaPeriodoResumo[];
    createdAt: string;
    updatedAt: string;
};
