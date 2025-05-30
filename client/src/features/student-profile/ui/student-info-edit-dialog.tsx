'use client';

import { Button } from '@/shared/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/components/ui/dialog';

import { LoadingSpinner } from '@/shared/components/custom/loading-spinner';
import { Settings, CalendarIcon } from 'lucide-react';

import { Dispatch, SetStateAction, useState } from 'react';

import { Input } from '@/shared/components/ui/input';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/components/ui/form';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/shared/components/ui/popover';

import { CalendarWithDropdowns } from '@/features/student-profile/ui/calendar-with-dropdowns';
import { ptBR } from 'date-fns/locale';
import {
  cn,
  formatDate,
  getMaxSemesterBasedOnCourse,
  formatDateToReadableBRFormat,
  createDateOnCurrentTimezone,
} from '@/shared/lib/utils';

import { zodResolver } from '@hookform/resolvers/zod';
import { UseFormReturn, useForm } from 'react-hook-form';

import { z } from 'zod';
import { StudentInfo } from '@/features/student-profile/models';
import { Textarea } from '@/shared/components/ui/textarea';
import { ScrollArea } from '@/shared/components/ui/scroll-area';

import { editInfo } from '@/features/student-profile/lib/request/edit-info-req';

import { PhoneInput } from '@/shared/components/ui/phone-input';
import { Value, parsePhoneNumber } from 'react-phone-number-input';

import { EditInfoSchema } from '@/features/student-profile/schemas';

import { toast } from 'sonner';

import {
  EditableInfoData,
  StudentEditRequest,
} from '@/features/student-profile/models';

function formatInfoEditData(data: EditInfoSchema): StudentEditRequest {
  let phone = data.phone.replace(/\D/g, '');
  let secondaryPhone = data.secondaryPhone?.replace(/\D/g, '') ?? '';

  phone = phone.slice(2);
  secondaryPhone = secondaryPhone.slice(2);

  const course =
    data.course === 'Ciência da Computação'
      ? 'COMPUTER_SCIENCE'
      : 'COMPUTER_ENGINEERING';

  const dataToSend: StudentEditRequest = {
    name: data.name,
    birthDate: formatDate(data.birthDate),
    course,
    registration: data.registration,
    phone,
    secondaryPhone,
    period: Number(data.semester),
    entryPeriod: data.entrySemester,
    about: data.about ?? '',
  };

  return dataToSend;
}

export type EditInfoSchema = z.infer<typeof EditInfoSchema>;

const EditInfoDialogContent = ({
  form,
}: {
  form: UseFormReturn<EditInfoSchema>;
}) => {
  const [maxSemester, setMaxSemester] = useState<number>(
    getMaxSemesterBasedOnCourse(form.getValues('course')),
  );

  return (
    <Form {...form}>
      <div className="max-h-[60vh] w-full p-1 lg:max-w-[46rem]">
        <div className="mb-2 lg:mb-4">
          <FormField
            control={form.control}
            name="about"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sobre mim</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    className="h-[80px] resize-none lg:h-[110px]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="gap-8 lg:grid lg:grid-cols-2 lg:gap-4">
          <div>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome Completo</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <FormField
              control={form.control}
              name="birthDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data de Nascimento</FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'w-full pl-3 text-left font-normal',
                            !field.value && 'text-muted-foreground',
                          )}
                        >
                          {field.value ? (
                            formatDateToReadableBRFormat(field.value)
                          ) : (
                            <span>Selecione um data</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <CalendarWithDropdowns
                          locale={ptBR}
                          defaultMonth={field.value}
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date('1900-01-01')
                          }
                          captionLayout="dropdown"
                          fromYear={1980}
                          toYear={new Date().getFullYear()}
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <FormField
              control={form.control}
              name="course"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Curso</FormLabel>
                  <Select
                    onValueChange={(course) => {
                      /* Update semester select options on course change */
                      const newMaxSemester =
                        getMaxSemesterBasedOnCourse(course);
                      setMaxSemester(newMaxSemester);

                      /* Prevent Ciência with more than 12 semesters */
                      if (Number(form.getValues('semester')) > newMaxSemester) {
                        form.setValue('semester', '');
                      }

                      field.onChange(course);
                    }}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecione o seu curso" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Ciência da Computação">
                        Ciência da Computação
                      </SelectItem>
                      <SelectItem value="Engenharia de Computação">
                        Engenharia de Computação
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <FormField
              control={form.control}
              name="registration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Número de Matrícula</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefone*</FormLabel>
                  <FormControl>
                    <PhoneInput
                      initialValueFormat="national"
                      value={
                        parsePhoneNumber(form.getValues('phone'), 'BR')
                          ?.number as Value
                      }
                      onChange={field.onChange}
                      defaultCountry="BR"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <FormField
              control={form.control}
              name="secondaryPhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefone Secundário</FormLabel>
                  <FormControl>
                    <PhoneInput
                      initialValueFormat="national"
                      value={
                        parsePhoneNumber(
                          form.getValues('secondaryPhone') || '',
                          'BR',
                        )?.number as Value
                      }
                      onChange={field.onChange}
                      defaultCountry="BR"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <FormField
              control={form.control}
              name="semester"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Período Atual</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        {/* Reset the placeholder when invalid semester is selected */}
                        {field.value ? (
                          <SelectValue placeholder="Selecione o seu período" />
                        ) : (
                          'Selecione o seu período'
                        )}
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Array.from({ length: maxSemester }, (_, i) => i + 1).map(
                        (i) => {
                          return (
                            <SelectItem key={`s_${i}`} value={i.toString()}>
                              {i}
                            </SelectItem>
                          );
                        },
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <FormField
              control={form.control}
              name="entrySemester"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ano Letivo de Ingreeso</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Ex: 2021.1, 2023.2" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      </div>
    </Form>
  );
};

