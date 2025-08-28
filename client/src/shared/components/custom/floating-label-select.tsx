'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './select';
import * as Label from '@radix-ui/react-label';
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
        className="text-body-md peer-data-[state=open]:text-action-950 peer-aria-invalid:text-danger-300 peer-disabled:peer-data-placeholder:bg-neutral-150 peer-disabled:not-peer-data-placeholder:label-background-2-colors pointer-events-none absolute start-3 top-1 z-10 max-w-full origin-[0] -translate-y-4 scale-75 transform truncate bg-white px-1 text-neutral-300 duration-200 peer-data-placeholder:top-1/2 peer-data-placeholder:-translate-y-1/2 peer-data-placeholder:scale-100 peer-data-[state=open]:top-1 peer-data-[state=open]:-translate-y-4 peer-data-[state=open]:scale-75"
      >
        {label}
      </Label.Root>
    </div>
  );
}
