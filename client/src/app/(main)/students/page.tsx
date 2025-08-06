import { api, getAuthorizationHeader, throwFromResponse } from '@/api';
import StudentsDataTable from '@/features/students/components/students-table';
import { auth } from '@/shared/lib/auth';

export default async function StudentSearchPage() {
  const res = await api.getAllStudents({
    format: 'json',
    headers: getAuthorizationHeader((await auth())!),
  });
  throwFromResponse(res);

  return <StudentsDataTable data={res.data} />;
}