export function StudentInfoEditDialog({
  studentData,
  setStudentData,
}: {
  studentData: StudentInfo;
  setStudentData: Dispatch<SetStateAction<StudentInfo | null>>;
}) {
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const defaultFormData: EditableInfoData = {
    about: studentData.about,
    name: studentData.name,
    birthDate: createDateOnCurrentTimezone(studentData.birthDate),
    course:
      studentData.course === 'COMPUTER_SCIENCE'
        ? 'Ciência da Computação'
        : 'Engenharia de Computação',
    phone: `+55${studentData.phone}`,
    secondaryPhone: studentData.secondaryPhone
      ? `+55${studentData.secondaryPhone}`
      : '',
    semester: studentData.period.toString(),
    entrySemester: studentData.entryPeriod,
    registration: studentData.registration,
  };

  const form = useForm<EditInfoSchema>({
    resolver: zodResolver(EditInfoSchema),
    defaultValues: defaultFormData,
  });

  const errors = form.formState.errors;

  function handleDialogOpen(): void {
    // This is necessary to remove error indicators when re-opening the dialog.
    setShowDialog(true);
  }

  function onShowDialogChange(): void {
    // This is necessary, because when the Dialog is closed showDialog
    // is false. So, everytime showDialog tried to change to true, this
    // would trigger and the Dialog would never open.
    if (showDialog) {
      setShowDialog(false);
    }
  }

  const submitHandler = async (formData: EditInfoSchema) => {
    const requestData: StudentEditRequest = formatInfoEditData(formData);

    setLoading(true);

    const res = await editInfo(requestData);
    const status = res.status;

    if (status === 200 || status === 201) {
      setStudentData({ ...studentData, ...requestData });
      setShowDialog(false);

      toast('Informações atualizadas com sucesso.', {
        description: 'Seus dados foram atuaizados!',
      });
    } else if (status >= 400 && status < 500) {
      toast.error('Erro ao atualizar seus dados.', {
        description: 'Verifique os valores enviados e tente novamente.',
      });
    } else if (status >= 500) {
      toast('Não foi possível atualizar os seus dados.', {
        description: 'Tente novamente mais tarde.',
      });
    } else {
      toast.error('Erro.', {
        description: 'Erro ao enviar os dados.',
      });
    }

    // This is required to prevent weird ui behavior when closing the modal
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setLoading(false);
  };

  return (
    <Dialog open={showDialog} onOpenChange={onShowDialogChange}>
      <DialogTrigger asChild>
        <Button variant="secondary" onClick={handleDialogOpen}>
          <Settings />
        </Button>
      </DialogTrigger>
      <DialogContent className="lg:max-w-[46rem]">
        <form onSubmit={form.handleSubmit(submitHandler)}>
          <DialogHeader className="px-1">
            <DialogTitle>Editar informações básicas</DialogTitle>
            <DialogDescription>
              Atualize seu texto de apresentação, dados acadêmicos e outras
              informações pessoais para manter seu perfil correto e atualizado.
            </DialogDescription>
          </DialogHeader>

          {loading ? (
            <div className="flex h-[160px] w-full flex-col items-center justify-center">
              <LoadingSpinner size={50}></LoadingSpinner>
              <p>Enviando modificações...</p>
            </div>
          ) : (
            <ScrollArea className="py-3">
              <EditInfoDialogContent form={form} />
            </ScrollArea>
          )}

          <DialogFooter className="px-1 sm:flex-col-reverse sm:space-x-0 sm:gap-y-2 lg:flex-row lg:justify-end lg:space-x-2 lg:gap-y-0">
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                setShowDialog(false);
              }}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={Object.keys(errors).length !== 0 || loading}
              variant={`${Object.keys(errors).length !== 0 ? 'destructive' : 'default'}`}
            >
              Editar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
