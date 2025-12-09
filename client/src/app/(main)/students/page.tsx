import { api, getAuthorizationHeader, throwFromResponse } from '@/api';
import { AllStudentsPage } from '@/features/student-list/all-students-page';
import { auth } from '@/shared/lib/auth';

export default async function StudentSearchPage() {
  const res = await api.getAllStudents({
    format: 'json',
    headers: getAuthorizationHeader((await auth())!),
  });
  throwFromResponse(res);

  return (
    <AllStudentsPage data={res.data} />
  );
}
