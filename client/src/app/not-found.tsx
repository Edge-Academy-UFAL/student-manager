import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="">
      <div className="flex min-h-screen flex-col items-center justify-center gap-5">
        <div>
          <h1 className="text-center text-8xl font-bold">404</h1>
          <p className="text-center text-4xl font-medium">Page Not Found</p>
        </div>

        <Link
          href="/"
          className="bg-foreground text-background w-1/2 shrink-0 rounded-lg px-6 py-4 tracking-wide transition-colors duration-200 sm:w-auto"
        >
          Voltar para Home
        </Link>
      </div>
    </div>
  );
}
