"use client"

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { frontendApi } from "@/lib/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const loginFormSchema = z.object({
  email: z.string().email({ message: "Email inválido" }),
  password: z.string().min(2, { message: "Senha inválida" })
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

  async function handleLoginSubmit({ email, password }: LoginFormType) {
    const data = JSON.stringify({ email, password });
    
    await frontendApi.post("/auth/login", data)
  }




  return (
    <>
      <Form {...loginForm}>
        <form onSubmit={loginForm.handleSubmit(handleLoginSubmit)} className="space-y-3">

          <FormField
            control={loginForm.control}
            name="email"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="example@ifms.edu.br" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )
            }}
          />

          <FormField
            control={loginForm.control}
            name="password"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="****" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )
            }}
          />
          <Button type="submit" className="w-full mt-4">Login</Button>
        </form>
      </Form>

    </>
  )
}