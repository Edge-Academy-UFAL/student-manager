import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/components/ui/table';

const mockGrades = [
  {
    id: 1,
    code: 'ECOM089',
    name: 'Álgebra linear',
    hours: '72h',
    period: '3º',
    finalGrade: 0.00,
    status: 'CURSANDO',
  },
  {
    id: 2,
    code: 'ECOM008',
    name: 'Estrutura de dados',
    hours: '72h',
    period: '2º',
    finalGrade: 7.15,
    status: 'APROVADO',
  },
  {
    id: 3,
    code: 'COMP015',
    name: 'Cálculo diferencial e integral',
    hours: '144h',
    period: '2º',
    finalGrade: 7.50,
    status: 'APROVADO',
  },
  {
    id: 4,
    code: 'COMP102',
    name: 'Banco de dados',
    hours: '72h',
    period: '1º',
    finalGrade: 8.25,
    status: 'APROVADO',
  },
  {
    id: 5,
    code: 'COMP015',
    name: 'Cálculo diferencial e integral',
    hours: '144h',
    period: '1º',
    finalGrade: 4.50,
    status: 'REPROVADO',
  },
  {
    id: 6,
    code: 'COMP014',
    name: 'Programação 1',
    hours: '72h',
    period: '1º',
    finalGrade: 8.00,
    status: 'APROVADO',
  },
  {
    id: 7,
    code: 'COMP012',
    name: 'Computação, sociedade e ética',
    hours: '72h',
    period: '1º',
    finalGrade: 9.25,
    status: 'APROVADO',
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'APROVADO':
      return 'text-green-600';
    case 'REPROVADO':
      return 'text-red-600';
    case 'CURSANDO':
      return 'text-blue-600';
    default:
      return '';
  }
};

export function GradesSection({ studentInfo }: { studentInfo?: any }) {
  return (
    <div className="bg-white rounded-md shadow-sm py-3 px-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-heading-xs text-action-500">Notas do Aluno</h2>
        <Button variant="default" className="rounded-sm">
          Adicionar disciplina
        </Button>
      </div>

      <div className="overflow-x-auto px-2">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-left">Disciplina</TableHead>
              <TableHead className="text-center">Carga Horária</TableHead>
              <TableHead className="text-center">Período</TableHead>
              <TableHead className="text-center">Nota final</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-center">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockGrades.map((grade) => (
              <TableRow key={grade.id}>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-normal">
                      {grade.code} - {grade.name}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-center">{grade.hours}</TableCell>
                <TableCell className="text-center">{grade.period}</TableCell>
                <TableCell className="text-center">
                  {grade.finalGrade.toFixed(2)}
                </TableCell>
                <TableCell className="text-center">
                  <span className={getStatusColor(grade.status)}>
                    {grade.status}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2 justify-center">
                    <Button variant="ghost" aria-label="Editar">
                      <Pencil className="size-4 text-gray-600" />
                    </Button>
                    <Button variant="ghost" aria-label="Deletar">
                      <Trash2 className="size-4 text-gray-600" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}