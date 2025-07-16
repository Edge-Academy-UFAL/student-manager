import { AcademyLogo } from '@/shared/components/custom/academy-logo';
import { IconBackground } from '@/shared/components/custom/icon-background';
import { LoginFormCard } from '@/features/login/login-form-card';

export default function LoginPage() {
  return (
    <>
      <IconBackground />
      <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-6">
        <AcademyLogo height={141} />
        <div className="flex w-full flex-row items-center justify-center gap-6">
          <div className="hidden h-105 w-full bg-black lg:block" />
          <LoginFormCard />
        </div>
      </main>
    </>
  );
}
