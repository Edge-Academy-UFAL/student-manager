import { Button } from '@/shared/components/custom/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import Link from 'next/link';

interface WelcomeComponentProps {
  invitationId: string;
}

export default function WelcomeComponent({ invitationId }: WelcomeComponentProps) {
  return (
    <Card className="w-[704px] min-w-[800px] gap-0 rounded-md bg-white p-6 shadow-lg">
      <CardHeader className="p-0">
        <CardTitle className="text-heading-md text-left text-[32px] font-bold text-[#173C6B]">
          Seja bem-vindo(a)!
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 text-justify text-left text-[14px] text-gray-800">
        <p className="mt-2">
          Antes de começar, complete seu cadastro para ativar seu acesso e
          iniciar sua jornada conosco.
        </p>

        <div className="flex justify-end pt-4">
          <Button variant="default" size="default">
            <Link href={`/create-password/${invitationId}`}>
              Completar Cadastro
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
