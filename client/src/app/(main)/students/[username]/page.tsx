import { UserRound } from 'lucide-react';
import { api, getAuthorizationHeader, throwFromResponse } from '@/api';
import { MyProfileComponent } from '@/features/student-profile/my-profile-page';
import { Breadcrumbs } from '@/shared/components/custom/breadcrumbs';
import { auth } from '@/shared/lib/auth';

export default async function StudentProfilePage({
  params,
}: StudentProfilePageProps) {
  const { username } = await params;

  const res = await api.getStudent(`${username}@edge.ufal.br`, {
    format: 'json',
    headers: getAuthorizationHeader((await auth())!),
  });
  throwFromResponse(res);

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: 'Meu Perfil', Icon: UserRound }]} />
      <MyProfileComponent studentInfo={res.data} />
    </div>
  );
}

interface StudentProfilePageProps {
  params: Promise<{ username: string }>;
}
