import * as React from 'react';

import { cn } from '@/shared/lib/utils';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';

function SelectTriggerWrapper({
  className,
  ...props
}: Omit<React.ComponentProps<typeof SelectTrigger>, 'size'>) {
  return (
    <SelectTrigger
      data-size={undefined}
      className={cn(
        'text-body-md h-[48px] cursor-pointer rounded-md border border-neutral-300 px-[16px] py-[4px] font-normal text-neutral-900 focus:outline-none focus-visible:ring-neutral-200',
        'aria-invalid:border-destructive',
        'disabled:bg-neutral-150 disabled:hover:bg-neutral-150 disabled:border disabled:border-neutral-300 disabled:text-neutral-300 disabled:opacity-100',
        className,
      )}
      {...props}
    />
  );
}

function SelectValueWrapper({
  className,
  ...props
}: React.ComponentProps<typeof SelectValue>) {
  return <SelectValue className={cn('text-brand-600', className)} {...props} />;
}

function SelectContentWrapper({
  className,
  ...props
}: React.ComponentProps<typeof SelectContent>) {
  return (
    <SelectContent
      className={cn(
        'rounded-md py-2 *:data-[radix-select-viewport]:p-0',
        className,
      )}
      {...props}
    />
  );
}

function SelectItemWrapper({
  className,
  ...props
}: React.ComponentProps<typeof SelectItem>) {
  return (
    <SelectItem
      className={cn(
        'text-body-md m-0 rounded-none px-[16px] py-[8px]',
        className,
      )}
      {...props}
    />
  );
}

export {
  Select,
  SelectContentWrapper as SelectContent,
  SelectGroup,
  SelectItemWrapper as SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTriggerWrapper as SelectTrigger,
  SelectValueWrapper as SelectValue,
};
