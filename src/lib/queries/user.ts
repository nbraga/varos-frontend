import { fetchUsers, FetchUsersResponse } from "@/app/actions/user";
import type { QueryParams } from "@/interfaces/params";

// Wrapper para usar Server Action no cliente via React Query
export async function fetchUsersHandle(
  params: QueryParams = {}
): Promise<FetchUsersResponse> {
  // No cliente, precisamos usar uma abordagem diferente
  if (typeof window !== "undefined") {
    // No cliente, fazer requisição para API route
    const response = await fetch(
      `/api/users?${new URLSearchParams(params as Record<string, string>)}`
    );
    if (!response.ok) {
      throw new Error("Erro ao buscar usuários");
    }
    const data = await response.json();

    return {
      totalItems: data.totalItems || 0,
      totalPages: data.totalPages || 1,
      users: data.users || [],
    };
  }

  // No servidor, usar Server Action diretamente
  return fetchUsers(params);
}
