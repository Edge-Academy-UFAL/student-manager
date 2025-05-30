import StudentPageHeader from '@/features/student/student-page-header';
import { auth } from '@/shared/lib/auth';

const getData = async (email: string) => {
  const session = await auth();
  const token = session?.user.authToken;

  try {
    const res = await fetch(
      `${process.env.backendRoute}/api/v1/students/${email}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        next: {
          revalidate: 15,
        },
      },
    );

    if (!res.ok) {
      return null;
    }

    return res.json();
  } catch (error) {
    console.log(error);
    throw new Error('Erro de conexão com o servidor');
  }
};

const StudentLayout = async ({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { username: string };
}>) => {
  const studentData = await getData(`${params.username}@edge.ufal.br`);
  if (!studentData) {
    throw new Error('Erro ao buscar os dados');
  }
  return (
    <>
      <StudentPageHeader student={studentData} />
      <main className="p-5">{children}</main>
    </>
  );
};

export default StudentLayout;
