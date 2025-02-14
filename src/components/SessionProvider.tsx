"use client"
import { ReactNode } from "react";
import { Session } from "next-auth";
import { SessionProvider as NextAuthSessionProvider } from "next-auth/react"

interface SessionProviderProps {
    children: ReactNode;
    session?: Session | null;
  }
  

export default function SessionProvider({ children, session }: SessionProviderProps) {
  return <NextAuthSessionProvider session={session}>{children}</NextAuthSessionProvider>
}

