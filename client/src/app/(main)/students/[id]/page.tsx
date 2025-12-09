import { api, getAuthorizationHeader, throwFromResponse } from '@/api';
import StudentPage from '@/features/student-profile/student-page';
import { auth } from '@/shared/lib/auth';

export default async function StudentProfilePage({
  params,
}: StudentProfilePageProps) {
  // const session = await auth();
  // const userType = session?.user?.dtype; // "Administrator" | "Student"

  // FIXME: MUDAR ISSO PRA ID PLMDS
  const { id } = await params;

  const res = await api.getStudent(id, {
    format: 'json',
    headers: getAuthorizationHeader((await auth())!),
  });
  throwFromResponse(res);
  
  return <StudentPage studentInfo={res.data}/>;
  
}

interface StudentProfilePageProps {
  params: Promise<{ id: string }>;
}
