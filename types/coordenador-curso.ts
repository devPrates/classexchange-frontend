export type CoordenadorCurso = {
  id: string
  inicio: string
  fim?: string
  usuarioId: string
  usuarioNome: string
  cursoId: string
  cursoNome: string
  createdAt: string
  updatedAt: string
}

export type CreateCoordenadorCurso = {
  usuarioId: string
  cursoId: string
  inicio: string
  fim?: string
}

export type UpdateCoordenadorCurso = {
  usuarioId: string
  cursoId: string
  inicio: string
  fim?: string
}
