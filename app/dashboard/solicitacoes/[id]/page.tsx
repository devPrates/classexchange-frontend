'use client'

import { useRouter, useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { CornerAccent } from '@/components/elements/corner-accent'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ArrowLeft, Users, Info, ChevronRight } from 'lucide-react'
import { RiExchange2Line } from 'react-icons/ri'
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
    dataManifestacao: '19/11/2025',
  }

  const [dataEmissao, setDataEmissao] = useState('')
  useEffect(() => {
    setDataEmissao(new Date().toLocaleDateString('pt-BR'))
  }, [])

  const handleEncaminhar = () => {
    // Simula encaminhamento
    alert('Solicitação encaminhada para coordenação e direção de ensino!')
    router.push('/dashboard/solicitacoes')
  }

  return (
    <div className="space-y-6">
      {/* Header with Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span className="tech-label">Professor</span>
        <ChevronRight className="h-4 w-4" />
        <Link href="/dashboard/solicitacoes" className="hover:text-foreground">
          Solicitações
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground font-medium">Parecer</span>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => router.back()}
            className="border-primary/30 hover:border-primary/50 relative"
          >
            <ArrowLeft className="h-4 w-4" />
            <div className="absolute top-0 left-0 w-1.5 h-1.5 border-l border-t border-primary/40" />
            <div className="absolute top-0 right-0 w-1.5 h-1.5 border-r border-t border-primary/40" />
            <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-l border-b border-primary/40" />
            <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-r border-b border-primary/40" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Parecer da Solicitação</h1>
            <p className="text-muted-foreground mt-1">Preencha os dados e encaminhe para aprovação</p>
          </div>
        </div>
      </div>

      {/* Resumo da Solicitação */}
      <Card className="relative border-primary/30">
        <CornerAccent />
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <RiExchange2Line className="h-5 w-5 text-primary" />
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
                value={dataEmissao}
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
