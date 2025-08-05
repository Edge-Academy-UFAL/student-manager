'use client';

import { CopyIcon, ExternalLinkIcon } from 'lucide-react';
import Link from 'next/link';

import { cn } from '@/shared/lib/utils';

export function ProfileTextItem({
  title,
  value,
  className,
  showCopyButton = false,
  showOpenButton = false,
}: {
  title: string;
  value: string;
  className?: string;
  showCopyButton?: boolean;
  showOpenButton?: boolean;
}) {
  const hasButton = showCopyButton || showOpenButton;

  return (
    <div className={cn('flex flex-col gap-1', className)}>
      <span className="text-body-sm text-neutral-300">{title}</span>
      <div className="flex items-center gap-2">
        <span
          className={`text-body-md text-neutral-950 ${hasButton ? 'truncate' : ''}`}
        >
          {value}
        </span>
        {showCopyButton && (
          <CopyIcon
            size={18}
            className="text-brand-400 cursor-pointer"
            onClick={async () => await navigator.clipboard.writeText(value)}
          />
        )}
        {showOpenButton && (
          <Link href={value}>
            <ExternalLinkIcon size={18} className="text-brand-400" />
          </Link>
        )}
      </div>
    </div>
  );
}
