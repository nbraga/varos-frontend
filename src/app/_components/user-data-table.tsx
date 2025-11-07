"use client";

import { userColumns } from "@/app/_components/user-columns";
import { UserDialog } from "@/app/_components/user-dialog";
import { UserFilters } from "@/app/_components/user-filters";
import { UserFormData } from "@/app/schemas/user";
import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useApp } from "@/hooks/use-app";
import { useCreateUser, useDeleteUser, useUpdateUser } from "@/hooks/use-users";
import type { User, UserFormattedDataProps } from "@/interfaces/user";
import { itemVariants } from "@/lib/motion-animates";
import { fetchUsersHandle } from "@/lib/queries/user";
import { useQuery } from "@tanstack/react-query";
import { PaginationState } from "@tanstack/react-table";
import { motion } from "framer-motion";
import { FileText, Plus } from "lucide-react";
import { useState } from "react";

export function UserDataTable() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<
    User | UserFormattedDataProps | null
  >(null);

  const {
    searchFilter,
    setSearchFilter,
    dateRange,
    setDateRange,
    consultorFilter,
    setConsultorFilter,
  } = useApp();

  const createUser = useCreateUser();
  const updateUser = useUpdateUser();
  const deleteUser = useDeleteUser();
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  // Buscar todos os consultores para fazer o filtro
  const { data: consultoresData } = useQuery({
    queryKey: ["consultores", "all"],
    queryFn: () =>
      fetchUsersHandle({
        page: 1,
        limit: 1000,
        type: "Consultor",
        search: "",
      }),
    staleTime: 5 * 60 * 1000,
  });

  const { data, isLoading, error } = useQuery({
    queryKey: [
      "users",
      pagination.pageIndex + 1,
      pagination.pageSize,
      searchFilter,
      consultorFilter,
    ],
    queryFn: () =>
      fetchUsersHandle({
        page: pagination.pageIndex + 1,
        limit: pagination.pageSize,
        type: "Cliente",
        search: searchFilter,
      }),
    staleTime: 1 * 60 * 1000,
    retry: 3,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  // Filtrar usuários do lado do cliente
  const filteredUsers =
    data?.users.filter((user) => {
      let passFilters = true;

      // Filtro por consultor
      if (consultorFilter) {
        // Encontrar o consultor selecionado
        const consultor = consultoresData?.users.find(
          (c) => c.id === consultorFilter
        );
        // Se o consultor existe e tem clientIds, verificar se o user está na lista
        if (consultor?.clientIds) {
          passFilters = consultor.clientIds.includes(user.id);
        } else {
          passFilters = false;
        }
      }

      // Filtro por data
      if (passFilters && (dateRange?.from || dateRange?.to)) {
        const userDate = new Date(user.createdAt);

        if (dateRange.from && dateRange.to) {
          passFilters = userDate >= dateRange.from && userDate <= dateRange.to;
        } else if (dateRange.from) {
          passFilters = userDate >= dateRange.from;
        } else if (dateRange.to) {
          passFilters = userDate <= dateRange.to;
        }
      }

      return passFilters;
    }) || [];

  const availableClients = data?.users.filter((u) => u.type === "Cliente");

  const handleCreateUser = (data: UserFormData) => {
    createUser.mutate(data, {
      onSuccess: () => {
        setDialogOpen(false);
      },
    });
  };

  const handleUpdateUser = (data: UserFormData) => {
    if (!editingUser) return;

    updateUser.mutate(
      { id: editingUser.id, data },
      {
        onSuccess: () => {
          setDialogOpen(false);
          setEditingUser(null);
        },
      }
    );
  };

  const handleDeleteUser = (userId: string) => {
    deleteUser.mutate(userId);
  };

  const handleEditClick = (user: User | UserFormattedDataProps) => {
    setEditingUser(user);
    setDialogOpen(true);
  };

  const handleDialogClose = (open: boolean) => {
    setDialogOpen(open);
    if (!open) {
      setEditingUser(null);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-32">
        <div className="text-muted-foreground">Carregando...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-32">
        <div className="text-red-500">Erro ao carregar dados</div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{
        ...itemVariants.hidden,
      }}
      animate={{
        ...itemVariants.visible,
      }}
    >
      <Card>
        <CardHeader>
          <div className="flex w-full justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <FileText className="ml-2 h-4 w-4" />
              <h1 className="text-lg font-bold">Lista de usuários</h1>
            </CardTitle>
            <Button
              onClick={() => setDialogOpen(true)}
              className="cursor-pointer"
            >
              <Plus className="ml-2 h-4 w-4" />
              Criar usuário{" "}
            </Button>
          </div>
          <UserFilters
            searchFilter={searchFilter}
            dateRange={dateRange}
            onSearchFilterChange={setSearchFilter}
            onDateRangeChange={setDateRange}
            consultorFilter={consultorFilter}
            onConsultorFilterChange={setConsultorFilter}
          />
        </CardHeader>
        <CardContent>
          <DataTable
            columns={userColumns}
            data={filteredUsers}
            pages={data?.totalPages || 0}
            total={filteredUsers.length}
            pagination={pagination}
            setPagination={setPagination}
            meta={{
              onEdit: handleEditClick,
              onDelete: handleDeleteUser,
            }}
          />
        </CardContent>
        <UserDialog
          open={dialogOpen}
          onOpenChange={handleDialogClose}
          onSubmit={editingUser ? handleUpdateUser : handleCreateUser}
          user={editingUser}
          availableClients={availableClients || []}
          isLoading={createUser.isPending || updateUser.isPending}
        />
      </Card>
    </motion.div>
  );
}
