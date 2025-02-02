"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const loginFormSchema = z.object({
    email: z.string().email({message: "Email inválido"}),
    password: z.string().min(2, {message: "Senha inválida"})
})

type LoginFormType = z.infer<typeof loginFormSchema>;

export default function LoginForm() {

    const loginForm = useForm<LoginFormType>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

        function handleLoginSubmit({ email, password }: LoginFormType) {
            console.log(email, password)
        }k


    return (
        <>
        <form >
        <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="example@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Senha</Label>
                  <a
                    href="#"
                    className="ml-auto text-sm underline-offset-2 hover:underline"
                  >
                    Esqueceu sua senha?
                  </a>
                </div>
                <Input id="password" type="password" placeholder="****" required />
              </div>
              <Button type="submit" className="w-full mt-6">
                Login
              </Button>
        </form>
        </>
    )
}