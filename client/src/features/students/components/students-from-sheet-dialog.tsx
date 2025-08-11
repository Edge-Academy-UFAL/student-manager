import { useState } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { PlusIcon } from 'lucide-react';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/shared/components/ui/form';

import { MockFileUpload } from '@/features/student-profile-update/components/mock-upload-file';
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
import { Span } from 'next/dist/trace';

enum DialogPage {
  Input,
  DuplicateStudent,
  ImportSummary,
  PartialImportSummary,
}

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_DOCUMENT_TYPES = [
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  ' text/csv',
];

const studentsFromSheetSchema = z.object({
  sheet: z
    .any()
    .refine((file) => file, { message: 'Selecione um arquivo.' })
    .refine(
      (file) => file?.size <= MAX_FILE_SIZE,
      `Tamanho máximo de arquivo excedido. O arquivo deve ter no máximo 5MB.`,
    )
    .refine(
      (file) => ACCEPTED_DOCUMENT_TYPES.includes(file?.type),
      'Apenas os formatos .xlsx e .csv são suportados.',
    ),
});

interface StudentData {
  name: string;
  cpf: string;
  birthDate: string;
  email: string;
  phone: string;
  phone2: string;
  enrollment: string;
  course: 'COMPUTER_SCIENCE' | 'COMPUTER_ENGINEERING';
  level: string;
  entryDate: string; // formato "DD/MM/YYYY"
  entryPeriod: string | number;
  period: string | number;
  classGroup: string | number;
}

interface ImportResponse {
  imported: StudentData[];
  errors: StudentData[];
  totalImported: number;
  totalErrors: number;
  duplicates: StudentData[];
}

const MOCK_RESPONSE_DATA_DUPLICATES = {
  imported: [
    {
      name: 'João Silva',
      cpf: '12345678900',
      birthDate: '15/08/1998',
      email: 'joao@email.com',
      phone: '11999998888',
      phone2: '11988887777',
      enrollment: '2021001',
      course: 'COMPUTER_SCIENCE',
      level: 'Grad I',
      entryDate: '01/03/2021',
      entryPeriod: '1',
      period: '4',
      classGroup: '1',
    } as StudentData,
  ],
  errors: [],
  totalImported: 1,
  totalErrors: 0,
  duplicates: [
    {
      name: 'Maria Souza',
      cpf: '98765432100',
      birthDate: '22/01/1999',
      email: 'maria@email.com',
      phone: '11977776666',
      phone2: '',
      enrollment: '2021002',
      course: 'COMPUTER_SCIENCE',
      level: 'Grad I',
      entryDate: '01/03/2021',
      entryPeriod: '1',
      period: 4,
      classGroup: 2,
    } as StudentData,
    {
      name: 'Pedro Lima',
      cpf: '11223344556',
      birthDate: '05/05/2000',
      email: 'pedro@email.com',
      phone: '11955554444',
      phone2: '11944443333',
      enrollment: '2021003',
      course: 'COMPUTER_ENGINEERING',
      level: 'Grad II',
      entryDate: '01/03/2021',
      entryPeriod: '1',
      period: 4,
      classGroup: 3,
    } as StudentData,
    {
      name: 'Ana Fernandes',
      cpf: '66554433214',
      birthDate: '10/11/1997',
      email: 'ana@email.com',
      phone: '11933332222',
      phone2: '',
      enrollment: '2021004',
      course: 'COMPUTER_SCIENCE',
      level: 'Grad I',
      entryDate: '01/03/2021',
      entryPeriod: '1',
      period: 4,
      classGroup: 1,
    } as StudentData,
    {
      name: 'Carlos Pereira',
      cpf: '99887766554',
      birthDate: '28/07/1996',
      email: 'carlos@email.com',
      phone: '11922221111',
      phone2: '11911110000',
      enrollment: '2021005',
      course: 'COMPUTER_ENGINEERING',
      level: 'Grad III',
      entryDate: '01/03/2021',
      entryPeriod: '1',
      period: 4,
      classGroup: 2,
    } as StudentData,
  ],
};

