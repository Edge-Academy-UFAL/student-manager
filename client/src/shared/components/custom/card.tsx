import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
} from '@/shared/components/ui/card';
import { cn } from '@/shared/lib/utils';

function CardWrapper({
  className,
  ...props
}: React.ComponentProps<typeof Card>) {
  return <Card className={cn('rounded-md', className)} {...props} />;
}

function CardTitleWrapper({
  className,
  ...props
}: React.ComponentProps<typeof CardTitle>) {
  return (
    <CardTitle
      className={cn('text-action-950 text-heading-md', className)}
      {...props}
    />
  );
}

function CardContentWrapper({
  className,
  ...props
}: React.ComponentProps<typeof CardContent>) {
  return (
    <CardContent
      className={cn('text-body-md flex flex-col gap-6', className)}
      {...props}
    />
  );
}

export {
  CardWrapper as Card,
  CardHeader,
  CardFooter,
  CardTitleWrapper as CardTitle,
  CardAction,
  CardDescription,
  CardContentWrapper as CardContent,
};
