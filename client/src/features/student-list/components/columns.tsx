'use client';

import * as React from 'react';
import Link from 'next/link';
import { CaretSortIcon, DotsHorizontalIcon } from '@radix-ui/react-icons';
import { ColumnDef } from '@tanstack/react-table';

import { type StudentResponseDTO } from '@/api';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/shared/components/ui/avatar';
import { Button } from '@/shared/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu';
import { translateOptionValue } from '@/shared/lib/formatting';
import { getUsername } from '@/shared/lib/utils';
import { courseOptions } from '@/shared/models';

export const columns: ColumnDef<StudentResponseDTO>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Nome
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="flex flex-row gap-3 ps-4">
          <Avatar>
            {/* TODO: Add the correct image */}
            <AvatarImage src={row.original.photoUrl} alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <Link
              href={'/students/' + getUsername(row.original.email)}
              className="text-bold cursor-pointer text-base font-medium hover:font-extrabold hover:underline"
            >
              {row.getValue('name')}
            </Link>
            <div className="text-sm text-neutral-500 lowercase">
              {row.original.email}
            </div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: 'course',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Curso
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="ps-4">
        {translateOptionValue(courseOptions, row.getValue('course'))}
      </div>
    ),
  },
  {
    accessorKey: 'studentGroup',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Turma
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="ps-4 capitalize">{row.getValue('studentGroup')}</div>
    ),
  },
  {
    accessorKey: 'period',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Período
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="ps-4">{row.getValue('period')}</div>,
  },
  {
    accessorKey: 'ira',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          IRA
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="ps-4">{row.getValue('ira')}</div>,
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <div onClick={(e) => e.stopPropagation()}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <DotsHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <a
                  href={`https://mail.google.com/a/edge.ufal.br/mail/?view=cm&to=${row.original.email}&su=Contato via plataforma Edge Academy&body=Olá, ${row.original.name}.%0A%0AEstou entrando em contato com você para falar sobre ...
                  `}
                  target="_blank"
                >
                  Enviar Mensagem
                </a>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