const MOCK_RESPONSE_DATA_SUCCESS = {
  imported: [
    {
      name: 'João Silva',
      cpf: '12345678900',
      birthDate: '15/08/1998',
      email: 'joao@email.com',
      phone: '11999998888',
      phone2: '11988887777',
      enrollment: '2021001',
      course: 'COMPUTER_SCIENCE',
      level: 'Grad I',
      entryDate: '01/03/2021',
      entryPeriod: '1',
      period: '4',
      classGroup: 1,
    } as StudentData,
    {
      name: 'Maria Souza',
      cpf: '98765432100',
      birthDate: '22/01/1999',
      email: 'maria@email.com',
      phone: '11977776666',
      phone2: '',
      enrollment: '2021002',
      course: 'COMPUTER_SCIENCE',
      level: 'Grad I',
      entryDate: '01/03/2021',
      entryPeriod: '1',
      period: 4,
      classGroup: 2,
    } as StudentData,
    {
      name: 'Pedro Lima',
      cpf: '11223344556',
      birthDate: '05/05/2000',
      email: 'pedro@email.com',
      phone: '11955554444',
      phone2: '11944443333',
      enrollment: '2021003',
      course: 'COMPUTER_ENGINEERING',
      level: 'Grad II',
      entryDate: '01/03/2021',
      entryPeriod: '1',
      period: 4,
      classGroup: 3,
    } as StudentData,
    {
      name: 'Ana Fernandes',
      cpf: '66554433214',
      birthDate: '10/11/1997',
      email: 'ana@email.com',
      phone: '11933332222',
      phone2: '',
      enrollment: '2021004',
      course: 'COMPUTER_SCIENCE',
      level: 'Grad I',
      entryDate: '01/03/2021',
      entryPeriod: '1',
      period: 4,
      classGroup: 1,
    } as StudentData,
    {
      name: 'Carlos Pereira',
      cpf: '99887766554',
      birthDate: '28/07/1996',
      email: 'carlos@email.com',
      phone: '11922221111',
      phone2: '11911110000',
      enrollment: '2021005',
      course: 'COMPUTER_ENGINEERING',
      level: 'Grad III',
      entryDate: '01/03/2021',
      entryPeriod: 1,
      period: 4,
      classGroup: 2,
    } as StudentData,
  ],
  errors: [],
  totalImported: 5,
  totalErrors: 0,
  duplicates: [],
};

function wait(time: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}

async function mockRequest(values: object): Promise<ImportResponse> {
  await wait(5000);
  return MOCK_RESPONSE_DATA_SUCCESS;
}

function InputFileDialogContent({
  form,
  onSubmit,
}: {
  form: UseFormReturn<z.infer<typeof studentsFromSheetSchema>>;
  onSubmit: (values: z.infer<typeof studentsFromSheetSchema>) => void;
}) {
  return (
    <>
      <DialogHeader>
        <DialogTitle>Adicionar aluno via planilha</DialogTitle>
        <DialogDescription>
          Carregue uma planilha (.xlsx or .csv) com os dados dos alunos para
          adicioná-los.
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form>
          <FormField
            control={form.control}
            name="sheet"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <MockFileUpload
                    value={field.value}
                    onChange={field.onChange}
                    label="Foto do RG"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline">Cancelar</Button>
        </DialogClose>
        <Button
          disabled={!form.formState.isValid}
          onClick={form.handleSubmit(onSubmit)}
        >
          Adicionar alunos
        </Button>
      </DialogFooter>
    </>
  );
}

function ImportSummaryDialogContent({
  handleFinalize,
  responseData,
}: {
  handleFinalize: () => void;
  responseData: ImportResponse;
}) {
  return (
    <>
      <DialogHeader>
        <DialogTitle>Relatório de importação</DialogTitle>
        <DialogDescription>
          Todos os {responseData.totalImported} alunos foram importados com
          sucesso.
        </DialogDescription>
      </DialogHeader>
      <div>
        {responseData.imported.map((student) => {
          return <div key={student.enrollment}>{student.email}</div>;
        })}
      </div>
      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline">Cancelar</Button>
        </DialogClose>
        <Button onClick={handleFinalize}>Concluir</Button>
      </DialogFooter>
    </>
  );
}

