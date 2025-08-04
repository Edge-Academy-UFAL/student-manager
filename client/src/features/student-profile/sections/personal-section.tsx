import { format, parseISO } from 'date-fns';
import { type StudentResponseDTO } from '@/api';
import { SimpleCheckbox } from '@/shared/components/custom/checkbox';
import { ProfileSection } from '@/shared/components/custom/profile-section';
import { translateOptionValue } from '@/shared/lib/formatting';
import {
  genderOptions,
  maritalStateOptions,
  pronounsOptions,
  raceOptions,
} from '@/shared/models';
import { ProfileTextItem } from '../components/profile-text-item';

export function PersonalSection({
  studentInfo,
}: {
  studentInfo: StudentResponseDTO;
}) {
  const birthDate = studentInfo.birthDate;

  return (
    <ProfileSection title="Dados pessoais" className="w-full">
      <div className="grid grid-cols-3 gap-[16px]">
        <ProfileTextItem title="Nome completo" value={studentInfo.name} />
        <ProfileTextItem
          title="Data de nascimento"
          value={birthDate ? format(parseISO(birthDate), 'dd/MM/yyyy') : ''}
        />
        <ProfileTextItem
          title="CPF"
          value="123.456.789-00"
          className="col-start-1"
        />
        <ProfileTextItem title="RG" value={studentInfo.registration ?? ''} />
        <ProfileTextItem title="Orgão emissor" value="SSP-AL" />
        <ProfileTextItem
          title="Gênero"
          value={translateOptionValue(genderOptions, 'FEMALE')}
          className="col-start-1"
        />
        <ProfileTextItem
          title="Pronomes"
          value={translateOptionValue(pronounsOptions, 'SHE_HER')}
        />
        <SimpleCheckbox
          label="Pessoa com deficiência"
          defaultChecked={false}
          disabled={true}
          labelClassName="peer-disabled:text-neutral-950"
        />
        <ProfileTextItem
          title="Raça/etnia"
          value={translateOptionValue(raceOptions, 'PARDA')}
          className="col-start-1"
        />
        <ProfileTextItem
          title="Estado civil"
          value={translateOptionValue(maritalStateOptions, 'SINGLE')}
        />
      </div>
    </ProfileSection>
  );
}
