import StudentsDataTable from '@/features/students/components/students-table';
import { auth } from '@/shared/lib/auth';

const StudentSearchPage = async () => {
  const session = await auth();

  const getData = async () => {
    try {
      const res = await fetch(`${process.env.backendRoute}/api/v1/students`, {
        headers: {
          Authorization: `Bearer ${session?.user.authToken}`,
        },
        next: {
          revalidate: 15, // dessa forma, a cada 15 segundos a página será atualizada
        },
      });

      if (!res.ok) {
        return null;
      }

      return res.json();
    } catch (error) {
      console.log(error);
      throw new Error('Erro de conexão com o servidor');
    }
  };

  const studentsData = await getData();

  if (!studentsData) {
    throw new Error('Erro ao buscar os dados');
  }

  return (
    <div className="flex justify-center">
      <StudentsDataTable data={studentsData} />
    </div>
  );
};

export default StudentSearchPage;
