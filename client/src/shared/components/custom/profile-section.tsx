import React from 'react';
import { cn } from '@/shared/lib/utils';

export function ProfileSection({
  children,
  title,
  description,
  className,
  'aria-labelledby': ariaLabelledby,
}: {
  children: React.ReactNode;
  title: string;
  description?: string;
  className?: string;
  'aria-labelledby'?: string;
}) {
  return (
    <section
      aria-labelledby={ariaLabelledby}
      className={cn(
        'flex flex-col gap-[16px] rounded-md bg-white p-[16px] shadow-[0px_0px_8px_0px_rgba(23,60,108,0.08)]',
        className,
      )}
    >
      <div className="flex flex-col gap-[8px]">
        <h2 className="text-heading-xs text-action-500">{title}</h2>
        {description && (
          <p className="text-body-sm text-neutral-950">{description}</p>
        )}
      </div>
      {children}
    </section>
  );
}
