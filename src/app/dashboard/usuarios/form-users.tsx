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
import { UsersTableContext } from "@/context/users-context"
import { useToast } from "@/hooks/use-toast"
import { frontendApi } from "@/lib/api"
import { zodResolver } from "@hookform/resolvers/zod"
import { AxiosError } from "axios"
import { useContext, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"


const insertFormSchema = z.object({
    name: z.string({ required_error: "Insira um nome" }),
    email: z.string().email({ message: "Email inválido" }),
    password: z.string().min(2, { message: "Senha inválida" }),
    siape: z.string({ required_error: "Insira um siape valido" }),
    celular: z.string({ required_error: "insira um numero de celular válido" })
})

type InsertFormType = z.infer<typeof insertFormSchema>

export default function FormUsers() {
    const [open, setOpen] = useState(false)
    const { toast } = useToast();
    const [insertMessage, setInsertMessage] = useState<JSX.Element>(<></>)

    const usersTableContext = useContext(UsersTableContext)

    const insertForm = useForm<InsertFormType>({
        resolver: zodResolver(insertFormSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            siape: "",
            celular: ""
        }
    })

    async function onInsertFormSubmit({ name, email, password, siape, celular }: InsertFormType) {
        const formatedDate = JSON.stringify({ name, email, password, siape, celular })

        try {
            const response = await frontendApi.post("/usuarios", formatedDate)
            // Exibe o toast de sucesso
            toast({
                title: "Sucesso!",
                description: "Usuário criado com sucesso!",
                variant: "default",
            });
            usersTableContext.refreshTable()
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
                <Button >Adicionar Usuário</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Adicionar Usuário</DialogTitle>
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
                                name="email"
                                render={({ field }) => {
                                    return (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input type="email" placeholder="example@ifms.edu.br" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )
                                }}
                            />

                            <FormField
                                control={insertForm.control}
                                name="password"
                                render={({ field }) => {
                                    return (
                                        <FormItem>
                                            <FormLabel>Senha</FormLabel>
                                            <FormControl>
                                                <Input type="text" placeholder="****" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )
                                }}
                            />

                            <FormField
                                control={insertForm.control}
                                name="siape"
                                render={({ field }) => {
                                    return (
                                        <FormItem>
                                            <FormLabel>Siape</FormLabel>
                                            <FormControl>
                                                <Input type="text" placeholder="12345" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )
                                }}
                            />

                            <FormField
                                control={insertForm.control}
                                name="celular"
                                render={({ field }) => {
                                    return (
                                        <FormItem>
                                            <FormLabel>Celular</FormLabel>
                                            <FormControl>
                                                <Input type="text" placeholder="90000-0000" {...field} />
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