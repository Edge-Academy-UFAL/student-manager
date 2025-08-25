'use client';

import * as React from 'react';
import { cn } from '@/shared/lib/utils';

import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from '@/shared/components/ui/table';

function TableHeadWrapper({
  className,
  ...props
}: React.ComponentProps<typeof TableHead>) {
  return (
    <TableHead
      className={cn(
        'text-body-md text-action-400 px-4 py-2 font-bold',
        className,
      )}
      {...props}
    />
  );
}

function TableCellWrapper({
  className,
  ...props
}: React.ComponentProps<typeof TableCell>) {
  return (
    <TableCell
      className={cn('px-4 py-2 text-neutral-500', className)}
      {...props}
    />
  );
}

function TableContainer({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        'overflow-hidden rounded-md border bg-white shadow-[0px_0px_8px_0px_rgba(23,60,108,0.08)]',
        className,
      )}
    >
      {children}
    </div>
  );
}

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHeadWrapper as TableHead,
  TableRow,
  TableCellWrapper as TableCell,
  TableCaption,
  TableContainer,
};
