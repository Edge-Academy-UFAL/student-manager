export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div className="flex h-[100vh] w-full">
        <aside className="bg-action-100 px-[16px] py-[24px]">EA</aside>
        <div className="grow overflow-y-scroll p-[24px]">{children}</div>
      </div>
    </div>
  );
}
