export type Curso = {
  id: string
  nome: string
  sigla: string
  campus: string
  coordenador: string
  alunos: number
  turmas: number
  disciplinas: number
  semestres: number
}

export const cursos: Curso[] = [
  {
    id: '1',
    nome: 'Técnico em Teologia',
    sigla: 'TEO',
    campus: 'Navirai',
    coordenador: 'Prof. Dr. Maria Santos',
    alunos: 180,
    turmas: 6,
    disciplinas: 24,
    semestres: 8,
  },
  {
    id: '2',
    nome: 'Ciência da Computação',
    sigla: 'CC',
    campus: 'Campus Norte',
    coordenador: 'Prof. Dr. João Silva',
    alunos: 245,
    turmas: 12,
    disciplinas: 45,
    semestres: 8,
  },
  {
    id: '3',
    nome: 'Engenharia de Software',
    sigla: 'ES',
    campus: 'Campus Sul',
    coordenador: 'Profa. Dra. Ana Costa',
    alunos: 198,
    turmas: 8,
    disciplinas: 38,
    semestres: 8,
  },
]