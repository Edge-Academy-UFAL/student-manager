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
export type BreadcrumbItemProps = {
  label: string;
  href?: string;
};

type BreadcrumbsProps = {
  Icon?: LucideIcon;
  items: BreadcrumbItemProps[];
  className?: string;
};

export function Breadcrumbs({ items, Icon, className }: BreadcrumbsProps) {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div className="flex items-center gap-[8px]">
      {Icon && <Icon size={18} className="text-neutral-400" />}
      <Breadcrumb className={cn('flex items-center', className)}>
        <BreadcrumbList>
          {items.map((item, index) => {
            const isLast = index === items.length - 1;

            return (
              <div key={index} className="flex items-center gap-[8px]">
                <BreadcrumbItem>
                  {!isLast ? (
                    <BreadcrumbLink href={item.href}>
                      <div className="flex items-center">
                        <span className="text-body-md">{item.label}</span>
                      </div>
                    </BreadcrumbLink>
                  ) : (
                    <BreadcrumbPage>
                      <div className="flex items-center">
                        <span className="text-body-md text-action-950 font-semibold">
                          {item.label}
                        </span>
                      </div>
                    </BreadcrumbPage>
                  )}
                </BreadcrumbItem>
                {!isLast && <BreadcrumbSeparator />}
              </div>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}
