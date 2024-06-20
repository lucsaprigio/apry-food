import type { Metadata } from "next";
import { Roboto } from 'next/font/google';
import NextAuthSessionProvider from "@/providers/sessionProvider";

import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'ApryFood',
  description: 'ApryFood',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`bg-gradient-to-b from-white to-gray-100 ${roboto.className}`}>
        <NextAuthSessionProvider>
          <Toaster />
          {children}
        </NextAuthSessionProvider>
      </body>
    </html>
  );
}
