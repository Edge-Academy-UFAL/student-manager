'use client';

import { useRouter } from 'next/navigation';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';

export default function PasswordSuccessComponent() {
  const router = useRouter();

  const handleClick = () => {
    router.push('/login'); 
  };

  return (
    <Card className="min-w-[800px] w-[704px] rounded-md bg-white shadow-lg p-6 gap-0">
      <CardHeader className="p-0">
        <CardTitle className="text-[#173C6B] text-heading-md text-left text-[32px] font-bold">
          Recuperação de senha
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 text-gray-800 text-left text-[14px] text-justify ">
        <p>Sua nova senha foi criada e já está ativa.</p>

        <p className="mt-2">
         Agora você já pode acessar a plataforma EDGE Academy normalmente com seu novo login.
        </p>
        <p className="mt-3">
         Se você não solicitou essa alteração, entre em contato com a nossa equipe o mais rápido possível para garantir a segurança da sua conta.
        </p>

        <div className="flex justify-end pt-4">
          <button
            onClick={handleClick}
            className="bg-[#009DB4] text-white font-semibold px-6 py-4 rounded-2xl uppercase hover:bg-[#009ddd] transition text-[14px]"
          >
           Ir para o login
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
