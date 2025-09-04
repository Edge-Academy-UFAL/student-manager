import React from 'react';
import { EyeIcon, FileText, PencilIcon } from 'lucide-react';
import Link from 'next/link';

import { type StudentResponseDTO } from '@/api';
import { getUsername } from '@/shared/lib/utils';

interface StudentActionsProps {
  studentInfo: StudentResponseDTO;
}

export function StudentActions({ studentInfo }: StudentActionsProps) {
  const username = getUsername(studentInfo.email);

  return (
    <div className="text-brand-400 flex justify-center gap-2 px-4 py-2">
      <Link href={`students/${username}`}>
        <EyeIcon className="size-4.5" />
      </Link>
      <Link href={`students/${username}/update`}>
        <PencilIcon className="size-4.5" />
      </Link>
      <FileText className="size-4.5" />
    </div>
  );
}
