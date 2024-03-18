"use client";

import { SessionProvider } from "next-auth/react";

interface SessionProviderProps {
  children: React.ReactNode;
}

export default function Provider({ children }: SessionProviderProps) {
  return <SessionProvider>{children}</SessionProvider>;
}
