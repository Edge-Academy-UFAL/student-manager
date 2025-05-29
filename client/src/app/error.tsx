'use client';

import { RefreshCw } from 'lucide-react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section>
      <div className="container mx-auto flex min-h-screen items-center px-6 py-12">
        <div>
          <p className="text-foreground text-sm font-medium">404</p>
          <h1 className="mt-3 text-2xl font-semibold text-gray-800 md:text-3xl dark:text-white">
            {error.message}
          </h1>
          <p className="mt-4 text-gray-500 dark:text-gray-400">
            Um erro inesperado ocorreu. Por favor, tente novamente.
          </p>

          <div className="mt-6 flex items-center gap-x-3">
            <button
              onClick={reset}
              className="text-foreground flex w-1/2 items-center justify-center gap-x-2 rounded-lg border bg-transparent px-5 py-2 text-sm transition-colors duration-200 sm:w-auto"
            >
              <RefreshCw size={16} />

              <span>Tentar Novamente</span>
            </button>

            <Link
              href="/"
              className="tracking-widetransition-colors bg-foreground text-background w-1/2 shrink-0 rounded-lg px-5 py-2 text-sm duration-200 sm:w-auto"
            >
              Voltar para Home
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
