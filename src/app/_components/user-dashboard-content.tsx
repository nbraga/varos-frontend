"use client";

import { UserDialog } from "@/app/_components/user-dialog";
import { UserFilters } from "@/app/_components/user-filters";
import { UserTable } from "@/app/_components/user-table";
import type { UserFormData } from "@/app/schemas/user";
import { mockUsers } from "@/data/mockUsers";
import type { User } from "@/interfaces/user";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { toast } from "sonner";

export const UserDashboardContent = () => {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const [searchFilter, setSearchFilter] = useState("");
  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  const availableClients = users.filter((u) => u.type === "Cliente");

  const handleCreateUser = (data: UserFormData) => {
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: data.name,
      email: data.email,
      phone: data.phone,
      cpf: data.cpf,
      age: data.age,
      address: {
        street: data.address.street,
        number: data.address.number,
        neighborhood: data.address.neighborhood,
        city: data.address.city,
        state: data.address.state,
        zipCode: data.address.zipCode,
      },
      type: data.type,
      clientIds: data.clientIds,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setUsers([...users, newUser]);
    setDialogOpen(false);
    toast.success("Usuário criado com sucesso!");
  };

  const handleUpdateUser = (data: UserFormData) => {
    if (!editingUser) return;

    const updatedUsers = users.map((user) =>
      user.id === editingUser.id
        ? {
            ...user,
            name: data.name,
            email: data.email,
            phone: data.phone,
            cpf: data.cpf,
            age: data.age,
            address: {
              street: data.address.street,
              number: data.address.number,
              neighborhood: data.address.neighborhood,
              city: data.address.city,
              state: data.address.state,
              zipCode: data.address.zipCode,
            },
            type: data.type,
            clientIds: data.clientIds,
            updatedAt: new Date(),
          }
        : user
    );
    setUsers(updatedUsers);
    setDialogOpen(false);
    setEditingUser(null);
    toast.success("Usuário atualizado com sucesso!");
  };

  const handleDeleteUser = (userId: string) => {
    setUsers(users.filter((user) => user.id !== userId));
    toast.success("Usuário removido com sucesso!");
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
  return (
    <>
      <UserFilters
        searchFilter={searchFilter}
        dateRange={dateRange}
        onSearchFilterChange={setSearchFilter}
        onDateRangeChange={setDateRange}
      />

      <UserTable
        users={[]}
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
