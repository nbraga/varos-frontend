import { Table } from "@tanstack/react-table";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  total: number;
}

export function DataTablePagination<TData>({
  table,
  total,
}: DataTablePaginationProps<TData>) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between p-0 md:px-2 space-y-2 md:space-y-0">
      <p className="flex-1 text-sm text-muted-foreground">
        {total} {total > 1 ? "itens" : "item"} encontrado
        {total > 1 ? "s" : ""}
      </p>
      <div className="flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0 md:space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium text-muted-foreground">
            Linhas por página
          </p>
          <Select
            value={String(table.getState().pagination?.pageSize)}
            onValueChange={(value) => table.setPageSize(Number(value))}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue
                placeholder={String(table.getState().pagination?.pageSize)}
              />
            </SelectTrigger>
            <SelectContent
              side="top"
              className="bg-background border border-border rounded-xl"
            >
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-row items-center space-x-2 text-sm font-medium text-muted-foreground">
          <p>
            Página {table.getState().pagination.pageIndex + 1} de{" "}
            {table.getPageCount()}
          </p>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              className="h-8 w-8 p-0 bg-transparent dark:bg-clientInteractive border-clientInteractive-border dark:border-none"
              onClick={() => table.firstPage()}
              disabled={table.getState().pagination.pageIndex === 0}
            >
              <span className="sr-only">Primeira página</span>
              <ChevronsLeft size={18} />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0 bg-transparent dark:bg-clientInteractive border-clientInteractive-border dark:border-none"
              disabled={!table.getCanPreviousPage()}
              onClick={() => table.previousPage()}
            >
              <span className="sr-only">Página anterior</span>
              <ChevronLeft size={18} />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0 bg-transparent dark:bg-clientInteractive border-clientInteractive-border dark:border-none"
              disabled={!table.getCanNextPage()}
              onClick={() => table.nextPage()}
            >
              <span className="sr-only">Próxima página</span>
              <ChevronRight size={18} />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0 bg-transparent dark:bg-clientInteractive border-clientInteractive-border dark:border-none"
              disabled={
                table.getState().pagination.pageIndex ===
                table.getPageCount() - 1
              }
              onClick={() => table.lastPage()}
            >
              <span className="sr-only">Última página</span>
              <ChevronsRight size={18} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
