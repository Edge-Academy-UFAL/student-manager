'use client';

import * as React from 'react';
import { XIcon } from 'lucide-react';

import { cn } from '@/shared/lib/utils';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from '@/shared/components/ui/dialog';

function DialogContentWrapper({
  className,
  children,
  showCloseButton = true,
  ...props
}: React.ComponentProps<typeof DialogContent>) {
  return (
    <DialogContent
      className={cn('gap-6 rounded-sm bg-white', className)}
      showCloseButton={false}
      {...props}
    >
      {children}
      {/* Copied from the original DialogContent, but with changed position and text */}
      {showCloseButton && (
        <DialogClose className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-6 right-6 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4">
          <XIcon />
          <span className="sr-only">Fechar</span>
        </DialogClose>
      )}
    </DialogContent>
  );
}

function DialogDescriptionWrapper({
  className,
  ...props
}: React.ComponentProps<typeof DialogDescription>) {
  return (
    <DialogDescription
      className={cn('text-secondary-foreground text-body-md', className)}
      {...props}
    />
  );
}

function DialogFooterWrapper({
  className,
  ...props
}: React.ComponentProps<typeof DialogFooter>) {
  return <DialogFooter className={cn('gap-4', className)} {...props} />;
}

function DialogTitleWrapper({
  className,
  ...props
}: React.ComponentProps<typeof DialogTitle>) {
  return (
    <DialogTitle
      className={cn(
        'text-action-500 text-heading-xs leading-tight font-normal',
        className,
      )}
      {...props}
    />
  );
}

export {
  Dialog,
  DialogClose,
  DialogContentWrapper as DialogContent,
  DialogDescriptionWrapper as DialogDescription,
  DialogFooterWrapper as DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitleWrapper as DialogTitle,
  DialogTrigger,
};
