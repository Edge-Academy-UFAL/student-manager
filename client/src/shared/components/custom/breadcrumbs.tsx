import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/shared/components/ui/breadcrumb';
import { cn } from '@/shared/lib/utils';
import { LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { Fragment } from 'react';

export type BreadcrumbItem = {
  label: string;
  href?: string;
  Icon?: LucideIcon;
};

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
};

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <Breadcrumb>
      <BreadcrumbList className="gap-2 sm:gap-2">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          const segmentProps = {
            className: cn(
              'text-body-md flex items-center gap-2',
              isLast && 'text-action-950 font-semibold',
            ),
            children: (
              <>
                {item.Icon && <item.Icon size={18} />} {item.label}
              </>
            ),
          };

          return (
            <Fragment key={index}>
              <BreadcrumbItem>
                {item.href ? (
                  <BreadcrumbLink asChild>
                    <Link href={item.href} {...segmentProps} />
                  </BreadcrumbLink>
                ) : (
                  <BreadcrumbPage {...segmentProps} />
                )}
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator />}
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
