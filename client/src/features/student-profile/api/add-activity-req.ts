/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { auth } from '@/shared/lib/auth';
import { revalidateTag } from 'next/cache';

export const addActivity = async (data: any) => {
  'use server';

  const session = await auth();
  const token = session?.user.authToken;

  data.studentEmail = session?.user.email;

  try {
    const res = await fetch(`${process.env.backendRoute}/api/v1/activities`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error('Erro ao adicionar atividade');
    }

    revalidateTag('user-data');

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
