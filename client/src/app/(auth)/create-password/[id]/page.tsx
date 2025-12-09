import CreatePasswordComponent from "@/features/student-create-password/create-password-page";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function CreatePasswordPage({ params }: PageProps) {
  const { id: invitationId } = await params;

  return (
    CreatePasswordComponent({ invitationId })
  );
}
