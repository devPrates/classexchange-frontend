"use client";

import { Building2, Loader2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

export function CampusEditSkeleton() {
  return (
    <div className="container mx-auto py-6">
      <Card className="max-w-2xl mx-auto shadow-lg border-l-4 border-l-primary">
        <CardHeader className="pb-6 border-b border-border/50">
          <div className="flex items-center gap-4">
            <div className="bg-primary/10 p-3 rounded-xl border border-primary/20">
              <Building2 className="h-6 w-6 text-primary" />
            </div>
            <div className="space-y-2">
              <CardTitle className="flex items-center gap-2">
                <Skeleton className="h-7 w-40" />
              </CardTitle>
              <CardDescription>
                <Skeleton className="h-4 w-64" />
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="pt-6">
          <div className="space-y-6">
            {/* Campo Nome */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-10 w-full" />
            </div>
            
            {/* Campo Sigla */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-10 w-full" />
            </div>
            
            {/* Campo Email */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-10 w-full" />
            </div>
            
            {/* Botões */}
            <div className="flex gap-4 pt-4">
              <Button disabled className="flex-1">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Carregando...
              </Button>
              <Button variant="outline" disabled className="flex-1">
                Cancelar
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}