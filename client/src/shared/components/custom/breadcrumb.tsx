import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from '@/shared/components/ui/breadcrumb';
import { cn } from '@/shared/lib/utils';

function BreadcrumbListWrapper({
  className,
  ...props
}: React.ComponentProps<typeof BreadcrumbList>) {
  return (
    <BreadcrumbList
      className={cn('text-body-md gap-2 sm:gap-2', className)}
      {...props}
    />
  );
}

function BreadcrumbPageWrapper({
  className,
  ...props
}: React.ComponentProps<typeof BreadcrumbPage>) {
  return (
    <BreadcrumbPage
      className={cn('text-action-950 font-semibold', className)}
      {...props}
    />
  );
}

export {
  Breadcrumb,
  BreadcrumbListWrapper as BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPageWrapper as BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
};
