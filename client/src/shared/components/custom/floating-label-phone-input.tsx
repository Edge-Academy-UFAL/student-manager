'use client';

import React from 'react';
import PhoneInput, { type Props } from 'react-phone-number-input/input';
import 'react-phone-number-input/style.css';

import { FloatingLabelInput } from './floating-label-input';

interface FloatingLabelPhoneInputProps
  extends Props<React.ComponentProps<'input'>> {
  label: string;
}

const FloatingPhoneInputAdapter = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<'input'>
>((props, ref) => <FloatingLabelInput label="" {...props} ref={ref} />);
FloatingPhoneInputAdapter.displayName = 'FloatingPhoneInputAdapter';

export function FloatingLabelPhoneInput({
  className,
  ...props
}: FloatingLabelPhoneInputProps) {
  return (
    <div className={className}>
      <PhoneInput
        inputComponent={FloatingPhoneInputAdapter}
        country="BR"
        {...props}
      />
    </div>
  );
}
