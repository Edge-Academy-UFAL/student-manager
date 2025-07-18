import * as Label from '@radix-ui/react-label';
import { Checkbox } from '@/shared/components/ui/checkbox';
import { cn } from '@/shared/lib/utils';
import { useId } from 'react';

type SimpleCheckboxProps = {
  id?: string;
  label: string;
  checked?: boolean;
  onChange?: (value: boolean) => void;
  name?: string;
  className?: string;
  inputClassName?: string;
  disabled?: boolean;
};

export function SimpleCheckbox({
  id,
  label,
  checked,
  onChange,
  name,
  className,
  inputClassName,
  disabled,
}: SimpleCheckboxProps) {
  const generatedId = useId();
  const checkboxId = id ?? generatedId;

  return (
    <div className={cn('flex h-[48px] flex-row items-center gap-2', className)}>
      <Checkbox
        id={checkboxId}
        name={name}
        checked={checked}
        onCheckedChange={onChange}
        className={cn(
          'peer data-[state=checked]:bg-brand-500 data-[state=checked]:border-brand-500 rounded-[2px] border-[2px] border-neutral-400 not-data-[state=checked]:bg-transparent',
          inputClassName,
        )}
        disabled={disabled}
      />
      <Label.Root
        htmlFor={checkboxId}
        className={cn(
          '!text-body-md font-normal text-neutral-950 peer-disabled:text-neutral-300',
        )}
      >
        {label}
      </Label.Root>
    </div>
  );
}
