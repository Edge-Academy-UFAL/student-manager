import { type StudentResponseDTO } from '@/api';
import { ProfileSection } from '@/shared/components/custom/profile-section';
import { ProfileTextItem } from '../components/profile-text-item';

export function ContactSection({
  studentInfo,
}: {
  studentInfo: StudentResponseDTO;
}) {
  return (
    <ProfileSection title="Dados de contato" className="w-full">
      <div className="grid grid-cols-3 gap-[16px]">
        <ProfileTextItem
          title="Email institucional"
          value={studentInfo.email}
          showCopyButton={true}
        />
        <ProfileTextItem
          title="Email pessoal"
          value="beatriz@email.com"
          showCopyButton={true}
          className="col-start-1"
        />
        <ProfileTextItem title="Telefone" value={studentInfo.phone ?? ''} />
        <ProfileTextItem title="WhatsApp" value={studentInfo.phone ?? ''} />
        <div className="col-span-full grid grid-cols-12 gap-[16px]">
          <ProfileTextItem
            title="Código postal"
            value="57123-456"
            className="col-span-4"
          />
          <ProfileTextItem title="País" value="Brasil" className="col-span-3" />
          <ProfileTextItem
            title="Estado"
            value="Alagoas"
            className="col-span-3"
          />
          <ProfileTextItem title="Cidade" value="Maceió" />
          <ProfileTextItem
            title="Logradouro"
            value="R. dos Bobos"
            className="col-span-4"
          />
          <ProfileTextItem title="Número" value="0" className="col-span-3" />
          <ProfileTextItem
            title="Bairro"
            value="Antares"
            className="col-span-3"
          />
          <ProfileTextItem title="Complemento" value="" />
        </div>
        <ProfileTextItem
          title="LinkedIn"
          value="https://www.linkedin.com/in/bearoodrigues"
          showOpenButton={true}
          className="col-start-1"
        />
        <ProfileTextItem
          title="Lattes"
          value="http://lattes.cnpq.br/9481990189634612"
          showOpenButton={true}
        />
      </div>
    </ProfileSection>
  );
}
