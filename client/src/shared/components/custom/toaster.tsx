'use client';

import * as React from 'react';
import { cn } from '@/shared/lib/utils';

import { Toaster } from '@/shared/components/ui/sonner';
import {
  CircleCheck,
  InfoIcon,
  OctagonXIcon,
  TriangleAlertIcon,
  XIcon,
} from 'lucide-react';

function ToasterWrapper(props: React.ComponentProps<typeof Toaster>) {
  return (
    <Toaster
      closeButton
      toastOptions={{
        unstyled: true,
        classNames: {
          toast: cn(
            'px-4 py-2 rounded-sm shadow-[0_4px_12px_rgba(0,0,0,0.1)] w-89 text-sm flex items-center gap-4',
          ),
          title: cn('font-bold leading-normal'),
          description: cn('leading-normal text-foreground'),
          closeButton: cn(
            'h-6 w-6 flex justify-center items-center text-foreground cursor-pointer order-last ml-auto',
          ),
          success: cn('!bg-success-100 text-success-400'),
          error: cn('!bg-danger-100 text-danger-400'),
          info: cn('!bg-action-200 text-action-500'),
          warning: cn('!bg-warning-100 text-warning-400'),
          default: cn('bg-background'),
          content: cn('flex flex-col'),
          icon: cn(
            'flex h-4 w-4 relative justify-start items-center flex-shrink-0 ml-[var(--toast-icon-margin-start)] mr-[var(--toast-icon-margin-end)] [&_>*]:flex-shrink-0 [&_svg]:ml-[var(--toast-svg-margin-start)] [&_svg]:mr-[var(--toast-svg-margin-end)]',
          ),
        },
        closeButtonAriaLabel: 'Fechar notificação',
      }}
      icons={{
        success: <CircleCheck />,
        info: <InfoIcon />,
        warning: <TriangleAlertIcon />,
        error: <OctagonXIcon />,
        close: <XIcon />,
      }}
      containerAriaLabel="Notificações"
      {...props}
    />
  );
}

export { ToasterWrapper as Toaster };
