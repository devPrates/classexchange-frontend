export type PeriodoDisciplinaResumo = {
    id: string;
    nome: string;
    slug: string;
};

export type Periodo = {
    id: string;
    nome: string;
    slug: string;
    tipoPeriodo: string;
    numero: number;
    ano: number;
    inicio: string;
    fim: string;
    turmaId: string;
    turmaNome: string;
    disciplinas: PeriodoDisciplinaResumo[];
    createdAt: string;
    updatedAt: string;
};

export type CreatePeriodo = {
    nome: string;
    tipoPeriodo: string;
    numero: number;
    ano: number;
    inicio: string;
    fim: string;
    turmaId: string;
};

export type UpdatePeriodo = {
    nome?: string;
    tipoPeriodo?: string;
    numero?: number;
    ano?: number;
    inicio?: string;
    fim?: string;
    turmaId?: string;
};