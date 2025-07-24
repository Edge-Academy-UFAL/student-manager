import StudentProfileUpdatePageComponent from '@/features/student-profile-update/update-page';
import { Breadcrumbs } from '@/shared/components/custom/breadcrumbs';
import { UserRound } from 'lucide-react';

interface StudentProfileUpdatePageProps {
  params: { username: string };
}
export default async function StudentProfileUpdatePage({
  params,
}: StudentProfileUpdatePageProps) {
  const { username } = await params;

  // Requests for data.

  return (
    <div>
      <Breadcrumbs
        Icon={UserRound}
        items={[
          { label: 'Meu Perfil', href: `/student/${username}/profile` },
          { label: 'Editar dados cadastrais' },
        ]}
      />
      <StudentProfileUpdatePageComponent />
    </div>
  );
}
