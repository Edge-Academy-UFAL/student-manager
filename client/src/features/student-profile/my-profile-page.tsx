import { PersonalSection } from './sections/personal-section';
import { ContactSection } from './sections/contact-section';
import { AcademicSection } from './sections/academic-section';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/shared/components/custom/tabs';
import { Button } from '@/shared/components/custom/button';
import { UserAvatar } from './components/user-avatar';
import { type StudentResponseDTO } from '@/api';
import Link from 'next/link';
import { getShorterName } from '@/shared/lib/formatting';
import { getUsername } from '@/shared/lib/utils';

export function MyProfileComponent({
  studentInfo,
}: {
  studentInfo: StudentResponseDTO;
}) {
  return (
    <main className="flex flex-col gap-6">
      <div className="flex items-center gap-2.5">
        <UserAvatar name={studentInfo.name} src={studentInfo.photoUrl} />
        <span className="text-action-950 text-heading-xl leading-tight font-bold">
          {getShorterName(studentInfo.name)}
        </span>
        <Button className="ml-auto" asChild>
          <Link href={getUsername(studentInfo.email) + '/update'}>Editar</Link>
        </Button>
      </div>
      <Tabs defaultValue="registration">
        <TabsList>
          <TabsTrigger value="registration">Dados cadastrais</TabsTrigger>
          <TabsTrigger value="projects">Projetos</TabsTrigger>
          <TabsTrigger value="reviews">Avaliações</TabsTrigger>
          <TabsTrigger value="grades">Notas</TabsTrigger>
          <TabsTrigger value="history">Histórico</TabsTrigger>
        </TabsList>
        <TabsContent value="registration">
          <div className="flex flex-col gap-6">
            <PersonalSection studentInfo={studentInfo} />
            <ContactSection studentInfo={studentInfo} />
            <AcademicSection studentInfo={studentInfo} />
          </div>
        </TabsContent>
        <TabsContent value="projects"></TabsContent>
        <TabsContent value="reviews"></TabsContent>
        <TabsContent value="grades"></TabsContent>
        <TabsContent value="history"></TabsContent>
      </Tabs>
    </main>
  );
}
