"use client"

import { LoginResponseType } from "@/app/api/auth/login/route";
import { CustomAlert, CustomAlertType } from "@/components/main/custon-alert";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AuthContext } from "@/context/auth-context";
import { frontendApi } from "@/lib/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useContext, useState, Suspense } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import jwt from "jsonwebtoken";

const loginFormSchema = z.object({
  email: z.string().email({ message: "Email inválido" }),
  password: z.string().min(2, { message: "Senha inválida" })
})

type LoginFormType = z.infer<typeof loginFormSchema>;

interface DecodedToken {
  scope: "ADMIN" | "BASIC"; // Tipagem para o campo scope
}

export default function LoginForm() {

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(<></>);

  const authContext = useContext(AuthContext);

  const router = useRouter();

  const loginForm = useForm<LoginFormType>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  async function handleLoginSubmit({ email, password }: LoginFormType) {
    setIsLoading(true);

    const data = JSON.stringify({
      email,
      password
    });

    try {
      const result = await frontendApi.post("/auth/login", data);

      const { token, error } = result.data as LoginResponseType;

      if (token) {
        const decoded = jwt.decode(token) as DecodedToken | null;
        authContext.signIn(token);

        // Verificar o escopo e redirecionar
        if (decoded?.scope === "ADMIN") {
          router.push("/dashboard");
        } else if (decoded?.scope === "BASIC") {
          router.push("/dashboard/horarios");
        } else {
          throw new Error("Scope inválido");
        }
      }
      else {
        const message = <CustomAlert
          type={CustomAlertType.ERROR}
          title="Erro ao logar-se!"
          message={error || "Erro desconhecido"}
        />;

        setMessage(message);
      }

    } catch (e) {
      const axiosError = e as AxiosError;

      const message = <CustomAlert
        type={CustomAlertType.ERROR}
        title="Erro ao logar-se!"
        message={axiosError.message}
      />;

      setMessage(message);
    } finally {
      setIsLoading(false);
    }
  }


  return (
    <>
      <Form {...loginForm}>
        <form onSubmit={loginForm.handleSubmit(handleLoginSubmit)} className="space-y-3">
          {message}
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
          <Suspense fallback={<Button className="w-full mt-4" disabled>Carregando...</Button>}>
            <Button type="submit" className="w-full mt-4" disabled={isLoading}>
              {isLoading ? "Entrando..." : "Login"}
            </Button>
          </Suspense>
        </form>
      </Form>

    </>
  )
}