export default function StudentsFromSheetDialog() {
  // const { data } = useSession();
  const form = useForm<z.infer<typeof studentsFromSheetSchema>>({
    resolver: zodResolver(studentsFromSheetSchema),
    defaultValues: { sheet: undefined },
    mode: 'onChange',
  });

  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [dialogState, _setDialogState] = useState<{
    page: DialogPage;
    data: Record<string, unknown>;
  }>({ page: DialogPage.Input, data: {} });

  function setDialogState(page: DialogPage, data?: Record<string, unknown>) {
    if (data) {
      _setDialogState({ page, data });
    } else {
      _setDialogState({ page, data: {} });
    }
  }

  function handleDialogOpen(): void {
    // This is necessary to remove error indicators when re-opening the dialog.
    setShowDialog(true);
    // setError(false);
  }

  function onShowDialogChange(): void {
    // This is necessary, because when the Dialog is closed showDialog
    // is false. So, everytime showDialog tried to change to true, this
    // would trigger and the Dialog would never open.
    if (showDialog) {
      setShowDialog(false);
    }
  }

  async function onSubmitSheet(
    values: z.infer<typeof studentsFromSheetSchema>,
  ) {
    console.log(values);

    const data = await mockRequest(values);
    if (data.errors.length === 0 && data.duplicates.length === 0) {
      setDialogState(DialogPage.ImportSummary, { responseData: data });
    }
  }

  // function handleTryAgainWithInvalidEmails(
  //   invalidEmails: Array<string> | undefined,
  // ) {
  //   if (!invalidEmails) {
  //     invalidEmails = [];
  //   }
  //   setError(false);
  //   handleFormDataChange('emails', invalidEmails.join(', '));
  //   setValidatedEmails([]);
  //   setDialogState(DialogPage.Input);
  // }

  // async function handleConfirm() {
  //   // Set loading state
  //   setDialogState(DialogPage.Loading, {
  //     title: 'Enviando convites.',
  //     message:
  //       'Os convites estão sendo enviados para os alunos. Por favor, aguarde.',
  //   });

  //   // prepare data
  //   const requestData = {
  //     emails: validatedEmails.map((email) => email.email),
  //     entryDate: `${formData.admissionYear}-${formData.admissionMonth.padStart(2, '0')}-01`,
  //     studentGroup: Number(formData.studentGroup),
  //   };

  //   const res = await api.inviteStudents(requestData, {
  //     format: 'json',
  //     headers: getAuthorizationHeader(data!),
  //   });

  //   // Validate response and show appropriate response dialog
  //   if (res.ok) {
  //     if (Object.keys(res.data.failedEmails).length === 0) {
  //       setDialogState(DialogPage.BackendResponse, {
  //         typeOfResponse: BackendResponseType.Success,
  //       });
  //     } else {
  //       setDialogState(DialogPage.BackendResponse, {
  //         typeOfResponse: BackendResponseType.InvitationSendingError,
  //         invalidEmails: res.data.failedEmails,
  //       });
  //     }
  //   } else {
  //     setDialogState(DialogPage.BackendResponse, {
  //       typeOfResponse: BackendResponseType.AnotherError,
  //       responseCode: res.status,
  //     });
  //   }
  // }

  function handleFinalize() {
    setShowDialog(false);
    setTimeout(() => {
      form.reset();
      setDialogState(DialogPage.Input);
    }, 200);
  }

  return (
    <Dialog open={showDialog} onOpenChange={onShowDialogChange}>
      <DialogTrigger asChild>
        <Button variant="default" onClick={handleDialogOpen}>
          <PlusIcon />
          <span className="ml-2">Importar alunos via Planilha</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        {dialogState.page === DialogPage.Input && (
          <InputFileDialogContent form={form} onSubmit={onSubmitSheet} />
        )}
        {dialogState.page === DialogPage.ImportSummary && (
          <ImportSummaryDialogContent
            handleFinalize={handleFinalize}
            {...(dialogState.data as { responseData: ImportResponse })}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
