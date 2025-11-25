'use client';

import React from 'react';
import { ColumnDef } from '@tanstack/react-table';

import { type StudentResponseDTO } from '@/api';
import { Badge } from '@/shared/components/custom/badge';
import { translateOptionValue } from '@/shared/lib/formatting';
import {
  academyStatusOptions,
  academyStudentLevelOptions,
} from '@/shared/models';

import { StudentActions } from './student-actions';

export const columns: ColumnDef<StudentResponseDTO>[] = [
  { accessorKey: 'name', header: () => 'Nome', size: 437 },
  { accessorKey: 'registration', header: 'Matrícula' },
  {
    accessorKey: 'studentGroup',
    header: 'Turma',
    cell: (info) => `Turma ${info.getValue()}`,
  },
  {
    accessorKey: 'academyStudentLevel',
    header: 'Nível',
    cell: () => (
      <>
        {/*translateOptionValue(academyStudentLevelOptions, info.getValue())*/}
        {translateOptionValue(academyStudentLevelOptions, 'TRAINEE_1')}
      </>
    ),
  },
  {
    accessorKey: 'academyStatus',
    header: 'Situação',
    cell: () => (
      <Badge>
        {/*translateOptionValue(academyStatusOptions, info.getValue())*/}
        {translateOptionValue(academyStatusOptions, 'BASIC_TRAINING')}
      </Badge>
    ),
  },
  {
    id: 'actions',
    header: () => <span className="block text-center">Ações</span>,
    cell: (info) => <StudentActions studentInfo={info.row.original} />,
  },
];
