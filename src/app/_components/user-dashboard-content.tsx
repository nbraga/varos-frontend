"use client";

import { UserDialog } from "@/app/_components/user-dialog";
import { UserFilters } from "@/app/_components/user-filters";
import { UserTable } from "@/app/_components/user-table";
import type { UserFormData } from "@/app/schemas/user";
import {
  useCreateUser,
  useDeleteUser,
  useUpdateUser,
  useUsers,
} from "@/hooks/use-users";
import type { User } from "@/interfaces/user";
import { useState } from "react";
import { DateRange } from "react-day-picker";

export const UserDashboardContent = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [searchFilter, setSearchFilter] = useState("");
  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  const { data: users = [], isLoading } = useUsers(searchFilter);
  const createUser = useCreateUser();
  const updateUser = useUpdateUser();
  const deleteUser = useDeleteUser();

  const availableClients = users.filter((u) => u.type === "Cliente");

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
    if (confirm("Tem certeza que deseja deletar este usuário?")) {
      deleteUser.mutate(userId);
    }
  };

  const handleEditClick = (user: User) => {
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
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-gray-100 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Carregando usuários...
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <UserFilters
        searchFilter={searchFilter}
        dateRange={dateRange}
        onSearchFilterChange={setSearchFilter}
        onDateRangeChange={setDateRange}
      />

      <UserTable
        users={users}
        onEdit={handleEditClick}
        onDelete={handleDeleteUser}
      />

      <UserDialog
        open={dialogOpen}
        onOpenChange={handleDialogClose}
        onSubmit={editingUser ? handleUpdateUser : handleCreateUser}
        user={editingUser}
        availableClients={availableClients}
      />
    </>
  );
};
