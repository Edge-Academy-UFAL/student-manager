'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { Button } from '@/shared/components/ui/button';

const buttonVariants = cva('cursor-pointer px-6 py-2.5 uppercase', {
  variants: {
    variant: {
      default:
        'bg-primary text-primary-foreground hover:bg-brand-500 active:bg-brand-500 disabled:bg-neutral-300',
      outline:
        'bg-transparent border-primary text-primary hover:bg-[#6750A4]/8 hover:text-primary active:bg-[#125667]/25 disabled:bg-[#494E55]/25 disabled:border-muted-foreground disabled:text-muted-foreground',
      ghost:
        'text-primary hover:bg-[#6750A4]/8 hover:text-primary active:bg-[#125667]/25 disabled:bg-[#494E55]/25 disabled:border-muted-foreground disabled:text-muted-foreground',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

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
