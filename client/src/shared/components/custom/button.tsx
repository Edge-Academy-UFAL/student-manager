import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { Button } from '@/shared/components/ui/button';

const buttonVariants = cva(
  'h-12 cursor-pointer px-6 py-2.5 leading-normal font-semibold uppercase',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground hover:bg-brand-500 active:bg-brand-500 disabled:bg-neutral-300',
        outline:
          'border-primary text-primary hover:text-primary disabled:border-muted-foreground disabled:text-muted-foreground bg-transparent hover:bg-[#6750A4]/8 active:bg-[#125667]/25 disabled:bg-[#494E55]/25',
        ghost:
          'text-primary hover:text-primary disabled:border-muted-foreground disabled:text-muted-foreground hover:bg-[#6750A4]/8 active:bg-[#125667]/25 disabled:bg-[#494E55]/25',
      },
    },
    defaultVariants: { variant: 'default' },
  },
);

function ButtonWrapper({
  className,
  variant,
  ...props
}: React.ComponentProps<typeof Button> & VariantProps<typeof buttonVariants>) {
  return (
    <Button
      className={buttonVariants({ variant, className })}
      variant={variant}
      {...props}
    />
  );
}

export { ButtonWrapper as Button };
