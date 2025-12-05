"use client";

import { ChevronDownIcon, Search } from 'lucide-react';
import { useState, useMemo } from 'react';

import { type StudentResponseDTO } from '@/api';
import { Button } from '@/shared/components/custom/button';
import { Input } from '@/shared/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';

import { StudentsTable } from './components/students-table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/components/custom/dropdown-menu';

import { BatchUpdateDialog } from './components/batch-update-dialog'; 

interface AllStudentsPageProps {
  data: StudentResponseDTO[];
}

export function AllStudentsPage({ data }: AllStudentsPageProps) {
  const [searchName, setSearchName] = useState('');
  const [selectedGroup, setSelectedGroup] = useState<string>('all');
  //const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [selectedSituation, setSelectedSituation] = useState<string>('all');

  const uniqueGroups = useMemo(() => {
    const groups = [...new Set(data.map((student) => student.studentGroup))];
    return groups.sort((a, b) => a - b);
  }, [data]);

  const filteredData = useMemo(() => {
    return data.filter((student) => {
      const matchesName = student.name
        .toLowerCase()
        .includes(searchName.toLowerCase());
      
      const matchesGroup =
        selectedGroup === 'all' ||
        student.studentGroup === parseInt(selectedGroup);

      const matchesSituation = selectedSituation === 'all';

      return matchesName && matchesGroup && matchesSituation;
    });
  }, [data, searchName, selectedGroup, selectedSituation]);

  return (
    <div className="space-y-6 font-sans">
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
          <BatchUpdateDialog 
            triggerButton={
              <Button variant="outline">Solicitar atualização em lote</Button>
            }
            data={data}
          />

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

      <div className="flex gap-4 justify-between">
        <div className="relative w-full max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
          <Input
            placeholder="Buscar"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            className="font-sans pl-10 border border-neutral-300"
          />
        </div>

        <div className="flex gap-4">
          <Select onValueChange={setSelectedGroup}>
            <SelectTrigger
              className="font-sans w-[180px] border border-neutral-300"
            >
              <SelectValue placeholder="Turma" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all" >Todas</SelectItem>
              {uniqueGroups.map((group) => (
                <SelectItem key={group} value={String(group)}>
                  Turma {group}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* <Select onValueChange={setSelectedLevel}>
            <SelectTrigger
              className="font-sans w-[180px] border border-neutral-300"
            >
              <SelectValue placeholder="Nível" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              {uniqueLevel.map((level) => (
                <SelectItem key={level} value={String(level)}>
                  Trainee {level}
                </SelectItem>
              ))}
            </SelectContent>
          </Select> */}

          <Select onValueChange={setSelectedSituation}>
            <SelectTrigger
              className="font-sans w-[180px] border border-neutral-300"
            >
              <SelectValue placeholder="Situação"/>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas</SelectItem>
              <SelectItem value="in_project">Em projeto</SelectItem>
              <SelectItem value="active">Ativo</SelectItem>
              <SelectItem value="inactive">Inativo</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <StudentsTable data={filteredData} />
    </div>
  );
}