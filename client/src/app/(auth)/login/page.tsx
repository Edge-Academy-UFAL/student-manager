import { AcademyLogo } from '@/shared/components/custom/academy-logo';
import { IconBackground } from '@/shared/components/custom/icon-background';
import { LoginFormCard } from '@/features/login/login-page';

export default function LoginPage() {
  return (
    <>
      <IconBackground />
      <main className="mt-14 flex flex-col items-center gap-6 px-6 lg:mt-8">
        <AcademyLogo height={141} />
        <div className="flex w-full flex-row items-center gap-6">
          <div className="hidden h-105 w-full bg-black lg:block" />
          <LoginFormCard />
        </div>
      </main>
    </>
  );
}
