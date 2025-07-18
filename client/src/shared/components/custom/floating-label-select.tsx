import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';
import * as Label from '@radix-ui/react-label';
import { cn } from '@/shared/lib/utils';
import { useId, useState } from 'react';

type SimpleSelectProps = {
  id?: string;
  label: string;
  options: { label: string; value: string }[];
  onValueChange?: (value: string) => void;
  defaultValue?: string;
  disabled?: boolean;
  'aria-invalid'?: boolean;
};

export function FloatingLabelSelect({
  id,
  label,
  options,
  defaultValue,
  onValueChange,
  disabled,
  ...props
}: SimpleSelectProps) {
  const generatedId = useId();
  const selectId = id ?? generatedId;

  const [selectedValue, setSelectedValue] = useState(defaultValue ?? '');

  function handleChange(value: string) {
    setSelectedValue(value);
    onValueChange?.(value);
  }

  const isEmpty = !selectedValue;

  return (
    <div className="relative h-fit w-full">
      <Select value={selectedValue} onValueChange={handleChange}>
        <SelectTrigger
          id={selectId}
          data-size={undefined}
          className={cn(
            'peer text-body-md relative h-[48px] w-full cursor-pointer rounded-md border border-neutral-300 px-[16px] py-[4px] font-normal text-neutral-900 not-disabled:bg-white not-disabled:hover:bg-white focus:outline-none focus-visible:ring-neutral-200',
            'aria-invalid:border-destructive',
            'disabled:bg-neutral-150 disabled:border disabled:border-neutral-300 disabled:text-neutral-300 disabled:opacity-100 disabled:hover:bg-neutral-100',
          )}
          aria-invalid={props['aria-invalid']}
          disabled={disabled}
        >
          <SelectValue placeholder=" " className="text-brand-600" />
        </SelectTrigger>

        <SelectContent className="rounded-md bg-white py-2 *:data-[radix-select-viewport]:p-0">
          {options.map((opt) => (
            <SelectItem
              key={opt.value}
              value={opt.value}
              className="text-body-md m-0 rounded-none px-[16px] py-[8px]"
            >
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Label.Root
        htmlFor={selectId}
        className={cn(
          'text-body-md pointer-events-none absolute left-4 z-10 origin-[0] transform bg-white px-1 text-neutral-300 transition-all',
          isEmpty
            ? 'top-1/2 -translate-y-1/2 scale-100'
            : 'top-1 -translate-y-4 scale-75',
          'peer-aria-invalid:text-danger-300',
          isEmpty
            ? 'peer-disabled:bg-neutral-150'
            : 'peer-disabled:label-background-2-colors',
        )}
      >
        {label}
      </Label.Root>
    </div>
  );
}
