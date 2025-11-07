export interface QueryParams {
  search?: string;
  page?: number;
  limit?: number;
  orderBy?: string;
  order?: "asc" | "desc";
  type?: "Cliente" | "Consultor";
}
