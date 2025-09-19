"use client";

import { useState } from "react";
import { Building2, MapPin, Phone, Mail, Users, GraduationCap, UserCheck, BookOpen, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { DeleteConfirmationDialog } from "@/components/dashboard/delete-confirmation-dialog";
import type { Campus } from "@/types/Campus";

interface CampusCardProps {
  campus: Campus;
  onEdit?: (campus: Campus) => void;
  onDelete?: (campus: Campus) => void;
}

export function CampusCard({ campus, onEdit, onDelete }: CampusCardProps) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleDeleteConfirm = () => {
    if (onDelete) {
      onDelete(campus);
    }
    setIsDeleteDialogOpen(false);
  };

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
          <div className="flex gap-2">
            {onEdit && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEdit(campus)}
                className="border-yellow-200 text-yellow-600 hover:bg-yellow-50 hover:border-yellow-300 dark:border-yellow-800 dark:text-yellow-400 dark:hover:bg-yellow-950 dark:hover:border-yellow-700"
              >
                <Edit className="h-4 w-4 mr-1" />
                Editar
              </Button>
            )}
            {onDelete && (
              <DeleteConfirmationDialog
                isOpen={isDeleteDialogOpen}
                onOpenChange={setIsDeleteDialogOpen}
                onConfirm={handleDeleteConfirm}
                itemName={campus.nome}
                itemType="o campus"
              />
            )}
          </div>
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
                {campus.endereco || "Endereço não informado"}
              </p>
            </div>
            
            {/* Linha separadora */}
            <div className="border-t border-border/30"></div>
 
            {/* Telefone e E-mail */}
            <div className="grid grid-cols-2 gap-8">
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm font-medium text-foreground">Telefone:</p>
                <p className="text-sm text-muted-foreground">{campus.telefone || "Não informado"}</p>
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