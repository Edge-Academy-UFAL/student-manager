'use client';

import { useSession } from 'next-auth/react';
import React, { useState } from 'react';
import { toast } from 'sonner';
import { api, getAuthorizationHeader } from '@/api';
import { Button } from '@/shared/components/custom/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/components/custom/dialog';
import { FloatingLabelInput } from '@/shared/components/custom/floating-label-input';

enum DialogPage {
  ConfirmName,
  SetReason,
}

function ConfirmNameDialogContent({
  name,
  handleContinue,
}: ConfirmNameDialogContentProps) {
  const [confirmName, setConfirmName] = useState('');
  const isInvalidName = confirmName !== name;

  return (
    <>
      <DialogHeader>
        <DialogTitle>Desligar aluno</DialogTitle>
        <DialogDescription>
          Você tem certeza que deseja desligar o aluno{' '}
          <span className="font-bold">{name}</span>? Se tiver, digite o motivo
          do desligamento no campo abaixo.
        </DialogDescription>
      </DialogHeader>
      <FloatingLabelInput
        type="text"
        label="Nome do aluno"
        value={confirmName}
        onChange={(e) => setConfirmName(e.target.value)}
        aria-invalid={!!confirmName && isInvalidName}
      />
      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline">Cancelar</Button>
        </DialogClose>
        <Button disabled={isInvalidName} onClick={handleContinue}>
          Seguir
        </Button>
      </DialogFooter>
    </>
  );
}

interface ConfirmNameDialogContentProps {
  name: string;
  handleContinue: () => void;
}

function SetReasonDialogContent({
  name,
  handleContinue,
}: SetReasonDialogContentProps) {
  const [reason, setReason] = useState('');

  return (
    <>
      <DialogHeader>
        <DialogTitle>Desligar aluno</DialogTitle>
        <DialogDescription>
          Insira o motivo de desligamento de{' '}
          <span className="font-bold">{name}</span>.
        </DialogDescription>
      </DialogHeader>
      <FloatingLabelInput
        type="text"
        label="Motivo de desligamento"
        value={reason}
        onChange={(e) => setReason(e.target.value)}
      />
      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline">Cancelar</Button>
        </DialogClose>
        <Button disabled={!reason} onClick={() => handleContinue(reason)}>
          Seguir
        </Button>
      </DialogFooter>
    </>
  );
}

interface SetReasonDialogContentProps {
  name: string;
  handleContinue: (reason: string) => void;
}

export function TerminateStudentDialog({
  name,
  email,
  children,
}: TerminateStudentDialogProps) {
  const { data } = useSession();

  const [open, _setOpen] = useState(false);
  const [page, setPage] = useState(DialogPage.ConfirmName);

  function setOpen(value: boolean) {
    _setOpen(value);
    if (!value) {
      setPage(DialogPage.ConfirmName);
    }
  }

  async function handleSend(reason: string) {
    let res;
    try {
      res = await api.terminateStudent(
        email,
        { terminationReason: reason },
        { headers: getAuthorizationHeader(data!) },
      );
    } catch (error) {
      console.error(error);
      toast.error('Erro de conexão com o servidor');
      return;
    }

    if (res) {
      toast.success('Aluno desligado com sucesso');
      setOpen(false);
    } else {
      toast.error('Não foi possível desligar o aluno');
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        {page === DialogPage.ConfirmName && (
          <ConfirmNameDialogContent
            name={name}
            handleContinue={() => setPage(DialogPage.SetReason)}
          />
        )}
        {page === DialogPage.SetReason && (
          <SetReasonDialogContent name={name} handleContinue={handleSend} />
        )}
      </DialogContent>
    </Dialog>
  );
}

interface TerminateStudentDialogProps {
  name: string;
  email: string;
  children: React.ReactNode;
}
