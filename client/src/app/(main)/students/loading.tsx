import React from 'react';
import { DataTableSkeleton } from '@/features/students/components/table-skeleton';

export default function Loading() {
  return (
    <div>
      <DataTableSkeleton columnCount={4} filterableColumnCount={2} />
    </div>
  );
}
