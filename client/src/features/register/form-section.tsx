import { cn } from '@/shared/lib/utils';
import React from 'react';

export default function FormSection({
  children,
  title,
  className,
  ariaLabelledby,
}: {
  children: React.ReactNode;
  title: string;
  className?: string;
  ariaLabelledby?: string;
}) {
  return (
    <section
      aria-labelledby={ariaLabelledby}
      className={cn('flex flex-col rounded-md bg-white p-[16px]', className)}
    >
      <h2 className="text-heading-xs text-brand-600">{title}</h2>
      {children}
    </section>
  );
}
