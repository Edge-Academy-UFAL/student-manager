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

export function enumToStringCourse(course: string) {
  switch (course) {
    case 'COMPUTER_ENGINEERING':
      return 'Engenharia da Computação';
    case 'COMPUTER_SCIENCE':
      return 'Ciência da Computação';
    default:
      return course;
  }
}

export function formatDate(date: Date): string {
  const day = date.getDate(); // Get the day of the month
  const month = date.getMonth() + 1; // Get the month (0-indexed, so add 1)
  const year = date.getFullYear(); // Get the year

  // Convert day and month to strings and add leading zeros if less than 10
  const dayStr = day < 10 ? '0' + day.toString() : day.toString();
  const monthStr = month < 10 ? '0' + month.toString() : month.toString();

  return `${year}-${monthStr}-${dayStr}`; // Combine components in dd-mm-yyyy format
}

export function formatDateToReadableBRFormat(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  };

  const formattedDate = new Intl.DateTimeFormat('pt-BR', options).format(date);
  const parts = formattedDate.split(' ');
  parts[2] = parts[2].charAt(0).toUpperCase() + parts[2].slice(1);
  return parts.join(' ');
}

export function getMaxSemesterBasedOnCourse(course: string): number {
  return course === 'Engenharia de Computação' ? 15 : 12;
}

export function createDateOnCurrentTimezone(dateString?: string | null): Date {
  // When the date string is something like YYYY-MM-DD, the Date class assumes
  // it is in the UTC timezone. So, when printing, it converts to the users
  // current timezone, which resuls in unexpected dates being showed.

  // This functions creates the date considering 'america/maceio' timezone, so
  // no conversion is to happen.
  if (dateString) {
    return new Date(`${dateString}T03:00:00.000Z`);
  } else {
    return new Date();
  }
}

export function formatToCompactBRFormat(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  };
  const formattedDate = new Intl.DateTimeFormat('pt-BR', options).format(date);
  return formattedDate;
}

export function formatDateToYYYYMMDD(date: Date): string {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
}
