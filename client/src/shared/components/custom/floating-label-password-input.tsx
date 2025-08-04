'use client';

import React, { useState } from 'react';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { cn } from '@/shared/lib/utils';

import { Button } from './button';
import { FloatingLabelInput } from './floating-label-input';

export function FloatingLabelPasswordInput({
  inputClassName,
  disabled,
  ...props
}: FloatingLabelPasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const IconComponent = showPassword ? EyeIcon : EyeOffIcon;

  return (
    <div className="relative">
      <FloatingLabelInput
        type={showPassword ? 'text' : 'password'}
        inputClassName={cn('pr-11', inputClassName)}
        disabled={disabled}
        {...props}
      />
      <Button
        type="button"
        variant="ghost"
        className="absolute top-0 right-0 text-black"
        onClick={() => setShowPassword((prev) => !prev)}
        disabled={disabled}
      >
        <IconComponent className="size-6" aria-hidden="true" />
        <span className="sr-only">
          {showPassword ? 'Esconder senha' : 'Mostrar senha'}
        </span>
      </Button>
    </div>
  );
}

type FloatingLabelPasswordInputProps = Omit<
  React.ComponentProps<typeof FloatingLabelInput>,
  'type'
>;
