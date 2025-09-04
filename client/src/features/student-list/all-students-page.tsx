import { ChevronDownIcon } from 'lucide-react';

import { type StudentResponseDTO } from '@/api';
import { Button } from '@/shared/components/custom/button';

import { StudentsTable } from './components/students-table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/components/custom/dropdown-menu';

interface AllStudentsPageProps {
  data: StudentResponseDTO[];
}

export function AllStudentsPage({ data }: AllStudentsPageProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <span className="text-action-950 text-heading-md leading-tight font-semibold">
            Todos os alunos
          </span>
          <span className="text-body-md leading-tight text-neutral-950">
            Alunos cadastrados no sistema
          </span>
        </div>
        <div className="flex gap-4">
          <Button variant="outline">Solicitar atualização em lote</Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button>
                Novo aluno <ChevronDownIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Via Email</DropdownMenuItem>
              <DropdownMenuItem>Via Planilha</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <StudentsTable data={data} />
    </div>
  );
}
