import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { Badge } from '@/shared/components/ui/badge';

const badgeVariants = cva('border-transparent px-2 py-1.5', {
  variants: {
    color: {
      black: 'bg-neutral-600/20 text-neutral-500',
      blue: 'text-action-500 bg-sky-800/20',
      green: 'text-success-300 bg-lime-500/20',
      orange: 'text-warning-300 bg-orange-400/20',
      red: 'text-danger-400 bg-red-700/20',
    },
  },
  defaultVariants: { color: 'blue' },
});

function BadgeWrapper({
  className,
  color,
  ...props
}: Omit<React.ComponentProps<typeof Badge>, 'variant'> &
  VariantProps<typeof badgeVariants>) {
  return <Badge className={badgeVariants({ color, className })} {...props} />;
}

export { BadgeWrapper as Badge, badgeVariants };
