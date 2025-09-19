"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Building2, Save, X, Mail, Hash, FileText, Loader2, Phone, MapPin } from "lucide-react";
import { useCampusByIdQuery, useUpdateCampus } from "@/hooks/use-campus";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import type { UpdateCampus } from "@/types/Campus";

const campusSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório").min(2, "Nome deve ter pelo menos 2 caracteres"),
  sigla: z.string().min(1, "Sigla é obrigatória").min(2, "Sigla deve ter pelo menos 2 caracteres"),
  email: z.string().min(1, "Email é obrigatório").email("Email deve ter um formato válido"),
  telefone: z.string().optional(),
  endereco: z.string().optional(),
});

type CampusFormData = z.infer<typeof campusSchema>;

interface EditCampusDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  campusId: string | null;
}

export function EditCampusDialog({ open, onOpenChange, campusId }: EditCampusDialogProps) {
  const { data: campus, isLoading } = useCampusByIdQuery(campusId || "");
  const updateCampusMutation = useUpdateCampus();

  const form = useForm<CampusFormData>({
    resolver: zodResolver(campusSchema),
    defaultValues: {
      nome: "",
      sigla: "",
      email: "",
      telefone: "",
      endereco: "",
    },
  });

  // Carregar dados do campus no formulário quando os dados chegarem
  useEffect(() => {
    if (campus) {
      form.reset({
        nome: campus.nome,
        sigla: campus.sigla,
        email: campus.email,
        telefone: campus.telefone || "",
        endereco: campus.endereco || "",
      });
    }
  }, [campus, form]);

  // Resetar formulário quando o dialog fechar
  useEffect(() => {
    if (!open) {
      form.reset({
        nome: "",
        sigla: "",
        email: "",
        telefone: "",
        endereco: "",
      });
    }
  }, [open, form]);

  const onSubmit = async (data: CampusFormData) => {
    if (!campusId) {
      toast.error("ID do campus não encontrado");
      return;
    }

    try {
      const updateData: UpdateCampus = {
        nome: data.nome,
        sigla: data.sigla,
        email: data.email,
        ...(data.telefone && { telefone: data.telefone }),
        ...(data.endereco && { endereco: data.endereco }),
      };

      await updateCampusMutation.mutateAsync({
        id: campusId,
        data: updateData,
      });
      toast.success("Campus atualizado com sucesso!");
      onOpenChange(false);
    } catch (error) {
      toast.error("Erro ao atualizar campus. Tente novamente.");
    }
  };

  const handleCancel = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 p-2 rounded-lg border border-primary/20">
              <Building2 className="h-5 w-5 text-primary" />
            </div>
            <div>
              <DialogTitle className="text-lg">Editar Campus</DialogTitle>
              <DialogDescription>
                {campus ? `Atualize as informações do campus ${campus.nome}` : "Carregando informações do campus..."}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            <span className="ml-2 text-sm text-muted-foreground">Carregando dados...</span>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="nome"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 text-sm font-medium">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      Nome do Campus
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Digite o nome do campus"
                        {...field}
                        disabled={updateCampusMutation.isPending}
                        className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="sigla"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 text-sm font-medium">
                      <Hash className="h-4 w-4 text-muted-foreground" />
                      Sigla
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Digite a sigla do campus"
                        {...field}
                        disabled={updateCampusMutation.isPending}
                        className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 text-sm font-medium">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Digite o email do campus"
                        {...field}
                        disabled={updateCampusMutation.isPending}
                        className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="telefone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 text-sm font-medium">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      Telefone (Opcional)
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder="(67) 3234-5678"
                        {...field}
                        disabled={updateCampusMutation.isPending}
                        className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="endereco"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 text-sm font-medium">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      Endereço (Opcional)
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Rua das Universidades, 100 - Centro"
                        {...field}
                        disabled={updateCampusMutation.isPending}
                        className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex gap-3 pt-4">
                <Button
                  type="submit"
                  disabled={updateCampusMutation.isPending}
                  className="flex-1 h-10 font-medium transition-all duration-200"
                >
                  {updateCampusMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Atualizando...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Atualizar Campus
                    </>
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancel}
                  disabled={updateCampusMutation.isPending}
                  className="flex-1 h-10 font-medium transition-all duration-200"
                >
                  <X className="mr-2 h-4 w-4" />
                  Cancelar
                </Button>
              </div>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
}