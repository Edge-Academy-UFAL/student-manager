import { UserRound } from 'lucide-react';
import { api, getAuthorizationHeader, throwFromResponse } from '@/api';
import { AllStudentsPage } from '@/features/student-list/all-students-page';
import { SimpleBreadcrumbs } from '@/shared/components/custom/simple-breadcrumbs';
import { auth } from '@/shared/lib/auth';

export default async function StudentSearchPage() {
  const res = await api.getAllStudents({
    format: 'json',
    headers: getAuthorizationHeader((await auth())!),
  });
  throwFromResponse(res);

  return (
    <div className="space-y-6">
      <SimpleBreadcrumbs
        items={[
          { label: 'Alunos', Icon: UserRound, href: 'students' },
          { label: 'Todos os alunos' },
        ]}
      />
      <AllStudentsPage data={res.data} />
    </div>
  );
}
