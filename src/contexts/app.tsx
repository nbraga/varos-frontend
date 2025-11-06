"use client";

import { getCookie } from "cookies-next/client";
import { createContext } from "react";

interface AppContextData {
  token: string | undefined;
}

interface AppProviderProps {
  children: React.ReactNode;
}

export const AppContext = createContext<AppContextData>({} as AppContextData);

export function AppProvider({ children }: AppProviderProps) {
  const token = getCookie("@varos.token");

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
