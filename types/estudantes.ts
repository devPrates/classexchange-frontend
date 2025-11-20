export type Estudante = {
    id: string;
    nome: string;
    email: string;
    createdAt: string;
    updatedAt: string;
};

export type CreateEstudante = {
    nome: string;
    email: string;
};

export type UpdateEstudante = {
    nome?: string;
    email?: string;
};