import { type StudentResponseDTO } from '@/api';
import { ProfileSection } from '@/shared/components/custom/profile-section';
import { translateOptionValue } from '@/shared/lib/formatting';
import { academyStudentLevelOptions, courseOptions } from '@/shared/models';
import { ProfileTextItem } from '../components/profile-text-item';

export function AcademicSection({
  studentInfo,
}: {
  studentInfo: StudentResponseDTO;
}) {
  return (
    <ProfileSection title="Dados acadêmicos" className="w-full">
      <div className="grid grid-cols-4 gap-[16px]">
        <ProfileTextItem title="Matrícula" value="22212345" />
        <ProfileTextItem
          title="Curso"
          value={translateOptionValue(courseOptions, studentInfo.course ?? '')}
        />
        <ProfileTextItem
          title="Semestre de Ingresso"
          value={studentInfo.entryPeriod ?? ''}
        />
        <ProfileTextItem
          title="Período Atual"
          value={studentInfo.period?.toString() ?? ''}
        />
        <ProfileTextItem
          title="Turma do Academy"
          value={'Turma ' + studentInfo.studentGroup}
        />
        <ProfileTextItem title="Ingresso no Academy" value="2023-06-20" />
        <ProfileTextItem
          title="Nível"
          value={translateOptionValue(academyStudentLevelOptions, 'TRAINEE_1')}
        />
      </div>
    </ProfileSection>
  );
}
