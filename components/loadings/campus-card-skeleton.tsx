"use client";

import { Building2, MapPin, Phone, Mail, Users, GraduationCap, UserCheck, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function CampusCardSkeleton() {
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
              <Skeleton className="h-8 w-48" />
              <div className="flex items-center gap-2">
                <div className="h-1 w-8 bg-primary rounded-full"></div>
                <Skeleton className="h-4 w-64" />
              </div>
              <Skeleton className="h-4 w-32" />
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            disabled
            className="border-primary/20 hover:bg-primary/5 hover:border-primary/40"
          >
            Editar
          </Button>
        </div>
      </CardHeader>

      {/* Conteúdo Organizado - Layout Simples */}
      <CardContent className="pt-4">
        <div className="space-y-4">
          {/* Endereço */}
          <div className="flex items-center gap-3">
            <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            <p className="text-sm font-medium text-foreground">Endereço:</p>
            <Skeleton className="h-4 w-80" />
          </div>
          
          {/* Linha separadora */}
          <div className="border-t border-border/30"></div>

          {/* Telefone e E-mail */}
          <div className="grid grid-cols-2 gap-8">
            <div className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <p className="text-sm font-medium text-foreground">Telefone:</p>
              <Skeleton className="h-4 w-32" />
            </div>
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <p className="text-sm font-medium text-foreground">E-mail:</p>
              <Skeleton className="h-4 w-40" />
            </div>
          </div>
          
          {/* Linha separadora */}
          <div className="border-t border-border/30"></div>

          {/* Estatísticas */}
          <div className="grid grid-cols-4 gap-6">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <p className="text-sm font-medium text-foreground">Total de Alunos:</p>
              <Skeleton className="h-6 w-12 rounded" />
            </div>
            <div className="flex items-center gap-2">
              <UserCheck className="h-4 w-4 text-muted-foreground" />
              <p className="text-sm font-medium text-foreground">Professores:</p>
              <Skeleton className="h-6 w-8 rounded" />
            </div>
            <div className="flex items-center gap-2">
              <GraduationCap className="h-4 w-4 text-muted-foreground" />
              <p className="text-sm font-medium text-foreground">Cursos Oferecidos:</p>
              <Skeleton className="h-6 w-8 rounded" />
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-muted-foreground" />
              <p className="text-sm font-medium text-foreground">Turmas:</p>
              <Skeleton className="h-6 w-8 rounded" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}