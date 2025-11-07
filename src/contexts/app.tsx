"use client";

import { getCookie } from "cookies-next/client";
import { createContext, useState } from "react";
import { DateRange } from "react-day-picker";

interface AppContextData {
  token: string | undefined;
  searchFilter: string;
  setSearchFilter: (search: string) => void;
  dateRange: DateRange | undefined;
  setDateRange: (range: DateRange | undefined) => void;
  consultorFilter: string | undefined;
  setConsultorFilter: (consultorId: string | undefined) => void;
}

interface AppProviderProps {
  children: React.ReactNode;
}

export const AppContext = createContext<AppContextData>({} as AppContextData);

export function AppProvider({ children }: AppProviderProps) {
  const token = getCookie("@varos.token");
  const [searchFilter, setSearchFilter] = useState("");
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [consultorFilter, setConsultorFilter] = useState<string | undefined>();

  return (
    <AppContext.Provider
      value={{
        token,
        searchFilter,
        setSearchFilter,
        dateRange,
        setDateRange,
        consultorFilter,
        setConsultorFilter,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
