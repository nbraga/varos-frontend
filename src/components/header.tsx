"use client";

import { ThemeToggle } from "@/components/theme-toggle";
import Image from "next/image";

export const Header = () => {
  return (
    <header className="w-full border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="relative h-16 w-16  ">
              <Image
                src="/logo-varos.png"
                alt="Varos Logo"
                fill
                className="object-contain"
                priority
              />
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
