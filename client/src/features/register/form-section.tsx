import { cn } from '@/shared/lib/utils';
import React from 'react';

export default function FormSection({
  children,
  title,
  description,
  className,
  ariaLabelledby,
}: {
  children: React.ReactNode;
  title: string;
  description?: string;
  className?: string;
  ariaLabelledby?: string;
}) {
  return (
    <section
      aria-labelledby={ariaLabelledby}
      className={cn('flex flex-col rounded-md bg-white p-[16px]', className)}
    >
      <div className="flex flex-col gap-[8px]">
        <h2 className="text-heading-xs text-brand-500">{title}</h2>
        {description && (
          <p className="text-body-sm text-neutral-950">{description}</p>
        )}
      </div>
      {children}
    </section>
  );
}
