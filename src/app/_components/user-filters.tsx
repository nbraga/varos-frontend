"use client";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { fetchUsersHandle } from "@/lib/queries/user";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Search } from "lucide-react";
import { DateRange } from "react-day-picker";

interface UserFiltersProps {
  searchFilter: string;
  dateRange: DateRange | undefined;
  onSearchFilterChange: (value: string) => void;
  onDateRangeChange: (range: DateRange | undefined) => void;
  consultorFilter: string | undefined;
  onConsultorFilterChange: (value: string | undefined) => void;
}

export function UserFilters({
  searchFilter,
  dateRange,
  onSearchFilterChange,
  onDateRangeChange,
  consultorFilter,
  onConsultorFilterChange,
}: UserFiltersProps) {
  // Buscar lista de consultores
  const { data: consultoresData } = useQuery({
    queryKey: ["consultores"],
    queryFn: () =>
      fetchUsersHandle({
        page: 1,
        limit: 1000,
        type: "Consultor",
        search: "",
      }),
    staleTime: 5 * 60 * 1000,
  });

  const consultores = consultoresData?.users || [];

  return (
    <Card className="p-6 mb-6">
      <h2 className="text-lg font-semibold mb-4">Filtros</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="search-filter">Buscar</Label>
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              id="search-filter"
              placeholder="Buscar por nome ou email..."
              value={searchFilter}
              onChange={(e) => onSearchFilterChange(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Filtrar por Consultor</Label>
          <Select
            value={consultorFilter || "todos"}
            onValueChange={(value) =>
              onConsultorFilterChange(value === "todos" ? undefined : value)
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Todos os consultores" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos os consultores</SelectItem>
              {consultores.map((consultor) => (
                <SelectItem key={consultor.id} value={consultor.id}>
                  {consultor.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Período de criação</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !dateRange && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateRange?.from ? (
                  dateRange.to ? (
                    <>
                      {format(dateRange.from, "dd/MM/yyyy")} -{" "}
                      {format(dateRange.to, "dd/MM/yyyy")}
                    </>
                  ) : (
                    format(dateRange.from, "dd/MM/yyyy")
                  )
                ) : (
                  <span>Selecione o período</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={dateRange?.from}
                selected={dateRange}
                onSelect={onDateRangeChange}
                numberOfMonths={2}
                className="pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </Card>
  );
}
