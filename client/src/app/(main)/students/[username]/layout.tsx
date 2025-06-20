// import StudentPageHeader from '@/features/student-header/student-page-header';
// import { auth } from '@/shared/lib/auth';

// const getData = async (email: string) => {
//   const session = await auth();
//   const token = session?.user.authToken;

//   try {
//     const res = await fetch(
//       `${process.env.SERVER_URL}/api/v1/students/${email}`,
//       {
//         method: 'GET',
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//         next: {
//           revalidate: 15,
//         },
//       },
//     );

//     if (!res.ok) {
//       return null;
//     }

//     return res.json();
//   } catch (error) {
//     console.log(error);
//     throw new Error('Erro de conexão com o servidor');
//   }
// };

// const StudentLayout = async ({
//   children,
//   params,
// }: Readonly<{
//   children: React.ReactNode;
//   params: { username: string };
// }>) => {
//   const { username } = await params;
//   const studentData = await getData(`${username}@edge.ufal.br`);
//   if (!studentData) {
//     throw new Error('Erro ao buscar os dados');
//   }
//   return (
//     <>
//       <StudentPageHeader student={studentData} />
//       <main className="p-5">{children}</main>
//     </>
//   );
// };

// export default StudentLayout;
export default function StudentLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
