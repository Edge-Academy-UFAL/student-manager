'use client';

import * as React from 'react';
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
  ...props
}: React.ComponentProps<typeof DialogContent>) {
  return (
    <DialogContent
      className={cn('gap-6 rounded-sm bg-white', className)}
      {...props}
    />
  );
}

function DialogDescriptionWrapper({
  className,
  ...props
}: React.ComponentProps<typeof DialogDescription>) {
  return (
    <DialogDescription
      className={cn('text-secondary-foreground', className)}
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
      className={cn('text-action-500 leading-snug font-normal', className)}
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
