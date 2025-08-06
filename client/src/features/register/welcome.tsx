import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';

export default function WelcomeComponent() {
  return (
    <Card className="w-[704px] min-w-[800px] gap-0 rounded-md bg-white p-6 shadow-lg">
      <CardHeader className="p-0">
        <CardTitle className="text-heading-md text-left text-[32px] font-bold text-[#173C6B]">
          Seja bem-vindo(a)!
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 text-justify text-left text-[14px] text-gray-800">
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
          <button className="rounded-2xl bg-[#009DB4] px-6 py-4 text-[14px] font-semibold text-white uppercase transition hover:bg-[#009ddd]">
            Iniciar o cadastro
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
