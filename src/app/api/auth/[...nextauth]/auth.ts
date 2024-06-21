import { AuthOptions } from "next-auth";
import { Adapter } from "next-auth/adapters";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare, compareSync } from 'bcryptjs';

import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from "@/database";


export const nextAuthOptions: AuthOptions = ({
    adapter: PrismaAdapter(prisma) as Adapter,
    session: {
        maxAge: 24 * 60 * 60
    },
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { type: 'text' },
                password: { type: 'password' }
            },
            async authorize(credentials: any) {
                const user = await prisma.user.findUnique({
                    where: { email: credentials?.email }
                });

                if (user && compareSync(credentials.password, user.password)) {
                    return user;
                }

                return null;
            }
        })
    ],
    pages: {
        signIn: '/signin'
    },
    callbacks: {
        async session({ session, user }) {
            session = user.id as any;
            return session
        }
    }
})