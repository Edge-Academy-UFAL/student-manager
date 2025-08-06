import { clsx, type ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

const customTwMerge = extendTailwindMerge({
  extend: {
    // https://github.com/dcastil/tailwind-merge/blob/v3.3.1/docs/configuration.md#theme
    theme: {
      // Keep synchronized with globals.css
      text: [
        'heading-xl',
        'heading-lg',
        'heading-md',
        'heading-sm',
        'heading-xs',
        'body-lg',
        'body-md',
        'body-sm',
        'label-lg',
        'label-md',
        'label-sm',
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return customTwMerge(clsx(inputs));
}

export function getUsername(email: string) {
  return email.split('@')[0];
}
