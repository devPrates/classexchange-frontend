"use client";

import { Building2, MapPin, Phone, Mail, Users, GraduationCap, UserCheck, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { Campus } from "@/types/Campus";

interface CampusCardProps {
  campus: Campus;
  onEdit?: (campus: Campus) => void;
}

export function CampusCard({ campus, onEdit }: CampusCardProps) {
  return (
    <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-primary bg-gradient-to-r from-background to-muted/20">
      {/* Header Principal - Estilo Cabeçalho de Documento */}
      <CardHeader className="pb-6 border-b border-border/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-primary/10 p-4 rounded-xl border border-primary/20">
              <Building2 className="h-8 w-8 text-primary" />
            </div>
            <div className="space-y-1">
              <h2 className="text-2xl font-bold tracking-tight text-foreground">
                {campus.nome.toUpperCase()}
              </h2>
              <div className="flex items-center gap-2">
                <div className="h-1 w-8 bg-primary rounded-full"></div>
                <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                  Instituto Federal de Mato Grosso do Sul
                </p>
              </div>
              <p className="text-sm text-muted-foreground font-medium">
                Diretor: Dr. João Silva
              </p>
            </div>
          </div>
          {onEdit && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(campus)}
              className="border-primary/20 hover:bg-primary/5 hover:border-primary/40"
            >
              Editar
            </Button>
          )}
        </div>
      </CardHeader>

      {/* Conteúdo Organizado - Layout Simples */}
        <CardContent className="pt-4">
          <div className="space-y-4">
            {/* Endereço */}
            <div className="flex items-center gap-3">
              <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              <p className="text-sm font-medium text-foreground">Endereço:</p>
              <p className="text-sm text-muted-foreground">
                Rua das Universidades, 100 - São Paulo/SP, São Paulo -
              </p>
            </div>
            
            {/* Linha separadora */}
            <div className="border-t border-border/30"></div>
 
            {/* Telefone e E-mail */}
            <div className="grid grid-cols-2 gap-8">
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm font-medium text-foreground">Telefone:</p>
                <p className="text-sm text-muted-foreground">(11) 99999-9999</p>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm font-medium text-foreground">E-mail:</p>
                <p className="text-sm text-muted-foreground">{campus.email}</p>
              </div>
            </div>
            
            {/* Linha separadora */}
            <div className="border-t border-border/30"></div>
 
            {/* Estatísticas */}
            <div className="grid grid-cols-4 gap-6">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm font-medium text-foreground">Total de Alunos:</p>
                <div className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-semibold">
                  2500
                </div>
              </div>
              <div className="flex items-center gap-2">
                <UserCheck className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm font-medium text-foreground">Professores:</p>
                <div className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-semibold">
                  85
                </div>
              </div>
              <div className="flex items-center gap-2">
                <GraduationCap className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm font-medium text-foreground">Cursos Oferecidos:</p>
                <div className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-semibold">
                  15
                </div>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm font-medium text-foreground">Turmas:</p>
                <div className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-semibold">
                  42
                </div>
              </div>
            </div>
          </div>
        </CardContent>
    </Card>
  );
}