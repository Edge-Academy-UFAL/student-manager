import React from 'react';
import { EyeIcon, FileText, PencilIcon } from 'lucide-react';
import Link from 'next/link';

import { type StudentResponseDTO } from '@/api';
import { getUsername } from '@/shared/lib/utils';

interface StudentActionsProps {
  studentInfo: StudentResponseDTO;
}

export function StudentActions({ studentInfo }: StudentActionsProps) {
  const id = studentInfo.id;

  return (
    <div className="text-brand-400 flex justify-center gap-2 px-4 py-2">
      <Link href={`students/${id}`}>
        <EyeIcon className="size-4.5" />
      </Link>
      <Link href={`students/${id}/update`}>
        <PencilIcon className="size-4.5" />
      </Link>
      <FileText className="size-4.5" />
    </div>
  );
}
