import React from 'react';
import { DataTableSkeleton } from '@/features/students/components/table-skeleton';

export default function Loading() {
  return <DataTableSkeleton columnCount={4} filterableColumnCount={2} />;
}
