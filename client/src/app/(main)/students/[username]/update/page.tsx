import StudentProfileUpdatePageComponent from '@/features/student-profile-update/update-page';
import { SimpleBreadcrumbs } from '@/shared/components/custom/simple-breadcrumbs';
import { UserRound } from 'lucide-react';

interface StudentProfileUpdatePageProps {
  params: Promise<{ username: string }>;
}

export default async function StudentProfileUpdatePage({
  params,
}: StudentProfileUpdatePageProps) {
  const { username } = await params;

  // Requests for data.

  return (
    <div className="space-y-6">
      <SimpleBreadcrumbs
        items={[
          {
            label: 'Meu Perfil',
            href: `/students/${username}`,
            Icon: UserRound,
          },
          { label: 'Editar dados cadastrais' },
        ]}
      />
      <StudentProfileUpdatePageComponent />
    </div>
  );
}
