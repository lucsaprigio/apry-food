'use client'

import Image from "next/image";
import { ReactNode, useState } from "react"
import LogoGoogle from "/public/images/logo-google.svg";
import { z } from 'zod';
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from "next-auth/react";
import { toast } from "@/components/ui/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
import { useRouter } from "next/navigation";

const handleSigninFormSchema = z.object({
    email: z.string().min(1, 'E-mail obrigatório').email('Digite um e-mail válido'),
    password: z.string().min(1, 'Digite sua senha')
});

export function SigninForm() {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(handleSigninFormSchema)
    });

    const router = useRouter();

    const [visible, setVisible] = useState(false);

    async function handleSignIn(data: any) {
        try {
            const result = await signIn('credentials', {
                email: data.email,
                password: data.password,
                redirect: false
            });
            console.log(result);

            if (result?.error) {
                toast({
                    variant: "destructive",
                    title: "Usuário ou senha incorreta",
                    description: "Por favor, tente novamente",
                    action: (
                        <ToastAction altText="Fechar">Ok</ToastAction>
                    )
                })
            }

            router.push('/painel')
        } catch (error) {
            toast({
                title: "Ocorreu um erro",
                description: "Não foi possível conectar ao servidor"
            })
        }
    }

    return (
        <form
            onSubmit={handleSubmit(handleSignIn)}
            className="relative flex flex-col w-2/6 bg-opacity-75 bg-blue-100 rounded-md my-10 z-50"

        >
            <div className="p-3">
                <span className="font-bold text-blue-950">
                    ApryFood
                </span>
            </div>
            <div className="flex flex-col items-center justify-center py-10 gap-2">
                <span className="text-3xl font-bold">
                    Bem-vindo!
                </span>
                <span className="text-lg">
                    Fazer Login
                </span>
            </div>
            <section className="flex flex-col items-center justify-between gap-3 md:p-10">
                <div className="flex flex-col w-full gap-3">
                    <input
                        className="bg-opacity-50 rounded-md p-4 shadow-md"
                        type="text"
                        placeholder="E-mail"
                        {...register('email')}
                    />
                    {errors.email && (
                        <span className="text-red-700">
                            {errors.email?.message as ReactNode}*
                        </span>
                    )}
                    <input
                        className="bg-opacity-50  rounded-md p-4 shadow-md"
                        type={!visible ? "password" : "text"}
                        placeholder="Senha"
                        {...register('password')}
                    />
                    {errors.email && (
                        <span className="text-red-700">
                            {errors.password?.message as ReactNode}*
                        </span>
                    )}
                </div>
                <div className="flex items-center justify-center w-full">
                    <button className="w-full bg-blue-100 p-4 rounded-lg shadow-md font-bold hover:brightness-95 duration-100 text-black">
                        Entrar
                    </button>
                </div>
                <div className="border-b-[1px] border-blue-950 w-full py-3 opacity-70" />
                <div className="w-full flex flex-col items-center justify-center gap-3">
                    <strong>Ou</strong>
                    <button
                        type="submit"
                        className="flex w-full items-center justify-center gap-3 p-3 bg-zinc-50 rounded-md font-bold hover:brightness-95 transition-all duration-100"
                    >
                        <Image src={LogoGoogle} alt="Google-logo" width={24} height={24} />
                        Entrar com Google
                    </button>
                </div>
            </section>
        </form>
    )
}