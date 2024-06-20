// src/app/app/layout.tsx
"use client";

import { SessionProvider } from 'next-auth/react';
import { type ReactNode } from 'react';

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <main>{children}</main>
    </SessionProvider>
  );
}
