import { api, getAuthorizationHeader, throwFromResponse } from '@/api';
import { MyProfileComponent } from '@/features/student-profile/my-profile-page';
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
    <MyProfileComponent studentInfo={res.data} />
  );
}

interface StudentProfilePageProps {
  params: Promise<{ username: string }>;
}
