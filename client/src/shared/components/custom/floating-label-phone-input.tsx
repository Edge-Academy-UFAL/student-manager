'use client';

import PhoneInput from 'react-phone-number-input/input';
import 'react-phone-number-input/style.css';

import { FloatingLabelInput } from './floating-label-input';
import { useId } from 'react';
import React from 'react';

type FloatingLabelPhoneInputProps = React.ComponentProps<'input'> & {
  label: string;
  value: string | undefined;
  onChange: (value: string | undefined) => void;
  id?: string;
  name?: string;
  disabled?: boolean;
  className?: string;
};

const FloatingPhoneInputAdapter = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<'input'>
>(({ ...props }, ref) => (
  <FloatingLabelInput label={''} {...props} ref={ref} />
));
FloatingPhoneInputAdapter.displayName = 'FloatingPhoneInputAdapter';

export function FloatingLabelPhoneInput({
  label,
  value,
  onChange,
  id,
  name,
  disabled,
  className,
  ...props
}: FloatingLabelPhoneInputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <div className={className}>
      <PhoneInput
        value={value}
        onChange={onChange}
        label={label}
        inputComponent={FloatingPhoneInputAdapter}
        id={inputId}
        name={name}
        disabled={disabled}
        country="BR"
        aria-invalid={props['aria-invalid']}
      />
    </div>
  );
}
