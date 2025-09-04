import { Table } from '@tanstack/react-table';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { Button } from '@/shared/components/custom/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/custom/select';

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
}

export function DataTablePagination<TData>({
  table,
}: DataTablePaginationProps<TData>) {
  const pagination = table.getState().pagination;
  const totalRows = table.getFilteredRowModel().rows.length;

  return (
    <div className="text-body-sm flex items-center justify-end gap-4">
      <span>Itens por página</span>
      <Select
        value={`${pagination.pageSize}`}
        onValueChange={(value) => {
          table.setPageSize(Number(value));
        }}
      >
        <SelectTrigger className="w-20">
          <SelectValue placeholder={pagination.pageSize} />
        </SelectTrigger>
        <SelectContent side="top">
          {[10, 20, 25, 30, 40, 50].map((pageSize) => (
            <SelectItem key={pageSize} value={`${pageSize}`}>
              {pageSize}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <span>
        {pagination.pageIndex * pagination.pageSize + 1}–
        {Math.min(totalRows, (pagination.pageIndex + 1) * pagination.pageSize)}{' '}
        de {totalRows}
      </span>
      <Button
        variant="ghost"
        size="icon"
        className="text-black disabled:bg-transparent"
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      >
        <span className="sr-only">Ir para página anterior</span>
        <ChevronLeft />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="text-black disabled:bg-transparent"
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
      >
        <span className="sr-only">Ir para próxima página</span>
        <ChevronRight />
      </Button>
    </div>
  );
}
