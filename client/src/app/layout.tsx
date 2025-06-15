import type { Metadata } from 'next';
import { Work_Sans, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/shared/components/ui/sonner';
import { Providers } from '@/shared/components/providers/providers';
import { auth } from '@/shared/lib/auth';

const workSans = Work_Sans({
  variable: '--font-work-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Edge Academy',
  description: 'Gerenciador de alunos do Edge Academy.',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${workSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers session={session}>{children}</Providers>
        <Toaster />
      </body>
    </html>
  );
}
