import StudentProfile from '@/features/student-profile/ui/profile-page';
import { auth } from '@/shared/lib/auth';
import { orderActivities } from '@/features/student-profile/lib/utils';

interface StudentProfilePageProps {
  params: { username: string };
}

const fetchStudentActivities = async (email: string, token: string) => {
  const response = await fetch(
    `${process.env.backendRoute}/api/v1/activities/${email}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: { tags: ['user-data'], revalidate: 15 },
    },
  );

  if (response.ok) {
    const data = await response.json();
    // Order by: first newer on going activities and then newer done activities.
    return orderActivities(data);
  } else {
    throw new Error('Erro ao buscar os dados');
  }
};

const fetchStudentData = async (email: string, token: string) => {
  const response = await fetch(
    `${process.env.backendRoute}/api/v1/students/${email}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: { tags: ['user-data'], revalidate: 15 },
    },
  );

  if (response.ok) {
    const studentInfos = await response.json();
    studentInfos.about = studentInfos.about || 'Não fornecido!';
    return studentInfos;
  } else {
    throw new Error('Erro ao buscar os dados');
  }
};

const StudentProfilePage = async ({ params }: StudentProfilePageProps) => {
  const { username } = await params;
  const email = `${username}@edge.ufal.br`;
  const session = await auth();

  const studentProfileData = await fetchStudentData(
    email,
    session?.user.authToken ?? '',
  );

  const studentActivitiesData = await fetchStudentActivities(
    email,
    session?.user.authToken ?? '',
  );

  if (!studentProfileData) {
    throw new Error('Erro ao buscar os dados');
  }

  if (!studentActivitiesData) {
    throw new Error('Erro ao buscar os dados');
  }

  return (
    <div className="flex justify-center">
      <StudentProfile
        username={username}
        studentInfo={studentProfileData}
        activities={studentActivitiesData}
      />
    </div>
  );
};

export default StudentProfilePage;
