import { NextRequest, NextResponse } from "next/server";
import { hashSync } from 'bcryptjs';
import { prisma } from "@/database";

export async function POST(req: NextRequest) {
    try {
        const { email, password, name } = await req.json();

        const hashPassword = hashSync(password)
        await prisma.user.create({
            data: {
                email: email,
                password: hashPassword,
                adm: false,
                name: name
            }
        });

        return NextResponse.json('Usuário criado com sucesso.');
    } catch (err) {
        return NextResponse.json(err);
    }
}