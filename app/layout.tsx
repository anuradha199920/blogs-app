import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import {NavBar} from "@/components";
import React from "react";
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Crypto Blogs App',
  description: 'Blogs for web3 enthusiasts ',
}

export default function RootLayout({children,}: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={`${inter.className} bg-[#EFEBE7] dark:bg-[#434343]`}>
                <NavBar />
                <Providers>
                    {children}
                </Providers>
            </body>
        </html>
    )
}