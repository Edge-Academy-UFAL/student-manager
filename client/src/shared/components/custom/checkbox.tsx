import * as Label from '@radix-ui/react-label';
import { Checkbox } from '@/shared/components/ui/checkbox';
import { cn } from '@/shared/lib/utils';

type SimpleCheckboxProps = {
  label: string;
  checked?: boolean;
  onChange?: (value: boolean) => void;
  name?: string;
  className?: string;
  inputClassName?: string;
};

export function SimpleCheckbox({
  label,
  checked,
  onChange,
  name,
  className,
  inputClassName,
}: SimpleCheckboxProps) {
  return (
    <div className={cn('flex h-[48px] flex-row items-center gap-2', className)}>
      <Checkbox
        name={name}
        checked={checked}
        onCheckedChange={onChange}
        className={cn(
          'data-[state=checked]:bg-brand-500 data-[state=checked]:border-brand-500 rounded-[2px] border-[2px] border-neutral-400',
          inputClassName,
        )}
      />
      <Label.Root
        htmlFor={name}
        className={cn('!text-body-md font-normal text-neutral-950')}
      >
        {label}
      </Label.Root>
    </div>
  );
}
