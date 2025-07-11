import StudentRegisterPageComponent from '@/features/register/register-page';
import { Breadcrumbs } from '@/shared/components/custom/breadcrumbs';
import { UserRound } from 'lucide-react';

interface StudentRegisterPageProps {
  params: { username: string };
}
export default async function StudentRegisterPage({
  params,
}: StudentRegisterPageProps) {
  const { username } = await params;
  console.log(username);

  return (
    <div>
      <Breadcrumbs
        Icon={UserRound}
        items={[
          { label: 'Meu Perfil', href: `/student/${username}` },
          { label: 'Editar dados cadastrais' },
        ]}
      />
      <StudentRegisterPageComponent />;
    </div>
  );
}
