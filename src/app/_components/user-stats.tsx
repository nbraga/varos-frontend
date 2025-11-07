"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchUsersHandle } from "@/lib/queries/user";
import { useQuery } from "@tanstack/react-query";
import { Calendar, TrendingUp, UserPlus, Users } from "lucide-react";
import { useMemo } from "react";

export const UserStats = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["users", "stats"],
    queryFn: () =>
      fetchUsersHandle({
        page: 1,
        limit: 1000,
        type: "Cliente",
        search: "",
      }),
    staleTime: 1 * 60 * 1000,
  });

  const stats = useMemo(() => {
    if (!data?.users) {
      return {
        total: 0,
        last7Days: 0,
        clients: 0,
        consultants: 0,
      };
    }

    const now = new Date();
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    const last7Days = data.users.filter(
      (user) => new Date(user.createdAt) >= sevenDaysAgo
    ).length;

    const clients = data.users.filter((user) => user.type === "Cliente").length;
    const consultants = data.users.filter(
      (user) => user.type === "Consultor"
    ).length;

    return {
      total: data.users.length,
      last7Days,
      clients,
      consultants,
    };
  }, [data]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="h-4 bg-muted rounded w-24"></div>
              <div className="h-4 w-4 bg-muted rounded"></div>
            </CardHeader>
            <CardContent>
              <div className="h-8 bg-muted rounded w-16 mb-1"></div>
              <div className="h-3 bg-muted rounded w-32"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Total de Usuários
          </CardTitle>
          <Users className="h-4 w-4 text-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.total}</div>
          <p className="text-xs text-muted-foreground mt-1">
            Todos os usuários cadastrados
          </p>
        </CardContent>
      </Card>

      <Card className="hover:shadow-lg transition-shadow border-green-200 dark:border-green-900">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Últimos 7 Dias
          </CardTitle>
          <Calendar className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">
            {stats.last7Days}
          </div>
          <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
            <TrendingUp className="h-3 w-3" />
            Novos usuários esta semana
          </p>
        </CardContent>
      </Card>

      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Clientes
          </CardTitle>
          <UserPlus className="h-4 w-4 text-purple-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.clients}</div>
          <p className="text-xs text-muted-foreground mt-1">
            Total de clientes ativos
          </p>
        </CardContent>
      </Card>

      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Consultores
          </CardTitle>
          <Users className="h-4 w-4 text-orange-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.consultants}</div>
          <p className="text-xs text-muted-foreground mt-1">
            Total de consultores
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
