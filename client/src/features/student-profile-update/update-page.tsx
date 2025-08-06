'use client';

import z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/shared/components/ui/button';

import StudentUpdateProfileFormComponent from './update-form';
import { updateProfileFormSchema } from './schema';

export default function StudentProfileUpdatePageComponent() {
  const form = useForm<z.infer<typeof updateProfileFormSchema>>({
    resolver: zodResolver(updateProfileFormSchema),
    defaultValues: {
      name: '',
      birthDate: undefined,
      cpf: '',
      rg: '',
      documentProvider: '',
      race: '',
      maritalState: '',
      gender: '',
      pronouns: '',
      handicaped: false,
      email: 'fulano@edge.ufal.br',
      alternativeEmail: '',
      phone: '',
      whatsapp: '',
      cep: '',
      city: '',
      district: '',
      street: '',
      number: undefined,
      addressDetail: '',
      linkedinUrl: '',
      lattesUrl: '',
      registrationCode: '',
      course: '',
      currentSemester: '',
      enrollmentSemester: '',
      academyGroup: 'Turma 1',
      academyOnboardingDate: new Date(),
      academyStudentLevel: 'undergraduate-student-1',
      photo: undefined,
      rgFile: undefined,
      cpfFile: undefined,
      proofOfResidenceFile: undefined,
      academicHistoryFile: undefined,
    },
  });

  function onSubmit(values: z.infer<typeof updateProfileFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  function onCancel() {
    console.log('Aborting and redirecting to Profile Page...');
  }

  return (
    <main className="space-y-6">
      <div className="flex items-center">
        <div className="flex flex-col gap-[8px]">
          <h1 className="text-heading-md text-brand-500 leading-[120%] font-semibold">
            Atualizar dados cadastrais
          </h1>
          <p className="text-body-md">
            Atualize seus dados cadastrais e inclua novas informações.
          </p>
        </div>
        <div className="ml-auto flex gap-[16px]">
          <Button
            className="text-brand-400 hover:bg-neutral-150 rounded-md bg-neutral-100 hover:cursor-pointer"
            onClick={onCancel}
          >
            Cancelar
          </Button>
          <Button
            className="rounded-md hover:cursor-pointer"
            type="submit"
            onClick={form.handleSubmit(onSubmit)}
          >
            Enviar Solicitação
          </Button>
        </div>
      </div>
      <StudentUpdateProfileFormComponent form={form} />
    </main>
  );
}
