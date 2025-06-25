import * as Label from '@radix-ui/react-label';
import { cn } from '@/shared/lib/utils';
import { useId } from 'react';

type Props = React.ComponentProps<'input'> & {
  label: string;
};

export function FloatingLabelInput({ label, id, className, ...props }: Props) {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <div className={cn('relative h-fit w-full', className)}>
      <input
        id={inputId}
        type={props.type}
        data-slot="input"
        className="peer text-body-md focus:border-action-400 l aria-invalid:focus:border-danger-300 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive block h-[48px] w-full appearance-none rounded-md border-1 border-neutral-300 bg-transparent px-[16px] py-[4px] leading-1.5 font-normal text-neutral-900 focus:ring-0 focus:outline-none disabled:cursor-not-allowed disabled:bg-neutral-100 disabled:text-neutral-300"
        {...props}
        placeholder=" "
      />
      <Label.Root
        htmlFor={inputId}
        data-slot="label"
        className={cn(
          '!text-body-md peer-focus:text-action-600 peer-aria-invalid:text-danger-300 pointer-events-none absolute start-3 top-1 z-10 origin-[0] -translate-y-4 scale-75 transform bg-white px-1 text-neutral-300 duration-200 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-1 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-1',
          'peer-disabled:text-body-md peer-disabled:peer-placeholder-shown:bg-neutral-100',
          'peer-disabled:not-peer-placeholder-shown:label-background-2-colors',
        )}
      >
        {label}
      </Label.Root>
    </div>
  );
}
