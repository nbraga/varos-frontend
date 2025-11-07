"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import type { User, UserFormattedDataProps } from "@/interfaces/user";
import { Row, Table } from "@tanstack/react-table";
import { Edit, Trash2 } from "lucide-react";
import { useState } from "react";

interface UserDataTableActionsProps<TData> {
  row: Row<TData>;
  table: Table<TData>;
}

export function UserDataTableActions<TData>({
  row,
  table,
}: UserDataTableActionsProps<TData>) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const user = row.original as UserFormattedDataProps | User;
  const meta = table.options.meta as {
    onEdit?: (user: UserFormattedDataProps | User) => void;
    onDelete?: (userId: string) => void;
  };
  const handleEdit = () => {
    if (meta?.onEdit) {
      meta.onEdit(user);
    }
  };

  const handleDelete = () => {
    if (meta?.onDelete) {
      meta.onDelete(user.id);
      setShowDeleteDialog(false);
    }
  };

  return (
    <>
      <div className="flex items-center space-x-2 justify-end">
        <Button variant="outline" size="sm" onClick={handleEdit}>
          <Edit className="mr-2 h-4 w-4" />
          Atualizar
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
          onClick={() => setShowDeleteDialog(true)}
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Remover
        </Button>
      </div>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja remover o usuário{" "}
              <strong>{user.name}</strong>? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Remover
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
