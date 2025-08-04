import { AcademyLogo } from '@/shared/components/custom/academy-logo';
import { IconBackground } from '@/shared/components/custom/icon-background';
import RecoveryPasswordComponent from '@/features/register/recovery-password';

export default function RecoveryPasswordPage() {
  return (
    <div className="relative min-h-screen flex flex-col items-center p-6">
      <IconBackground />

      <main className="relative z-10 flex flex-col items-center justify-start gap-12 pt-16 h-full w-full max-w-lg">
        <AcademyLogo height={141} />
        <div className="flex w-full flex-row items-center justify-center">
          <RecoveryPasswordComponent /> 
        </div>
      </main>
    </div>
  );
}