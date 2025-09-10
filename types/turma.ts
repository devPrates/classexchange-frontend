
export type Turma = {
    id: string;
    nome: string;
    numero: number;
    cursoId: string;
    cursoNome: string;
    createdAt: string;
    updatedAt: string;
}

export type TurmaCreate = {
    nome: string;
    numero: number;
    cursoId: string;
}

export type TurmaUpdate = {
    nome: string;
    numero: number;
    cursoId: string;
}

export type TurmaSimplificada = {
    id: string;
    nome: string;
    numero: number;
    updatedAt: string;
}