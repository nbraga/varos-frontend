"use client";

import { ThemeToggle } from "@/components/theme-toggle";
import { Users } from "lucide-react";

export const Header = () => {
  return (
    <header className="w-full border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                Dashboard de Usuários
              </h1>
              <p className="text-muted-foreground">
                Gerencie todos os usuários do sistema
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
};
