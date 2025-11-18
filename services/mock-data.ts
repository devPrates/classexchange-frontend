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

export type Servidor = {
  id: string
  nome: string
  email: string
  cargo: string
  setor: string
  status: 'ativo' | 'inativo'
}

export const servidores: Servidor[] = [
  {
    id: 'srv-1',
    nome: 'João da Silva',
    email: 'joao.silva@ifms.edu.br',
    cargo: 'Professor',
    setor: 'Computação',
    status: 'ativo',
  },
  {
    id: 'srv-2',
    nome: 'Maria Santos',
    email: 'maria.santos@ifms.edu.br',
    cargo: 'Coordenador',
    setor: 'Engenharia',
    status: 'ativo',
  },
  {
    id: 'srv-3',
    nome: 'Carlos Pereira',
    email: 'carlos.pereira@ifms.edu.br',
    cargo: 'Servidor Técnico',
    setor: 'Administração',
    status: 'inativo',
  },
]

export type ProfessorStat = {
  label: string
  value: string | number
}

export const professorStats: ProfessorStat[] = [
  { label: 'Aulas Hoje', value: '4' },
  { label: 'Turmas Ativas', value: '6' },
  { label: 'Disciplinas', value: '3' },
  { label: 'Alterações', value: '12' },
]

export type ProximaAula = {
  id: string
  disciplina: string
  horario: string
  turma: string
  sala: string
}

export const proximasAulas: ProximaAula[] = [
  { id: '1', disciplina: 'Programação Web', horario: '08:00 - 10:00', turma: 'CC - 3º Semestre', sala: 'Lab 204' },
  { id: '2', disciplina: 'Banco de Dados', horario: '10:00 - 12:00', turma: 'CC - 4º Semestre', sala: 'Sala 305' },
  { id: '3', disciplina: 'Engenharia de Software', horario: '14:00 - 16:00', turma: 'ES - 5º Semestre', sala: 'Sala 401' },
]

export type Solicitacao = {
  id: string
  tipo: 'Troca' | 'Substituição'
  professor: string
  disciplina: string
  data: string
  status: 'pendente' | 'aprovado' | 'recusado'
}

export const solicitacoesPendentes: Solicitacao[] = [
  { id: '1', tipo: 'Troca', professor: 'Prof. João Silva', disciplina: 'Algoritmos', data: '25/11/2025', status: 'pendente' },
  { id: '2', tipo: 'Substituição', professor: 'Profa. Maria Santos', disciplina: 'Cálculo I', data: '28/11/2025', status: 'pendente' },
]

export type Notificacao = {
  id: string
  tipo: 'troca' | 'substituicao' | 'aviso' | 'lembrete'
  titulo: string
  mensagem: string
  data: string
  lida: boolean
}

export const notificacoes: Notificacao[] = [
  {
    id: '1',
    tipo: 'troca',
    titulo: 'Solicitação de Troca Aceita',
    mensagem: 'Prof. João Silva aceitou sua solicitação de troca para a aula de Algoritmos do dia 25/11.',
    data: '2025-11-18T10:30:00',
    lida: false,
  },
  {
    id: '2',
    tipo: 'substituicao',
    titulo: 'Nova Solicitação de Substituição',
    mensagem: 'Profa. Maria Santos solicita substituição para a aula de Cálculo I no dia 28/11.',
    data: '2025-11-18T09:15:00',
    lida: false,
  },
  {
    id: '3',
    tipo: 'lembrete',
    titulo: 'Lembrete: Aula em 1 hora',
    mensagem: 'Você tem aula de Programação Web às 14:00 no Lab 204.',
    data: '2025-11-18T13:00:00',
    lida: true,
  },
  {
    id: '4',
    tipo: 'aviso',
    titulo: 'Atualização do Sistema',
    mensagem: 'O sistema passará por manutenção no dia 20/11 das 22:00 às 02:00.',
    data: '2025-11-17T16:00:00',
    lida: true,
  },
]