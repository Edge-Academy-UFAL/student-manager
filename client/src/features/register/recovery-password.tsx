'use client';

import { useRouter } from 'next/navigation';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';

export default function RecoveryPasswordComponent() {
  const router = useRouter();

  const handleClick = () => {
    router.push('/reset-password'); 
  };

  return (
    <Card className="min-w-[800px] w-[704px] rounded-md bg-white shadow-lg p-6 gap-0">
      <CardHeader className="p-0">
        <CardTitle className="text-[#173C6B] text-heading-md text-left text-[32px] font-bold">
          Recuperação de senha
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 text-gray-800 text-left text-[14px] text-justify ">
        <p>Sabemos que esquecer a senha pode acontecer com qualquer pessoa e está tudo bem!</p>

        <p className="mt-2">
          Para continuar, basta preencher o seu e-mail EDGE. Em instantes, você receberá um link para criar uma nova
          senha e recuperar seu acesso à plataforma.
        </p>
        <p className="mt-3">
          Caso não receba o e-mail em alguns minutos, lembre-se de verificar a caixa de spam ou lixeira. 
          Se ainda assim não encontrar, você pode tentar novamente ou entrar em contato com nossa equipe de suporte.
        </p>

        <div className="flex justify-end pt-4">
          <button
            onClick={handleClick}
            className="bg-[#009DB4] text-white font-semibold px-6 py-4 rounded-2xl uppercase hover:bg-[#009ddd] transition text-[14px]"
          >
            Recuperar minha senha
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
