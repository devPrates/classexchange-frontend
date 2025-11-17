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

export type Campus = {
  id: string
  nome: string
  cidade: string
  endereco: string
  slug: string
  cursos: number
  alunos: number
  professores: number
  telefone: string
  coordenador: string
}

export const campus: Campus[] = [
  {
    id: '1',
    nome: 'Campus Norte',
    cidade: 'São Paulo',
    endereco: 'Rua das Flores, 123',
    slug: 'campus-norte',
    cursos: 12,
    alunos: 580,
    professores: 45,
    telefone: '(11) 4002-1234',
    coordenador: 'Prof. Maria Santos',
  },
  {
    id: '2',
    nome: 'Campus Sul',
    cidade: 'São Paulo',
    endereco: 'Av. Principal, 456',
    slug: 'campus-sul',
    cursos: 8,
    alunos: 420,
    professores: 32,
    telefone: '(11) 3555-6789',
    coordenador: 'Prof. João Pereira',
  },
  {
    id: '3',
    nome: 'Campus Leste',
    cidade: 'Guarulhos',
    endereco: 'Rua Central, 789',
    slug: 'campus-leste',
    cursos: 10,
    alunos: 495,
    professores: 38,
    telefone: '(11) 2789-1122',
    coordenador: 'Prof. Ana Lima',
  },
]