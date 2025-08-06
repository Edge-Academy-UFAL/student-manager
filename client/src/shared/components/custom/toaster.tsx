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
            'flex w-89 items-center gap-4 rounded-sm px-4 py-2 text-sm shadow-[0_4px_12px_rgba(0,0,0,0.1)]',
          ),
          title: cn('leading-normal font-bold'),
          description: cn('text-foreground leading-normal'),
          closeButton: cn(
            'text-foreground order-last ml-auto flex h-6 w-6 cursor-pointer items-center justify-center',
          ),
          success: cn('!bg-success-100 text-success-400'),
          error: cn('!bg-danger-100 text-danger-400'),
          info: cn('!bg-action-200 text-action-500'),
          warning: cn('!bg-warning-100 text-warning-400'),
          default: cn('bg-background'),
          content: cn('flex flex-col'),
          icon: cn(
            'relative mr-[var(--toast-icon-margin-end)] ml-[var(--toast-icon-margin-start)] flex h-4 w-4 flex-shrink-0 items-center justify-start [&_>*]:flex-shrink-0 [&_svg]:mr-[var(--toast-svg-margin-end)] [&_svg]:ml-[var(--toast-svg-margin-start)]',
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
