"use server";

import type { QueryParams } from "@/interfaces/params";
import { UserFormattedDataProps } from "@/interfaces/user";
import { prisma } from "@/lib/prisma";
import type { User } from "@prisma/client";
import { AxiosError } from "axios";

export interface FetchUsersResponse {
  users: UserFormattedDataProps[];
  totalPages: number;
  totalItems: number;
}

export async function fetchUsers(
  params: QueryParams = {
    search: "",
    page: 1,
    limit: 10,
    order: "asc",
  }
): Promise<FetchUsersResponse> {
  try {
    const [users, totalItems] = await Promise.all([
      prisma.user.findMany({
        where: {
          ...(params.search && {
            OR: [
              { name: { contains: params.search, mode: "insensitive" } },
              { email: { contains: params.search, mode: "insensitive" } },
              { cpf: { contains: params.search, mode: "insensitive" } },
            ],
          }),
        },
        orderBy: {
          createdAt: params.order === "asc" ? "asc" : "desc",
        },
      }),
      prisma.user.count({
        where: {
          ...(params.search && {
            OR: [
              { name: { contains: params.search, mode: "insensitive" } },
              { email: { contains: params.search, mode: "insensitive" } },
              { cpf: { contains: params.search, mode: "insensitive" } },
            ],
          }),
        },
      }),
    ]);

    const formattedUsers: UserFormattedDataProps[] = users.map(
      (user: User) => ({
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        cpf: user.cpf,
        age: user.age,
        address: {
          street: user.street,
          number: user.number,
          neighborhood: user.neighborhood,
          city: user.city,
          state: user.state,
          zipCode: user.zipCode,
        },
        type: (user.type === "CLIENTE" ? "Cliente" : "Consultor") as
          | "Cliente"
          | "Consultor",
        clientIds: user.clientIds,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      })
    );

    return {
      users: formattedUsers,
      totalPages: Math.ceil(totalItems / (params.limit || 10)),
      totalItems: totalItems,
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status && error.response.status >= 500) {
        throw new Error("Erro interno do servidor");
      }

      throw new Error(
        error.response?.data?.message || `Erro HTTP ${error.response?.status}`
      );
    }

    throw error;
  }
}
