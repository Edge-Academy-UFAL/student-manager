'use client';

import * as React from 'react';
import { CalendarIcon } from 'lucide-react';

import { Button } from '@/shared/components/ui/button';
import { Calendar } from '@/shared/components/custom/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/shared/components/ui/popover';
import { FloatingLabelInput } from './floating-label-input';
import { cn } from '@/shared/lib/utils';

function formatDate(date: Date | undefined) {
  if (!date) {
    return '';
  }

  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

function parseDate(value: string): Date | undefined {
  if (value === '') return undefined;
  const [dayStr, monthStr, yearStr] = value.split('/');

  if (!yearStr || yearStr.length !== 4) return new Date('Invalid');

  const day = Number(dayStr);
  const month = Number(monthStr);
  const year = Number(yearStr);

  if (!day || !month || !year) return new Date('Invalid');

  const date = new Date(year, month - 1, day);
  return isValidDate(date) ? date : new Date('Invalid');
}

function formatInputDate(input: string): string {
  const digits = input.replace(/\D/g, '');

  const parts = [];
  if (digits.length > 0) parts.push(digits.slice(0, 2)); // dia
  if (digits.length > 2) parts.push(digits.slice(2, 4)); // mês
  if (digits.length > 4) parts.push(digits.slice(4, 8)); // ano

  return parts.join('/');
}

function isValidDate(date: Date | undefined) {
  if (!date) {
    return false;
  }
  return !isNaN(date.getTime());
}

type DateInputProps = {
  label: string;
  onChange: (value: Date | undefined) => void;
  defaultValue?: Date;
  id?: string;
  name?: string;
  disabled?: boolean;
  className?: string;
};

export function DateInput({
  label,
  onChange,
  defaultValue,
  id,
  name,
  disabled,
  className,
}: DateInputProps) {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(defaultValue);
  const [month, setMonth] = React.useState<Date | undefined>(date);
  const [value, setValue] = React.useState(formatDate(defaultValue));

  return (
    <div className={cn('flex flex-col gap-3', className)}>
      <div className="relative flex gap-2">
        <FloatingLabelInput
          id={id}
          name={name}
          value={value}
          label={label}
          onChange={(e) => {
            const formatted = formatInputDate(e.target.value);
            setValue(formatted);

            const parsed = parseDate(formatted);
            onChange(parsed);

            if (isValidDate(parsed)) {
              setDate(parsed);
              setMonth(parsed);
            }
          }}
          onKeyDown={(e) => {
            if (e.key === 'ArrowDown') {
              e.preventDefault();
              setOpen(true);
            }
          }}
          inputMode="numeric"
          disabled={disabled}
        />
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
            >
              <CalendarIcon className="size-3.5 text-neutral-300" />
              <span className="sr-only">Select date</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-auto overflow-hidden p-0"
            align="end"
            alignOffset={-8}
            sideOffset={10}
          >
            <Calendar
              mode="single"
              selected={date}
              captionLayout="dropdown"
              month={month}
              onMonthChange={setMonth}
              onSelect={(date) => {
                if (date) {
                  onChange(date);
                }
                setValue(formatDate(date));
                setOpen(false);
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
