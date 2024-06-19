'use client'

import Image from "next/image";
import { useState } from "react"
import LogoGoogle from "/public/images/logo-google.svg";

export function SigninForm() {
    const [visible, setVisible] = useState(false);

    return (
        <form className="relative flex flex-col w-2/6 bg-opacity-75 bg-blue-100 rounded-md my-10 z-50">
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
                    <input className="bg-opacity-50  rounded-md p-4 shadow-md" />
                    <input
                        className="bg-opacity-50  rounded-md p-4 shadow-md"
                        type={!visible ? "password" : "text"}
                    />
                </div>
                <div className="flex items-center justify-center w-full">
                    <button className="w-full bg-gradient-to-r from-blue-50 to-blue-400 p-4 rounded-lg shadow-md font-bold hover:brightness-95 duration-100">
                        Entrar
                    </button>
                </div>
                <div className="border-b-[1px] border-blue-950 w-full py-3 opacity-70" />
                <div className="w-full flex flex-col items-center justify-center gap-3">
                    <strong>Ou</strong>
                    <button className="flex w-full items-center justify-center gap-3 p-3 bg-gray-100 rounded-md font-bold hover:brightness-95 transition-all duration-100">
                        <Image src={LogoGoogle} alt="Google-logo" width={24} height={24} />
                        Entrar com Google
                    </button>
                </div>
            </section>
        </form>
    )
}