import { DisciplinaSimplificada } from "./disciplina";
import { TurmaSimplificada } from "./turma";

export type curso = {
    id: string;
    nome: string;
    sigla: string;
    campusId: string;
    campusNome: string;
    disciplinas: DisciplinaSimplificada[];
    turmas: TurmaSimplificada[];
    createdAt: string;
    updatedAt: string;
}

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