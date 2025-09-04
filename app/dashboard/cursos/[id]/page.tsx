
'use client'

import { ArrowLeft, BookOpen, Calendar, GraduationCap, MapPin, School, Users } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { useCursoByIdQuery } from '@/hooks/use-curso'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

export default function CursoDetailPage() {
  const params = useParams()
  const router = useRouter()
  const cursoId = params.id as string
  
  const { data: curso, isLoading, error } = useCursoByIdQuery(cursoId)

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-300 rounded w-1/3"></div>
            <div className="h-96 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !curso) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Curso não encontrado</h2>
            <p className="text-gray-600 mb-6">O curso solicitado não foi encontrado ou não existe.</p>
            <Button onClick={() => router.back()} variant="outline" className="bg-white border-gray-300 text-gray-700 hover:bg-gray-50">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-6">
        <div className="max-w-4xl mx-auto">
          <Button 
            onClick={() => router.back()} 
            variant="outline" 
            className="mb-4 bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
          </Button>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {curso.nome}
              </h1>
              <div className="flex items-center gap-6 text-gray-600">
                <div className="flex items-center gap-2">
                  <School className="h-4 w-4" />
                  <span className="font-medium">{curso.sigla}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>{curso.campusNome}</span>
                </div>
              </div>
            </div>
            <div className="text-right text-sm text-gray-500">
              <p>Código: {curso.id}</p>
              <p>Criado em: {new Date(curso.createdAt).toLocaleDateString('pt-BR')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Conteúdo Principal */}
      <div className="max-w-4xl mx-auto p-8 space-y-8">
        {/* Informações Gerais */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2 border-b border-gray-200 pb-2">
            <BookOpen className="h-5 w-5 text-gray-600" />
            Informações Gerais
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">Nome do Curso</label>
                <p className="text-gray-900 font-medium mt-1">{curso.nome}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">Sigla</label>
                <p className="text-gray-900 font-medium mt-1">{curso.sigla}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">Campus</label>
                <p className="text-gray-900 font-medium mt-1">{curso.campusNome}</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">Coordenador</label>
                <p className="text-gray-900 font-medium mt-1">Prof. João Silva</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">Data de Criação</label>
                <p className="text-gray-900 font-medium mt-1">{new Date(curso.createdAt).toLocaleDateString('pt-BR')}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">Modalidade</label>
                <p className="text-gray-900 font-medium mt-1">Presencial</p>
              </div>
            </div>
          </div>
        </section>

        <Separator className="bg-gray-200" />

        {/* Estatísticas Detalhadas */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2 border-b border-gray-200 pb-2">
            <GraduationCap className="h-5 w-5 text-gray-600" />
            Estatísticas do Curso
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-gray-50 border border-gray-200 rounded">
              <Users className="h-8 w-8 text-gray-600 mx-auto mb-3" />
              <p className="text-2xl font-bold text-gray-900">245</p>
              <p className="text-sm text-gray-600 mt-1">Alunos Ativos</p>
            </div>
            <div className="text-center p-6 bg-gray-50 border border-gray-200 rounded">
              <School className="h-8 w-8 text-gray-600 mx-auto mb-3" />
              <p className="text-2xl font-bold text-gray-900">12</p>
              <p className="text-sm text-gray-600 mt-1">Turmas</p>
            </div>
            <div className="text-center p-6 bg-gray-50 border border-gray-200 rounded">
              <BookOpen className="h-8 w-8 text-gray-600 mx-auto mb-3" />
              <p className="text-2xl font-bold text-gray-900">48</p>
              <p className="text-sm text-gray-600 mt-1">Disciplinas</p>
            </div>
            <div className="text-center p-6 bg-gray-50 border border-gray-200 rounded">
              <Calendar className="h-8 w-8 text-gray-600 mx-auto mb-3" />
              <p className="text-2xl font-bold text-gray-900">8</p>
              <p className="text-sm text-gray-600 mt-1">Semestres</p>
            </div>
          </div>
        </section>

        <Separator className="bg-gray-200" />

        {/* Descrição do Curso */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-6 border-b border-gray-200 pb-2">Descrição do Curso</h2>
          <div className="space-y-4">
            <p className="text-gray-700 leading-relaxed text-justify">
              O curso de {curso.nome} tem como objetivo formar profissionais capacitados para atuar 
              no mercado de trabalho com competência técnica e científica. O curso oferece uma 
              formação sólida e abrangente, preparando os estudantes para os desafios do mundo 
              profissional moderno.
            </p>
            <p className="text-gray-700 leading-relaxed text-justify">
              Com uma grade curricular atualizada e corpo docente qualificado, o curso busca 
              proporcionar aos alunos uma experiência educacional de qualidade, aliando teoria 
              e prática de forma equilibrada.
            </p>
          </div>
        </section>

        <Separator className="bg-gray-200" />

        {/* Informações do Sistema */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-6 border-b border-gray-200 pb-2">Informações do Sistema</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">ID do Curso</label>
              <p className="text-gray-900 font-mono mt-1">{curso.id}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">Última Atualização</label>
              <p className="text-gray-900 mt-1">{new Date(curso.updatedAt).toLocaleString('pt-BR')}</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}