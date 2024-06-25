import { AuthOptions } from "next-auth";
import { Adapter } from "next-auth/adapters";
import CredentialsProvider from "next-auth/providers/credentials";
import { compareSync } from 'bcryptjs';

import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from "@/database";


export const nextAuthOptions: AuthOptions = ({
    adapter: PrismaAdapter(prisma) as Adapter,
    session: {
        strategy: "jwt",
        maxAge: 24 * 60 * 60
    },
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: 'email', type: 'text' },
                password: { label: 'password', type: 'text' }
            },
            async authorize(credentials: any) {
                const user = await prisma.user.findUnique({
                    where: { email: credentials?.email }
                });

                if (user && compareSync(credentials.password, user.password)) {
                    console.log(user)
                    return { ...user };
                } else {
                    return null;
                }
            }
        })
    ],
    pages: {
        signIn: '/signin'
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.user = user;
            }

            return token
        },
        async session({ session, token }) {
            session = token.user as any
            return session
        }
    }
})