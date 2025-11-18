'use client'

import { useRouter, useParams } from 'next/navigation'
import { CornerAccent } from '@/components/elements/corner-accent'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ArrowLeft, Users, Info, ChevronRight } from 'lucide-react'
import Link from 'next/link'

export default function ParecerSolicitacaoPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string

  // Dados mockados da solicitação
  const solicitacao = {
    id,
    tipo: 'Substituição',
    data: '28/11/2025',
    horario: '08:00 - 10:00',
    disciplina: 'Cálculo I',
    turma: 'ES - 2º Semestre',
    professorAceito: {
      nome: 'Prof. Ricardo Lima',
      email: 'ricardo.lima@exemplo.com',
      area: 'Matemática Aplicada',
    },
    dataEmissao: new Date().toLocaleDateString('pt-BR'),
    dataManifestacao: '19/11/2025',
  }

  const handleEncaminhar = () => {
    // Simula encaminhamento
    alert('Solicitação encaminhada para coordenação e direção de ensino!')
    router.push('/dashboard/solicitacoes')
  }

  return (
    <div className="space-y-6">
      {/* Header with Breadcrumb */}
      <div className="space-y-4">
        <Link href="/dashboard/solicitacoes">
          <Button variant="ghost" className="pl-0 hover:bg-transparent">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar para Solicitações
          </Button>
        </Link>
        
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className="tech-label">Professor</span>
          <ChevronRight className="h-4 w-4" />
          <Link href="/dashboard/solicitacoes" className="hover:text-foreground">
            Solicitações
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground font-medium">Parecer</span>
        </div>

        <div>
          <h1 className="text-3xl font-bold tracking-tight">Parecer da Solicitação</h1>
          <p className="text-muted-foreground mt-1">
            Preencha os dados e encaminhe para aprovação
          </p>
        </div>
      </div>

      {/* Resumo da Solicitação */}
      <Card className="relative border-primary/30">
        <CornerAccent />
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            Resumo da Solicitação
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-xs tech-label text-muted-foreground mb-1">Tipo</p>
              <p className="font-medium">{solicitacao.tipo}</p>
            </div>
            <div>
              <p className="text-xs tech-label text-muted-foreground mb-1">Data</p>
              <p className="font-medium">
                {solicitacao.data} • {solicitacao.horario}
              </p>
            </div>
            <div>
              <p className="text-xs tech-label text-muted-foreground mb-1">Disciplina</p>
              <p className="font-medium">{solicitacao.disciplina}</p>
            </div>
            <div>
              <p className="text-xs tech-label text-muted-foreground mb-1">Turma</p>
              <p className="font-medium">{solicitacao.turma}</p>
            </div>
          </div>

          <div className="border-t border-dashed border-border pt-4">
            <p className="text-xs tech-label text-muted-foreground mb-2">Professor que Aceitou</p>
            <div className="flex items-start gap-3">
              <div className="shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold">{solicitacao.professorAceito.nome}</p>
                <p className="text-sm text-muted-foreground">{solicitacao.professorAceito.email}</p>
                <p className="text-sm text-muted-foreground">{solicitacao.professorAceito.area}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Formulário de Parecer */}
      <Card className="relative border-primary/30">
        <CornerAccent />
        <CardHeader>
          <CardTitle>Dados do Parecer</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="sequencia">Sequência</Label>
            <Input
              id="sequencia"
              placeholder="Ex: 001/2025"
              className="border-primary/30"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="autorizacao">Autorização</Label>
              <Input
                id="autorizacao"
                value="Pendente"
                disabled
                className="border-primary/30 bg-muted"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="emissao">Data de Emissão</Label>
              <Input
                id="emissao"
                value={solicitacao.dataEmissao}
                disabled
                className="border-primary/30 bg-muted"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="manifestacao">Data de Manifestação</Label>
            <Input
              id="manifestacao"
              value={solicitacao.dataManifestacao}
              disabled
              className="border-primary/30 bg-muted"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="justificativa">Justificativa</Label>
            <div className="min-h-[150px] border border-primary/30 rounded-md p-3 bg-background">
              <div className="space-y-2">
                <div className="flex gap-2 border-b border-border pb-2">
                  <Button variant="ghost" size="sm" className="h-7 text-xs">
                    <strong>B</strong>
                  </Button>
                  <Button variant="ghost" size="sm" className="h-7 text-xs">
                    <em>I</em>
                  </Button>
                  <Button variant="ghost" size="sm" className="h-7 text-xs">
                    <u>U</u>
                  </Button>
                </div>
                <textarea
                  className="w-full min-h-[80px] bg-transparent resize-none focus:outline-none text-sm"
                  placeholder="Descreva a justificativa detalhada para esta solicitação..."
                />
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              Editor de texto rico com formatação básica
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Info e Ação */}
      <Card className="relative border-primary/30 bg-blue-500/5">
        <CornerAccent />
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-blue-500 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium mb-1">Próximos Passos</p>
              <p className="text-sm text-muted-foreground">
                Ao encaminhar, a solicitação será enviada para o coordenador do curso e o diretor
                de ensino do campus para aprovação final.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-3">
        <Button variant="outline" onClick={() => router.back()}>
          Cancelar
        </Button>
        <Button onClick={handleEncaminhar} size="lg" className="flex-1 sm:flex-initial">
          Encaminhar Solicitação
        </Button>
      </div>
    </div>
  )
}
