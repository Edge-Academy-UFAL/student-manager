import { Checkbox } from '@/shared/components/ui/checkbox';
import { cn } from '@/shared/lib/utils';
import React from 'react';

function CheckboxWrapper({
  className,
  ...props
}: React.ComponentProps<typeof Checkbox>) {
  return (
    <Checkbox
      className={cn(
        'data-[state=checked]:bg-brand-500 data-[state=checked]:border-brand-500 rounded-[2px] border-[2px] border-neutral-400 not-data-[state=checked]:bg-transparent',
        className,
      )}
      {...props}
    />
  );
}
export { CheckboxWrapper as Checkbox };
