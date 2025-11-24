import StudentProfileUpdatePageComponent from '@/features/student-profile-update/update-page';

interface StudentProfileUpdatePageProps {
  params: Promise<{ username: string }>;
}

export default async function StudentProfileUpdatePage({
  params,
}: StudentProfileUpdatePageProps) {
  const {  } = await params;

  return (
    <StudentProfileUpdatePageComponent />
  );
}
