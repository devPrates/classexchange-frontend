"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCampusQuery } from "@/hooks/use-campus";
import { useUpdateCurso } from "@/hooks/use-curso";
import type { curso, UpdateCurso } from "@/types/cursos";

// Schema de validação usando Zod
const editCursoSchema = z.object({
  nome: z.string().min(2, {
    message: "Nome deve ter pelo menos 2 caracteres.",
  }).max(100, {
    message: "Nome deve ter no máximo 100 caracteres.",
  }),
  sigla: z.string().min(2, {
    message: "Sigla deve ter pelo menos 2 caracteres.",
  }).max(10, {
    message: "Sigla deve ter no máximo 10 caracteres.",
  }),
  campusId: z.string().min(1, {
    message: "Selecione um campus.",
  }),
});

interface EditCursoFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  curso: curso;
}

export function EditCursoForm({ open, onOpenChange, curso }: EditCursoFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { data: campusList, isLoading: isLoadingCampus } = useCampusQuery();
  const updateCursoMutation = useUpdateCurso();

  // Configuração do formulário
  const form = useForm<z.infer<typeof editCursoSchema>>({
    resolver: zodResolver(editCursoSchema),
    defaultValues: {
      nome: curso.nome,
      sigla: curso.sigla,
      campusId: curso.campusId,
    },
  });

  // Reset form when curso changes
  React.useEffect(() => {
    if (curso) {
      form.reset({
        nome: curso.nome,
        sigla: curso.sigla,
        campusId: curso.campusId,
      });
    }
  }, [curso, form]);

  async function onSubmit(values: z.infer<typeof editCursoSchema>) {
    setIsSubmitting(true);
    
    try {
      const updateData: UpdateCurso = {
        nome: values.nome,
        sigla: values.sigla,
        campusId: values.campusId,
      };

      await updateCursoMutation.mutateAsync({ id: curso.id, data: updateData });
      
      toast.success("Curso atualizado com sucesso!");
      onOpenChange(false);
    } catch (error) {
      console.error('Erro ao atualizar curso:', error);
      toast.error("Erro ao atualizar curso. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const handleCancel = () => {
    form.reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar Curso</DialogTitle>
          <DialogDescription>
            Atualize as informações do curso. Clique em salvar quando terminar.
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="nome"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do Curso</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Digite o nome do curso"
                      {...field}
                      disabled={isSubmitting}
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
                  <FormLabel>Sigla</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Digite a sigla do curso"
                      {...field}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="campusId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Campus</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    value={field.value}
                    disabled={isSubmitting || isLoadingCampus}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um campus" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {campusList?.map((campus) => (
                        <SelectItem key={campus.id} value={campus.id}>
                          {campus.nome}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                disabled={isSubmitting}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Salvar Alterações
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}