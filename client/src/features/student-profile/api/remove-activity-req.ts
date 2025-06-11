'use server';

import { auth } from '@/shared/lib/auth';
import { revalidateTag } from 'next/cache';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const removeActivity = async (data: any) => {
  'use server';

  const session = await auth();
  const token = session?.user.authToken;

  try {
    const res = await fetch(`${process.env.SERVER_URL}/api/v1/activities`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      method: 'DELETE',
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error('Erro ao remover atividade');
    }

    revalidateTag('user-data');

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
