import { DotBackground } from '@/shared/components/background';
// import Header from '@/components/header/header';
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      {/* <Header /> */}
      <section className="flex h-[calc(100vh-100px)] w-full items-center justify-center py-12 md:py-24 lg:py-32">
        <DotBackground />
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-3 items-center gap-6 lg:gap-12">
            <div className="col-span-2 space-y-5">
              <div className="space-y-3">
                <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
                  v1.0
                </div>
                <h1 className="leading-tighter text-4xl font-bold tracking-tighter sm:text-5xl md:tracking-tight">
                  Gerenciador de Alunos Edge Academy
                </h1>
                <p className="max-w-screen-md text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  A plataforma que simplifica a gestão dos alunos do{' '}
                  <span className="decoration-foreground bg-gradient-to-tr from-blue-300 to-green-500 bg-clip-text font-extrabold text-transparent hover:cursor-pointer hover:underline hover:decoration-2">
                    Edge Academy.
                  </span>{' '}
                  Tenha controle total do processo de aprendizado e evolução dos
                  alunos.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link
                  className="inline-flex h-10 items-center justify-center rounded-md bg-blue-500 bg-gradient-to-r from-[#00cdac] to-[#8ac926] px-8 text-sm font-medium text-white shadow transition delay-150 duration-300 ease-in-out hover:-translate-y-[0.15rem] hover:opacity-90 disabled:pointer-events-none disabled:opacity-50 dark:opacity-90 dark:hover:opacity-110 dark:focus-visible:ring-gray-300"
                  href="/students"
                >
                  Veja agora os alunos
                </Link>
                {/* <Link
                  className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200
                  bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900
                   focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50
                    dark:border-gray-800 dark:bg-background dark:hover:bg-muted dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
                  href="#"
                >
                  Fale com os Administradores
                </Link> */}
              </div>
            </div>
            {/* <img
            alt="Image"
            className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center lg:order-last"
            height="340"
            src="/imagem.svg"
            width="600"
          /> */}
          </div>
        </div>
      </section>
    </div>
  );
}
