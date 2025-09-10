"use client";

import { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Building2, Save, X, ArrowLeft, Mail, Hash, FileText, AlertCircle, Loader2 } from "lucide-react";
import { useCampusByIdQuery, useUpdateCampus } from "@/hooks/use-campus";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CampusEditSkeleton } from "@/components/loadings/campus-edit-skeleton";
import type { UpdateCampus } from "@/types/Campus";

const campusSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório").min(2, "Nome deve ter pelo menos 2 caracteres"),
  sigla: z.string().min(1, "Sigla é obrigatória").min(2, "Sigla deve ter pelo menos 2 caracteres"),
  email: z.string().min(1, "Email é obrigatório").email("Email deve ter um formato válido"),
});

type CampusFormData = z.infer<typeof campusSchema>;

export default function EditarInstituicao() {
  const router = useRouter();
  const params = useParams();
  const campusId = params.id as string;

  const { data: campus, isLoading, isError } = useCampusByIdQuery(campusId || "");
  const updateCampusMutation = useUpdateCampus();

  const form = useForm<CampusFormData>({
    resolver: zodResolver(campusSchema),
    defaultValues: {
      nome: "",
      sigla: "",
      email: "",
    },
  });

  // Carregar dados do campus no formulário quando os dados chegarem
  useEffect(() => {
    if (campus) {
      form.reset({
        nome: campus.nome,
        sigla: campus.sigla,
        email: campus.email,
      });
    }
  }, [campus, form]);

  const onSubmit = async (data: CampusFormData) => {
    if (!campusId) {
      toast.error("ID do campus não encontrado");
      return;
    }

    try {
      await updateCampusMutation.mutateAsync({
        id: campusId,
        data: data as UpdateCampus,
      });
      toast.success("Campus atualizado com sucesso!");
      router.push("/dashboard/instituicao");
    } catch (error) {
      toast.error("Erro ao atualizar campus. Tente novamente.");
    }
  };

  const handleCancel = () => {
    router.push("/dashboard/instituicao");
  };

  if (!campusId) {
    return (
      <div className="container mx-auto py-6">
        <Card className="max-w-2xl mx-auto shadow-lg border-l-4 border-l-warning">
          <CardContent className="pt-6">
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                ID do campus não fornecido. Verifique a URL e tente novamente.
              </AlertDescription>
            </Alert>
            <div className="flex justify-center mt-6">
              <Button onClick={handleCancel} variant="outline" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Voltar à Lista
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return <CampusEditSkeleton />;
  }

  if (isError || !campus) {
    return (
      <div className="container mx-auto py-6">
        <Card className="max-w-2xl mx-auto shadow-lg border-l-4 border-l-destructive">
          <CardContent className="pt-6">
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Erro ao carregar dados do campus. Verifique sua conexão e tente novamente.
              </AlertDescription>
            </Alert>
            <div className="flex justify-center mt-6">
              <Button onClick={handleCancel} variant="outline" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Voltar à Lista
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6">
      <Card className="max-w-2xl mx-auto shadow-lg border-l-4 border-l-primary bg-gradient-to-r from-background to-muted/20">
        <CardHeader className="pb-6 border-b border-border/50">
          <div className="flex items-center gap-4">
            <div className="bg-primary/10 p-3 rounded-xl border border-primary/20">
              <Building2 className="h-6 w-6 text-primary" />
            </div>
            <div className="space-y-1">
              <CardTitle className="flex items-center gap-2 text-xl">
                Editar Campus
              </CardTitle>
              <CardDescription className="text-base">
                Atualize as informações do campus <span className="font-semibold text-foreground">{campus.nome}</span>
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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

              <div className="flex gap-4 pt-6 border-t border-border/30">
                <Button
                  type="submit"
                  disabled={updateCampusMutation.isPending}
                  className="flex-1 h-11 font-medium transition-all duration-200 hover:shadow-md"
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
                  className="flex-1 h-11 font-medium transition-all duration-200 hover:shadow-md border-border/50 hover:border-border"
                >
                  <X className="mr-2 h-4 w-4" />
                  Cancelar
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}