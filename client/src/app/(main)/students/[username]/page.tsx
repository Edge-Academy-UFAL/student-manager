import { api, getAuthorizationHeader, throwFromResponse } from "@/api";
import AdminStudentPage from "@/features/student-profile/admin-student-page";
import { MyProfileComponent } from "@/features/student-profile/my-profile-page";
import { auth } from "@/shared/lib/auth";

export default async function StudentProfilePage({
  params,
}: StudentProfilePageProps) {
  const session = await auth();
  const userType = session?.user?.dtype; // "Administrator" | "Student"
  
  const { username } = await params;

  const res = await api.getStudent(`${username}@edge.ufal.br`, {
    format: 'json',
    headers: getAuthorizationHeader(session!),
  });
  throwFromResponse(res);

  if (userType === "Administrator") {
    return <AdminStudentPage />;
  }

  return <MyProfileComponent studentInfo={res.data} />;
}

interface StudentProfilePageProps {
  params: Promise<{ username: string }>;
}