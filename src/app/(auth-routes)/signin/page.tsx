'use client'
import { SigninForm } from "@/app/Components/signin-form";

export default function SignIn() {
    return (
        <main className="flex justify-center min-[640px]:h-screen h-full bg-bg-signin bg-cover bg-no-repeat after:absolute after:left-0 after:top-0 after:w-full after:h-full after:bg-gray-200 after:opacity-5 -z-3">
            <SigninForm />
        </main>
    );
}
