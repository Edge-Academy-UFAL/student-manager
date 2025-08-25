'use client';

import * as React from 'react';
import { getDefaultClassNames } from 'react-day-picker';

import { cn } from '@/shared/lib/utils';
import { Calendar, CalendarDayButton } from '@/shared/components/ui/calendar';
import { ptBR } from 'date-fns/locale';

function CalendarWrapper({
  classNames,
  captionLayout = 'label',
  formatters,
  ...props
}: React.ComponentProps<typeof Calendar>) {
  const defaultClassNames = getDefaultClassNames();

  return (
    <Calendar
      captionLayout={captionLayout}
      formatters={{
        formatMonthDropdown: (date) =>
          date.toLocaleString('pt-BR', { month: 'long' }),
        ...formatters,
      }}
      classNames={{
        dropdown_root: cn(
          'has-focus:border-ring border-input has-focus:ring-ring/50 relative rounded-sm border shadow-xs has-focus:ring-[3px]',
          defaultClassNames.dropdown_root,
        ),
        caption_label: cn(
          'font-medium select-none',
          captionLayout === 'label'
            ? 'text-sm'
            : '[&>svg]:text-muted-foreground flex h-8 items-center gap-1 rounded-lg pr-1 pl-2 text-sm [&>svg]:size-3.5',
          defaultClassNames.caption_label,
        ),
        day_button: cn(
          'dark:hover:bg-neutral-150 hover:data-[selected-single=true]:bg-brand-400 hover:data-[selected-single=true]:brightness-120',
          defaultClassNames.day_button,
        ),
        today: cn(
          'text-accent-foreground rounded-md data-[selected=true]:rounded-none',
          defaultClassNames.today,
        ),
        ...classNames,
      }}
      locale={ptBR}
      {...props}
    />
  );
}

export { CalendarWrapper as Calendar, CalendarDayButton };
