import StudentProfileUpdatePageComponent from '@/features/student-profile-update/update-page';

interface StudentProfileUpdatePageProps {
  params: Promise<{ id: string }>;
}

export default async function StudentProfileUpdatePage({
  params,
}: StudentProfileUpdatePageProps) {
  const { id } = await params;

  return (
    <StudentProfileUpdatePageComponent />
  );
}
