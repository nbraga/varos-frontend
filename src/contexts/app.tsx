"use client";

import { useTheme } from "@/hooks/use-theme";

import { getCookie } from "cookies-next/client";
import { useRouter } from "next/navigation";
import { createContext } from "react";

interface AppContextData {
  token: string | undefined;
}

interface AppProviderProps {
  children: React.ReactNode;
}

export const AppContext = createContext<AppContextData>({} as AppContextData);

export function AppProvider({ children }: AppProviderProps) {
  const router = useRouter();
  const { setTheme } = useTheme();

  const token = getCookie("@clics.token");

  return (
    <AppContext.Provider
      value={{
        token,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
