import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/header/header";
import { ThemeProvider } from "@/components/theme/theme-context";
import Providers from "./providers";

import { Toaster } from 'sonner';
import { getServerAuthUser } from "@/lib/auth/server";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Maxter Planner",
  description: "Maxter Planner. Task manager for IT minds and more.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const authUser = await getServerAuthUser();

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Toaster />
        <Providers>
          <ThemeProvider>
            <Header authUser={authUser} />
            {children}
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}