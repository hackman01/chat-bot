"use client"
import Providers from "@/components/Provider";
import "../globals.css";
import { Suspense } from 'react';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Suspense fallback={null}>
            {children}
          </Suspense>
        </Providers>
      </body>
    </html>
  );
}