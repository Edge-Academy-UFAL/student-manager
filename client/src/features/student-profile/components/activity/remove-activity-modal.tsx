'use client';
import React, { useState } from 'react';

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/shared/components/ui/alert-dialog';

import { Button } from '@/shared/components/ui/button';

import { Trash } from 'lucide-react';

import { LoadingSpinner } from '@/shared/components/custom/loading-spinner';

import { removeActivity } from '@/features/student-profile/api/remove-activity-req';

import { toast } from 'sonner';

interface RemoveActivityProps {
  studentEmail: string;
  title: string;
  activityId: string;
}

export const RemoveActivity = ({
  studentEmail,
  activityId,
  title,
}: RemoveActivityProps) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const submitHandler = async () => {
    setLoading(true);

    const data = {
      studentEmail,
      activityId,
    };

    setLoading(true);

    const res = await removeActivity(data);

    if (!res) {
      toast.error('Erro ao remover atividade', {
        description: 'Tente novamente mais tarde.',
      });
    } else {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setOpen(false);
      toast(`A atividade "${title}" removida com sucesso.`);
    }

    setLoading(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <span className="flex items-center gap-1">
          <Trash
            size={15}
            className="hover:cursor-pointer hover:text-red-600"
          />
          {/* <p>Remover</p> */}
        </span>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Remover atividade extra</AlertDialogTitle>
          <AlertDialogDescription>
            Você tem certeza que deseja remover a atividade{' '}
            <span className="font-bold underline">{title}</span> da sua lista?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          {!loading && <Button onClick={submitHandler}>Remover</Button>}
          {loading && (
            <Button>
              <span>
                <LoadingSpinner size={20} className="animate-spin" />
              </span>
            </Button>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
