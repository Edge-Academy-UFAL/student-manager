import { api, getAuthorizationHeader, throwFromResponse } from '@/api';
import StudentPage from '@/features/student-profile/student-page';
import { auth } from '@/shared/lib/auth';

export default async function StudentProfilePage({
  params,
}: StudentProfilePageProps) {
  // const session = await auth();
  // const userType = session?.user?.dtype; // "Administrator" | "Student"

  const { username } = await params;

  const res = await api.getStudent(`${username}@edge.ufal.br`, {
    format: 'json',
    headers: getAuthorizationHeader((await auth())!),
  });
  throwFromResponse(res);
  
  return <StudentPage studentInfo={res.data}/>;
  
}

interface StudentProfilePageProps {
  params: Promise<{ username: string }>;
}
