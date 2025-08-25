import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from './breadcrumb';
import Link from 'next/link';
import { Fragment } from 'react';

interface SimpleBreadcrumbsProps {
  items: SimpleBreadcrumbItem[];
}

export type SimpleBreadcrumbItem = {
  label: string;
  href?: string;
  Icon?: React.ComponentType<{ size: number }>;
};

export function SimpleBreadcrumbs({ items }: SimpleBreadcrumbsProps) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          const segmentProps = {
            className: 'flex items-center gap-2',
            children: (
              <>
                {item.Icon && <item.Icon size={18} />} {item.label}
              </>
            ),
          };

          const segment = !isLast ? (
            <BreadcrumbLink asChild>
              <Link href={item.href!} {...segmentProps} />
            </BreadcrumbLink>
          ) : (
            <BreadcrumbPage {...segmentProps} />
          );

          return (
            <Fragment key={index}>
              <BreadcrumbItem>{segment}</BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator />}
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
