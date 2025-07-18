import { useId, useRef } from 'react';
import { cn } from '@/shared/lib/utils';

import { Button } from '@/shared/components/ui/button';

type FileUploadProps = {
  id?: string;
  label: string;
  value?: File | null;
  onChange?: (value: File | null) => void;
  disabled?: boolean;
  'aria-invalid'?: boolean;
};

export function MockFileUpload({
  id,
  label,
  value,
  onChange,
  disabled,
  ...props
}: FileUploadProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const inputRef = useRef<HTMLInputElement>(null);

  function handleClick() {
    if (!disabled) {
      inputRef.current?.click();
    }
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0] ?? null;
    onChange?.(file);
  }

  return (
    <div className="relative h-fit w-full">
      <input
        type="file"
        ref={inputRef}
        id={inputId}
        onChange={handleFileChange}
        className="hidden"
        disabled={disabled}
      />

      <Button
        type="button"
        onClick={handleClick}
        className={cn(
          'relative h-[48px] w-full cursor-pointer rounded-md border border-neutral-300 px-[16px] py-[4px] font-normal text-neutral-900 not-disabled:bg-white not-disabled:hover:bg-white focus:outline-none focus-visible:ring-neutral-200',
          'aria-invalid:border-destructive',
          'disabled:border disabled:border-neutral-300 disabled:bg-neutral-100 disabled:text-neutral-300 disabled:opacity-100 disabled:hover:bg-neutral-100',
        )}
        aria-invalid={props['aria-invalid']}
        disabled={disabled}
      >
        <span className="text-neutral-300">
          {value ? value.name.substring(0, 32) : label}
        </span>
      </Button>
    </div>
  );
}
