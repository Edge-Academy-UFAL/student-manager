'use client';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/shared/components/ui/avatar';
import { Button } from '@/shared/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/shared/components/ui/sheet';
import { useSession, signOut } from 'next-auth/react';

export function UserSheet() {
  const { status, data } = useSession();

  const photoUrl = data?.user.photoUrl ?? undefined;

  const username = data?.user.name;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Avatar className="hover:cursor-pointer">
          <AvatarImage
            className="rounded-xl object-cover shadow-sm"
            alt="Profile Photo"
            src={photoUrl}
          />
          <AvatarFallback>{username?.charAt(0)}</AvatarFallback>
        </Avatar>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Menu do usuário</SheetTitle>
          <SheetDescription>
            Acesse configurações e outras opções de usuário.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 p-4">
          {status === 'authenticated' && (
            <Button
              className="text-foreground hover:bg-foreground hover:text-background border bg-transparent transition-colors"
              onClick={() => {
                signOut({ redirect: true, callbackUrl: '/login' });
              }}
            >
              Sair
            </Button>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
