
export type Campus = {
    id: string;
    nome: string;
    sigla: string;
    email: string;
    slug: string;
    telefone?: string;
    endereco?: string;
    createdAt: string;
    updatedAt: string;
  
};

export type CreateCampus = {
    nome: string;
    sigla: string;
    email: string;
    telefone?: string;
    endereco?: string;
}

export type UpdateCampus = {
    nome: string;
    sigla: string;
    email: string;
    telefone?: string;
    endereco?: string;
}
