'use client';

import { useRouter } from 'next/navigation';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { FloatingLabelPasswordInput } from '@/shared/components/custom/floating-label-password-input';

export default function ResetPasswordComponent() {
  const router = useRouter();
  const handleClick = () => {
    router.push('/password-success'); 
  };

  return (
    <Card className="min-w-[600px] w-[704px] rounded-md bg-white shadow-lg p-6 gap-0 ">
      <CardHeader className="p-0">
        <CardTitle className="text-[#173C6B] text-heading-md text-left text-[32px] font-bold">
          Crie sua senha
        </CardTitle>
      </CardHeader>

      <CardContent className="p-0 text-gray-800 text-left text-[14px] text-justify space-y-6">
        <p>
            Crie uma nova senha para acessar o sistema.
        </p>

        <div className="space-y-4">
          <FloatingLabelPasswordInput label="Senha" />
          <FloatingLabelPasswordInput label="Confirme sua senha" />
        </div>
        <div className="flex justify-end pt-4">
        <button
            onClick={handleClick}
            className="bg-[#009DB4] text-white font-semibold px-6 py-4 rounded-2xl uppercase hover:bg-[#009ddd] transition text-[14px]"
          >
            Próximo
          </button>
        </div>
      </CardContent>
    </Card>
  );
}



