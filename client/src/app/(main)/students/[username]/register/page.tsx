import StudentRegisterPageComponent from '@/features/register/register-page';

interface StudentRegisterPageProps {
  params: { username: string };
}
export default async function StudentRegisterPage({
  params,
}: StudentRegisterPageProps) {
  const { username } = await params;
  console.log(username);

  return <StudentRegisterPageComponent />;
}
