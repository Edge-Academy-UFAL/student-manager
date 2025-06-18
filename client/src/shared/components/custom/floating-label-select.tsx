'use client';

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

type SimpleSelectProps = React.ComponentProps<'select'> & {
  label: string;
  options: { label: string; value: string }[];
  onValueChange?: (value: string) => void;
  defaultValue?: string;
};

export function FloatingLabelSelect({
  id,
  label,
  options,
  defaultValue,
  onValueChange,
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
            'peer !text-body-md focus:border-brand-600 outline-brand-200 focus-visible:ring-brand-200 relative h-[48px] w-full rounded-md border border-neutral-300 bg-transparent px-[16px] py-[4px] font-normal text-neutral-900 focus:outline-none',
            'aria-invalid:border-destructive',
          )}
          aria-invalid={props['aria-invalid']}
        >
          <SelectValue placeholder=" " className="text-brand-600" />
        </SelectTrigger>

        <SelectContent className="rounded-md bg-white py-2 *:data-[radix-select-viewport]:p-0">
          {options.map((opt) => (
            <SelectItem
              key={opt.value}
              value={opt.value}
              className="!text-body-md m-0 rounded-none px-[16px] py-[8px]"
            >
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Label.Root
        htmlFor={selectId}
        className={cn(
          '!text-body-md pointer-events-none absolute left-4 z-10 origin-[0] transform bg-white px-1 text-neutral-300 transition-all',
          isEmpty
            ? 'top-1/2 -translate-y-1/2 scale-100'
            : 'top-1 -translate-y-4 scale-75',
          'peer-aria-invalid:text-danger-300',
        )}
      >
        {label}
      </Label.Root>
    </div>
  );
}
