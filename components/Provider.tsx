"use client";

import { SessionProvider } from "next-auth/react";
import ToasterComponent from "./Toaster";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      {children}
      <ToasterComponent />
    </SessionProvider>
  );
}