"use client"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { CursoTableContext } from "@/context/curso-context"
import { useToast } from "@/hooks/use-toast"
import { frontendApi } from "@/lib/api"
import { zodResolver } from "@hookform/resolvers/zod"
import { AxiosError } from "axios"
import { useContext, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"


const insertFormSchema = z.object({
    name: z.string({ required_error: "Insira um nome" }),
    sigla: z.string({ required_error: "Insira um nome" }),
    campusId: z.number({ required_error: "Insira um valor" })
})

type InsertFormType = z.infer<typeof insertFormSchema>

export default function FormCursos() {
    const [open, setOpen] = useState(false)
    const { toast } = useToast();
    const [insertMessage, setInsertMessage] = useState<JSX.Element>(<></>)

    const cursoTableContext = useContext(CursoTableContext)

    const insertForm = useForm<InsertFormType>({
        resolver: zodResolver(insertFormSchema),
        defaultValues: {
            name: "",
            sigla: "",
            campusId: 0
        }
    })

    async function onInsertFormSubmit({ name, sigla, campusId }: InsertFormType) {
        const formatedDate = JSON.stringify({ name, sigla, campusId })

        try {
            const response = await frontendApi.post("/cursos", formatedDate)
            // Exibe o toast de sucesso
            toast({
                title: "Sucesso!",
                description: "Curso criado com sucesso!",
                variant: "default",
            });
            cursoTableContext.refreshTable()
        } catch (e) {
            const axiosError = e as AxiosError
            console.log(axiosError)

            // Exibe o toast de erro
            toast({
                title: "Erro ao salvar",
                description: axiosError.message || "Ocorreu um erro ao salvar",
                variant: "destructive",
            });

        }

        setOpen(false)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button >Adicionar Curso</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Adicionar Curso</DialogTitle>
                    <DialogDescription>
                        Clique em salvar quando terminar.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 pb-4">
                    <Form {...insertForm}>
                        <form onSubmit={insertForm.handleSubmit(onInsertFormSubmit)} className="grid gap-4">
                            <FormField
                                control={insertForm.control}
                                name="name"
                                render={({ field }) => {
                                    return (
                                        <FormItem>
                                            <FormLabel>Nome</FormLabel>
                                            <FormControl>
                                                <Input type="text" placeholder="Naviraí" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )
                                }}
                            />

                            <FormField
                                control={insertForm.control}
                                name="sigla"
                                render={({ field }) => {
                                    return (
                                        <FormItem>
                                            <FormLabel>Sigla</FormLabel>
                                            <FormControl>
                                                <Input type="text" placeholder="CV" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )
                                }}
                            />

                            <FormField
                                control={insertForm.control}
                                name="campusId"
                                render={({ field }) => {
                                    return (
                                        <FormItem>
                                            <FormLabel>Campus</FormLabel>
                                            <FormControl>
                                                <Input type="number" placeholder="" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )
                                }}
                            />
                            <Button type="submit">Salvar</Button>
                        </form>
                        {insertMessage}
                    </Form>
                </div>
            </DialogContent>
        </Dialog>
    )
}