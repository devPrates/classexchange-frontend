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
import { CampusTableContext } from "@/context/campus-context"
import { frontendApi } from "@/lib/api"
import { zodResolver } from "@hookform/resolvers/zod"
import { AxiosError } from "axios"
import { useContext, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"


const insertFormSchema = z.object({
    name: z.string({required_error: "Insira um nome"}),
    sigla: z.string({required_error: "Insira uma sigla"}).min(2, {message: "A sigla deve ter no mínimo 2 caracteres"}),
    endereco: z.string({required_error: "Insira um endereço"}),
})

type InsertFormType = z.infer<typeof insertFormSchema>

export default function FormCampus() {
    const [open, setOpen] = useState(false)
    const [insertMessage, setInsertMessage] = useState<JSX.Element>(<></>)

    const campusTableContext = useContext(CampusTableContext)

    const insertForm = useForm<InsertFormType>({
        resolver: zodResolver(insertFormSchema),
        defaultValues: {
            name: "",
            sigla: "",
            endereco: "",
        }
    })

    async function onInsertFormSubmit({ name, sigla, endereco}: InsertFormType) {
        const formatedDate = JSON.stringify({ name, sigla, endereco })

        try {
            const response = await frontendApi.post("/campus", formatedDate)

            setInsertMessage(<p className="text-green-500">Inserido com sucesso!</p>)
            campusTableContext.refreshTable()
        } catch (e) {
            const axiosError = e as AxiosError

            setInsertMessage(<p className="text-red-500">Deu ruim !</p>)
        
        }

        setOpen(false)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">Adicionar Campus</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Adicionar Campus</DialogTitle>
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
                                                <Input type="text" placeholder="NV" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )
                                }}
                            />

                            <FormField
                                control={insertForm.control}
                                name="endereco"
                                render={({ field }) => {
                                    return (
                                        <FormItem>
                                            <FormLabel>Endereço</FormLabel>
                                            <FormControl>
                                                <Input type="text" placeholder="Av. Exemplo, 000" {...field} />
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