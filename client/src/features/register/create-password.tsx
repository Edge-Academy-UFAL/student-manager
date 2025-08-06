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

        <div className="space-y-4">
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Senha"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-1/2 right-3 -translate-y-1/2 transform text-gray-500"
            >
              {showPassword ? (
                <EyeOff size={20} strokeWidth={3.3} />
              ) : (
                <Eye size={20} strokeWidth={3.3} />
              )}
            </button>
          </div>

          <div className="relative">
            <input
              type={showConfirm ? 'text' : 'password'}
              placeholder="Confirme sua senha"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute top-1/2 right-3 -translate-y-1/2 transform text-gray-500"
            >
              {showConfirm ? (
                <EyeOff size={20} strokeWidth={3.3} />
              ) : (
                <Eye size={20} strokeWidth={3.3} />
              )}
            </button>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button className="rounded-2xl bg-[#009DB4] px-6 py-4 text-[14px] font-semibold text-white uppercase transition hover:bg-[#009ddd]">
            Próximo
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
