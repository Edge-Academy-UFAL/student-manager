import React from 'react';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/shared/components/ui/avatar';
import { getNameInitials } from '@/shared/lib/formatting';

export function UserAvatar({ name, src }: UserAvatarProps) {
  return (
    <Avatar className="size-32 bg-neutral-200">
      <AvatarImage src={src} />
      <AvatarFallback className="bg-transparent text-6xl">
        {getNameInitials(name)}
      </AvatarFallback>
    </Avatar>
  );
}

interface UserAvatarProps {
  name: string;
  src: React.ComponentProps<typeof AvatarImage>['src'];
}
