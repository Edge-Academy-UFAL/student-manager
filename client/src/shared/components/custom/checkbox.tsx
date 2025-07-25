import * as Label from '@radix-ui/react-label';
import { Checkbox } from '@/shared/components/ui/checkbox';
import { cn } from '@/shared/lib/utils';
import React, { useId } from 'react';

interface SimpleCheckboxProps extends React.ComponentProps<typeof Checkbox> {
  label: string;
  inputClassName?: string;
  labelClassName?: string;
}

export function SimpleCheckbox({
  id,
  label,
  className,
  inputClassName,
  labelClassName,
  ...props
}: SimpleCheckboxProps) {
  const generatedId = useId();
  const checkboxId = id ?? generatedId;

  return (
    <div className={cn('flex h-[48px] flex-row items-center gap-2', className)}>
      <Checkbox
        id={checkboxId}
        className={cn(
          'peer data-[state=checked]:bg-brand-500 data-[state=checked]:border-brand-500 rounded-[2px] border-[2px] border-neutral-400 not-data-[state=checked]:bg-transparent',
          inputClassName,
        )}
        {...props}
      />
      <Label.Root
        htmlFor={checkboxId}
        className={cn(
          'text-body-md font-normal text-neutral-950 peer-disabled:text-neutral-300',
          labelClassName,
        )}
      >
        {label}
      </Label.Root>
    </div>
  );
}
