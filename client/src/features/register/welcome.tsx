'use client'

import { useRouter } from 'next/navigation';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';

export default function WelcomeComponent() {
  const router = useRouter();
  const handleClick = () => {
    router.push('/create-password'); 
  };
  return (
    <Card className="min-w-[800px] w-[704px] rounded-md bg-white shadow-lg p-6 gap-0">
      <CardHeader className="p-0">
        <CardTitle className="text-[#173C6B] text-heading-md text-left text-[32px] font-bold">
          Seja bem-vindo(a)!
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 text-gray-800 text-left text-[14px] text-justify ">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
        
        <p className="mt-2">
          Antes de começar, complete seu cadastro para ativar seu acesso e
          iniciar sua jornada conosco.
        </p>

        <div className="flex justify-end pt-4">
          <button
            onClick={handleClick}
            className="bg-[#009DB4] text-white font-semibold px-6 py-4 rounded-2xl uppercase hover:bg-[#009ddd] transition text-[14px]"
          >
            Iniciar o cadastro
          </button>
        </div>
      </CardContent>
    </Card>
  );
}