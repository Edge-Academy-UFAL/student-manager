export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div className="flex h-[100vh] w-full">
        <aside className="bg-action-100 px-[16px] py-[24px]">EA</aside>
        <div className="grow overflow-y-scroll p-[24px]">
          <p className="text-body-md text-neutral-400">
            Meu perfil {'>'} <strong>Editar dados cadastrais</strong>
          </p>
          {children}
        </div>
      </div>
    </div>
  );
}
