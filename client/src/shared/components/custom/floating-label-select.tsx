'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './select';
import * as Label from '@radix-ui/react-label';
import { cn } from '@/shared/lib/utils';
import { useId } from 'react';

type FloatingLabelSelectProps = {
  id?: string;
  label: string;
  options: readonly { label: string; value: string }[];
  onValueChange?: (value: string) => void;
  value?: string;
  disabled?: boolean;
  'aria-invalid'?: boolean;
};

export function FloatingLabelSelect({
  id,
  label,
  options,
  value,
  onValueChange,
  disabled,
  ...props
}: FloatingLabelSelectProps) {
  const generatedId = useId();
  const selectId = id ?? generatedId;

  return (
    <div className="relative h-fit w-full">
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger
          id={selectId}
          className="peer w-full"
          aria-invalid={props['aria-invalid']}
          disabled={disabled}
        >
          <SelectValue />
        </SelectTrigger>

        <SelectContent>
          {options.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Label.Root
        htmlFor={selectId}
        className={cn(
          'text-body-md pointer-events-none absolute left-4 z-10 origin-[0] transform bg-white px-1 text-neutral-300 transition-all',
          'peer-data-placeholder:top-1/2 peer-data-placeholder:-translate-y-1/2 peer-data-placeholder:scale-100',
          'peer-[&:not([data-placeholder])]:top-1 peer-[&:not([data-placeholder])]:-translate-y-4 peer-[&:not([data-placeholder])]:scale-75',
          'peer-aria-invalid:text-danger-300',
          'peer-disabled:peer-data-placeholder:bg-neutral-150',
          'peer-disabled:peer-[&:not([data-placeholder])]:label-background-2-colors',
        )}
      >
        {label}
      </Label.Root>
    </div>
  );
}
