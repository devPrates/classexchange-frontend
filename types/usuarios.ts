export enum RoleUsuario {
    PROFESSOR = 'PROFESSOR',
    COORDENACAO = 'COORDENACAO',
    DIRETORENSINO = 'DIRETORENSINO',
    COORDENADORCURSO = 'COORDENADORCURSO',
    ADMINISTRADOR = 'ADMINISTRADOR',
}

export type Usuario = {
    id: string;
    nome: string;
    email: string;
    celular: string;
    role: RoleUsuario;
    campusId: string;
    campusNome: string;
    createdAt: string;
    updatedAt: string;
};

export type CreateUsuario = {
    nome: string;
    email: string;
    senha: string;
    celular: string;
    role: RoleUsuario;
    campusId: string;
};

export type UpdateUsuario = {
    nome?: string;
    email?: string;
    senha?: string;
    celular?: string;
    role?: RoleUsuario;
    campusId?: string;
};