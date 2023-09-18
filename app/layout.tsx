import { Analytics } from '@vercel/analytics/react';
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import {NavBar} from "@/components";
import React from "react";
import { Providers } from './providers';
import Script from 'next/script';
import Head from 'next/head';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: '0xNotFungible',
    description: '0x Not Fungible',
  }

export default function RootLayout({children,}: { children: React.ReactNode }) {
    return (
    <html lang="en">
        <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
      />

      <Script strategy="lazyOnload">
        {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
                    page_path: window.location.pathname,
                    });
                `}
      </Script>
       <Head>
            <title>0x Not Fungible</title>
       </Head>
        <body className={`${inter.className} bg-white dark:bg-[#434343]`}>

            <NavBar />
                <Providers>
                    {children}
                </Providers>
                <Analytics />
        </body>
    </html>)
}