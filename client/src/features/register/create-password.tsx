'use client';

import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';

export default function CreatePasswordComponent() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <Card className="min-w-[600px] w-[704px] rounded-md bg-white shadow-lg p-6 gap-0 ">
      <CardHeader className="p-0">
        <CardTitle className="text-[#173C6B] text-heading-md text-left text-[32px] font-bold">
          Crie sua senha
        </CardTitle>
      </CardHeader>

      <CardContent className="p-0 text-gray-800 text-left text-[14px] text-justify space-y-6">
        <p>
          O primeiro passo é bem simples: crie sua senha para ter acesso ao sistema.
        </p>

        <div className="space-y-4">
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Senha"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 "
            >
              {showPassword ? <EyeOff size={20} strokeWidth={3.3} /> : <Eye size={20} strokeWidth={3.3} />} 
            </button>
          </div>

          <div className="relative">
            <input
              type={showConfirm ? 'text' : 'password'}
              placeholder="Confirme sua senha"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            >
              {showConfirm ? <EyeOff size={20} strokeWidth={3.3} /> : <Eye size={20} strokeWidth={3.3} />}
            </button>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button className="bg-[#009DB4] text-white font-semibold px-6 py-4 rounded-2xl uppercase hover:bg-[#009ddd] transition text-[14px]">
            Próximo
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
