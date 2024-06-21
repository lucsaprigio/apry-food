import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';


const secret = process.env.NEXTAUTH_SECRET;

export async function middleware(req: NextRequest) {
    try {
        const token = await getToken({ req, secret });

        if (!token) {
            return NextResponse.json('Usuário não autenticado', { status: 403 })
        }

        return NextResponse.next();

    } catch (error) {
        return NextResponse.json('Token inválido.', { status: 401 });
    }
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: '/api/xml/:path*',
}