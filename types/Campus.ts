
export type Campus = {
    id: string;
    nome: string;
    sigla: string;
    email: string;
    createdAt: string;
    updatedAt: string;
  
};

export type CreateCampus = {
    nome: string;
    sigla: string;
    email: string;
}

export type UpdateCampus = {
    nome: string;
    sigla: string;
    email: string;
}
