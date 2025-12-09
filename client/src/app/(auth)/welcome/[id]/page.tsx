import { AcademyLogo } from '@/shared/components/custom/academy-logo';
import { IconBackground } from '@/shared/components/custom/icon-background';
import WelcomeComponent from '@/features/register/welcome';

interface PageProps {
  params: {
    id: string;
  };
}

export default async function WelcomePage({ params }: PageProps) {
  const { id: invitationId } = await params;

  return (
    <div className="relative flex min-h-screen flex-col items-center p-6">
      <IconBackground />

      <main className="relative z-10 flex h-full w-full max-w-lg flex-col items-center justify-start gap-12 pt-16">
        <AcademyLogo height={141} />
        <div className="flex w-full flex-row items-center justify-center">
          <WelcomeComponent invitationId={invitationId}/>
        </div>
      </main>
    </div>
  );
}
