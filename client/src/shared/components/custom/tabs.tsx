import * as React from 'react';

import { cn } from '@/shared/lib/utils';
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@/shared/components/ui/tabs';

function TabsWrapper({
  className,
  ...props
}: React.ComponentProps<typeof Tabs>) {
  return <Tabs className={cn('gap-4', className)} {...props} />;
}

function TabsTriggerWrapper({
  className,
  ...props
}: React.ComponentProps<typeof TabsTrigger>) {
  const title = typeof props.children === 'string' ? props.children : null;

  return (
    <TabsTrigger
      className={cn(
        'data-[state=active]:border-action-500 data-[state=active]:text-action-500 h-full cursor-pointer rounded-none border-0 border-b-2 px-6 py-2 text-sm font-normal text-neutral-400 uppercase data-[state=active]:font-semibold data-[state=active]:shadow-none',
        // Avoiding layout shift: https://stackoverflow.com/a/20249560
        title &&
          'inline-block before:invisible before:-mt-1 before:block before:h-0 before:overflow-hidden before:font-semibold before:content-[attr(data-title)]',
        className,
      )}
      data-title={title}
      {...props}
    />
  );
}

export {
  TabsWrapper as Tabs,
  TabsList,
  TabsTriggerWrapper as TabsTrigger,
  TabsContent,
};
