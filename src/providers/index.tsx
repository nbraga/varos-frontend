"use client";

import { Toaster } from "@/components/ui/sonner";
import { AppProvider } from "@/contexts/app";
import { ReactQueryProvider } from "@/providers/react-query-provider";
import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      themes={["light", "dark"]}
    >
      <AppProvider>
        <ReactQueryProvider>{children}</ReactQueryProvider>
        <Toaster />
      </AppProvider>
    </ThemeProvider>
  );
}
