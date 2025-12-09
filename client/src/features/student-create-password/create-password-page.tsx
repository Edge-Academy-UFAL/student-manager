import { IconBackground } from '@/shared/components/custom/icon-background';
import { AcademyLogo } from '@/shared/components/custom/academy-logo';
import { CreatePasswordForm } from './create-password-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/custom/card';

interface CreatePasswordComponentProps {
  invitationId: string;
}

export default function CreatePasswordComponent({ invitationId }: CreatePasswordComponentProps) {
  return (
    <div className="relative flex min-h-screen flex-col items-center p-6">
      <IconBackground />

      <main className="relative z-10 flex h-full w-full max-w-lg flex-col items-center justify-start gap-12 pt-16">
        <AcademyLogo height={141} />
        <div className="flex w-full flex-row items-center justify-center">
            <Card className="w-[704px] min-w-[600px] gap-0 rounded-md bg-white p-6 shadow-lg">
                <CardHeader className="p-0">
                    <CardTitle className="text-heading-md text-left text-[32px] font-bold text-[#173C6B]">
                    Crie sua senha
                    </CardTitle>
                </CardHeader>

                <CardContent className="space-y-6 p-0 text-justify text-left text-[14px] text-gray-800">
                    <p>
                    O primeiro passo é bem simples: crie sua senha para ter acesso ao
                    sistema.
                    </p>
                    <CreatePasswordForm invitationId={invitationId} />
                </CardContent>
            </Card>
        </div>
      </main>
    </div>
  );
}
