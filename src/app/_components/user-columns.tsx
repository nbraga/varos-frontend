"use client";

import { UserDataTableActions } from "@/app/_components/user-data-table-actions";
import type { User, UserFormattedDataProps } from "@/interfaces/user";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const formatAddress = (address: User["address"]) => {
  return `${address.street}, ${address.number} - ${address.neighborhood}, ${address.city}/${address.state}`;
};

export const userColumns: ColumnDef<UserFormattedDataProps>[] = [
  {
    accessorKey: "name",
    header: () => <span>Nome</span>,
    cell: ({ row }) => {
      return <span className="font-medium">{row.getValue("name")}</span>;
    },
  },
  {
    accessorKey: "email",
    header: () => <span>Email</span>,
    cell: ({ row }) => {
      return <span>{row.getValue("email")}</span>;
    },
  },
  {
    accessorKey: "phone",
    header: () => <span>Telefone</span>,
    cell: ({ row }) => {
      return <span>{row.getValue("phone")}</span>;
    },
  },
  {
    accessorKey: "cpf",
    header: () => <span>CPF</span>,
    cell: ({ row }) => {
      return <span>{row.getValue("cpf")}</span>;
    },
  },
  {
    accessorKey: "age",
    header: () => <span>Idade</span>,
    cell: ({ row }) => {
      return <span>{row.getValue("age")}</span>;
    },
  },
  {
    accessorKey: "address",
    header: () => <span>Endereço</span>,
    cell: ({ row }) => {
      const address = row.getValue("address") as User["address"];
      return (
        <span
          className="max-w-xs truncate block"
          title={formatAddress(address)}
        >
          {formatAddress(address)}
        </span>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: () => <span>Criado em</span>,
    cell: ({ row }) => {
      const date = row.getValue("createdAt") as Date;
      return <span>{format(date, "dd/MM/yyyy HH:mm", { locale: ptBR })}</span>;
    },
  },
  {
    accessorKey: "updatedAt",
    header: () => <span>Atualizado em</span>,
    cell: ({ row }) => {
      const date = row.getValue("updatedAt") as Date;
      return <span>{format(date, "dd/MM/yyyy HH:mm", { locale: ptBR })}</span>;
    },
  },
  {
    id: "actions",
    header: () => <span></span>,
    cell: ({ row, table }) => {
      return <UserDataTableActions row={row} table={table} />;
    },
  },
];
