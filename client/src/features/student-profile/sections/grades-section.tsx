import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';

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
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-3 px-4 text-sm font-bold">
                Disciplina
              </th>
              <th className="text-center py-3 px-4 text-sm font-bold">
                Carga Horária
              </th>
              <th className="text-center py-3 px-4 text-sm font-bold">
                Período
              </th>
              <th className="text-center py-3 px-4 text-sm font-bold">
                Nota final
              </th>
              <th className="text-center py-3 px-4 text-sm font-bold">
                Status
              </th>
              <th className="text-center py-3 px-4 text-sm font-bold">
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            {mockGrades.map((grade, idx) => (
            <tr key={grade.id} className={`${mockGrades.length-1 != idx && 'border-b'} border-gray-200 hover:bg-blue-50`}>
                <td className="py-4 px-4">
                  <div className="flex flex-col">
                    <span className="font-normal">
                      {grade.code} - {grade.name}
                    </span>
                  </div>
                </td>
                <td className="p-4 text-center">{grade.hours}</td>
                <td className="p-4 text-center">{grade.period}</td>
                <td className="p-4 text-center">
                  {grade.finalGrade.toFixed(2)}
                </td>
                <td className="p-4 text-center">
                  <span
                    className={getStatusColor(
                      grade.status
                    )}
                  >
                    {grade.status}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex gap-2 justify-center">
                    <Button
                      variant="ghost"
                      aria-label="Editar"
                    >
                      <Pencil className="size-4 text-gray-600" />
                    </Button>
                    <Button
                      variant="ghost"
                      aria-label="Deletar"
                    >
                      <Trash2 className="size-4 text-gray-600" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}