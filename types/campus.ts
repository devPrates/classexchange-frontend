export type CoordenadorResumo = {
    id: string;
    usuarioId: string;
    usuarioNome: string;
    usuarioEmail: string;
};

export type CursoResumo = {
    id: string;
    nome: string;
    sigla: string;
    coordenador: CoordenadorResumo;
};

export type DiretorEnsinoResumo = {
    id: string;
    usuarioId: string;
    usuarioNome: string;
    usuarioEmail: string;
};

export type Campus = {
    id: string;
    nome: string;
    sigla: string;
    email: string;
    slug: string;
    telefone: string;
    endereco: string;
    diretorEnsino: DiretorEnsinoResumo;
    cursos: CursoResumo[];
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