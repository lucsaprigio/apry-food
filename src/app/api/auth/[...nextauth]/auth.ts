import { AuthOptions } from "next-auth";
import { Adapter } from "next-auth/adapters";
import EmailProvider from "next-auth/providers/email";

import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from "@/database";


export const nextAuthOptions: AuthOptions = ({
    adapter: PrismaAdapter(prisma) as Adapter,
    session: {
        maxAge: 24 * 60 * 60
    },
    providers: [
        EmailProvider({
            server: process.env.EMAIL_SERVER,
            from: process.env.EMAIL_FROM
        })
    ],

})