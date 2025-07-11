'use server';

import { auth } from '@/shared/lib/auth';

export async function terminateStudent(
  email: string,
  payload: TerminateStudentPayload,
) {
  const session = await auth();
  const token = session?.user.authToken;

  const res = await fetch(
    `${process.env.SERVER_URL}/api/v1/students/${email}/terminate`,
    {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    },
  );

  return res.ok;
}

interface TerminateStudentPayload {
  terminationReason: string;
}
