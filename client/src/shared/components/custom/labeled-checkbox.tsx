import * as Label from '@radix-ui/react-label';
import { Checkbox } from './checkbox';
import { cn } from '@/shared/lib/utils';
import React, { useId } from 'react';

interface LabeledCheckboxProps extends React.ComponentProps<typeof Checkbox> {
  label: string;
  inputClassName?: string;
  labelClassName?: string;
}

export function LabeledCheckbox({
  id,
  label,
  className,
  inputClassName,
  labelClassName,
  ...props
}: LabeledCheckboxProps) {
  const generatedId = useId();
  const checkboxId = id ?? generatedId;

  return (
    <div className={cn('flex h-[48px] flex-row items-center gap-2', className)}>
      <Checkbox
        id={checkboxId}
        className={cn('peer', inputClassName)}
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
