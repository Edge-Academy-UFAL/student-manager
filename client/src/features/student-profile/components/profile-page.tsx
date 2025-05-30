'use client';

import { useState } from 'react';

import { useSession } from 'next-auth/react';

import {
  enumToStringCourse,
  formatDateToReadableBRFormat,
} from '@/shared/lib/utils';
import { StudentInfoEditDialog } from '@/features/student-profile/components/student-info-edit-dialog';

import ActivityCard from '@/features/student-profile/components/activity/activity-card';
import InfoBox from '@/features/student-profile/components/info-box';
import AddActivityModal from '@/features/student-profile/components/activity/add-activity-modal';

import { Activity, StudentInfo } from '@/features/student-profile/models';

import { formatPhoneNumber, Value } from 'react-phone-number-input';

const StudentProfile = ({
  studentInfo,
  activities,
}: {
  username: string;
  studentInfo: StudentInfo;
  activities: Activity[];
}) => {
  const [studentData, setStudentData] = useState<StudentInfo | null>(
    studentInfo,
  );

  const { data } = useSession();

  if (!studentData) return <div>Erro ao carregar dados...</div>;

  return (
    <div className="mx-4 mt-9 w-screen max-w-[92%]">
      <div className="flex flex-row justify-between">
        <div className="flex w-full justify-between">
          <h2 className="mb-3 text-2xl font-bold">Informações básicas</h2>
        </div>
        {studentData.email === data?.user?.email ? (
          <StudentInfoEditDialog
            studentData={studentData}
            setStudentData={setStudentData}
          />
        ) : null}
      </div>
      <div className="mt-2 flex flex-col gap-5 rounded-lg border px-6 py-6 lg:flex-row xl:px-10">
        <div className="basis-1/2">
          <InfoBox title="Sobre mim" text={studentData.about} />
        </div>
        <div className="flex basis-1/2 flex-row justify-between xl:justify-evenly xl:gap-16">
          <div className="flex flex-col items-start gap-y-1">
            <InfoBox title="E-mail" text={studentData.email} />
            <InfoBox
              title="Data de nascimento"
              text={formatDateToReadableBRFormat(
                new Date(studentData.birthDate),
              )}
            />
            <InfoBox
              title="Telefone"
              text={formatPhoneNumber(`+55${studentData.phone}` as Value)}
            />
            <InfoBox
              title="Telefone secundário"
              text={
                studentData.secondaryPhone
                  ? formatPhoneNumber(
                      `+55${studentData.secondaryPhone}` as Value,
                    )
                  : 'Não fornecido'
              }
            />
          </div>
          <div className="flex flex-col items-start gap-y-1">
            <InfoBox
              title="Curso"
              text={enumToStringCourse(studentData.course)}
            />
            <InfoBox
              title="Número de matrícula"
              text={studentData.registration}
            />
            <InfoBox title="Período" text={`${studentData.period}°`} />
            <InfoBox
              title="Ano letivo de entrada"
              text={studentData.entryPeriod}
            />
          </div>
        </div>
      </div>
      <div className="mt-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold">Atividades extras</h2>
        {studentData.email === data?.user?.email ? <AddActivityModal /> : null}
      </div>
      <div className="mt-3 grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {activities.map((activity) => (
          <ActivityCard
            key={activity.activityId}
            {...activity}
            studentEmail={studentData.email}
          />
        ))}
      </div>
    </div>
  );
};

export default StudentProfile;
